"use client"
import React, { useEffect, useState } from "react";
import UserInterest from "~/components/UserInterests";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function signUpPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const nameValue: any = searchParams?.get("name");
    if (!nameValue) {
      router.push("/");
    } else {
      setUserName(nameValue);
    }
  }, [searchParams]);
  return (
    <>
      {userName && <UserInterest />}
    </>
  );
}