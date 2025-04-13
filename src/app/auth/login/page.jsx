"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LOGIN_ACCOUNT } from "@/lib/appwrite/auth";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		try {
			const response = await LOGIN_ACCOUNT(formData);
			console.log(response);

			if (response) {
				return router.push("/");
			}
		} catch (error) {
			console.error("Error:", error);
			setErrors((prev) => ({
				...prev,
				submit: "Login failed. Please check your credentials and try again.",
			}));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-md bg-white p-4">
			<h3 className="text-lg font-extrabold text-gray-900">
				Login Account
			</h3>
			<p className="text-xs text-gray-600 pt-1">
				Welcome Back !! Continue your blogging journey
			</p>
			<p className="text-xs text-gray-500 pt-1">
				Sign in to access your posts and connect with the community
			</p>

			<form className="pt-8 space-y-4" onSubmit={handleSubmit}>
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
					{isLoading ? "Logging in..." : "Login"}
				</button>
			</form>

			<p className="text-xs text-gray-600 pt-4">
				New User?{" "}
				<Link
					className="font-bold text-gray-900 hover:text-gray-700 transition-colors duration-300"
					href="/auth/register"
				>
					Create Account
				</Link>
			</p>
		</div>
	);
}
