"use client";
import AuthNav from "@/components/global/authNav/authNav";
import Link from "next/link";
import { useState } from "react";
import { fetchApi } from "@/utils/FetchApi";

export default function Forgot() {
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const email = e.target.email.value;

    try {
      await fetchApi("/user/resetUser", "POST", { email });
      setConfirm(true);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to send otp email. Please try again.");
    }
  };

  return (
    <main className="">
      <AuthNav />
      <section className="flex mx-auto p-5 shadow-md max-w-[412px] mt-[20vh]">
        {!confirm && (
          <div className="my-3">
            <div>
              <h3 className="text-2xl font-bold">Forgot your password?</h3>
              <p className="text-sm text-[#6B7280] pt-2">
                Lorem ipsum dolor sit amet consectetur. Risus enim scelerisque
                fermentum fermentum.
              </p>
            </div>

            <form
              onSubmit={handleForgotPassword}
              className="flex flex-col space-y-4 mt-5 text-[#6B7280] relative"
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none"
                />
              </div>
              <div className="relative">
                <label htmlFor="cbx" className="label-cbx">
                  <input
                    id="cbx"
                    type="checkbox"
                    className="invisible"
                    required
                  />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                  <span className="text-[#6B7280]">
                    I accept the{" "}
                    <span className="text-black font-semibold">
                      Terms and Conditions
                    </span>
                  </span>
                </label>
              </div>
              <button
                type="submit"
                className="bg-[#000000] text-white py-2 my-10 rounded-md"
              >
                {isLoading ? "Submitting..." : "Reset password "}
              </button>
              {error && <span className="text-xs text-red-500">{error}</span>}
            </form>
          </div>
        )}
        {confirm && (
          <div className="flex flex-col justify-center items-center text-center">
            <div className="">
              <div className="flex justify-center">
                <svg
                  width="52"
                  height="51"
                  viewBox="0 0 52 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.95898 12.875L19.5051 21.117C24.8678 24.1554 27.1335 24.1554 32.4962 21.117L47.0423 12.875"
                    stroke="black"
                    strokeWidth="3.15625"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.99217 28.6048C5.12972 35.0554 5.1985 38.2804 7.57859 40.6697C9.95865 43.0588 13.2711 43.1419 19.8961 43.3083C23.9792 43.411 28.0221 43.411 32.1053 43.3083C38.7302 43.1419 42.0426 43.0588 44.4228 40.6697C46.8029 38.2804 46.8717 35.0554 47.0091 28.6048C47.0535 26.5308 47.0535 24.4691 47.0091 22.395C46.8717 15.9446 46.8029 12.7194 44.4228 10.3303C42.0426 7.94113 38.7302 7.85791 32.1053 7.69145C28.0221 7.58885 23.9792 7.58885 19.8961 7.69143C13.2711 7.85787 9.95865 7.94109 7.57857 10.3302C5.19848 12.7194 5.12972 15.9446 4.99215 22.395C4.94792 24.4691 4.94794 26.5308 4.99217 28.6048Z"
                    stroke="black"
                    strokeWidth="3.15625"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mt-5">Check your email.</h3>
              <p className="text-sm text-[#6B7280] pt-2">
                Lorem ipsum dolor sit amet consectetur. Risus enim scelerisque
                fermentum fermentum.
              </p>
            </div>
            <Link
              href="/authentication/otp"
              className="bg-[#000000] text-white py-2 px-3 my-10 rounded-md"
            >
              Go to OTP
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
