import Link from "next/link";

export default function OutletsDynamicHead({ id, title }) {
  return (
    <>
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
              <path d="M17 2L3 16L17 30" stroke="black" stroke-width="3" />
            </svg>
          </Link>

          <h1 className="text-lg md:text-5xl font-semibold ml-5">BEL Banani</h1>
        </div>
        <span className="text-sm md:text-lg">
          Customer since jan 15, 2024 <span className="mx-5">.</span> Last
          Order: Jan 24, 2024
        </span>
      </div>
    </>
  );
}
