import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import genres from "@/data/genres";

const conditions = [
  {
    value: "Brand New",
    label: "Brand New",
  },
  {
    value: "Like New",
    label: "Like New",
  },
  {
    value: "Well Used",
    label: "Well Used",
  },
];

const AddBook = () => {
  const [genreOpen, setGenreOpen] = useState(false);
  const [genreValue, setGenreValue] = useState("");
  const [conditionOpen, setConditionOpen] = useState(false);
  const [conditionValue, setConditionValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">List your book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List your book</DialogTitle>
          <DialogDescription>
            Add your book details to start swapping with others.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Book Name
            </Label>
            <Input id="name" defaultValue="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-right">
              Genre
            </Label>
            <Popover open={genreOpen} onOpenChange={setGenreOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={genreOpen}
                  className="w-[200px] justify-between"
                >
                  {genreValue
                    ? genres.find((genre) => genre.value === genreValue)?.label
                    : "Select genre..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search genre..." />
                  <CommandList>
                    <CommandEmpty>No genre found.</CommandEmpty>
                    <CommandGroup>
                      {genres.map((genre) => (
                        <CommandItem
                          key={genre.value}
                          value={genre.value}
                          onSelect={(currentValue) => {
                            setGenreValue(
                              currentValue === genreValue ? "" : currentValue
                            );
                            setGenreOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              genreValue === genre.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {genre.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="condition" className="text-right">
              Condition
            </Label>
            <Popover open={conditionOpen} onOpenChange={setConditionOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={conditionOpen}
                  className="w-[200px] justify-between"
                >
                  {conditionValue
                    ? conditions.find(
                        (condition) => condition.value === conditionValue
                      )?.label
                    : "Select condition..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {conditions.map((condition) => (
                        <CommandItem
                          key={condition.value}
                          value={condition.value}
                          onSelect={(currentValue) => {
                            setConditionValue(
                              currentValue === conditionValue
                                ? ""
                                : currentValue
                            );
                            setConditionOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              conditionValue === condition.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {condition.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Upload image
            </Label>
            <label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button type="submit">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
