"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const VerifyEmailForm = () => {
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRefs = Array.from({ length: 8 }, () =>
    useRef<HTMLInputElement>(null),
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = e.target;
    // Check if the entered value is 0 or 9
    if (value === "0" || value === "9") {
      setError("Invalid input. Please enter a digit between 1 and 8.");
    } else {
      setError("");
      // Automatically shift focus to the next input field
      if (index < inputRefs.length - 1 && value !== "") {
        inputRefs[index + 1]?.current?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0 && !e.currentTarget.value) {
      // If Backspace is pressed and the input field is empty, navigate to the previous input
      inputRefs[index - 1]?.current?.focus();
    }
  };
  const maskEmail = (email: string): string => {
    const [name, domain] = email.split("@");
    const maskedName = `${name?.slice(0, -2)}***`;
    return `${maskedName}@${domain}`;
  };
  const handleVerify = () => {
    setIsSubmitted(true);
    // Check for errors
    const hasError = inputRefs.some((ref, index) => {
      const value = ref.current?.value;
      // Check if the input is empty, 0, or 9
      if (!value || value === "0" || value === "9") {
        return true;
      }
      // Check if the entered number is not in sequence
      if (
        index > 0 &&
        parseInt(value) !==
          parseInt(inputRefs[index - 1]?.current?.value || "") + 1
      ) {
        return true;
      }
      return false;
    });
    if (hasError) {
      setError("Invalid input. Please enter numbers from 1 to 8 in sequence.");
    } else {
      setError("");
      const queryString = `?name=${encodeURIComponent(userName)}`;
      router.push(`/interest${queryString}`);
      // Perform verification logic
      // ...
    }
  };

  useEffect(() => {
    const nameValue: any = searchParams?.get("name");
    const emailValue: any = searchParams.get("email");
    setUserName(nameValue);
    if (emailValue) {
      const maskedEmail = maskEmail(emailValue);
      setUserEmail(maskedEmail);
    }
  }, [searchParams]);

  return (
    <div
      className="mx-auto mt-10 max-w-md rounded-md border border-gray-300 p-6 shadow-md"
      style={{ borderColor: "#C1C1C1" }}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">Verify Your Email</h2>
      <p className="mb-4 text-center">
        Enter the 8 digit code you have received on {userEmail}
      </p>
      <form autoComplete="off">
        <label
          htmlFor="code"
          className="mb-1 block font-semibold text-gray-700"
        >
          Code
        </label>
        <div className="mt-2 flex justify-between">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="mb-4"
              style={{ flex: "1", marginRight: "8px" }}
            >
              <input
                ref={inputRefs[index]}
                type="text"
                id={`code${index + 1}`}
                name={`code${index + 1}`}
                autoComplete="off"
                maxLength={1}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            </div>
          ))}
        </div>
        {isSubmitted && error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <div className="text-center">
          <button
            type="button"
            className="w-full rounded-md bg-black px-4 py-2 text-white hover:bg-gray-900 focus:bg-gray-900 focus:outline-none"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyEmailForm;
