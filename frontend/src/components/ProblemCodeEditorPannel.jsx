import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Code } from "lucide-react";

import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getLanguageId } from "../lib/utils.js";

import { useDispatch } from "react-redux";
import { setCurrentCodeRunData } from "../redux-toolkit/features/executeCodeSlice.js";
import CodeExecutor from "./CodeExecutor.jsx";
import CodeEditor  from "./CodeEditor.jsx";

const ProblemCodeEditorPannel = ({ currentProblem, isSmallScreen }) => {
	const [language, setLanguage] = useState("javascript");
	const [userWrittenCode, setUserWrittenCode] = useState(
		"//Write you code here"
	);
	

	const currentLanguageId = getLanguageId(language);
	console.log(currentLanguageId)
	const dispatch = useDispatch()
	const handleLanguageChange = (newLang) => {
		setLanguage(newLang);
	};

useEffect(() => {
	if (currentProblem && currentProblem.codeSnippet) {
		const selectedLanguage = language?.toUpperCase();
		console.log("Selected:", selectedLanguage);
		console.log("Code Snippet:", currentProblem?.codeSnippet);

		const snippet = currentProblem.codeSnippet[selectedLanguage];

		if (snippet !== undefined) {
			setUserWrittenCode(snippet);
		} else {
			setUserWrittenCode("// No code snippet available for " + selectedLanguage);
		}
	}
}, [currentProblem?.id, language]);


	const userInputs = currentProblem?.testcases?.map((item) => item.input);
	const userOutputs = currentProblem?.testcases?.map((item) => item.output);
	console.log(userInputs);
	console.log(userOutputs);
	const currentProblemData = {
		source_code: userWrittenCode,
		language_id: currentLanguageId,
		stdin: userInputs,
		expected_outputs: userOutputs,
		problemId: currentProblem?.id,
	};
	console.log(currentProblemData);
useEffect(() => {
  if (currentProblem?.testcases?.length) {
    dispatch(setCurrentCodeRunData(currentProblemData));
  }
}, [userWrittenCode, language, currentProblem?.testcases]);

	return (
		<div className='flex-1 flex flex-col h-full'>
			<Card className='flex flex-col h-full rounded-none gap-0 overflow-hidden p-0'>
				<CardHeader className='bg-muted p-2'>
					<div className='flex items-start gap-2 font-semibold'>
						<Code className='text-chart-2' /> Code
					</div>
				</CardHeader>

				<CardContent className='p-1 pb-2 border-b-2 bg-card'>
					<div className='flex justify-between'>
						<Select value={language} onValueChange={handleLanguageChange}>
							<SelectTrigger className='w-auto border-none bg-card'>
								<SelectValue placeholder='Select language' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='javascript'>JavaScript</SelectItem>
								<SelectItem value='python'>Python</SelectItem>
								<SelectItem value='cpp'>C++</SelectItem>
							</SelectContent>
						</Select>

								{isSmallScreen && <CodeExecutor/> }				

					</div>
				</CardContent>

				<div className='flex-1 overflow-hidden'>
					{/* <Editor
						height='100%'
						language={language}
						theme='vs-dark'
						className='bg-muted min-h-[300px]'
						value={userWrittenCode}
						onChange={(value) => setUserWrittenCode(value || "")}
					/> */}
					<CodeEditor 
						height='auto'
						language={language}
						value={userWrittenCode}
						className='bg-muted min-h-[70vh] '
						onChange={(value) => setUserWrittenCode(value || "")}
					/>
				</div>
			</Card>
		</div>
	);
};

export default ProblemCodeEditorPannel;
