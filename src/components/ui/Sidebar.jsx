import { BrainCircuit, Home, User, FileText, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
	const navItems = [
		{ icon: Home, label: "Home" },
		{ icon: FileText, label: "Posts" },
		{ icon: User, label: "Profile" },
	];

	return (
		<aside className="w-16 bg-black min-h-dvh flex flex-col justify-between items-center py-4 h-full shrink-0 overflow-hidden">
			<Link href={'/'} className="bg-gray-800 border border-gray-700 rounded p-2">
				<BrainCircuit className="w-6 h-6 text-indigo-300" />
			</Link>

			<nav className="flex flex-col gap-4 mt-10">
				{navItems.map((item, idx) => (
					<button
						key={idx}
						className="bg-gray-800 hover:bg-indigo-400 p-2 rounded transition-colors duration-300 cursor-pointer"
					>
						<item.icon className="w-5 h-5 text-gray-300" />
					</button>
				))}
			</nav>

			<button className="bg-gray-800 hover:bg-red-500 p-2 rounded transition-colors duration-300 mb-2 cursor-pointer">
				<LogOut className="w-5 h-5 text-gray-300"/>
			</button>
		</aside>
	);
}
