
import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";


const ProblemDescriptionPanel = () => {
  return (
        	<div className='h-full scrollbar scrollbar-thumb-muted-foreground scrollbar-track-accent  scroll overflow-y-auto text-foreground'>
			<Tabs defaultValue='description' className='w-full px-0'>
				<TabsList className='mb-4 bg-muted rounded-none h-11 w-full'>
					<TabsTrigger value='description'>Description</TabsTrigger>
					<TabsTrigger value='submissions'>Submissions</TabsTrigger>
					<TabsTrigger value='solutions'>Solutions</TabsTrigger>
				</TabsList>
				<TabsContent value='description'>
					<Card className='bg-card p-3 border-none shadow-none'>
						<h1 className='text-2xl font-bold mb-2'>1. Two Sum</h1>
						<div className='flex gap-2 text-sm mb-4'>
							<span className='text-green-600 font-semibold'>Easy</span>
							<span className='text-muted-foreground'>Array</span>
							<span className='text-muted-foreground'>Hash Table</span>
						</div>
						<CardContent className='text-sm p-4 space-y-4'>
							<p>
								Given an array of integers <code>nums</code> and an integer{" "}
								<code>target</code>, return indices of the two numbers such that
								they add up to <code>target</code>.
							</p>
							<p>
								You may assume that each input would have exactly one solution,
								and you may not use the same element twice.
							</p>
							<p>You can return the answer in any order.</p>

							<div>
								<p className='font-semibold'>Example 1:</p>
								<pre className='bg-muted p-3 rounded text-xs'>
									Input: nums = [2,7,11,15], target = 9{"\n"}Output: [0,1]
								</pre>
							</div>

							<div>
								<p className='font-semibold'>Constraints:</p>
								<ul className='list-disc list-inside'>
									<li>2 ≤ nums.length ≤ 10⁴</li>
									<li>-10⁹ ≤ nums[i] ≤ 10⁹</li>
									<li>-10⁹ ≤ target ≤ 10⁹</li>
									<li>Only one valid answer exists.</li>
								</ul>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='submissions'>
					<Card>
						<CardContent className='text-sm p-4 text-muted-foreground'>
							Submissions will appear here.
						</CardContent>
					</Card>
				</TabsContent>
				<TabsContent value='solutions'>
					<Card>
						<CardContent className='text-sm p-4 text-muted-foreground'>
							Community solutions will be displayed here.
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
  )
}

export default ProblemDescriptionPanel