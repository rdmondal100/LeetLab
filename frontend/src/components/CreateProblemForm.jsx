import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProblemFormSchema } from "../schemas/createProblemFormScheam";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import CodeEditor from "./CodeEditor";
import { CheckCircle2, Download, FileText, Trash2 } from "lucide-react";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Editor } from "@monaco-editor/react";

const sampledpData = {
	title: "Climbing Stairs",
	category: "dp", // Dynamic Programming
	description:
		"You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
	difficulty: "EASY",
	tags: ["Dynamic Programming", "Math", "Memoization"],
	constraints: "1 <= n <= 45",
	hints:
		"To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
	editorial:
		"This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
	testcases: [
		{
			input: "2",
			output: "2",
		},
		{
			input: "3",
			output: "3",
		},
		{
			input: "4",
			output: "5",
		},
	],
	examples: {
		JAVASCRIPT: {
			input: "n = 2",
			output: "2",
			explanation:
				"There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
		},
		PYTHON: {
			input: "n = 3",
			output: "3",
			explanation:
				"There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
		},
		CPP: {
			input: "n = 4",
			output: "5",
			explanation:
				"There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
		},
	},
	codeSnippet: {
		JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
		PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
		CPP: `#include <iostream>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        // Write your code here
        return 0;
    }
};

int main() {
    int n;
    cin >> n;
    
    // Use Solution class instead of Main
    Solution sol;
    int result = sol.climbStairs(n);
    
    // Print result
    cout << result << endl;
    
    return 0;
}`,
	},
	referenceSolution: {
		JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];
  }

/* Alternative approach with O(1) space
let a = 1; // ways to climb 1 step
let b = 2; // ways to climb 2 steps

for (let i = 3; i <= n; i++) {
  let temp = a + b;
  a = b;
  b = temp;
}

return n === 1 ? a : b;
*/
`,

		PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]
      
      # Alternative approach with O(1) space
      # a, b = 1, 2
      # 
      # for i in range(3, n + 1):
      #     a, b = b, a + b
      # 
      # return a if n == 1 else b
}`,

		CPP: `#include <iostream>
using namespace std;

class Solution {
public:
    int climbStairs(int n) {
        // Base cases
        if (n <= 2) {
            return n;
        }
        
        // Dynamic programming approach
        int dp[n + 1];
        dp[1] = 1;
        dp[2] = 2;
        
        for (int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
        
        /* Alternative approach with O(1) space
        int a = 1; // ways to climb 1 step
        int b = 2; // ways to climb 2 steps
        
        for (int i = 3; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        
        return n == 1 ? a : b;
        */
    }
};

int main() {
    int n;
    cin >> n;
    
    // Use Solution class instead of Main
    Solution sol;
    int result = sol.climbStairs(n);
    
    // Print result
    cout << result << endl;
    
    return 0;
}`,
	},
};

const sampleStringProblem = {
	title: "Valid Palindrome",
	description:
		"A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
	difficulty: "EASY",
	tags: ["String", "Two Pointers"],
	constraints:
		"1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
	hints:
		"Consider using two pointers, one from the start and one from the end, moving towards the center.",
	editorial:
		"We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
	testcases: [
		{
			input: "A man, a plan, a canal: Panama",
			output: "true",
		},
		{
			input: "race a car",
			output: "false",
		},
		{
			input: " ",
			output: "true",
		},
	],
	examples: {
		JAVASCRIPT: {
			input: 's = "A man, a plan, a canal: Panama"',
			output: "true",
			explanation: '"amanaplanacanalpanama" is a palindrome.',
		},
		PYTHON: {
			input: 's = "A man, a plan, a canal: Panama"',
			output: "true",
			explanation: '"amanaplanacanalpanama" is a palindrome.',
		},
		CPP: {
			input: 's = "A man, a plan, a canal: Panama"',
			output: "true",
			explanation: '"amanaplanacanalpanama" is a palindrome.',
		},
	},
	codeSnippet: {
		JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  // Write your code here
}

// Add readline for dynamic input handling
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

// Process input line
rl.on('line', (line) => {
  const result = isPalindrome(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
		PYTHON: `class Solution:
  def isPalindrome(self, s: str) -> bool:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  s = sys.stdin.readline().strip()
  sol = Solution()
  result = sol.isPalindrome(s)
  print(str(result).lower())`,
		CPP: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    string filtered;
    for (char c : s) {
        if (isalnum(c)) filtered += tolower(c);
    }

    int left = 0, right = filtered.size() - 1;
    while (left < right) {
        if (filtered[left++] != filtered[right--]) return false;
    }
    return true;
}

int main() {
    string s;
    getline(cin, s);
    cout << (isPalindrome(s) ? "true" : "false") << endl;
    return 0;
}`,
	},
	referenceSolution: {
		JAVASCRIPT: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
  const result = isPalindrome(line);
  console.log(result ? "true" : "false");
  rl.close();
});`,
		PYTHON: `class Solution:
  def isPalindrome(self, s: str) -> bool:
      filtered = [c.lower() for c in s if c.isalnum()]
      return filtered == filtered[::-1]

if __name__ == "__main__":
  import sys
  s = sys.stdin.readline().strip()
  sol = Solution()
  result = sol.isPalindrome(s)
  print(str(result).lower())`,
		CPP: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;

bool isPalindrome(string s) {
    string filtered;
    for (char c : s) {
        if (isalnum(c)) filtered += tolower(c);
    }

    int left = 0, right = filtered.size() - 1;
    while (left < right) {
        if (filtered[left++] != filtered[right--]) return false;
    }
    return true;
}

int main() {
    string s;
    getline(cin, s);
    cout << (isPalindrome(s) ? "true" : "false") << endl;
    return 0;
}`,
	},
};

const CreateProblemForm = () => {
	const [sampleType, setSampleType] = useState("DP");

  // 1. Define your form.
	const form = useForm({
		resolver: zodResolver(createProblemFormSchema),
		defaultValues: {
			title: "",
			description: "",
			difficulty: "",
			tags: [""],
			examples: {
				JAVASCRIPT: { input: "", output: "", explanation: "" },
				PYTHON: { input: "", output: "", explanation: "" },
				CPP: { input: "", output: "", explanation: "" },
			},
			constraints: "",
			hints: "",
			editorial: "",
			testcases: [{ input: "", output: "" }],
			codeSnippet: {
				JAVASCRIPT: `function solution() {\n  // Write your code here\n}`,
				PYTHON: `def solution():\n  # Write your code here\n  pass`,
				CPP: `void solution() {\n  // Write your code here\n}`,
			},
			referenceSolution: {
				JAVASCRIPT: "//Add your reference solution here",
				PYTHON: "# Add your reference solution here",
				CPP: "// Add your reference solution here",
			},
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = form;


	const {
		fields: testCaseFields,
		append: appendTestCase,
		remove: removeTestCase,
		replace: replacetestcases,
	} = useFieldArray({
		control,
		name: "testcases",
	});

	const {
		fields: tagFields,
		append: appendTag,
		remove: removeTag,
		replace: replaceTags,
	} = useFieldArray({
		control,
		name: "tags",
	});

	// 2. Define a submit handler.
	function onSubmit(values) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
    console.log("Form submited")
		console.log(values);
	}

	const loadSampleData = () => {
		const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;

		replaceTags(sampleData.tags.map((tag) => tag));
		replacetestcases(sampleData.testcases.map((tc) => tc));

		// Reset the form with sample data
		form.reset(sampleData);
	};

	return (
		<div className='container py-8 px-4 '>
			<div className='wrapper bg-base-100 px-5 py-3 rounded-md border border-dashed'>
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center md:items-center mb-6 md:mb-8 pb-4 border-b'>
      {/* Title */}
      <h2 className='text-3xl font-semibold flex items-center gap-3'>
        <FileText className='w-8 h-8 text-primary' />
        Create Problem
      </h2>

      {/* Controls */}
      <div className='flex flex-col md:flex-row gap-3 mt-4 md:mt-0'>

        {/* Toggle Group */}
        <ToggleGroup
          type='single'
          value={sampleType}
          onValueChange={(value) => value && setSampleType(value)}
        >
          <ToggleGroupItem value='DP' className='px-4'>DP Problem</ToggleGroupItem>
          <ToggleGroupItem value='string' className='px-4'>String Problem</ToggleGroupItem>
        </ToggleGroup>

        {/* Load Button */}
        <Button variant='primary' onClick={loadSampleData} className='gap-2 bg-chart-2'>
          <Download className='w-4 h-4' />
          Load Sample
        </Button>
      </div>
    </div>

					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
							{/* Basic Information */}
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input placeholder='Enter problem title' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Enter problem description'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='difficulty'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Difficulty</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select difficulty' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value='EASY'>Easy</SelectItem>
													<SelectItem value='MEDIUM'>Medium</SelectItem>
													<SelectItem value='HARD'>Hard</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							{/* Tags */}
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<h3 className='text-lg font-semibold'>Tags</h3>
									<Button type='button' onClick={() => appendTag("")}>
										Add Tag
									</Button>
								</div>
								<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
									{tagFields.map((field, index) => (
										<FormField
											key={field.id}
											control={form.control}
											name={`tags.${index}`}
											render={({ field }) => (
												<FormItem className='flex items-center gap-2'>
													<FormControl>
														<Input
															placeholder={`Tag ${index + 1}`}
															{...field}
														/>
													</FormControl>
													<Button
														type='button'
														variant='ghost'
														size='icon'
														disabled={tagFields.length === 1}
														onClick={() => removeTag(index)}
													>
														<Trash2 className='w-4 h-4 text-destructive' />
													</Button>
													<FormMessage />
												</FormItem>
											)}
										/>
									))}
								</div>
							</div>

							{/* Test Cases */}
							<div className='space-y-4'>
								<div className='flex justify-between items-center'>
									<h3 className='text-lg font-semibold'>Test Cases</h3>
									<Button
										type='button'
										onClick={() => appendTestCase({ input: "", output: "" })}
									>
										Add Test Case
									</Button>
								</div>

								{testCaseFields.map((field, index) => (
									<div
										key={field.id}
										className='border p-4 rounded-md space-y-4'
									>
										<div className='flex justify-between'>
											<p className='font-medium'>Test Case #{index + 1}</p>
											<Button
												type='button'
												variant='destructive'
												size='sm'
												onClick={() => removeTestCase(index)}
												disabled={testCaseFields.length === 1}
											>
												Remove
											</Button>
										</div>
										<FormField
											control={form.control}
											name={`testcases.${index}.input`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Input</FormLabel>
													<FormControl>
														<Textarea {...field} placeholder='Input' />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name={`testcases.${index}.output`}
											render={({ field }) => (
												<FormItem>
													<FormLabel>Expected Output</FormLabel>
													<FormControl>
														<Textarea
															{...field}
															placeholder='Expected Output'
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								))}
							</div>

							{/* Code Editor Sections */}
							{["JAVASCRIPT", "PYTHON", "CPP"].map((language) => (
								<div key={language} className='space-y-6'>
									<h4 className='text-lg font-semibold'>{language==="CPP"?"C++":language}</h4>

									<FormField
										control={form.control}
										name={`codeSnippet.${language}`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Starter Code</FormLabel>
												<FormControl>
													<CodeEditor
														language={language.toLowerCase()}
														value={field.value}
														onChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`referenceSolution.${language}`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Reference Solution</FormLabel>
												<FormControl>
													<CodeEditor
														language={language.toLowerCase()}
														value={field.value}
														onChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							))}

							{["JAVASCRIPT", "PYTHON", "CPP"].map((language) => (
								<div key={language} className='space-y-4 border p-4 rounded-md'>
									<h4 className='text-lg font-semibold'>{language==="CPP"?"C++":language} Example</h4>

									<FormField
										control={form.control}
										name={`examples.${language}.input`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Input</FormLabel>
												<FormControl>
													<Textarea {...field} placeholder='Example input' />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`examples.${language}.output`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Output</FormLabel>
												<FormControl>
													<Textarea {...field} placeholder='Example output' />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name={`examples.${language}.explanation`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Explanation</FormLabel>
												<FormControl>
													<Textarea
														{...field}
														placeholder='Explain the example'
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							))}

							{/* Additional Information */}
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='constraints'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Constraints</FormLabel>
											<FormControl>
												<Textarea {...field} placeholder='Constraints...' />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='hints'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Hints</FormLabel>
											<FormControl>
												<Textarea {...field} placeholder='Hints (optional)' />
											</FormControl>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='editorial'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Editorial</FormLabel>
											<FormControl>
												<Textarea
													{...field}
													placeholder='Solution explanation...'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<div className='flex justify-end pt-6 border-t mt-6'>
								<Button
						type='submit'
            size='lg'
									className='gap-2'
								>
									{isLoading ? (
										<span className='animate-spin h-5 w-5 border-2 border-foreground border-t-transparent rounded-full' />
									) : (
										<>
											<CheckCircle2 className='w-5 h-5' />
											Create Problem
										</>
									)}
								</Button>
							</div>
						</form>
					</Form>
			</div>
		</div>
	);
};

export default CreateProblemForm;
