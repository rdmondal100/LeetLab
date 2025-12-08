import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProblemsQuery } from "../redux-toolkit/services/problemService";
import { setAllProblems } from "../redux-toolkit/features/problemSlice";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

import { Loader2 } from "lucide-react";
import ProblemTable from "../components/ProblemTable";

const ProblemsDisplayPage = () => {
  // ------------------------
  // FRONTEND FILTER STATES
  // ------------------------
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [selectedTags, setSelectedTags] = useState([]);
  const [solvedFilter, setSolvedFilter] = useState("ALL");

  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 10;

  // ------------------------
  // API CALL USING FILTERS
  // ------------------------
  const currentUserId = useSelector((state) => state.auth?.authUser?.id);

  const {
    data: dataFromAPi,
    isLoading,
    isSuccess,
  } = useGetAllProblemsQuery({
    page: currentPage,
    limit: problemsPerPage,
    search: search ? search : undefined,
    difficulty: difficultyFilter !== "ALL" ? difficultyFilter : undefined,
    tags: selectedTags.length > 0 ? selectedTags.join(",") : undefined,
   solved: solvedFilter,
    userId: currentUserId,
  });
  console.log(dataFromAPi);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.authUser);

  const allProblems = useSelector((state) => state.problem.allProblems) || [];

  useEffect(() => {
    if (isSuccess && dataFromAPi?.success) {
      dispatch(setAllProblems(dataFromAPi.data?.problems));
    }
  }, [isSuccess, dataFromAPi, dispatch]);

  const allTags = useMemo(() => {
    const tagSet = new Set();
    allProblems.forEach((p) => {
      p.tags.forEach((t) => tagSet.add(t));
    });
    return [...tagSet];
  }, [allProblems]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  // Backend provides paginated results, no need slice()
  const paginatedProblems = allProblems;

  const totalPages = dataFromAPi?.data?.totalPages || 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const solvedCount = dataFromAPi?.data?.solvedCount || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center gap-2 text-3xl font-bold min-h-screen">
        <Loader2 className="animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen container px-3 py-10">
      {/* HEADER */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Explore DSA Problems
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Challenge yourself with curated problems to master data structures and
          algorithms.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row max-w-5xl mx-auto items-center gap-4 mt-10 my-8">
        {/* SEARCH */}
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full"
        />

        <div className="w-full flex justify-between gap-3">
          {/* DIFFICULTY */}
          <Select
            onValueChange={(val) => {
              setDifficultyFilter(val);
              setCurrentPage(1);
            }}
            defaultValue="ALL"
          >
            <SelectTrigger className="w-1/2">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="EASY">Easy</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HARD">Hard</SelectItem>
            </SelectContent>
          </Select>

          {/* TAGS */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-1/2">
                {selectedTags.length > 0
                  ? `Tags (${selectedTags.length})`
                  : "Filter by Tags"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="flex gap-2 flex-wrap max-h-[20rem] overflow-y-auto">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-white"
                        : "bg-muted"
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* SOLVED FILTER */}
      <div className="mb-4 flex items-center justify-between flex-wrap">
        <ToggleGroup
          type="single"
          value={solvedFilter}
          onValueChange={(val) => {
            setSolvedFilter(val || "ALL");
            setCurrentPage(1);
          }}
          className="gap-2 rounded-lg w-60"
        >
          <ToggleGroupItem value="ALL">All</ToggleGroupItem>
          <ToggleGroupItem value="SOLVED">Solved</ToggleGroupItem>
          <ToggleGroupItem value="UNSOLVED">Unsolved</ToggleGroupItem>
        </ToggleGroup>

        <Badge className="bg-muted py-2.5 px-3 text-foreground">
          Solved: <span className="text-primary">{solvedCount}</span> /
          {dataFromAPi?.data?.totalCount}
        </Badge>
      </div>

      {/* PROBLEM TABLE */}
      <ProblemTable
        problems={paginatedProblems}
        currentUserId={currentUserId}
        isAdmin={authUser?.role === "ADMIN"}
      />

      {/* PAGINATION */}
      {totalPages > 1 && (
        <Pagination className="mt-6 justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ProblemsDisplayPage;
