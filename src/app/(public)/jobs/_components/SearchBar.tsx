/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoSearchOutline } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateMultipleSearchParams } from "@/hooks/UseUpdateSearchPrams";
import { useSearchParams } from "next/navigation";
import { divisions } from "@/utils/data";

function Searchbar() {
  const updateMultipleSearchParam = useUpdateMultipleSearchParams();

  return (
    <div className="w-auto bg-white px-2 md:p-2 border border-stroke grid grid-cols-1 md:grid-cols-2 gap-x-5 ">
      <LocationModal updateSearchParam={updateMultipleSearchParam} />

      <Search updateMultipleSearchParam={updateMultipleSearchParam} />
    </div>
  );
}

export default Searchbar;

const Search = ({
  updateMultipleSearchParam,
}: {
  updateMultipleSearchParam: any;
}) => {
  const searchTerm = useSearchParams().get("searchTerm");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");
    updateMultipleSearchParam({ searchTerm: search as string });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-x-1 items-center justify-between py-2 md:py-0"
    >
      <div className="flex flex-row gap-x-1 items-center">
        <IoSearchOutline className="text-xl" />
        <input
          defaultValue={searchTerm || ""}
          type="text"
          name="search"
          className="border-none outline-0 focus:outline-0 text-black "
          placeholder="search..."
        />
      </div>

      <button
        type="submit"
        className="bg-primary-color text-white px-3 py-2   cursor-pointer hover:opacity-70 duration-200 rounded-none"
      >
        Search
      </button>
    </form>
  );
};

const LocationModal = ({ updateSearchParam }: { updateSearchParam: any }) => {
  const searchParams = useSearchParams();

  const district = searchParams.get("district");
  const division = searchParams.get("division");
  const area = searchParams.get("area");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={` py-3.5 md:py-0 flex flex-row gap-x-1 items-center border-b md:border-b-0 md:border-r border-stroke cursor-pointer ml-2 w-full ${district || division || area ? "text-black" : "text-gray-400"}`}
        >
          <MdLocationOn className="text-xl" />
          <p className="text-base ">
            {division ? division : "Location"}
          </p>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>

          <DialogDescription asChild>
            <DivisionSlide updateSearchParam={updateSearchParam} />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

const DivisionSlide = ({ updateSearchParam }: { updateSearchParam: any }) => {
  return (
    <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden">
      {
        <>
          <h4 className="text-lg  font-medium text-black mb-3">
            Select Division
          </h4>
          <ul>
            <li className="w-full">
              <DialogTrigger asChild>
                <button
                  className="flex flex-row gap-x-5 justify-between items-center border-b border-stroke p-3 cursor-pointer hover:bg-gray-50 duration-200 w-full"
                  onClick={() => {
                    updateSearchParam({
                      division: null,
                      district: null,
                      area: null,
                    });
                  }}
                >
                  <p className="text-base ">All</p>
                </button>
              </DialogTrigger>
            </li>

            {divisions?.map((division) => {
              return (
                <li key={`${division?.id}`} className="w-full">
                  <DialogTrigger asChild>
                    <button
                      className="flex flex-row gap-x-5 justify-between items-center border-b border-stroke p-3 cursor-pointer hover:bg-gray-50 duration-200 w-full"
                      onClick={() => {
                        updateSearchParam({ division: division?.name });
                      }}
                    >
                      <p className="text-base ">
                        {division?.name}
                      </p>
                    </button>
                  </DialogTrigger>
                </li>
              );
            })}
          </ul>
        </>
      }
    </div>
  );
};
