"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import VerifyEmailForm from "~/components/VerifyEmailForm";

export default function HomePage() {
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
      {userName && <VerifyEmailForm />}
    </>
  );
}