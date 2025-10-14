"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, HomeIcon, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsTrainer } from "@/hooks/use-trainers";
import LoadingUI from "./LoadingUI";

function Navbar() {
  const { user, isLoaded } = useUser();
  const { data: isTrainer, isLoading } = useIsTrainer();
  const pathname = usePathname();

  if (!isLoaded || isLoading) return <LoadingUI />;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-11"
            />
          </Link>

          <div className="flex items-center gap-6">
            {!isTrainer && (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-2 transition-colors ${
                    pathname === "/dashboard"
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Dashboard</span>
                </Link>
                <Link
                  href="/appointments"
                  className={`flex items-center gap-2 transition-colors ${
                    pathname === "/appointments"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span className="hidden md:inline">Appointments</span>
                </Link>
              </>
            )}
            {isTrainer && (
              <Link
                href="/trainers"
                className={`flex items-center gap-2 transition-colors ${
                  pathname === "/trainers"
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UsersRound className="w-4 h-4" />
                <span className="hidden md:inline">Trainers</span>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
