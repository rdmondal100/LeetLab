// import React from "react";
//    import { CheckCircle2, Clock, Database, AlertTriangle, XCircle, Copy, SplinePointer } from "lucide-react";
// import { Button } from "@/components/ui/button";

// export const AnalysisStatus = {
//   IDLE: "IDLE",
//   LOADING: "LOADING",
//   SUCCESS: "SUCCESS",
//   ERROR: "ERROR",
// };
 
// export const AIAnalysisModal  = ({ status, result, onClose }) => {
//   const getScoreColor = (score) => {
//     if (score >= 90) return "text-green-500";
//     if (score >= 70) return "text-yellow-500";
//     return "text-red-500";
//   };

//   if (status === AnalysisStatus.LOADING) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
//         <div className="relative">
//              <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
//              <SplinePointer /> 
//         </div>
//         <p className="text-lg font-medium animate-pulse text-muted-foreground">Gemini is analyzing your code...</p>
//         <div className="text-xs text-muted-foreground/60 max-w-md text-center">
//             Checking time complexity, space complexity, and edge cases.
//         </div>
//       </div>
//     );
//   }

//   if (status === AnalysisStatus.ERROR || !result) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 text-center p-6">
//         <XCircle className="w-12 h-12 text-destructive" />
//         <h3 className="text-xl font-bold">Analysis Failed</h3>
//         <p className="text-muted-foreground">Something went wrong while connecting to the AI service.</p>
//         <Button onClick={onClose} variant="secondary">Close</Button>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full max-h-[85vh]">
//         {/* Header */}
//       <div className="p-6 border-b border-border flex justify-between items-start bg-secondary/20">
//         <div>
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
//                 AI Code Review
//             </span>
//           </h2>
//           <p className="text-sm text-muted-foreground mt-1">Powered by Gemini 2.5 Flash</p>
//         </div>
//         <div className="flex flex-col items-end">
//             <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Score</span>
//             <div className={`text-4xl font-black ${getScoreColor(result.score)}`}>
//                 {result.score}<span className="text-lg text-muted-foreground font-normal">/100</span>
//             </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-8">
        
//         {/* Complexity Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 shadow-sm">
//                 <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
//                     <Clock className="w-6 h-6" />
//                 </div>
//                 <div>
//                     <h4 className="text-xs font-semibold uppercase text-muted-foreground">Time Complexity</h4>
//                     <p className="text-lg font-bold font-mono">{result.timeComplexity}</p>
//                 </div>
//             </div>
//             <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 shadow-sm">
//                  <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
//                     <Database className="w-6 h-6" />
//                 </div>
//                 <div>
//                     <h4 className="text-xs font-semibold uppercase text-muted-foreground">Space Complexity</h4>
//                     <p className="text-lg font-bold font-mono">{result.spaceComplexity}</p>
//                 </div>
//             </div>
//         </div>

//         {/* Critique Section */}
//         <div>
//             <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
//                 <AlertTriangle className="w-5 h-5 text-yellow-500" />
//                 Feedback & Suggestions
//             </h3>
//             <div className="bg-secondary/30 rounded-lg p-4 border border-border text-sm leading-relaxed whitespace-pre-line">
//                 {result.critique}
//             </div>
//         </div>

//         {/* Improved Code Section */}
//         <div>
//             <div className="flex justify-between items-center mb-3">
//                  <h3 className="text-lg font-semibold flex items-center gap-2">
//                     <CheckCircle2 className="w-5 h-5 text-green-500" />
//                     Optimized Solution
//                 </h3>
//                 <Button 
//                     variant="ghost" 
//                     size="sm" 
//                     className="h-8 text-xs gap-1"
//                     onClick={() => navigator.clipboard.writeText(result.improvedCode)}
//                 >
//                     <Copy className="w-3 h-3" /> Copy
//                 </Button>
//             </div>
           
//             <div className="relative group">
//                 <pre className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border/50 text-gray-300 shadow-inner">
//                     <code>{result.improvedCode}</code>
//                 </pre>
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// };


import React from "react";
import {
  CheckCircle2,
  Clock,
  Database,
  AlertTriangle,
  XCircle,
  Copy,
  SplinePointer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AnalysisStatus = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

export const AIAnalysisModal = ({ status, result, onClose }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    return "text-red-500";
  };
console.log(status)
console.log(result)
  if (status === AnalysisStatus.LOADING) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4 p-6">
        <div className="relative">
          <div className="absolute inset-0 bg-purple-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
          <SplinePointer className="w-12 h-12 text-purple-600 relative" />
        </div>
        <p className="text-lg font-medium animate-pulse text-muted-foreground">
          Ai is analyzing your code...
        </p>
        <div className="text-xs text-muted-foreground/60 max-w-md text-center">
          Checking time complexity, space complexity, and edge cases.
        </div>
      </div>
    );
  }

  if (status === AnalysisStatus.ERROR || !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[220px] space-y-4 text-center p-6">
        <XCircle className="w-12 h-12 text-destructive" />
        <h3 className="text-xl font-bold">Analysis Failed</h3>
        <p className="text-muted-foreground">
          Something went wrong while connecting to the AI service.
        </p>
        <Button onClick={onClose} variant="secondary">
          Close
        </Button>
      </div>
    );
  }

  // success view
  return (
    <div className="flex flex-col h-full max-h-[70vh]">
      {/* Header */}
      <div className="p-6 border-b border-border flex justify-between items-start bg-secondary/20">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              AI Code Review
            </span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">Powered riday</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Score</span>
          <div className={`text-4xl font-black ${getScoreColor(result.score)}`}>
            {result.score}
            <span className="text-lg text-muted-foreground font-normal">/100</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Complexity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">Time Complexity</h4>
              <p className="text-lg font-bold font-mono">{result.timeComplexity}</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 shadow-sm">
            <div className="p-3 bg-orange-500/10 rounded-full text-orange-500">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase text-muted-foreground">Space Complexity</h4>
              <p className="text-lg font-bold font-mono">{result.spaceComplexity}</p>
            </div>
          </div>
        </div>

        {/* Critique Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Feedback & Suggestions
          </h3>
          <div className="bg-secondary/30 rounded-lg p-4 border border-border text-sm leading-relaxed whitespace-pre-line">
            {result.critique}
          </div>
        </div>

        {/* Improved Code Section */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Optimized Solution
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs gap-1"
              onClick={() => {
                if (result?.improvedCode) {
                  navigator.clipboard.writeText(result.improvedCode);
                  // optionally notify
                }
              }}
            >
              <Copy className="w-3 h-3" /> Copy
            </Button>
          </div>

          <div className="relative group">
            <pre className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto text-sm font-mono border border-border/50 text-gray-300 shadow-inner">
              <code>{result.improvedCode}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
