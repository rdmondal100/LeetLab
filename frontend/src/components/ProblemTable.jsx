import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { useNavigate } from "react-router-dom";
  import { CheckCircle, Lock } from "lucide-react";
  
  const difficultyColor = {
    EASY: "text-green-600",
    MEDIUM: "text-orange-500",
    HARD: "text-red-600",
  };
  
  const ProblemTable = ({ problems, currentUserId }) => {
    const navigate = useNavigate();
  
    return (
      <div className="w-full overflow-x-auto rounded-lg border">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="bg-muted/40 text-sm">
              <TableHead className="w-12">#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.length? (problems.map((problem, idx) => {
              const isSolved = problem.solvedBy?.includes(currentUserId);
              return (
                <TableRow
                  key={problem?.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/problems/${problem?.id}`)}
                >
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell className="font-medium">{problem.title}</TableCell>
                  <TableCell className={difficultyColor[problem.difficulty]}>
                    {problem.difficulty}
                  </TableCell>
                  <TableCell className="space-x-2">
                    {problem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-muted px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell>
                    {isSolved ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle size={18} /> Solved
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Lock size={18} className="text-chart-3" /> Unsolved
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })):( <TableRow  className="bg-muted">
                <TableCell
                  colSpan={5} 
                  className="text-center text-lg text-muted-foreground font-medium py-10 "
                >
                  No problems found☹️
                </TableCell>
              </TableRow>
                )}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  export default ProblemTable;
  