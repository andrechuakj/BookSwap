import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { UserRound } from "lucide-react";

const defaultImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-_1dfk_DXSabBEiXoeHZxumOfsR6pawfgQ&usqp=CAU";

const BookCard = ({ handleOpen, book }) => {
  return (
    <>
      <Card
        className="cursor-pointer shadow-md hover:shadow-lg transform transition-transform duration-300 ease-in-out"
        onClick={handleOpen}
      >
        <div className="h-60 w-45 overflow-hidden">
          <img
            src={book.image || defaultImg}
            alt="No image available"
            className="h-full w-full object-cover"
          />
        </div>
        <CardContent className="text-left mt-4 pb-4">
          <CardTitle className="truncate text-xl">{book.name}</CardTitle>
          <CardDescription className="overflow-hidden">
            {book.condition}
          </CardDescription>
          <CardDescription className="overflow-hidden flex items-center">
            <UserRound size={15} className="mr-1" /> {book.owner}
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default BookCard;
