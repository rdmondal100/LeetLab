import React from "react";
import { Button } from "@/components/ui/button";
import { CloudUploadIcon, Play } from "lucide-react";

const CodeExecutor = () => {
	return (
		<div className='flex gap-4'>
			<Button variant='secondary'>
				Run <Play />
			</Button>
			<Button variant='secondary' className='text-chart-2 bg-chart-2/15'>
				<CloudUploadIcon className='text-2xl' />
				Submit
			</Button>
		</div>
	);
};

export default CodeExecutor;
