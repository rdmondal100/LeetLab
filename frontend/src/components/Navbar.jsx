import React, { Profiler } from "react";
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
import { UserCircle, Search, Code, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avater";
import { useSelector } from "react-redux";
import { avaterPlaceholder } from "../assets";
import LogoutButton from "./LogoutButton";
import { getAvatarFallBackName } from "../lib/utils";
import ThemeModeToggle from "./ThemeModeToggle";

const Navbar = () => {
	const authUser = useSelector((state) => state.auth?.authUser);
	console.log(authUser)
    return (
		<nav className='w-full container bg-background px-6 py-3 flex items-center justify-between '>
			<Link
				to='/'
				className='text-2xl font-extrabold tracking-tight text-primary flex items-center gap-1'
			>
				<span className='bg-primary text-foreground px-2 py-0.5 rounded-md shadow-sm'>
					DSA
				</span>
				<span className='text-muted-foreground'>Battle</span>
			</Link>

			<div className='hidden lg:flex gap-4 text-sm font-medium text-muted-foreground'>
				<Link  to="/problems" className='hover:text-primary'>
					Problems
				</Link>
				<Link  to="contests" className='hover:text-primary'>
					Contests
				</Link>
				<Link  to="discuss" className='hover:text-primary'>
					Discuss
				</Link>
				<Link  to="battle" className='hover:text-primary'>
					Battle
				</Link>
			</div>

			<div className='flex items-center gap-2'>
				<div className='relative'>
					<ThemeModeToggle/>
				</div>
				{
					authUser?
					(<DropdownMenu>
					<DropdownMenuTrigger
						className='ring-1 ring-border overflow-hidden'
						asChild
					>
						<Avatar className='w-10 h-10  cursor-pointer  '>
							<AvatarImage
								className='p-1 overflow-hidden '
								src={authUser?.image || avaterPlaceholder}
								alt={authUser?.name}
							/>
							<AvatarFallback className=' p-1 overflow-hidden'>
								{getAvatarFallBackName(authUser?.name)}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align='end'
						className='w-40 flex flex-col gap-1.5'
					>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='flex cursor-pointer items-center'>
							<UserCircle />
							Profile
						</DropdownMenuItem>
						{authUser?.role === "ADMIN" && (
							<DropdownMenuItem >
                                <Link className='flex cursor-pointer items-center gap-1.5 ' to="/add-problem">
                                <Code />
								Add Problem
                                </Link>
							</DropdownMenuItem>
						)}

						<DropdownMenuItem className='flex cursor-pointer  items-center p-0 '>
                            <LogoutButton>
                            <LogOut className="text-foreground" />
							Logout
                            </LogoutButton>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>)
					:
					(
						<Button>
							Register/Login
						</Button>
					)
				}
				


			</div>
		</nav>
	);
};

export default Navbar;
