import type { ReactNode } from "react";
import {
	LayoutGridIcon,
	PackageIcon,
	PhoneIcon,
	VideoIcon,
	LayersIcon,
	BarChart3Icon,
} from "lucide-react";

export type SidebarNavItem = {
	title: string;
	path?: string;
	icon?: ReactNode;
	subItems?: SidebarNavItem[];
};

export type SidebarNavGroup = {
	label?: string;
	items: SidebarNavItem[];
};

export const navGroups: SidebarNavGroup[] = [
	{
		items: [
			{
				title: "Overview",
				path: "/dashboard",
				icon: <LayoutGridIcon />,
			},
			{
				title: "Analytics",
				path: "/dashboard/analytics",
				icon: <BarChart3Icon />,
			},
		],
	},
	{
		label: "Today",
		items: [
			{
				title: "Future equipment",
				path: "/dashboard/equipment",
				icon: <PackageIcon />,
			},
			{
				title: "AFS Foils Cards",
				path: "/dashboard/afs-foils",
				icon: <LayersIcon />,
			},
			{
				title: "Contacts",
				path: "/dashboard/contacts",
				icon: <PhoneIcon />,
			},
			{
				title: "Youtube Links",
				path: "/dashboard/youtube-links",
				icon: <VideoIcon />,
			},
		],
	},
];

export const footerNavLinks: SidebarNavItem[] = [];

export const navLinks: SidebarNavItem[] = [
	...navGroups.flatMap((group) =>
		group.items.flatMap((item) =>
			item.subItems?.length ? [item, ...item.subItems] : [item]
		)
	),
	...footerNavLinks,
];
