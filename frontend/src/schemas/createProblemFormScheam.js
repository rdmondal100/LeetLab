import { z } from "zod";

// Define allowed difficulty levels
const DifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);

export const createProblemFormSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    difficulty: DifficultyEnum,
    tags: z.array(z.string()).min(1, "At least one tag is required"),

    examples:  z
    .array(
        z.object({
            input: z.string().min(1,"Input is required"),
            output: z.string().min(1,"Output is required"),
            explanation: z.string().min(1,"Explanation is required")
        })
    )
    .min(1, "At least one example is required"),
    constraints: z.string().min(1, "Constraints are required"),

    hints: z.string().optional(),
    editorial: z.string().optional(),

    testcases: z
        .array(
            z.object({
                input: z.string().min(1,"Input is required"),
                output: z.string().min(1,"Output is required"),
            })
        )
        .min(1, "At least one testcase is required"),

    codeSnippet: z.object({
        JAVASCRIPT: z.string().min(1,"Javascript code snippet is required"),
        PYTHON: z.string().min(1,"Javascript code snippet is required"),
        CPP: z.string().min(1,"Javascript code snippet is required"),
        
    }),
    referenceSolution: z.object({
        JAVASCRIPT: z.string().min(1,"Javascript solution is required"),
        PYTHON: z.string().min(1,"Javascript solution is required"),
        CPP: z.string().min(1,"Javascript solution is required"),
        
    }),
});
