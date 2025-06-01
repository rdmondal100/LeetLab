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

import { useRunCurrentProblemMutation } from "../redux-toolkit/services/executeCodeService";

const ProblemCodeEditorPannel = ({ currentProblem }) => {
	const [language, setLanguage] = useState("javascript");
	const [userWrittenCode, setUserWrittenCode] = useState(
		"//Write you code here"
	);

	const [runCurrentProblem, { isLoading }] = useRunCurrentProblemMutation();

	const currentLanguageId = getLanguageId(language);

	const handleLanguageChange = (newLang) => {
		setLanguage(newLang);
	};

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

	return (
		<div className='flex-1 flex flex-col h-full'>
			<Card className='flex flex-col h-full rounded-none gap-0 overflow-hidden p-0'>
				<CardHeader className='bg-muted p-2'>
					<div className='flex items-start gap-2 font-semibold'>
						<Code className='text-chart-2' /> Code
					</div>
				</CardHeader>

				<CardContent className='p-1 pb-2 border-b-2 bg-card'>
					<div className='flex justify-start'>
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
					</div>
				</CardContent>

				<div className='flex-1 overflow-hidden'>
					<Editor
						height='100%'
						language={language}
						theme='vs-dark'
						className='bg-muted min-h-[300px]'
						value={userWrittenCode}
						onChange={(value) => setUserWrittenCode(value || "")}
					/>
				</div>
			</Card>
		</div>
	);
};

export default ProblemCodeEditorPannel;
