import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useNavigate } from "react-router-dom";
import { CheckCircle, Lock } from "lucide-react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

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
          {problems.length ? (problems.map((problem, idx) => {
            const isSolved = problem.solvedBy?.some(item => item?.userId === currentUserId);
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
                <TableCell>
                  <TagDisplay tags={problem.tags} />
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
          })) : (<TableRow className="bg-muted">
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












const TagDisplay = ({ tags }) => {
  const containerRef = useRef(null);
  const [visibleTags, setVisibleTags] = useState(tags);
  const [hiddenTags, setHiddenTags] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tagElements = Array.from(container.children);
    let totalWidth = 0;
    let visible = [];
    let hidden = [];

    for (let i = 0; i < tagElements.length; i++) {
      const tag = tagElements[i];
      const tagWidth = tag.offsetWidth + 4;
      if (totalWidth + tagWidth < container.offsetWidth) {
        totalWidth += tagWidth;
        visible.push(tags[i]);
      } else {
        hidden = tags.slice(i);
        break;
      }
    }

    setVisibleTags(visible);
    setHiddenTags(hidden);
  }, [tags]);

  return (
    <div className="flex gap-1 max-w-[200px] lg:max-w-[300px] flex-wrap " ref={containerRef}>
      {visibleTags.map((tag, idx) => (
        <span
          key={idx}
          className="text-xs bg-muted px-2 py-1 rounded-full whitespace-nowrap"
        >
          {tag}
        </span>
      ))}

      {hiddenTags.length > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground cursor-pointer">
              +{hiddenTags.length} more
            </span>
          </TooltipTrigger>
          <TooltipContent className="bg-background border text-sm rounded px-2 py-1 shadow max-w-[250px]">
            {hiddenTags.join(", ")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
