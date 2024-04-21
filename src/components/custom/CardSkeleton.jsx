import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRound } from "lucide-react";

const CardSkeleton = () => {
  return (
    <Card className="cursor-pointer shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out">
      <Skeleton className="h-60 w-45" />
      <CardContent className="text-left mt-4 pb-4">
        <Skeleton className="h-4 w-[150px] mb-1" />
        <Skeleton className="h-4 w-[75px] mb-1" />
        <Skeleton className="h-4 w-[100px] mb-1" />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;

import React from "react";
