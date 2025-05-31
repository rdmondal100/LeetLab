import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const ProblemDescriptionPanel = ({ currentProblem }) => {
  const renderExamples = () => {
    if (!currentProblem?.examples) return null;
	console.log(currentProblem?.examples)
    return currentProblem?.examples?.map(( example, idx) => (
      <div key={idx}>
        <p className="font-semibold py-2">Example - {idx}:</p>
        <pre className="bg-muted p-3 rounded text-xs whitespace-pre-wrap">
          Input: {example.input}{"\n"}
          Output: {example.output}
          {example.explanation ? `\nExplanation: ${example.explanation}` : ""}
        </pre>
      </div>
    ));
  };

  const renderConstraints = () => {
    if (!currentProblem?.constraints) return null;

    const constraintsList = currentProblem.constraints.split(/[\n.]+/).filter(Boolean);

    return (
      <div>
        <p className="font-semibold">Constraints:</p>
        <ul className="list-disc list-inside text-sm">
          {constraintsList.map((constraint, idx) => (
            <li key={idx}>{constraint.trim()}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="h-full scrollbar scrollbar-thumb-muted-foreground scrollbar-track-accent scroll overflow-y-auto text-foreground">
      <Tabs defaultValue="description" className="w-full px-0">
        <TabsList className="mb-4 bg-muted rounded-none h-11 w-full">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="submissions">Submissions</TabsTrigger>
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <Card className="bg-card p-3 border-none shadow-none">
            <h1 className="text-2xl font-bold mb-2">{currentProblem?.title}</h1>
            <div className="flex gap-2 text-sm mb-4 flex-wrap">
              <span className="text-green-600 font-semibold">{currentProblem?.difficulty}</span>
              {currentProblem?.tags?.map((tag, idx) => (
                <span key={idx} className="text-muted-foreground">{tag}</span>
              ))}
            </div>

            <CardContent className="text-sm p-4 space-y-6">
              <div>{currentProblem?.description}</div>

              {renderExamples()}
              {renderConstraints()}

              {currentProblem?.hints && (
                <div>
                  <p className="font-semibold">Hint:</p>
                  <p className="text-muted-foreground">{currentProblem.hints}</p>
                </div>
              )}

              {currentProblem?.editorial && (
                <div>
                  <p className="font-semibold">Editorial:</p>
                  <p className="text-muted-foreground">{currentProblem.editorial}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardContent className="text-sm p-4 text-muted-foreground">
              Submissions will appear here.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solutions">
          <Card>
            <CardContent className="text-sm p-4 text-muted-foreground">
              Community solutions will be displayed here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProblemDescriptionPanel;
