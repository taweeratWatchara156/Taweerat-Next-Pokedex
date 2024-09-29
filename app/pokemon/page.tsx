"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";

export default function Home() {
  const route = useRouter();

  useEffect(() => {
    route.push('pokemon/bulbasaur')
  }, [])

  return (
    <div className="flex w-screen h-screen justify-center items-cente">
      <Loading/>
    </div>
  );
}
