"use client";

import { TCartProductSchema } from "@/app/dashboard/products/_utils/types/types";
import { useCartContext } from "@/lib/contexts/cart-context-provider";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const QuantityCounter = ({
  variant = "lg",
  details,
  quantity,
  setQuantity,
}: {
  variant: string;
  details: TCartProductSchema;
  quantity?: number;
  setQuantity?: Function;
}) => {
  const { cart, setCart } = useCartContext();

  const handleIncrementQuantity = () => {
    if (quantity && setQuantity) {
      if (quantity < details.stock) {
        const currentQuantity = cart.filter(
          (item) => item._id === details._id
        )[0]?.quantity;
        if (currentQuantity) {
          if (currentQuantity < details.stock) {
            setCart(
              cart.map((item) => {
                return item._id === details._id
                  ? { ...item, quantity: quantity + 1 }
                  : item;
              })
            );
          }
        }
        setQuantity(quantity + 1);
      }
    }
  };

  const handleDecrementQuantity = () => {
    if (quantity && setQuantity) {
      if (quantity > 1) {
        const currentQuantity =
          cart.filter((item) => item._id === details._id)[0]?.quantity || 1;
        if (currentQuantity && currentQuantity > 1) {
          setCart(
            cart.map((item) => {
              return item._id === details._id
                ? { ...item, quantity: quantity - 1 }
                : item;
            })
          );
        }

        setQuantity(quantity - 1);
      }
    }
  };
  return (
    <div className="flex bg-white rounded-[8px]">
      <div
        className={clsx(
          "border border-dark_gray border-r-0 py-[4px] rounded-l-[8px] flex items-center justify-center hover:bg-muted active:scale-[98%] md:cursor-pointer",
          { "px-[16px]": variant === "lg", "px-[10px]": variant === "sm" }
        )}
        onClick={handleDecrementQuantity}
        role="button"
      >
        <Minus className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
      <div
        className={clsx(
          "border border-dark_gray py-[4px] flex items-center justify-center text-[16px] font-medium",
          { "px-[30px]": variant === "lg", "px-[16px]": variant === "sm" }
        )}
      >
        {quantity}
      </div>
      <div
        className={clsx(
          "border border-dark_gray border-l-0 py-[4px] rounded-r-[8px] flex items-center justify-center hover:bg-muted active:scale-[98%] md:cursor-pointer",
          { "px-[16px]": variant === "lg", "px-[10px]": variant === "sm" }
        )}
        onClick={handleIncrementQuantity}
        role="button"
      >
        <Plus className="w-[16px] h-[16px] stroke-[1.3px] stroke-gray-500" />
      </div>
    </div>
  );
};

export default QuantityCounter;
