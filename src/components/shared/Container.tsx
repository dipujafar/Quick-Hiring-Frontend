import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const Container = ({
  children,
  className,
  id
}: {
  children: ReactNode;
  className?: string;
  id?: string
}) => {
  return (
    <div
    id={id}
      className={cn(
        "mx-auto max-w-360 px-4 md:px-16 lg:px-24  xl:px-32",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
