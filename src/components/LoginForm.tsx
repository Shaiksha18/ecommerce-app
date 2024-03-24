"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface USER {
  id: number;
  email: string;
  password: string;
  name: string;
}
const initialUserList: USER[] = [];
const LoginForm = () => {
  const [userList, setUserList] = useState<USER[]>(initialUserList);
  console.log(userList);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/userinfo");
      if (response.ok) {
        const userData = await response.json();
        setUserList(userData?.userDetails);
      } else {
        console.error("Failed to fetch userList");
      }
    } catch (error) {
      console.error("Error fetching userList:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleLogin = (event: any) => {
    event.preventDefault();
    const user = userList?.find((user) => user?.email === email);

    if (!user) {
      setError("Email not registered");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password");
      return;
    }
    if (user?.name && user?.email) {
      const queryString = `?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`;
      router.push(`/verify${queryString}`);
    } else {
      // Handle the case where the user object does not have a name property
      setError("User data incomplete");
    }
  };

  return (
    <div
      className="mx-auto mt-10 max-w-md rounded-md border border-gray-300 p-6 shadow-md"
      style={{ borderColor: "#C1C1C1", borderRadius: "0.5rem" }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Login</h2>
      <h2 className="text-1xl mb-4 text-center font-bold">
        Welcome back to ECOMMERCE
      </h2>
      <p className="mb-4 text-center">The next gen business marketplace</p>
      <form onSubmit={handleLogin}>
        <div className="relative mb-4">
          <label
            htmlFor="email"
            className="mb-1 block font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter"
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="relative mb-4">
          <label
            htmlFor="password"
            className="mb-1 block font-semibold text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 pr-12 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-0 top-0 px-3 py-2 underline "
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
          >
            LOGIN
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p>
          Don't have an Account?{" "}
          <span className="login-title">
            <Link href="/">SIGN UP</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
