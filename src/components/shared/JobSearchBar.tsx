"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const popularTerms = ["UI Designer", "UX Researcher", "Android", "Admin"];

export default function JobSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const location = "Dhaka, Bangladesh";
  const router = useRouter();

  const handleLocationClick = () => {
    // Replace with your custom location picker / modal
    alert("Location picker — wire up your own here!");
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    router.push(`/jobs?searchTerm=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col  gap-3 w-full ">

      {/* ── Desktop bar ─────────────────────────────────────────── */}
      <div className="hidden sm:flex items-center w-full  bg-white  shadow-md px-5 py-3 gap-0">

        {/* Search input */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Search className="w-4.5 h-4.5 text-muted-foreground shrink-0" />
          <Input
            type="text"
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "border-none shadow-none focus-visible:ring-0 p-0 h-auto pl-1",
              "text-[15px] placeholder:text-primary-gray text-primary-gray  bg-transparent"
            )}
          />
        </div>

        <Separator orientation="vertical" className="mx-4  shrink-0" />

        {/* Location button */}
        <button
          onClick={handleLocationClick}
          className="flex-1 flex items-center gap-2 text-[15px]  hover:text-primary-color  transition-colors whitespace-nowrap focus:outline-none text-primary-black"
        >
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{location}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="ml-4 bg-primary-color hover:bg-indigo-700 text-white rounded-none px-6 py-3.25 text-[15px] font-semibold shrink-0 h-auto cursor-pointer"
        >
          Search my job
        </Button>
      </div>

      {/* ── Mobile card ─────────────────────────────────────────── */}
      <div className="flex sm:hidden flex-col w-full max-w-sm bg-white  shadow-lg px-5 pt-5 pb-4 gap-0">

        {/* Search input row */}
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <Search className="w-4.25 h-4.25 text-muted-foreground shrink-0" />
          <Input
            type="text"
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-none shadow-none focus-visible:ring-0 p-0 h-auto text-[15px] placeholder:text-muted-foreground bg-transparent pl-1 text-primary-gray"
          />
        </div>

        {/* Location row */}
        <button
          onClick={handleLocationClick}
          className="flex items-center gap-3 py-4 text-[15px] text-foreground hover:text-primary-color  transition-colors focus:outline-none w-full"
        >
          <MapPin className="w-4 h-4 text-primary-black shrink-0" />
          <span className="flex-1 text-left text-primary-black">{location}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Search button */}
        <Button
          onClick={handleSearch}
          className="w-full bg-primary-color hover:bg-indigo-700 text-white rounded-none py-3.5 text-[15px] font-semibold h-auto"
        >
          Search my job
        </Button>
      </div>

      {/* ── Popular tags ─────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-1.5 text-sm text-primary-gray">
        <span>Popular :</span>
        {popularTerms.map((term, i) => (
          <button
            key={term}
            onClick={() => setSearchTerm(term)}
            className="text-primary-gray font-medium hover:text-indigo-600 transition-colors focus:outline-none"
          >
            {term}{i < popularTerms.length - 1 ? "," : ""}
          </button>
        ))}
      </div>
    </div>
  );
}