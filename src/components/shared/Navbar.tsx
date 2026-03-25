import logo from "@/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";

export const navitems = [
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

function Navbar() {
  return (
    <div className="bg-[#F8F8FD] sticky top-0 z-50 left-0">
      <Container>
        <div className=" flex-between gap-x-5 py-3">
          <div className="flex-between border border-red-500 gap-x-8">
            <Link href={"/"}>
              <Image
                src={logo}
                alt="logo"
                className="h-8 md:h-8 xl:h-9 w-auto object-cover"
              />
            </Link>

            <ul className="lg:flex flex-row gap-x-5 lg:gap-x-8 items-center hidden">
              {navitems?.map((i) => {
                return (
                  <li
                    key={i?.id}
                    className=" text-neutral/80 font-medium hover:text-primary-color duration-200"
                  >
                    <Link href={i?.rout}>{i?.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="hidden lg:flex flex-row gap-x-2.5 md:gap-x-4 lg:gap-x-5 items-center">
              <Link
                href={"/admin"}
                className="font-epilogue font-bold text-primary"
              >
                Login
              </Link>

              <div className="w-px bg-neutral/20 h-8"></div>

              <button className="cursor-pointer text-white border-0 bg-primary-color hover:bg-primary/80 duration-200 px-5 py-3 font-epilogue font-bold">
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
