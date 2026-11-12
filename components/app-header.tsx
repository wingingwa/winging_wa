"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { AppBreadcrumbs } from "@/components/app-breadcrumbs";
import { CustomSidebarTrigger } from "@/components/custom-sidebar-trigger";
import { navLinks } from "@/components/app-shared";
import { NavUser } from "@/components/nav-user";
import { ExternalLinkIcon } from "lucide-react";

export function AppHeader({ pathname }: { pathname?: string }) {
	const activeItem = navLinks.find((item) => item.path === pathname);
	return (
		<header
			className={cn(
				"sticky top-0 z-50 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#343943] px-4 md:px-6 text-white"
			)}
		>
			<div className="flex items-center gap-3">
				<CustomSidebarTrigger />
				<Separator
					className="mr-2 h-4 data-[orientation=vertical]:self-center"
					orientation="vertical"
				/>
				<AppBreadcrumbs page={activeItem} />
			</div>
			<div className="flex items-center gap-3">
				<Link
					href="/"
					target="_blank"
					className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 transition-colors"
				>
					<ExternalLinkIcon className="size-3.5 text-slate-400" />
					<span>Public Site</span>
				</Link>
				<NavUser />
			</div>
		</header>
	);
}
