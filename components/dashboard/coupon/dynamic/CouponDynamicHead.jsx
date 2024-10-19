'use client'
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CouponDynamicHead() {
  const {id} = useParams()
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-start items-center">
        <Link href="/dashboard/orders">
          <svg
            width="19"
            height="32"
            viewBox="0 0 19 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 2L3 16L17 30" stroke="black" strokeWidth="3" />
          </svg>
        </Link>

        <h1 className="text-lg md:text-5xl font-semibold ml-5">{id || "Add new coupon"}</h1>
      </div>
    </div>
  );
}
