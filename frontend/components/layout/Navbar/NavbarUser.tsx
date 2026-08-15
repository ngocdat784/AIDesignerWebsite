"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  CreditCard,
  LayoutDashboard,
  LogIn,
  LogOut,
  Package,
  Settings,
  User,
} from "lucide-react";

import AppAvatar from "@/components/common/AppAvatar";
import AppButton from "@/components/common/AppButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/contexts/AuthContext";

export default function NavbarUser() {
  const router = useRouter();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  function handleLogout() {
    logout();

    router.push("/");
    router.refresh();
  }

  if (!isAuthenticated || !user) {
    return (
      <Link href="/auth/login">
        <AppButton
          variant="ghost"
          className="gap-2"
        >
          <LogIn className="h-4 w-4" />

          <span className="hidden md:inline">
            Login
          </span>
        </AppButton>
      </Link>
    );
  }

  const displayName =
    user.name?.trim() || user.email;

  const roleLabel =
    user.role === "ADMIN"
      ? "Administrator"
      : user.role === "CREATOR"
        ? "Creator"
        : "User";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          flex
          items-center
          gap-3
          rounded-xl
          p-1
          transition-all
          duration-300
          hover:bg-muted
          focus:outline-none
          focus:ring-2
          focus:ring-primary/20
        "
      >
        <AppAvatar
          src={user.avatar ?? ""}
          name={displayName}
          size="sm"
        />

        <div className="hidden text-left lg:block">
          <div className="max-w-32 truncate text-sm font-semibold">
            {displayName}
          </div>

          <div className="text-xs text-muted-foreground">
            {roleLabel}
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <div className="px-2 py-1.5">
          <div className="font-semibold">
            {displayName}
          </div>

          <div className="max-w-56 truncate text-xs text-muted-foreground">
            {user.email}
          </div>

          <div className="mt-1 text-xs text-muted-foreground">
            {roleLabel}
          </div>
        </div>

        <DropdownMenuSeparator />

        <Link href="/profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownMenuItem>
        </Link>

        <Link href="/dashboard">
          <DropdownMenuItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </DropdownMenuItem>
        </Link>

        <Link href="/orders">
          <DropdownMenuItem>
            <Package className="mr-2 h-4 w-4" />
            My Orders
          </DropdownMenuItem>
        </Link>

        <Link href="/billing">
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </DropdownMenuItem>
        </Link>

        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}