"use client";
import AuthNav from "@/components/global/authNav/authNav";
import view from "@/public/image/view.svg";
import hidden from "@/public/image/view-off.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchApi } from "@/utils/FetchApi";

export default function SetPassword() {
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const data = { newPassword: password, email };
      const response = await fetchApi("/user/setPassword", "POST", data);
      if (response) {
        setIsLoading(false);
        console.log(response);
        setConfirm(true);
      } else {
        setError("something went wrong");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const storedEmail = user ? JSON.parse(user).email : "";
      if (storedEmail) setEmail(storedEmail);
    }
  }, []);

  return (
    <main className="">
      <AuthNav />
      <section className="flex mx-auto p-5 shadow-md max-w-[412px] mt-[20vh]">
        {!confirm && (
          <div className="my-3">
            <div>
              <h3 className="text-2xl font-bold">Reset your password</h3>
              <p className="text-sm text-[#6B7280] pt-2">
                Lorem ipsum dolor sit amet consectetur. Risus enim scelerisque
                fermentum fermentum.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-4 mt-5 text-[#6B7280] relative"
            >
              <div className="flex flex-col space-y-1">
                <label htmlFor="password" className="text-sm font-semibold">
                  Set new password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="*********"
                    value={password}
                    minLength={6}
                    maxLength={12}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={handlePasswordToggle}
                  >
                    {showPassword ? (
                      <Image src={view} alt="view" width={24} height={24} />
                    ) : (
                      <Image src={hidden} alt="hidden" width={24} height={24} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold"
                >
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    required
                    placeholder="*********"
                    value={confirmPassword}
                    minLength={6}
                    maxLength={12}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none w-full"
                  />
                  <span
                    className="absolute right-2 top-2 cursor-pointer"
                    onClick={handleConfirmPasswordToggle}
                  >
                    {showConfirmPassword ? (
                      <Image src={view} alt="view" width={24} height={24} />
                    ) : (
                      <Image src={hidden} alt="hidden" width={24} height={24} />
                    )}
                  </span>
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
              </div>
              <button
                type="submit"
                className="bg-[#000000] text-white py-2 my-10 rounded-md"
              >
                {isLoading ? "Submitting..." : "Set Password"}
              </button>
            </form>
          </div>
        )}
        {confirm && (
          <div className="flex flex-col justify-center items-center mx-auto text-center">
            <div className="">
              <div className="flex justify-center">
                <svg
                  width="50"
                  height="51"
                  viewBox="0 0 50 51"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44.5836 17.623C44.6921 19.7999 44.6921 22.3895 44.6921 25.5001C44.6921 34.7832 44.6921 39.4249 41.8082 42.309C38.9242 45.1928 34.2825 45.1928 24.9993 45.1928C15.7161 45.1928 11.0745 45.1928 8.19057 42.309C5.30664 39.4249 5.30664 34.7832 5.30664 25.5001C5.30664 16.2169 5.30664 11.5752 8.19057 8.6913C11.0745 5.80737 15.7161 5.80737 24.9993 5.80737C27.2213 5.80737 29.1775 5.80737 30.9072 5.84692"
                    stroke="black"
                    strokeWidth="3.10938"
                    strokeLinecap="round"
                  />
                  <path
                    d="M16.709 24.4636C16.709 24.4636 19.8184 24.4636 23.9642 31.7188C23.9642 31.7188 34.4507 12.7171 44.6934 8.91675"
                    stroke="black"
                    strokeWidth="3.10938"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mt-5">You are good to go!</h3>
              <p className="text-sm text-[#6B7280] pt-2">
                Lorem ipsum dolor sit amet consectetur.
              </p>
            </div>
            <Link
              href="/"
              className="bg-[#000000] text-white py-2 px-3 my-10 rounded-md"
            >
              Back to Login
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
