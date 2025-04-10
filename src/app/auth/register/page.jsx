"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CREATE_ACCOUNT } from "@/lib/appwrite/auth";
import { useRouter } from "next/navigation";

export default function Register() {
	// Form state
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		username: "",
		password: "",
	});

	// State for errors and loading
	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter()

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error for the field being edited
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	// Form validation
	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		} else if (formData.name.length < 2) {
			newErrors.name = "Name must be at least 2 characters";
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.username.trim()) {
			newErrors.username = "Username is required";
		} else if (formData.username.length < 3) {
			newErrors.username = "Username must be at least 3 characters";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		try {
			const response = await CREATE_ACCOUNT(formData)

			if(response) {
				return router.push('/auth/login')
			}

		} catch (error) {
			console.error("Error:", error);
			setErrors((prev) => ({
				...prev,
				submit: "Registration failed. Please try again.",
			}));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md bg-white p-4">
			<h3 className="text-lg font-extrabold text-gray-900">
				Create Account
			</h3>
			<p className="text-xs text-gray-600 pt-1">
				Welcome User !! Start your blogging journey
			</p>
			<p className="text-xs text-gray-500 pt-1">
				Join our community and share your stories with the world
			</p>

			<form className="pt-8 space-y-4" onSubmit={handleSubmit}>
				<div>
					<input
						className={`w-full border-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 outline-none transition-all duration-300 focus:border-gray-600 focus:bg-white placeholder-gray-400 ${
							errors.name ? "border-red-500" : "border-gray-300"
						}`}
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Name"
					/>
					{errors.name && (
						<p className="text-xs text-red-500 mt-1">
							{errors.name}
						</p>
					)}
				</div>

				<div>
					<input
						className={`w-full border-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 outline-none transition-all duration-300 focus:border-gray-600 focus:bg-white placeholder-gray-400 ${
							errors.email ? "border-red-500" : "border-gray-300"
						}`}
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						placeholder="Email Address"
					/>
					{errors.email && (
						<p className="text-xs text-red-500 mt-1">
							{errors.email}
						</p>
					)}
				</div>

				<div>
					<input
						className={`w-full border-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 outline-none transition-all duration-300 focus:border-gray-600 focus:bg-white placeholder-gray-400 ${
							errors.username
								? "border-red-500"
								: "border-gray-300"
						}`}
						type="text"
						name="username"
						value={formData.username}
						onChange={handleChange}
						placeholder="Username"
					/>
					{errors.username && (
						<p className="text-xs text-red-500 mt-1">
							{errors.username}
						</p>
					)}
				</div>

				<div>
					<input
						className={`w-full border-2 px-4 py-2 text-sm text-gray-700 bg-gray-50 outline-none transition-all duration-300 focus:border-gray-600 focus:bg-white placeholder-gray-400 ${
							errors.password
								? "border-red-500"
								: "border-gray-300"
						}`}
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Password"
					/>
					{errors.password && (
						<p className="text-xs text-red-500 mt-1">
							{errors.password}
						</p>
					)}
				</div>

				{errors.submit && (
					<p className="text-xs text-red-500 text-center">
						{errors.submit}
					</p>
				)}

				<button
					className="w-full bg-gray-900 text-white text-sm font-medium px-4 py-2 border-2 border-gray-900 transition-all duration-300 hover:bg-gray-800 hover:border-gray-800 active:bg-gray-700 disabled:bg-gray-500 disabled:border-gray-500 disabled:cursor-not-allowed"
					type="submit"
					disabled={isLoading}
				>
					{isLoading ? "Registering..." : "Register"}
				</button>
			</form>

			<p className="text-xs text-gray-600 pt-4">
				Already have an account?{" "}
				<Link
					className="font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300"
					href="/auth/login"
				>
					Login Account
				</Link>
			</p>
		</div>
	);
}
