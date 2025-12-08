// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog } from "@/components/ui/dialog";
// import { CloudUploadIcon, Loader, Loader2, Play, Sparkles } from "lucide-react";
// import {
//   useRunCurrentProblemMutation,
//   useSubmitCurrentProblemMutation,
// } from "../redux-toolkit/services/executeCodeService";
// import { useDispatch, useSelector } from "react-redux";
// import { setCurrentTestCaseResults } from "../redux-toolkit/features/executeCodeSlice";
// import { toast } from "sonner";
// import { setActiveTab } from "../redux-toolkit/features/problemSlice";
// import { AIAnalysisModal } from "./AIAnalysisModal";

// export const AnalysisStatus = {
//   IDLE: "IDLE",
//   LOADING: "LOADING",
//   SUCCESS: "SUCCESS",
//   ERROR: "ERROR",
// };

// const CodeExecutor = () => {
//   const [runCurrentProblem, { isLoading: isRunning }] =
//     useRunCurrentProblemMutation();
//   const [submitCurrentProblem, { isLoading: isSubmitting }] =
//     useSubmitCurrentProblemMutation();
//   const [status, setStatus] = useState(AnalysisStatus.IDLE);
//   const [result, setResult] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const currentCodeRunData = useSelector(
//     (state) => state.executeCode.currentCodeRunData
//   );

//   const dispatch = useDispatch();

//   const handleAIAnalysis = async () => {
//     if (!currentCodeRunData) return;

//     setStatus(AnalysisStatus.LOADING);
//     setIsModalOpen(true);

//     try {
//       const analysis = await analyzeSubmission(
//         currentProblem.description,
//         userCode
//       );
//       setResult(analysis);
//       setStatus(AnalysisStatus.SUCCESS);
//     } catch (error) {
//       console.error(error);
//       setStatus(AnalysisStatus.ERROR);
//     }
//   };

//   const handleCodeRun = async () => {
//     try {
//       if (currentCodeRunData) {
//         console.log(currentCodeRunData);
//         const response = await runCurrentProblem(currentCodeRunData);
//         console.log(response);
//         if (response?.data?.data) {
//           dispatch(setCurrentTestCaseResults(response.data.data));
//           toast.success("Code Run Successfully");
//         } else {
//           toast.error("Failed to ran the code");
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       toast.error(err.data.message || "Failed to ran the code");
//     }
//   };

//   const handleCodeSubmit = async () => {
//     if (currentCodeRunData) {
//       const response = await submitCurrentProblem(currentCodeRunData);
//       console.log(response);
//       if (response?.data?.data) {
//         dispatch(setCurrentTestCaseResults(response.data.data.testCases));
//         dispatch(setActiveTab("submissions"));
//       }
//     }
//   };

//   return (
//     <div className="flex gap-4">
//       <Button
//         className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none"
//         onClick={handleAIAnalysis}
//         disabled={status === AnalysisStatus.LOADING}
//       >
//         {status === AnalysisStatus.LOADING ? (
//           <Spinner />
//         ) : (
//           <Sparkles className="w-4 h-4" />
//         )}
//         AI Analyze
//       </Button>

//       <Button
//         variant="secondary"
//         onClick={handleCodeRun}
//         disabled={isRunning || isSubmitting}
//       >
//         {isRunning ? (
//           <>
//             {" "}
//             <Loader2 className=" animate-spin" /> Running
//           </>
//         ) : (
//           <>
//             <Play className="ml-1" /> Run
//           </>
//         )}
//       </Button>
//       <Button
//         onClick={handleCodeSubmit}
//         variant="secondary"
//         className="text-chart-2 bg-chart-2/15"
//         disabled={isRunning || isSubmitting}
//       >
//         {isSubmitting ? (
//           <>
//             {" "}
//             <Loader2 className=" animate-spin" /> Submitting
//           </>
//         ) : (
//           <>
//             <CloudUploadIcon className="text-2xl" />
//             Submit
//           </>
//         )}
//       </Button>

//       <Button open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <AIAnalysisModal
//           status={status}
//           result={result}
//           onClose={() => setIsModalOpen(false)}
//         />
//       </Button>
//     </div>
//   );
// };

// export default CodeExecutor;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CloudUploadIcon, Loader2, Play, Sparkles } from "lucide-react";
import {
  useRunCurrentProblemMutation,
  useSubmitCurrentProblemMutation,
} from "../redux-toolkit/services/executeCodeService";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTestCaseResults } from "../redux-toolkit/features/executeCodeSlice";
import { toast } from "sonner";
import { setActiveTab } from "../redux-toolkit/features/problemSlice";
import { AIAnalysisModal } from "./AIAnalysisModal";
import { useAiAnalysisDataMutation } from "../redux-toolkit/services/aiAnalyzerService";
// import { analyzeSubmission } from "./analyzeSubmission";

// Local analysis statuses (kept here so component is self-contained)
export const AnalysisStatus = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

// small Spinner fallback (you referenced Spinner before)
const Spinner = () => <Loader2 className="w-4 h-4 animate-spin" />;

const CodeExecutor = () => {
  const [runCurrentProblem, { isLoading: isRunning }] =
    useRunCurrentProblemMutation();
  const [submitCurrentProblem, { isLoading: isSubmitting }] =
    useSubmitCurrentProblemMutation();
  const [getAiAnalysisData, { isLoading: isAnalyzing }] =
    useAiAnalysisDataMutation();

  const [status, setStatus] = useState(AnalysisStatus.IDLE);
  const [result, setResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // NOTE: make sure currentCodeRunData shape matches below usage:
  // { code: string, description: string, language: string, ... }
  const currentCodeRunData = useSelector(
    (state) => state.executeCode.currentCodeRunData
  );
console.log(currentCodeRunData)
	const currentProblem = useSelector((state)=>state.problem.currentProblem)
     console.log(currentProblem)
	 const currentProblemDescription =JSON.stringify(currentProblem?.description)
	 const currentProblemExamples = JSON.stringify(currentProblem?.examples)
  const dispatch = useDispatch();

  // Run AI analysis
 const handleAIAnalysis = async () => {
  if (!currentCodeRunData) {
    toast.error("No code/problem selected to analyze.");
    return;
  }

 

  const userCode = currentCodeRunData?.source_code || "";

  if (!userCode) {
    toast.error("No user code available to analyze.");
    return;
  }

  setStatus(AnalysisStatus.LOADING);
  setIsModalOpen(true);

  try {
    const analysisResponse = await getAiAnalysisData({
     currentProblemDescription,
	 currentProblemExamples,
      userCode,
    }).unwrap();
	console.log(analysisResponse)

    setResult(analysisResponse?.result); // result from backend
    setStatus(AnalysisStatus.SUCCESS);
  } catch (error) {
    console.error(error);
    toast.error("AI Analysis failed");
    setStatus(AnalysisStatus.ERROR);
  }
};


  // Run (execute) code on backend
  const handleCodeRun = async () => {
    try {
      if (!currentCodeRunData) {
        toast.error("No code to run.");
        return;
      }

      const response = await runCurrentProblem(currentCodeRunData);
      // RTK Query returns a "data" wrapper or rejects. Try both.
      const payload = response?.data ?? response;

      if (payload?.data) {
        // if backend returned { data: ... }
        dispatch(setCurrentTestCaseResults(payload.data));
        toast.success("Code run successfully");
      } else if (payload?.testCases || payload?.results) {
        // handle different shapes
        dispatch(
          setCurrentTestCaseResults(payload.testCases || payload.results)
        );
        toast.success("Code run successfully");
      } else {
        console.warn("Unexpected run response:", response);
        toast.error("Code run returned unexpected response.");
      }
    } catch (err) {
      console.log(err);
      const message =
        err?.data?.message || err?.error || "Failed to run the code";
      toast.error(message);
    }
  };

  // Submit solution (finalize)
  const handleCodeSubmit = async () => {
    if (!currentCodeRunData) {
      toast.error("No code to submit.");
      return;
    }
    try {
      const response = await submitCurrentProblem(currentCodeRunData);
      const payload = response?.data ?? response;
      if (payload?.data) {
        // assume payload.data.testCases
        dispatch(
          setCurrentTestCaseResults(payload.data.testCases || payload.data)
        );
        dispatch(setActiveTab("submissions"));
        toast.success("Submission successful");
      } else if (payload?.testCases) {
        dispatch(setCurrentTestCaseResults(payload.testCases));
        dispatch(setActiveTab("submissions"));
        toast.success("Submission successful");
      } else {
        toast.success("Submission request sent (no test cases returned).");
      }
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err?.data?.message || "Failed to submit the code");
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none"
        onClick={handleAIAnalysis}
        disabled={status === AnalysisStatus.LOADING}
      >
        {status === AnalysisStatus.LOADING ? (
          <Spinner />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        AI Analyze
      </Button>

      <Button
        variant="secondary"
        onClick={handleCodeRun}
        disabled={isRunning || isSubmitting}
      >
        {isRunning ? (
          <>
            <Loader2 className=" animate-spin mr-2" /> Running
          </>
        ) : (
          <>
            <Play className="ml-1 mr-2" /> Run
          </>
        )}
      </Button>

      <Button
        onClick={handleCodeSubmit}
        variant="secondary"
        className="text-chart-2 bg-chart-2/15"
        disabled={isRunning || isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className=" animate-spin mr-2" /> Submitting
          </>
        ) : (
          <>
            <CloudUploadIcon className="text-2xl mr-2" />
            Submit
          </>
        )}
      </Button>

      {/* Simple modal wrapper */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setIsModalOpen(false);
              setStatus(AnalysisStatus.IDLE);
            }}
          />
          <div className="relative z-10 w-full max-w-4xl bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-3 border-b border-border">
              <h3 className="text-lg font-semibold">AI Analysis</h3>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsModalOpen(false);
                  setStatus(AnalysisStatus.IDLE);
                }}
                size="sm"
              >
                Close
              </Button>
            </div>

            <div className="p-0">
              <AIAnalysisModal
                status={status}
                result={result}
                onClose={() => {
                  setIsModalOpen(false);
                  setStatus(AnalysisStatus.IDLE);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeExecutor;
