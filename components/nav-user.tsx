"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
	Avatar,
	AvatarFallback,
} from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, LogOutIcon, ShieldCheckIcon } from "lucide-react";

export function NavUser() {
	const router = useRouter();
	const [email, setEmail] = useState("admin@wingingwa.com.au");

	useEffect(() => {
		fetch("/api/auth/me")
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => {
				if (data?.user?.email) {
					setEmail(data.user.email);
				}
			})
			.catch(() => {});
	}, []);

	const handleLogout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			router.push("/login");
			router.refresh();
		} catch {
			router.push("/login");
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				nativeButton={true}
				render={
					<button
						type="button"
						className="flex items-center gap-2.5 rounded-full p-1 pl-2 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all cursor-pointer"
					>
						<span className="hidden sm:inline text-xs font-semibold text-slate-200">
							Administrator
						</span>
						<Avatar className="size-8 border border-white/20 bg-[#ef0e0a] text-white shadow-sm">
							<AvatarFallback className="bg-[#ef0e0a] text-white font-bold text-xs">
								AD
							</AvatarFallback>
						</Avatar>
					</button>
				}
			/>
			<DropdownMenuContent
				align="end"
				style={{ backgroundColor: "#1E222A" }}
				className="w-64 !bg-[#1E222A] text-white border border-white/20 shadow-2xl p-2 rounded-xl backdrop-blur-none z-[100]"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel className="pointer-events-none flex items-center gap-2.5 p-2 bg-white/5 rounded-lg mb-1">
						<div className="flex size-8 items-center justify-center rounded-full bg-[#ef0e0a]/20 text-[#ef0e0a] shrink-0">
							<ShieldCheckIcon className="size-4" />
						</div>
						<div className="min-w-0">
							<span className="font-semibold text-white text-xs block">Administrator</span>
							<div className="max-w-[170px] overflow-hidden text-ellipsis whitespace-nowrap text-slate-400 text-[11px]">
								{email}
							</div>
						</div>
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-white/10 my-1" />
				<DropdownMenuGroup>
					<DropdownMenuItem className="cursor-pointer hover:bg-white/10 hover:text-white rounded-lg p-0">
						<Link href="/" target="_blank" className="flex items-center gap-2.5 w-full px-2.5 py-2 text-xs font-medium text-slate-200 hover:text-white">
							<ExternalLinkIcon className="size-4 text-slate-400" />
							<span>View Public Website</span>
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="bg-white/10 my-1" />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={handleLogout}
						variant="destructive"
						className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg px-2.5 py-2 text-xs font-semibold flex items-center gap-2"
					>
						<LogOutIcon className="size-4" />
						<span>Log Out</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
