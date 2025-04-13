import React from "react";

export default function Blog({
	title,
	user,
	coverImage,
	body,
	createdAt,
}) {
	return (
		<main className="p-6 space-y-4 w-3xl">
			<img
				className="aspect-[16/9] rounded-md"
				src={
					coverImage ||
					"https://images.unsplash.com/photo-1432821596592-e2c18b78144f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZyUyMGNvdmVyfGVufDB8fDB8fHww"
				}
			/>

			{/* Blog Title */}
			<h1 className="text-4xl font-bold leading-tight text-white">
				{title || "Finding Meaning in the Ordinary with a Magical Book"}
			</h1>

			{/* Author Section */}
			<div className="flex items-center gap-4">
				<img
					className="w-10 h-10 rounded-full"
					src={
						user?.avatar ||
						"https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg"
					}
					alt={user?.username || "Author"}
				/>
				<div>
					<p className="font-semibold text-white">
						{user?.firstName || "John"} {user?.lastName || "Doe"}
					</p>
					<p className="text-sm text-gray-400">
						{createdAt || "23 Oct 2004"}
					</p>
				</div>
			</div>

			<p className="w-full text-balance text-gray-300">
				{body ||
				`
                We often chase after the big, defining moments — the
				life-changing events, the bold decisions, the dreams we think
				will finally make everything fall into place. But meaning isn’t
				always found in the extraordinary. Sometimes, it’s in the
				ordinary routines: the morning sunlight through the window, the
				quiet sip of coffee before the world wakes up, the familiar
				sound of a loved one’s voice. These everyday moments, when we
				pause to notice them, hold a kind of magic we often overlook.

				As we grow, we begin to understand that fulfillment isn’t about
				constant excitement or dramatic changes. It’s about presence.
				It’s about being fully where you are, even when things aren’t
				perfect. Life is layered with subtle beauty — in silence, in
				simplicity, in repetition. The more we learn to embrace the
				present, the more we realize how much we've been missing by
				always waiting for what’s next.
				
				Eventually, we stop measuring our lives by how far we’ve gone
				and start appreciating how deeply we’ve lived. We begin to see
				that happiness isn't something we chase — it’s something we
				practice, in small, intentional ways. And when we do, even the
				most ordinary days can feel like something worth remembering.
                `}
			</p>
		</main>
	);
}
