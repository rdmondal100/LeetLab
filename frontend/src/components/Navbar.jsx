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
import { UserCircle, Search, } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avater";
import { useSelector } from "react-redux";
import { avaterPlaceholder } from "../assets";

const Navbar = () => {
    const authUser = useSelector((state)=>state.auth?.authUser?.data)
    console.log(authUser)
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
			<div className='hidden lg:flex gap-4 text-sm font-medium text-muted-foreground'>
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
			<div className='flex items-center gap-2'>
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
                    <Avatar className="cursor-pointer">
      <AvatarImage src={authUser?.image} alt={authUser?.name} />
      <AvatarFallback> <img src={avaterPlaceholder} alt={authUser?.name} /> </AvatarFallback>
    </Avatar>
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
