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
	const {
		data: allProblemsFromApi,
		isLoading,
		isSuccess,
	} = useGetAllProblemsQuery();
	const allProblems = useSelector((state) => state.problem.allProblems);
	const currentUserId = useSelector((state) => state.auth.user?._id);
	const dispatch = useDispatch();

	const [search, setSearch] = useState("");
	const [difficultyFilter, setDifficultyFilter] = useState("ALL");
	const [selectedTags, setSelectedTags] = useState([]);
	const [solvedFilter, setSolvedFilter] = useState("ALL");
	const [currentPage, setCurrentPage] = useState(1);
	const problemsPerPage = 10;

	useEffect(() => {
		if (isSuccess && allProblemsFromApi?.success && allProblems.length === 0) {
			dispatch(setAllProblems(allProblemsFromApi.data));
		}
	}, [isSuccess, allProblemsFromApi, dispatch, allProblems.length]);

	const allTags = useMemo(() => {
		const tagSet = new Set();
		allProblems.forEach((problem) => {
			problem.tags.forEach((tag) => tagSet.add(tag));
		});
		return [...tagSet];
	}, [allProblems]);

	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
		setCurrentPage(1);
	};

	const filteredProblemsBasic = useMemo(() => {
		return allProblems.filter((problem) => {
			const matchSearch = problem.title
				.toLowerCase()
				.includes(search.toLowerCase());
			const matchDifficulty =
				difficultyFilter !== "ALL"
					? problem.difficulty === difficultyFilter
					: true;
			const matchTags =
				selectedTags.length > 0
					? selectedTags.every((tag) => problem.tags.includes(tag))
					: true;
			return matchSearch && matchDifficulty && matchTags;
		});
	}, [allProblems, search, difficultyFilter, selectedTags]);

	const filteredProblems = useMemo(() => {
		return filteredProblemsBasic.filter((problem) => {
			const isSolved = problem?.solvedBy?.includes(currentUserId);
			if (solvedFilter === "SOLVED") return isSolved;
			if (solvedFilter === "UNSOLVED") return !isSolved;
			return true;
		});
	}, [filteredProblemsBasic, solvedFilter, currentUserId]);

	const solvedCount = allProblems.filter((p) =>
		p.solvedBy?.includes(currentUserId)
	).length;

	const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

	const paginatedProblems = useMemo(() => {
		const start = (currentPage - 1) * problemsPerPage;
		return filteredProblems.slice(start, start + problemsPerPage);
	}, [filteredProblems, currentPage]);

	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			setCurrentPage(1);
		}
	}, [currentPage, totalPages]);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center gap-2 text-3xl font-bold min-h-screen'>
				<Loader2 className='animate-spin' /> Loading...
			</div>
		);
	}

	return (
		<div className='min-h-screen container px-3 py-10'>
			<div className='text-center mb-6'>
				<h1 className='text-4xl font-extrabold tracking-tight'>
					Explore DSA Problems
				</h1>
				<p className='text-muted-foreground mt-2 max-w-2xl mx-auto'>
					Challenge yourself with curated problems to master data structures and
					algorithms. Hone your skills and prepare for interviews.
				</p>
			</div>

			<div className='flex flex-col md:flex-row  items-center gap-4 mb-8 '>
				<Input
					placeholder='Search by title...'
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
						setCurrentPage(1);
					}}
					className='w-full '
				/>
                <div className=" w-full flex justify-between gap-3">

				<Select
					onValueChange={(val) => {
						setDifficultyFilter(val);
						setCurrentPage(1);
					}}
					defaultValue='ALL'
				>
					<SelectTrigger className="w-1/2">
						<SelectValue placeholder='Filter by Difficulty' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='ALL'>All</SelectItem>
						<SelectItem value='EASY'>Easy</SelectItem>
						<SelectItem value='MEDIUM'>Medium</SelectItem>
						<SelectItem value='HARD'>Hard</SelectItem>
					</SelectContent>
				</Select>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant='outline' className='w-1/2'>
							{selectedTags.length > 0
								? `Tags (${selectedTags.length})`
								: "Filter by Tags"}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-64'>
						<div className='flex gap-2 flex-wrap overflow-y-auto max-h-[20rem]'>
							{allTags.map((tag) => {
								const selected = selectedTags.includes(tag);
								return (
									<Badge
										key={tag}
										onClick={() => toggleTag(tag)}
										className={`cursor-pointer px-3 py-1 rounded-full text-sm ${
											selected
												? "bg-primary text-primary-foreground"
												: "bg-muted hover:bg-muted/80"
										}`}
									>
										{tag}
									</Badge>
								);
							})}
						</div>
					</PopoverContent>
				</Popover>
                </div>

			</div>

			<div className='mb-4 flex items-center justify-between flex-wrap '>
				<ToggleGroup
					type='single'
					value={solvedFilter}
					onValueChange={(val) => {
						setSolvedFilter(val || "ALL");
						setCurrentPage(1);
					}}
					className='gap-2 rounded-lg  w-60 '
				> 
					<ToggleGroupItem value='ALL'>All</ToggleGroupItem>
					<ToggleGroupItem value='SOLVED'>Solved</ToggleGroupItem>
					<ToggleGroupItem className="" value='UNSOLVED'>Unsolved</ToggleGroupItem>
				</ToggleGroup>
				<Badge className='bg-muted py-2.5 px-3'>
					Solved: <span className='text-chart-2'>{solvedCount}</span>/
					{allProblems?.length}
				</Badge>
			</div>

			<ProblemTable
				problems={paginatedProblems}
				currentUserId={currentUserId}
			/>

			{totalPages > 1 && (
				<Pagination className='mt-6 justify-center'>
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
