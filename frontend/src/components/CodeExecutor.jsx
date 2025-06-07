import React from "react";
import { Button } from "@/components/ui/button";
import { CloudUploadIcon, Loader, Loader2, Play } from "lucide-react";
import { useRunCurrentProblemMutation, useSubmitCurrentProblemMutation } from "../redux-toolkit/services/executeCodeService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTestCaseResults } from "../redux-toolkit/features/executeCodeSlice";
import { toast } from "sonner";
import { setActiveTab } from "../redux-toolkit/features/problemSlice";

const CodeExecutor = () => {
	const [runCurrentProblem, { isLoading: isRunning }] = useRunCurrentProblemMutation();
	const [submitCurrentProblem, { isLoading: isSubmitting }] = useSubmitCurrentProblemMutation();

	const currentCodeRunData = useSelector((state) => state.executeCode.currentCodeRunData);

	const dispatch = useDispatch()

	const handleCodeRun = async () => {
		try {
			if (currentCodeRunData) {
				console.log(currentCodeRunData)
				const response = await runCurrentProblem(currentCodeRunData);
				console.log(response)
				if (response?.data?.data) {
					dispatch(setCurrentTestCaseResults(response.data.data));
					toast.success("Code Run Successfully")
				} else {
					toast.error("Failed to ran the code")

				}
			}
		} catch (err) {
			console.log(err)
			toast.error(err.data.message || "Failed to ran the code")
		}

	};

	const handleCodeSubmit = async () => {
		if (currentCodeRunData) {

			const response = await submitCurrentProblem(currentCodeRunData)
			console.log(response)
			if (response?.data?.data) {
				dispatch(setCurrentTestCaseResults(response.data.data.testCases));
				dispatch(setActiveTab("submissions"))
			}
		}
	}

	return (
		<div className='flex gap-4'>
			<Button variant='secondary' onClick={handleCodeRun} disabled={isRunning || isSubmitting}>
				{isRunning ? (
					<> <Loader2 className=" animate-spin" /> Running</>
				) : (
					<>
						<Play className="ml-1" /> Run
					</>
				)}
			</Button>
			<Button onClick={handleCodeSubmit} variant='secondary' className='text-chart-2 bg-chart-2/15' disabled={isRunning || isSubmitting}>

				{isSubmitting ? (
					<> <Loader2 className=" animate-spin" /> Submitting</>
				) : (<>
					<CloudUploadIcon className='text-2xl' />
					Submit
				</>
				)

				}
			</Button>


		</div>
	);
};

export default CodeExecutor;
