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
import ProblemDescriptionPanel from "../components/ProblemDescriptionPanel";
import ProblemCodeEditorPannel from "../components/ProblemCodeEditorPannel";
import ProblemTestCasesPanel from "../components/ProblemTestCasesPanel";

export default function SingleProblemDetailsPage() {
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

	

	return (
		<div className='min-h-screen md:w-screen flex flex-col'>
			<div className='flex justify-between items-center p-4 border-b bg-background'>
				{/* Left side: Logo + Nav Buttons */}
				<div className='flex items-center gap-1'>
					<Link
						to='/'
						className='text-2xl font-extrabold tracking-tight text-primary flex items-center gap-1'
					>
						<ChevronLeft />
						<Home />
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
						<Button className='px-3 py-1 bg-muted rounded hover:bg-muted/70 text-sm'>
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
						<ProblemDescriptionPanel />
					</div>
					<div className=' flex flex-col flex-1'>
						<div className='flex flex-col h-full'>
							<div className='border-2 rounded-lg bg-card m-1 flex flex-col'>
								<div className="min-h-[400px]">
									<ProblemCodeEditorPannel />
								</div>
								<div className="">
									<ProblemTestCasesPanel />
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<ResizablePanelGroup direction='horizontal' className='flex-1 h-full'>
					<ResizablePanel
						className='border-2 rounded-lg bg-card m-1 flex flex-col'
						defaultSize={50}
						minSize={40}
					>
						<ProblemDescriptionPanel />
					</ResizablePanel>

					<ResizableHandle withHandle />

					<ResizablePanel
						className='flex-1 flex flex-col m-1'
						defaultSize={50}
						minSize={30}
					>
						<ResizablePanelGroup direction='vertical' className='flex-1'>
							<ResizablePanel
								className='border-2  rounded-lg bg-card m-1 flex flex-col'
								defaultSize={70}
								minSize={30}
							>
								<ProblemCodeEditorPannel />
							</ResizablePanel>

							<ResizableHandle withHandle />

							<ResizablePanel
								className='border-2 rounded-lg bg-card m-1 flex flex-col'
								defaultSize={30}
								minSize={30}
							>
								<ProblemTestCasesPanel />
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			)}
		</div>
	);
}
