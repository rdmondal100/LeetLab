
import { CheckCircle, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";  

const difficultyColor = {
  EASY: "bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-600 dark:text-emerald-400  ring-emerald-500/20",
  MEDIUM: "bg-gradient-to-r from-amber-500/10 to-yellow-500/10 text-amber-600 dark:text-amber-400  ring-amber-500/20",
  HARD: "bg-gradient-to-r from-rose-500/10 to-red-500/10 text-rose-600 dark:text-rose-400  ring-rose-500/20",
};

const ProblemCardList = ({ problems, currentUserId, isAdmin }) => {
  const navigate = useNavigate();
  console.log(problems)

  problems.map(problem=>{
    problem.solvedBy?.some((item)=>{
            console.log(item)
            console.log(currentUserId)
          });
  })


  if (!problems.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p className="text-lg font-medium">No problems found ☹️</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 container">
      {problems.map((problem, index) => {
        const isSolved = problem.solvedBy?.some(item => item?.userId === currentUserId);
         return (
          <div
            key={problem.id}
            onClick={() => navigate(`/problems/${problem.id}`)}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition cursor-pointer bg-background group"
          >
            <div className="flex items-center justify-between mb-3">
            <div className="flex justify-start gap-3 items-center ">
              <span className="text-sm text-muted-foreground font-medium">#{index + 1}</span>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full border font-semibold",
                difficultyColor[problem.difficulty]
              )}>
                {problem.difficulty}
              </span>
            </div>

            
            <div className="flex items-start gap-2 text-sm">
              {isSolved ? (
                <span className="flex items-center text-primary font-medium gap-1">
                  <CheckCircle size={16} /> Solved
                </span>
              ) : (
                <span className="flex items-center gap-1 text-chart-3">
                  <Lock size={16} /> Unsolved
                </span>
              )}
            </div>
            </div>
            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition">
              {problem.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
  {problem.description}
</p>

            <TagDisplay tags={problem.tags} />
          </div>
        );
      })}
    </div>
  );
};

export default ProblemCardList;



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
    <div
      ref={containerRef}
      className="flex gap-1 max-w-full flex-wrap"
    >
      {visibleTags.map((tag, idx) => (
        <span
          key={idx}
          className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground whitespace-nowrap"
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
          <TooltipContent className="bg-muted text-muted-foreground border text-sm rounded px-2 py-1 shadow max-w-[250px]">
            {hiddenTags.join(", ")}
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
};
