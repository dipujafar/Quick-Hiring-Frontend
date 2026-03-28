import designIcon from "@/assets/images/category/design_Icon.png";
import salesIcon from "@/assets/images/category/sales_icon.png";
import marketingIcon from "@/assets/images/category/marketing_icon.png";
import financeIcon from "@/assets/images/category/finance_icon.png";
import technologyIcon from "@/assets/images/category/technology_icon.png";
import engineeringIcon from "@/assets/images/category/engineering_icon.png";
import businessIcon from "@/assets/images/category/business_icon.png";
import hrIcon from "@/assets/images/category/human_resources.png";
import { TCategory } from "@/types/";

export const jobsCategories: TCategory[] = [
  {
    id: 1,
    title: "Design",
    value: "DESIGN",
    icon: designIcon,
    available_jobs: 235,
    className: "bg-pink-100 text-pink-500",
  },
  {
    id: 2,
    title: "Sales",
    value: "SALES",
    icon: salesIcon,
    available_jobs: 756,
    className: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Marketing",
    value: "MARKETING",
    icon: marketingIcon,
    available_jobs: 140,
    className: "bg-orange-100 text-orange-500",
  },
  {
    id: 4,
    title: "Finance",
    value: "FINANCE",
    icon: financeIcon,
    available_jobs: 325,
    className: "bg-purple-100 text-purple-500",
  },
  {
    id: 5,
    title: "Technology",
    value: "TECHNOLOGY",
    icon: technologyIcon,
    available_jobs: 436,
    className: "bg-red-500/10 text-red-500",
  },
  {
    id: 6,
    title: "Engineering",
    value: "ENGINEERING",
    icon: engineeringIcon,
    available_jobs: 542,
    className: "bg-blue-100 text-blue-500",
  },
  {
    id: 7,
    title: "Business",
    value: "BUSINESS",
    icon: businessIcon,
    available_jobs: 211,
    className: "bg-primary-color/10 text-primary",
  },
  {
    id: 8,
    title: "Human Resource",
    value: "HUMAN_RESOURCE",
    icon: hrIcon,
    available_jobs: 346,
    className: "bg-teal-100 text-teal-600",
  },
];

export const placeHolderBlurImg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWnpaaXiDhOAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII=";

export const divisions = [
  { id: 1, name: "Dhaka" },
  { id: 2, name: "Chattogram" },
  { id: 3, name: "Rajshahi" },
  { id: 4, name: "Khulna" },
  { id: 5, name: "Barishal" },
  { id: 6, name: "Sylhet" },
  { id: 7, name: "Rangpur" },
  { id: 8, name: "Mymensingh" },
];

export const educations = [
  { id: 60, name: "Bachelor's Degree", value: "BSC" },
  { id: 61, name: "Master's Degree", value: "MSC" },
  { id: 62, name: "Diploma", value: "Diploma" },
  { id: 63, name: "PhD / Doctorate", value: "Phd" },
];

export const categories = [
  {
    id: 1,
    label: "Design",
    value: "DESIGN",
  },
  {
    id: 2,
    label: "Sales",
    value: "SALES",
  },
  {
    id: 3,
    label: "Marketing",
    value: "MARKETING",
  },
  {
    id: 4,
    label: "Finance",
    value: "FINANCE",
  },
  {
    id: 5,
    label: "Technology",
    value: "TECHNOLOGY",
  },
  {
    id: 6,
    label: "Engineering",
    value: "ENGINEERING",
  },
  {
    id: 7,
    label: "Business",
    value: "BUSINESS",
  },
  {
    id: 8,
    label: "Human Resource",
    value: "HUMAN RESOURCE",
  },
];
