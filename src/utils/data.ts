import designIcon from "@/assets/images/category/design_Icon.png";
import salesIcon from "@/assets/images/category/sales_icon.png";
import marketingIcon from "@/assets/images/category/marketing_icon.png";
import financeIcon from "@/assets/images/category/finance_icon.png";
import technologyIcon from "@/assets/images/category/technology_icon.png";
import engineeringIcon from "@/assets/images/category/engineering_icon.png";
import businessIcon from "@/assets/images/category/business_icon.png";
import hrIcon from "@/assets/images/category/human_resources.png";
import { TCategory } from "@/types/";

export const categories: TCategory[] = [
  { id: 1, title: "Design", icon: designIcon, available_jobs: 235 },
  { id: 2, title: "Sales", icon: salesIcon, available_jobs: 756 },
  { id: 3, title: "Marketing", icon: marketingIcon, available_jobs: 140 },
  { id: 4, title: "Finance", icon: financeIcon, available_jobs: 325 },
  { id: 5, title: "Technology", icon: technologyIcon, available_jobs: 436 },
  { id: 6, title: "Engineering", icon: engineeringIcon, available_jobs: 542 },
  { id: 7, title: "Business", icon: businessIcon, available_jobs: 211 },
  { id: 8, title: "Human Resource", icon: hrIcon, available_jobs: 346 },
];
