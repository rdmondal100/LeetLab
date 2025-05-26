import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { UserCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className='w-full container bg-background px-6 py-3 flex items-center justify-between '>
			{/* Left: Logo */}
			<Link
				to='/'
				className='text-2xl font-extrabold tracking-tight text-primary flex items-center gap-1'
			>
				<span className='bg-primary text-foreground px-2 py-0.5 rounded-md shadow-sm'>
					DSA
				</span>
				<span className='text-muted-foreground'>Battle</span>
			</Link>

			{/* Center: Menu */}
			<div className='hidden md:flex gap-4 text-sm font-medium text-muted-foreground'>
				<Button variant='ghost' className='hover:text-primary'>
					Problems
				</Button>
				<Button variant='ghost' className='hover:text-primary'>
					Contests
				</Button>
				<Button variant='ghost' className='hover:text-primary'>
					Discuss
				</Button>
				<Button variant='ghost' className='hover:text-primary'>
					Battle
				</Button>
			</div>

			{/* Right: Search + Profile */}
			<div className='flex items-center gap-4'>
				<div className='relative'>
					<Input
						type='text'
						placeholder='Search...'
						className='pl-8 w-40 md:w-64 bg-muted text-foreground placeholder:text-muted-foreground'
					/>
					<Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='p-0 hover:bg-transparent'>
							<UserCircle className='h-6 w-6 text-muted-foreground hover:text-primary transition' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-40'>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Logout</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export default Navbar;
