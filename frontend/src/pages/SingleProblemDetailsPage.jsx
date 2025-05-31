"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import Editor from "@monaco-editor/react";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
	ChevronLeft,
	ChevronRight,
	CircleCheckBig,
	CloudUploadIcon,
	Code,
	ExternalLink,
	Home,
	Minus,
	MoveLeft,
	PanelLeft,
	PanelsLeftBottomIcon,
	Play,
	Plus,
	Shuffle,
	Terminal,
} from "lucide-react";
import CodeExecutor from "../components/CodeExecutor";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function SingleProblemDetailsPage() {
	const [language, setLanguage] = useState("javascript");
	const [activeView, setActiveView] = useState("test-cases");
	const [testCases, setTestCases] = useState([
		{ input: "[2, 7, 11, 15]\n9", output: "[0, 1]" },
	]);
	const [activeTab, setActiveTab] = useState("0");
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const checkSize = () => setIsSmallScreen(window.innerWidth < 768);
		checkSize();
		window.addEventListener("resize", checkSize);
		return () => window.removeEventListener("resize", checkSize);
	}, []);

	const addTestCase = () => {
		setTestCases((prevTestCases) => {
			console.log(prevTestCases);
			const newIndex = prevTestCases.length;
			setActiveTab(newIndex.toString());
			return [...prevTestCases, { input: "", output: "" }];
		});
	};

	const removeTestCase = (index) => {
		const updated = testCases.filter((_, i) => i !== index);
		setTestCases(updated);
		setActiveTab("0");
	};

	// Description panel content
	const DescriptionPanel = () => (
		<div className='h-full overflow-y-auto text-foreground'>
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
								Given an array of integers <code>nums</code> and an integer{" "}
								<code>target</code>, return indices of the two numbers such that
								they add up to <code>target</code>.
							</p>
							<p>
								You may assume that each input would have exactly one solution,
								and you may not use the same element twice.
							</p>
							<p>You can return the answer in any order.</p>

							<div>
								<p className='font-semibold'>Example 1:</p>
								<pre className='bg-muted p-3 rounded text-xs'>
									Input: nums = [2,7,11,15], target = 9{"\n"}Output: [0,1]
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
	);

	// Code editor + test cases content
	const CodeAndTestCases = () => (
		<div className='flex flex-col h-full'>
			<div className='border-2 rounded-lg bg-card m-1 flex flex-col'>
				<Card className='flex flex-col h-full rounded-none gap-0 overflow-hidden p-0'>
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
					<div className='flex-1 overflow-hidden'>
						<Editor
							height={isSmallScreen ? "300px" : "100%"}
							defaultLanguage={language}
							theme='vs-dark'
							className='bg-muted'
							defaultValue='// Write your code here'
						/>
					</div>
					{isSmallScreen && (
						<div className='flex justify-center py-3 '>
							{" "}
							<CodeExecutor />
						</div>
					)}
				</Card>
			</div>

			<div className='border-2 rounded-lg bg-card m-1 flex flex-col flex-1'>
				<div className='overflow-y-auto pb-5 text-foreground flex-1'>
					<Tabs
						value={activeView}
						onValueChange={setActiveView}
						className='border-b mb-2 bg-muted py-0.5 rounded-none'
					>
						<TabsList className='flex space-x-2 py-2'>
							<TabsTrigger className='h-8 hover:bg-muted' value='test-cases'>
								<CircleCheckBig className='text-chart-2' /> Test Cases
							</TabsTrigger>
							<TabsTrigger className='h-8 hover:bg-muted' value='results'>
								<Terminal /> Test Case Results
							</TabsTrigger>
						</TabsList>
					</Tabs>

					{activeView === "test-cases" && (
						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}
							className='px-4'
						>
							<TabsList className='overflow-x-auto whitespace-nowrap flex items-center gap-8 bg-transparent h-16 '>
								{testCases.map((_, index) => (
									<div className='relative' key={index}>
										<TabsTrigger
											className='w-14 hover:bg-muted border'
											value={index.toString()}
										>
											Case {index + 1}
										</TabsTrigger>
										{index !== 0 && (
											<button
												className='absolute -top-3 -right-2 bg-muted text-foreground text-xs rounded-full w-5 h-5 px-2 flex items-center justify-center hover:bg-destructive'
												onClick={(e) => {
													removeTestCase(index);
												}}
											>
												×
											</button>
										)}
									</div>
								))}
								<div
									value='add'
									className='w-8 h-8 p-2 hover:bg-muted rounded-full flex  cursor-pointer justify-center items-center'
									onClick={(e) => {
										e.preventDefault();
										addTestCase();
									}}
								>
									<Plus className=' scale-125' />
								</div>
							</TabsList>

							{testCases.map((tc, index) => (
								<TabsContent key={index} value={index.toString()}>
									<div className='mt-4 space-y-2'>
										<div>
											<Label className='text-sm font-medium'>Input:</Label>
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
							<p className='text-sm text-muted-foreground'>
								Results will show here after submission.
							</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);

	return (
		<div className='min-h-screen md:w-screen flex flex-col'>
			<div className='flex justify-between items-center p-4 border-b bg-background'>
				{/* Left side: Logo + Nav Buttons */}
				<div className='flex items-center gap-1'>
					<Link
						to='/'
						className='text-2xl font-extrabold tracking-tight text-primary flex items-center gap-1'
					>
						<ChevronLeft /><Home/>
						
					</Link>{" "}
					<Minus className=' rotate-90 text-muted' />
					<div className='flex gap-3'>
						<Link className=' hover:text-primary flex justify-center items-center gap-1'>
							<ExternalLink /> ProblemList
						</Link>
						<Button
							className='px-3 py-1 bg-muted rounded hover:bg-muted/70 text-sm'
							onClick={() => {}}
						>
							<ChevronLeft />{" "}
						</Button>
						<Button
							className='px-3 py-1 bg-muted rounded hover:bg-muted/70 text-sm'
							onClick={() => {}}
						>
							<ChevronRight />{" "}
						</Button>
						<Button className="px-3 py-1 bg-muted rounded hover:bg-muted/70 text-sm">
							<Shuffle />
						</Button>
					</div>
				</div>

				{/* Right side: Code Executor */}
				{!isSmallScreen && <CodeExecutor />}
			</div>

			{isSmallScreen ? (
				<div className='flex flex-col flex-1 overflow-auto'>
					<div className=' border-2 rounded-lg bg-card flex flex-col flex-1'>
						<DescriptionPanel />
					</div>
					<div className=' flex flex-col flex-1'>
						<CodeAndTestCases />
					</div>
				</div>
			) : (
				<ResizablePanelGroup direction='horizontal' className='flex-1 h-full'>
					<ResizablePanel
						className='border-2 rounded-lg bg-card m-1 flex flex-col'
						defaultSize={50}
						minSize={40}
					>
						<DescriptionPanel />
					</ResizablePanel>

					<ResizableHandle withHandle />

					<ResizablePanel
						className='flex-1 flex flex-col m-1'
						defaultSize={50}
						minSize={30}
					>
						<ResizablePanelGroup direction='vertical' className='flex-1'>
							<ResizablePanel
								className='border-2 rounded-lg bg-card m-1 flex flex-col'
								defaultSize={70}
								minSize={30}
							>
								<div className='flex-1 flex flex-col'>
									<Card className='flex flex-col h-full rounded-none gap-0 overflow-hidden p-0'>
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
														<SelectItem value='javascript'>
															JavaScript
														</SelectItem>
														<SelectItem value='python'>Python</SelectItem>
														<SelectItem value='cpp'>C++</SelectItem>
														<SelectItem value='java'>Java</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</CardContent>
										<div className='flex-1 overflow-hidden'>
											<Editor
												height='100%'
												defaultLanguage={language}
												theme='vs-dark'
												className='bg-muted'
												defaultValue='// Write your code here'
											/>
										</div>
									</Card>
								</div>
							</ResizablePanel>

							<ResizableHandle withHandle />

							<ResizablePanel
								className='border-2 rounded-lg bg-card m-1 flex flex-col'
								defaultSize={30}
								minSize={30}
							>
								<div className='flex-1 overflow-y-auto p-0 text-foreground'>
									<Tabs
										value={activeView}
										onValueChange={setActiveView}
										className='border-b mb-2 bg-muted py-0.5 rounded-none'
									>
										<TabsList className='flex space-x-2 py-2'>
											<TabsTrigger
												className='h-8 hover:bg-muted'
												value='test-cases'
											>
												<CircleCheckBig className='text-chart-2' /> Test Cases
											</TabsTrigger>
											<TabsTrigger
												className='h-8 hover:bg-muted'
												value='results'
											>
												<Terminal /> Test Case Results
											</TabsTrigger>
										</TabsList>
									</Tabs>

									{activeView === "test-cases" && (
										<Tabs
											value={activeTab}
											onValueChange={setActiveTab}
											className='px-4'
										>
											<TabsList className='overflow-x-auto whitespace-nowrap flex items-center gap-8 bg-transparent h-16'>
												{testCases.map((_, index) => (
													<div className='relative' key={index}>
														<TabsTrigger
															className='w-14 hover:bg-muted border'
															value={index.toString()}
														>
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
													className='w-8 h-8 p-2 hover:bg-muted rounded-full'
													onClick={(e) => {
														e.preventDefault();
														addTestCase();
													}}
												>
													<Plus className='text-2xl' />
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
											<p className='text-sm text-muted-foreground'>
												Results will show here after submission.
											</p>
										</div>
									)}
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			)}
		</div>
	);
}
