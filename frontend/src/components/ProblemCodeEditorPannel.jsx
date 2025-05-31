
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Editor } from "@monaco-editor/react";
import { Code } from "lucide-react";
import { useState } from "react";

const ProblemCodeEditorPannel = () => {
        const [language, setLanguage] = useState("javascript");
    
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
												className='bg-muted min-h-[300px] '
												defaultValue='// Write your code here'
											/>
										</div>
									</Card>
								</div>
  )
}

export default ProblemCodeEditorPannel