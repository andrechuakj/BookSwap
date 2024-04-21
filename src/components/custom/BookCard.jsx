import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const defaultImg = "https://source.unsplash.com/1600x900/?book";

const BookCard = ({ handleOpen }) => {
  return (
    <>
      <Card
        className="cursor-pointer shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out"
        onClick={handleOpen}
      >
        <div className="h-60 w-45 overflow-hidden">
          <img src={defaultImg} className="h-full w-full object-cover" />
        </div>
        <CardContent className="text-left mt-4 pb-4">
          <CardTitle className="truncate">Card title</CardTitle>
          <CardDescription className="overflow-hidden">
            Card desc
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default BookCard;
