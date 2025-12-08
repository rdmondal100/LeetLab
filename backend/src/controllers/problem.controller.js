import { validationResult } from "express-validator";
import { db } from "../libs/db.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import {
  getJudge0LanguageId,
  parseInputString,
  pollBatchResults,
  submitBatch,
} from "../utils/judge0.js";

export const createProblem = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    throw new ApiError(
      400,
      "Problem create Validation failed",
      extractedErrors
    );
  }

  //  1 -> get all the data from the body
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippet,
    referenceSolution,
  } = req.body;

  //  2 -> check the user role if it is admin or not
  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "You are not allowed to create a problem");
  }
  //  3 -> loop  through each ref solution and

  //extract the language and solutions code from the reference solutions
  for (const [language, solutionCode] of Object.entries(referenceSolution)) {
    const languageId = getJudge0LanguageId(language);

    if (!languageId) {
      throw new ApiError(400, `Language ${language} is not supported!`);
    }

    //test case submissions
    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: parseInputString(input),
      expected_output: output,
    }));
    console.log(submissions);

    const submissionResults = await submitBatch(submissions);
    console.log("Submission in problme controller::", submissionResults);
    const tokens = submissionResults.map((res) => res.token);

    const results = await pollBatchResults(tokens);
    console.log("Get the results from poolbatch in contolller", results);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      console.log("Result>>>>>>>>>>", result);
      if (result.status.id !== 3) {
        throw new ApiError(
          400,
          `Testcase ${i + 1} failed for language ${language}`
        );
      }
    }

    const newProblme = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippet,
        referenceSolution,
        userId: req.user.id,
      },
    });
    const response = new ApiResponse(
      201,
      newProblme,
      "New problem created successfully"
    );

    return res.status(response.statusCode).json(response);
  }
});

 

export const getAllProblems = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      difficulty = "ALL",
      tags = "",
      solved = "ALL",
      userId,
    } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // -----------------------
    // BUILD FILTERS
    // -----------------------
    const filters = {};

    // Search filter
    if (search.trim()) {
      filters.OR = [
        { title: { contains: search.trim(), mode: "insensitive" } },
        { description: { contains: search.trim(), mode: "insensitive" } },
      ];
    }

    // Difficulty filter
    if (difficulty && difficulty !== "ALL") {
      filters.difficulty = difficulty;
    }

    // Tags filter
    if (tags.trim()) {
      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t); // remove empty strings
      if (tagArray.length > 0) {
        filters.tags = { hasEvery: tagArray };
      }
    }

    // Solved/Unsolved filter
    // Solved / Unsolved
    let solvedFilterQuery = {};
    if (solved === "SOLVED") {
      solvedFilterQuery = { solvedBy: { some: { userId } } };
    } else if (solved === "UNSOLVED") {
      solvedFilterQuery = { solvedBy: { none: { userId } } };
    }
    

    // -----------------------
    // QUERY DATABASE
    // -----------------------
    const problems = await prisma.problem.findMany({
      where: {
        ...filters,
        ...solvedFilterQuery,
      },
      skip,
      take: limitNumber,
      include: {
        solvedBy: {
          where: userId ? { userId } : undefined,
          select: { userId: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Total count for pagination
    const totalCount = await prisma.problem.count({
      where: {
        ...filters,
        ...solvedFilterQuery,
      },
    });

    const totalPages = Math.ceil(totalCount / limitNumber);

    // Count of solved problems by current user
    let solvedCount = 0;
    if (userId) {
      solvedCount = await prisma.problem.count({
        where: {
          solvedBy: { some: { userId } },
        },
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        problems,
        totalPages,
        totalCount,
        solvedCount,
        currentPage: pageNumber,
      },
    });
  } catch (error) {
    console.error("Error fetching problems:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch problems",
      error: error.message,
    });
  }
};

export const getProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "Problem id not found");
  }
  const problem = await db.problem.findUnique({
    where: {
      id,
    },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  const response = new ApiResponse(
    200,
    problem,
    "Fetched problem successfully"
  );

  return res.status(response.statusCode).json(response);
});

export const updateProblemById = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map((err) => ({
      field: err.param,
      message: err.msg,
    }));

    throw new ApiError(
      400,
      "Problem update Validation failed",
      extractedErrors
    );
  }

  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    hints,
    editorial,
    testcases,
    codeSnippet,
    referenceSolution,
  } = req.body;

  const { id } = req.params;
  if (!id) {
    throw ApiError(404, "Problem id not found");
  }

  if (req.user.role !== "ADMIN") {
    throw new ApiError(403, "You are not allowed to create a problem");
  }

  for (const [language, solutionCode] of Object.entries(referenceSolution)) {
    const languageId = getJudge0LanguageId(language);

    if (!languageId) {
      throw new ApiError(400, `Language ${language} is not supported!`);
    }

    const submissions = testcases.map(({ input, output }) => ({
      source_code: solutionCode,
      language_id: languageId,
      stdin: input,
      expected_output: output,
    }));

    const submissionResults = await submitBatch(submissions);
    const tokens = submissionResults.map((res) => res.token);
    const results = await pollBatchResults(tokens);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      console.log("Result>>>>>>>>>>", result);
      if (result.status.id !== 3) {
        throw new ApiError(
          400,
          `Testcase ${i + 1} failed for language ${language}`
        );
      }
    }

    const updatedProblem = await db.problem.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        hints,
        editorial,
        testcases,
        codeSnippet,
        referenceSolution,
        userId: req.user.id,
      },
    });

    console.log(updatedProblem);

    const response = new ApiResponse(
      200,
      updatedProblem,
      "Problem updated successfully"
    );

    return res.status(response.statusCode).json(response);
  }
});

export const deleteProblemById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const problem = await db.problem.findUnique({
    where: { id },
  });

  if (!problem) {
    throw new ApiError(404, "Problem not found");
  }

  await db.problem.delete({ where: { id } });

  const response = new ApiResponse(200, null, "Problem deleted Successfully");

  return res.status(response.statusCode).json(response);
});

export const getAllProblemsSolvedByUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const problmeSolvedByLoggedInUser = await db.problem.findMany({
    where: {
      solvedBy: {
        some: { userId },
      },
    },
    include: {
      solvedBy: {
        where: { userId },
      },
    },
  });

  const response = new ApiResponse(
    200,
    problmeSolvedByLoggedInUser,
    "Fetched problem solved by loggedIn user successfully"
  );

  return res.status(response.statusCode).json(response);
});
