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
import { CheckCircle2, Download, FileText, Loader, Loader2, Trash2 } from "lucide-react";
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
import { sampledpData, sampleStringProblem } from "../lib/sampleProblems";
import { useCreateNewProblemMutation } from '../redux-toolkit/services/problemService'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateProblemForm = () => {
	const [sampleType, setSampleType] = useState("DP");
    const [createNewProblem,{isLoading}] = useCreateNewProblemMutation()
	const navigate = useNavigate()
  // 1. Define your form.
    const defaultProblemValues =  {
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
	}
	const form = useForm({
		resolver: zodResolver(createProblemFormSchema),
		defaultValues: defaultProblemValues,
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
	const onSubmit= async(values) =>{
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
    console.log("Form submited")
		console.log(values);
		try {
			const response = await createNewProblem(values).unwrap()
			console.log(response)
			if(response?.success){
				const successMessage = response?.data?.message || "New problem created successfully"
				toast.success(successMessage)
				form.reset(defaultProblemValues);
			}
			
		} catch (err) {
			const errorMessage = err?.data?.message || "Failed to create the problem"
			console.error(err)
			toast.error(errorMessage)
		}
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
								disabled={isLoading}
						type='submit'
            size='lg'
									className='px-3 transition-all duration-300 ease-in-out'
								>
									{isLoading ? (
										<div className="flex justify-center items-center gap-1">
											<Loader2 className="animate-spin"/>Creating Problem
										</div>
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
