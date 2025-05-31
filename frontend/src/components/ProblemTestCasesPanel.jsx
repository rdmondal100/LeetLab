import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";


import { CircleCheckBig, Plus, Terminal } from "lucide-react";

const ProblemTestCasesPanel = () => {
	const [activeView, setActiveView] = useState("test-cases");
	const [testCases, setTestCases] = useState([
		{ input: "[2, 7, 11, 15]\n9", output: "[0, 1]" },
	]);
	const [activeTab, setActiveTab] = useState("0");
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

	return (
		<div className='flex-1 scrollbar scrollbar-thumb-muted-foreground scrollbar-track-accent  scroll overflow-y-auto  pb-5 p-0 text-foreground'>
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
				<Tabs value={activeTab} onValueChange={setActiveTab} className='px-4'>
					<TabsList className='overflow-x-auto whitespace-nowrap flex items-center gap-8 bg-transparent min-h-16 py-5 h-auto flex-wrap'>
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
										className='absolute -top-3 -right-2 bg-muted text-foreground text-xs hover:bg-destructive rounded-full w-5 h-5 px-2 flex items-center justify-center'
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

						<div
							value='add'
							className='w-8 h-8 cursor-pointer p-2 hover:bg-muted rounded-full flex justify-center items-center'
							onClick={(e) => {
								e.preventDefault();
								addTestCase();
							}}
						>
							<Plus className='scale-125' />
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
	);
};

export default ProblemTestCasesPanel;
