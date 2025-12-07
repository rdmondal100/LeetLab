import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { ChevronDown } from "lucide-react";
import { Editor } from "@monaco-editor/react";

export default function SubmissionList({ submissions }) {
  const sortedSubs = [...submissions].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <ScrollArea className="w-full max-h-[85vh] ">
      <div className="space-y-4 pb-10">
        {sortedSubs.map((sub, idx) => {
          const accepted = sub.status === "Accepted";
          return (
            <Collapsible key={sub.id} className="w-full">
               <div className="overflow-x-auto max-w-full">
              <Card className="border rounded-2xl shadow-md cursor-pointer px-3">
                <CollapsibleTrigger asChild>
                  <div className="w-full  flex  gap-8 items-start text-left  transition-colors rounded-t-2xl">
                    <div className="flex items-start gap-4">
                      <ChevronDown className="h-5 w-5 mt-1 text-muted-foreground transition-transform duration-200 data-[state=open]:rotate-180" />
                      <div className="space-y-1 w-[150px]">
                          <p className="text-sm font-mono text-muted-foreground">#{sortedSubs.length - idx}</p>
                          <Badge className={accepted ? "bg-chart-2" : "bg-destructive"}>
                            {sub.status}
                          </Badge>
                        <p className="text-xs text-muted-foreground">{formatTimeAgo(sub.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-start gap-4 text-sm text-muted-foreground font-mono">
                      <div className="flex flex-col">
                        <span className="font-semibold text-[.8rem] ">Language</span>
                        <small>{sub.language || "-"}</small>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[.8rem] ">Time</span>
                        <small>{displayAverage(sub.time, "s")}</small>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[.8rem] ">Space</span>
                        <small>{displayAverage(sub.memory, "MB")}</small>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="bg-muted/20 px-6 py-5 rounded-b-2xl space-y-5">
                  <Separator />
                  <Detail title="Input" content={sub.stdin?.trim() || "-"} />
                  <Detail title="Output" content={arrayToString(sub.stdout) || "-"} />
                  <Detail title="Error"  content={arrayToString(sub.stderr) || "-"} isError />
                  <Detail title="Source Code" content={sub.sourceCode || "-"} code maxHeight={300} />
                </CollapsibleContent>
              </Card>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </ScrollArea>
  );
}

function Detail({ title, content, isError = false, code = false, maxHeight = 150 }) {
  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
        {title}
      </p>

      {code ? (
        <div className="rounded-md overflow-hidden ring-1 ring-border" style={{ maxHeight }}>
          <Editor
            height={maxHeight}
            defaultLanguage="javascript"
            value={content}
            theme='vs-dark'

            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              fontSize: 13,
            }}
          />
        </div>
      ) : (
        <pre
          className="bg-background text-sm p-4 rounded-md whitespace-pre-wrap scrollbar scrollbar-thumb-muted-foreground scrollbar-track-accent scroll  overflow-auto ring-1 ring-border"
          style={{ maxHeight }}
        >
          <span className={isError ? "text-destructive" : "text-foreground"}>
            {content}
          </span>
        </pre>
      )}
    </div>
  );
}

// Helpers
function arrayToString(data) {
  return Array.isArray(data) ? data.join("\n") : data;
}

function displayAverage(val, unit) {
  if (typeof val === "string" && val.startsWith("[")) {
    try {
      val = JSON.parse(val);
    } catch {
      return "-";
    }
  }

  if (Array.isArray(val)) {
    const nums = val
      .map((item) =>
        typeof item === "string"
          ? parseFloat(item.match(/[\d.]+/)?.[0]) || NaN
          : typeof item === "number"
          ? item
          : NaN
      )
      .filter((n) => !isNaN(n));

    if (nums.length) {
      let avg = nums.reduce((a, b) => a + b, 0) / nums.length;
      if (unit === "MB") avg /= 1024;
      return `${avg.toFixed(2)} ${unit}`;
    }
  }

  return val ? `${val} ${unit}` : "-";
}

function formatTimeAgo(isoDate) {
  const now = new Date();
  const past = new Date(isoDate);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}
