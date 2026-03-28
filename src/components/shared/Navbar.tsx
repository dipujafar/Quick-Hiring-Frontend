import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { cn } from "@/lib/utils";

export const navLinks = [
  {
    id: 1,
    rout: "/jobs",
    label: "Find Jobs",
  },
  {
    id: 2,
    rout: "#",
    label: "Browse Companies",
  },
];

function Navbar({ className }: { className?: string }) {
  return (
    <div className={cn(" sticky top-0 z-50 left-0 bg-[#F8F8FD]", className)}>
      <Container>
        <div className=" flex-between gap-x-5 py-3">
          <div className="flex-between   gap-x-8">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                className="h-8 md:h-8 xl:h-9 w-auto object-cover"
                placeholder='blur' blurDataURL={'/blurImage.jpg'}
              />
            </Link>

            <ul className="lg:flex flex-row gap-x-5 lg:gap-x-8 items-center hidden mt-2">
              {navLinks?.map((nav) => {
                return (
                  <li key={nav?.id} className="relative group">
                    <Link
                      href={nav?.rout}
                      className="text-primary-gray font-medium hover:text-primary-color duration-200 pb-1 block"
                    >
                      {nav?.label}
                      <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary-color scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="hidden lg:flex flex-row gap-x-2.5 md:gap-x-4 lg:gap-x-5 items-center">
              <Link
                href={"/admin"}
                className=" font-bold text-primary-color hover:text-primary-color/60 duration-200"
              >
                Login
              </Link>

              <div className="w-px bg-[#D6DDEB] h-8"></div>

              <button className="cursor-pointer text-white border-0 bg-primary-color hover:bg-primary/80 duration-200 px-5 py-3  font-bold">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
