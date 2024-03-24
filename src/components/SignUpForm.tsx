"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const SignUpForm = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

const handleSubmit = async (e:any) => {
  e.preventDefault();
  const url = "http://localhost:3000/api/userinfo";
  const method = "POST";
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      router.push("/login");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

  return (
    <div
      className="mx-auto mt-10 max-w-md rounded-md border border-gray-300 p-6 shadow-md"
      style={{ borderColor: "#C1C1C1" }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">
        Create your account
      </h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="mb-1 block font-semibold text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1 block font-semibold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-1 block font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="off"
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
          >
            Create Account
          </button>
        </div>
        <div className="mt-4 text-center">
          <p>
            Have An Account?{" "}
            <span className="login-title">
              <Link href="/login">LOGIN</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
