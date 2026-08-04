"use client";

import Image from "next/image";

import type { CartItemProps } from "./types";

import CartItemActions from "./CartItemActions";
import CartItemPrice from "./CartItemPrice";
import CartItemQuantity from "./CartItemQuantity";

export default function CartItem({
  item,
}: CartItemProps) {
  return (
    <article className="flex flex-col gap-6 rounded-2xl border p-5 md:flex-row">

      <div className="relative h-36 w-full overflow-hidden rounded-xl md:w-56">

        <Image
          src={item.template.thumbnail}
          alt={item.template.title}
          fill
          className="object-cover"
        />

      </div>

      <div className="flex flex-1 flex-col justify-between gap-5">

        <div>

          <h2 className="text-xl font-semibold">
            {item.template.title}
          </h2>

          <p className="mt-1 text-muted-foreground">
            {item.template.category}
          </p>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">

          <CartItemQuantity
            templateId={item.template.id}
            quantity={item.quantity}
          />

          <CartItemPrice
            price={item.template.price}
            discountPrice={
              item.template.discountPrice
            }
            quantity={item.quantity}
          />

        </div>

        <CartItemActions
          templateId={item.template.id}
          slug={item.template.slug}
        />

      </div>

    </article>
  );
}