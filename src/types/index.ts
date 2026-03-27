import { StaticImageData } from "next/image";

export type TCategory = {
  id: number;
  title: string;
  icon: StaticImageData;
  available_jobs: number;
};
