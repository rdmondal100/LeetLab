import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, CircleCheckBig, Plus, Terminal, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentProblem } from "../redux-toolkit/features/problemSlice";

const ProblemTestCasesPanel = ({ currentProblem }) => {
  const [activeView, setActiveView] = useState("test-cases");
  const dispatch = useDispatch();
  const [testCases, setTestCases] = useState(currentProblem?.testcases || []);
  const [activeTab, setActiveTab] = useState("0");
const currentTestCaseResults = useSelector((state) => state.executeCode.currentTestCaseResults);

useEffect(() => {
  if (currentProblem?.testcases) {
    setTestCases(currentProblem.testcases);
  }
}, [currentProblem?.id]);
  
useEffect(() => {
  dispatch(setCurrentProblem({ ...currentProblem, testcases: testCases }));
}, [testCases, currentProblem?.id]);

useEffect(() => {
  if (currentTestCaseResults.length > 0) {
    setActiveView("results");
  }
}, [currentTestCaseResults]);


  console.log(currentProblem)
  const addTestCase = () => {
    setTestCases((prev) => {
      const newIndex = prev.length;
      setActiveTab(newIndex.toString());
      return [...prev, { input: "", output: "" }];
    });
  };

  const removeTestCase = (index) => {
    const updated = testCases.filter((_, i) => i !== index);
    setTestCases(updated);
    setActiveTab("0");
  };

const updateTestCase = (index, key, value) => {
  const updated = [...testCases];
  updated[index] = {              
    ...updated[index],             
    [key]: value                 
  };
  setTestCases(updated);
};

  return (
    <div className='flex-1 scrollbar scrollbar-thumb-muted-foreground scrollbar-track-accent overflow-y-auto pb-5 text-foreground'>
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
                <TabsTrigger className='w-14 hover:bg-muted border' value={index.toString()}>
                  Case {index + 1}
                </TabsTrigger>
                {index !== 0 && (
                  <button
                    className='absolute -top-3 -right-2 bg-muted text-foreground text-xs hover:bg-destructive rounded-full w-5 h-5 flex items-center justify-center'
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
              className='w-8 h-8 cursor-pointer p-2 hover:bg-muted rounded-full flex justify-center items-center'
              onClick={addTestCase}
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
                    onChange={(e) => updateTestCase(index, "input", e.target.value)}
                  />
                </div>
                <div>
                  <Label className='text-sm font-medium'>Expected Output:</Label>
                  <Textarea
                    className='w-full rounded border p-2'
                    value={tc.output}
                    onChange={(e) => updateTestCase(index, "output", e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      )}

{activeView === "results" && (
  <Tabs value={activeTab} onValueChange={setActiveTab} className='px-4'>
   <TabsList className='overflow-x-auto whitespace-nowrap flex items-center gap-8 bg-transparent min-h-16 py-5 h-auto flex-wrap'>
  {currentTestCaseResults.map((result, index) => (
    <TabsTrigger
      className='relative w-14 hover:bg-muted border'
      key={index}
      value={index.toString()}
    >
      Case {index + 1}
      
      {/* Flag Icon */}
      <span
        className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full ${
          result.passed ? "bg-chart-2" : "bg-destructive"
        }`}
      ></span>
    </TabsTrigger>
  ))}
</TabsList>


   {currentTestCaseResults.map((result, idx) => (
        <TabsContent key={idx} value={idx.toString()}>
          <div
            className={`  p-4 space-y-3 shadow-sm transition-all duration-300`}
          >
            <div className="flex items-center gap-2">
              {result.passed ? (
                <CheckCircle className="text-chart-2" size={20} />
              ) : (
                <XCircle className="text-destructive" size={20} />
              )}
              <h4 className={`font-semibold text-lg ${result.passed ? "text-chart-2" : "text-destructive"}`}>
                {result.passed ? "Accepted" : "Wrong Answer"}
              </h4>
            </div>

            <div className="text-sm space-y-1">
              <p>
                <span className="font-medium">Runtime:</span>{" "}
                <code className=" text-muted-foreground">{result.time || "0 ms"}</code>
              </p>
              <p className="font-medium">Input:</p>
              <pre className="bg-muted p-2 rounded text-xs overflow-auto whitespace-pre-wrap">
                  {currentProblem?.testcases?.[idx]?.input || "No Input"}

              </pre>
              <div className="flex flex-col gap-2">
                <span className="font-medium">Output:</span>{" "}
                <pre className={`bg-muted p-2 rounded text-xs overflow-auto whitespace-pre-wrap ${result.passed?("text-chart-2"):("text-destructive")}`}>{result.stdout || "undefined"}</pre>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-medium">Expected:</span>{" "}
                <pre  className="bg-muted text-chart-2 p-2 rounded text-xs overflow-auto whitespace-pre-wrap">{result.expected}</pre>
              </div>
              {result.stderr && (
                <div className="text-destructive mt-3">
                  <span className="font-medium">Error:</span>{" "}
                  <code>{result.stderr}</code>
                </div>
              )}
              <div className={`font-bold mt-3 ${result.passed ? "text-green-600" : "text-destructive"}`}>
 {result.passed ? (
  <span className="flex items-center gap-1">
      Test Case Passed <CheckCircle className="text-destructive" size={20} />
    </span>
  ) : (
    <span className="flex items-center gap-1">
      Test Case Failed <XCircle className="text-destructive" size={20} />
    </span>
  )}              </div>
            </div>
          </div>
        </TabsContent>
      ))}
  </Tabs>
)}

    </div>
  );
};

export default ProblemTestCasesPanel;
