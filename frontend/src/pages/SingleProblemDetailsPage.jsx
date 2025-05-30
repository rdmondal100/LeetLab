"use client";

import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Editor from "@monaco-editor/react";
import {
	CircleCheckBig,
	CloudUploadIcon,
	Code,
	Play,
	Plus,
	Terminal,
} from "lucide-react";

export default function SingleProblemDetailsPage() {
	const [language, setLanguage] = useState("javascript");
	const [activeView, setActiveView] = useState("test-cases"); // "test-cases" | "results"

	const [testCases, setTestCases] = useState([
		{ input: "[2, 7, 11, 15]\n9", output: "[0, 1]" },
	]);
	const [activeTab, setActiveTab] = useState("0");

	const addTestCase = () => {
		const newIndex = testCases.length;
		setTestCases([...testCases, { input: "", output: "" }]);
		setActiveTab(newIndex.toString());
	};

	const removeTestCase = (index) => {
		const updated = testCases.filter((_, i) => i !== index);
		setTestCases(updated);
		setActiveTab("0");
	};

	const updateTestCase = (index, field, value) => {
		const updated = [...testCases];
		updated[index][field] = value;
		setTestCases(updated);
	};

	return (
		<div className='h-screen w-screen flex flex-col'>
			{/* Top Control Bar */}
			<div className='flex justify-center items-center p-4 border-b bg-background'>
				<div className='flex gap-4'>
					<Button variant='secondary'>
						Run <Play />
					</Button>
					<Button variant='secondary' className='text-chart-2 bg-chart-2/15'>
						<CloudUploadIcon className='text-2xl' />
						Submit
					</Button>
				</div>
			</div>

			{/* Main Content Area */}
			<PanelGroup direction='horizontal' className='flex-1'>
				{/* Left Panel - Problem Description */}
				<Panel
					className='border-2 rounded-lg bg-card m-1'
					defaultSize={50}
					minSize={30}
				>
					<div className='h-[98%] overflow-y-auto text-foreground'>
						<Tabs defaultValue='description' className='w-full px-0'>
							<TabsList className='mb-4 bg-muted rounded-none h-11 w-full'>
								<TabsTrigger value='description'>Description</TabsTrigger>
								<TabsTrigger value='submissions'>Submissions</TabsTrigger>
								<TabsTrigger value='solutions'>Solutions</TabsTrigger>
							</TabsList>

							<TabsContent value='description'>
								<Card className='bg-card p-3 border-none shadow-none'>
									<h1 className='text-2xl font-bold mb-2'>1. Two Sum</h1>
									<div className='flex gap-2 text-sm mb-4'>
										<span className='text-green-600 font-semibold'>Easy</span>
										<span className='text-muted-foreground'>Array</span>
										<span className='text-muted-foreground'>Hash Table</span>
									</div>
									<CardContent className='text-sm p-4 space-y-4'>
										<p>
											Given an array of integers <code>nums</code> and an
											integer <code>target</code>, return indices of the two
											numbers such that they add up to <code>target</code>.
										</p>
										<p>
											You may assume that each input would have exactly one
											solution, and you may not use the same element twice.
										</p>
										<p>You can return the answer in any order.</p>

										<div>
											<p className='font-semibold'>Example 1:</p>
											<pre className='bg-muted p-3 rounded text-xs'>
												Input: nums = [2,7,11,15], target = 9{"\n"}
												Output: [0,1]
											</pre>
										</div>

										<div>
											<p className='font-semibold'>Constraints:</p>
											<ul className='list-disc list-inside'>
												<li>2 ≤ nums.length ≤ 10⁴</li>
												<li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
												<li>-10⁹ ≤ target ≤ 10⁹</li>
												<li>Only one valid answer exists.</li>
											</ul>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value='submissions'>
								<Card>
									<CardContent className='text-sm p-4 text-muted-foreground'>
										Submissions will appear here.
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value='solutions'>
								<Card>
									<CardContent className='text-sm p-4 text-muted-foreground'>
										Community solutions will be displayed here.
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</Panel>

				<PanelResizeHandle className='w-2 bg-border h-10 my-auto rounded-md cursor-col-resize' />

				{/* Right Panel - Code Editor and Test Cases */}
				<Panel defaultSize={50} minSize={30} className='h-[98%]'>
					<PanelGroup direction='vertical' className='h-full'>
						{/* Code Editor Section */}
						<Panel
							className='border-2 rounded-lg bg-card m-1'
							defaultSize={70}
							minSize={30}
						>
							<div className='h-full overflow-hidden p-0 text-foreground'>
								<Card className='h-full rounded-none gap-0 overflow-hidden p-0'>
									<CardHeader className='bg-muted p-2'>
										<div className='flex items-start gap-2 font-semibold'>
											<Code className='text-chart-2' /> Code
										</div>
									</CardHeader>

									<CardContent className='p-1 pb-2 border-b-2 bg-card'>
										<div className='flex justify-start'>
											<Select value={language} onValueChange={setLanguage}>
												<SelectTrigger className='w-auto border-none bg-card'>
													<SelectValue placeholder='Select language' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='javascript'>JavaScript</SelectItem>
													<SelectItem value='python'>Python</SelectItem>
													<SelectItem value='cpp'>C++</SelectItem>
													<SelectItem value='java'>Java</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</CardContent>

									<CardContent className='p-0 h-full'>
										<Editor
											height='100%'
											defaultLanguage={language}
											theme='vs-dark'
											className='bg-muted'
											defaultValue='// Write your code here'
										/>
									</CardContent>
								</Card>
							</div>
						</Panel>

						<PanelResizeHandle className='w-10 bg-border h-2 mx-auto rounded-md cursor-col-resize' />


						{/* Test Cases Section with Tabs and Results */}
						<Panel
							className='border-2 rounded-lg bg-card m-1'
							defaultSize={30}
							minSize={30}
						>
							<div className='h-full overflow-y-auto p-0  text-foreground'>
								{/* Header Tabs */}
								<Tabs
									value={activeView}
									onValueChange={setActiveView}
									className='border-b mb-2 bg-muted py-0.5 rounded-none'
								>
									<TabsList className='flex space-x-2 py-2'>
										<TabsTrigger className=' h-8 hover:bg-muted' value='test-cases'>
											<CircleCheckBig className='text-chart-2' />
											Test Cases
										</TabsTrigger>
										<TabsTrigger className='h-8 hover:bg-muted' value='results'>
											<Terminal />
											Test Case Results
										</TabsTrigger>
									</TabsList>
								</Tabs>

								{/* Conditional Content */}
								{activeView === "test-cases" && (
									<Tabs
										value={activeTab}
										onValueChange={setActiveTab}
										className='px-4 '
									>
										<TabsList className='overflow-x-auto whitespace-nowrap flex items-center gap-8 bg-transparent h-20 '>
											{testCases.map((_, index) => (
												<div className='relative' key={index}>
													<TabsTrigger className="w-14 hover:bg-muted border" value={index.toString()}>
														Case {index + 1}
													</TabsTrigger>
													{index !== 0 && (
														<button
															className='absolute -top-3 -right-2 bg-muted text-foreground text-xs rounded-full w-5 h-5 px-2 flex items-center justify-center'
															onClick={(e) => {
																e.stopPropagation();
																removeTestCase(index);
															}}
														>
															×
														</button>
													)}
												</div>
											))}
											<TabsTrigger
												value='add'
                        className="w-8 h-8 p-2 hover:bg-muted rounded-full"
												onClick={(e) => {
													e.preventDefault();
													addTestCase();
												}}
											>
												<Plus className="text-2xl"/>
											</TabsTrigger>
										</TabsList>

										{testCases.map((tc, index) => (
											<TabsContent key={index} value={index.toString()}>
												<div className='mt-4 space-y-2'>
													<div>
														<Label className='text-sm font-medium'>
															Input:
														</Label>
														<Textarea
															className='w-full rounded border p-2'
															value={tc.input}
															onChange={(e) => {
																const updated = [...testCases];
																updated[index].input = e.target.value;
																setTestCases(updated);
															}}
														/>
													</div>
													<div>
														<Label className='text-sm font-medium'>
															Expected Output:
														</Label>
														<Textarea
															className='w-full rounded border p-2'
															value={tc.output}
															onChange={(e) => {
																const updated = [...testCases];
																updated[index].output = e.target.value;
																setTestCases(updated);
															}}
														/>
													</div>
												</div>
											</TabsContent>
										))}
									</Tabs>
								)}

								{activeView === "results" && (
									<div className='p-4'>
										{/* Replace this with actual results later */}
										<p className='text-sm text-muted-foreground'>
											Results will show here after submission.
										</p>
									</div>
								)}
							</div>
						</Panel>
					</PanelGroup>
				</Panel>
			</PanelGroup>
		</div>
	);
}
