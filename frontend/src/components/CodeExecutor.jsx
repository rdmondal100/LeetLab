import React from "react";
import { Button } from "@/components/ui/button";
import { CloudUploadIcon, Loader, Loader2, Play } from "lucide-react";
import { useRunCurrentProblemMutation } from "../redux-toolkit/services/executeCodeService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTestCaseResults } from "../redux-toolkit/features/executeCodeSlice";

const CodeExecutor = () => {
  const [runCurrentProblem, { isLoading: isRunning }] = useRunCurrentProblemMutation();
  const currentCodeRunData = useSelector((state) => state.executeCode.currentCodeRunData);
 const dispatch = useDispatch()
  const handleCodeRun = async () => {
    if (currentCodeRunData) {
      const response = await runCurrentProblem(currentCodeRunData);
	  console.log(response)
      if (response?.data?.data) {
        dispatch(setCurrentTestCaseResults(response.data.data));
      }
    }
  };

  return (
    <div className='flex gap-4'>
      <Button variant='secondary' onClick={handleCodeRun} disabled={isRunning}>
        {isRunning ? (
         <> <Loader2 className=" animate-spin"/> Running</>
        ) : (
          <>
           <Play className="ml-1" /> Run 
          </>
        )}
      </Button>
      <Button variant='secondary' className='text-chart-2 bg-chart-2/15' disabled={isRunning}>
        <CloudUploadIcon className='text-2xl' />
        Submit
      </Button>
    </div>
  );
};

export default CodeExecutor;
