import { body } from "express-validator";
import { UserRole } from "../generated/prisma/index.js";
import { Difficulty } from "../generated/prisma/index.js";
import { supportedLanguagesId } from "../utils/constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
    ,
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Full name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be more than two charecter"),
    body("role")
      .optional()
      .isIn(Object.values(UserRole))
      .withMessage(`Role must be one of: ${Object.values(UserRole).join(", ")}`)



  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
  ]
}


const problemValidator = () => {
  return [
    body('title')
      .notEmpty()
      .withMessage('Title is required'),

    body('description')
      .notEmpty()
      .withMessage('Description is required'),

    body('difficulty')
      .notEmpty()
      .withMessage('Difficulty is required')
      .isIn(Object.values(Difficulty))
      .withMessage('Difficulty must be EASY, MEDIUM, or HARD'),

    body('tags')
      .isArray({ min: 1 })
      .withMessage('Tags must be an array with at least one tag'),

    body('examples')
      .isObject()
      .withMessage('Examples must be a valid JSON object'),

    body('constraints')
      .notEmpty()
      .withMessage('Constraints are required'),

    body('hints')
      .optional()
      .isString()
      .withMessage('Hint must be a string'),

    body('editorial')
      .optional()
      .isString()
      .withMessage('Editorial must be a string'),

    body('testcases')
      .isArray({ min: 1 })
      .withMessage('Testcases must be an array with at least one item')
      .custom((testcases) => {
        for (const test of testcases) {
          if (
            typeof test.input !== 'string' ||
            typeof test.output !== 'string'
          ) {
            throw new Error('Each testcase must have input and output strings');
          }
        }
        return true;
      }),

    body('codeSnippet')
      .isObject()
      .withMessage('CodeSnippet must be a valid JSON object'),

    body('referenceSolution')
      .isObject()
      .withMessage('ReferenceSolution must be a valid JSON object')
  ];
}

const executeCodeValidator = () => {
  return [
    body("source_code")
      .isString()
      .withMessage("source_code must be a string")
      .notEmpty()
      .withMessage("source_code cannot be empty"),

    body("language_id")
      .isInt()
      .withMessage("language_id must be an integer")
      .custom(value => supportedLanguagesId.includes(Number(value)))
      .withMessage(`language_id must be one of: ${supportedLanguagesId.join(", ")}`),

    body("stdin")
      .isArray()
      .withMessage("stdin must be an array")
      .custom(arr => arr.every(item => typeof item === "string"))
      .withMessage("All items in stdin must be strings"),

    body("expected_outputs")
      .isArray()
      .withMessage("expected_outputs must be an array")
      .custom(arr => arr.every(item => typeof item === "string"))
      .withMessage("All items in expected_outputs must be strings"),
  ]
}

const playListValidator = ()=>{
  return [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

    body("description")
    .trim()
    .optional()
    .isString()
    .withMessage("Description must be a string")
  ]
}

const problemsIdValidator = ()=>{
  return [
    body('problemIds')
      .exists({ checkNull: true }).withMessage('problemIds is required')
      .isArray({ min: 1 }).withMessage('problemIds must be a non-empty array'),
  
    body('problemIds.*')
      .isUUID().withMessage('Each problemId must be a valid UUID')
  ];
  
}

export {
  userRegisterValidator,
  userLoginValidator,
  problemValidator,
  executeCodeValidator,
  playListValidator,
  problemsIdValidator

}