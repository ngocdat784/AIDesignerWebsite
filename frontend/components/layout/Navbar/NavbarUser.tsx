"use client";

import Link from "next/link";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarUserProps {
  isAuthenticated?: boolean;

  name?: string;

  avatar?: string;
}

export default function NavbarUser({
  isAuthenticated = false,
  name = "Guest User",
  avatar = "",
}: NavbarUserProps) {
  if (!isAuthenticated) {
    return (
      <Link href="/login">
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          type="button"
          className="
            flex
            items-center
            gap-3
            rounded-xl
            p-1
            transition-all
            duration-300
            hover:bg-muted
          "
        >
          <AppAvatar
            src={avatar}
            name={name}
            size="sm"
          />

          <div className="hidden text-left lg:block">
            <div className="text-sm font-semibold">
              {name}
            </div>

            <div className="text-xs text-muted-foreground">
              Premium Member
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        <DropdownMenuLabel>
          <div className="space-y-1">
            <div className="font-semibold">
              {name}
            </div>

            <div className="text-xs text-muted-foreground">
              AI Designer Account
            </div>
          </div>
        </DropdownMenuLabel>

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
          className="text-red-500 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}