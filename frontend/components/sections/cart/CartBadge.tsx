"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "@/hooks/useCart";

export default function CartBadge() {

    const { items } = useCart();

    const count =
        items.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );

    return (

        <Link
            href="/cart"
            className="relative"
        >

            <ShoppingCart />

            {count > 0 && (

                <span
                    className="absolute
                    -right-2
                    -top-2
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-xs
                    text-white"
                >
                    {count}
                </span>

            )}

        </Link>

    );
}