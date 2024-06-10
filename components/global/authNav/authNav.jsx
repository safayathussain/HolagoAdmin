import Image from "next/image";
import Link from "next/link";
import logo from "@/public/image/logo.svg";

export default function AuthNav() {
  return (
    <nav className="container mx-auto">
      <div className="flex items-center justify-between w-full h-16 px-4">
        <div className="flex items-center justify-center h-20">
            <Link href="/">
              <Image
                src={logo}
                alt="best electronic logo"
                quality={100}
                style={{ objectFit: "cover" }}
                loading="lazy"
                sizes="100vw"
              />
            </Link>
          </div>
      </div>
    </nav>
  );
}
