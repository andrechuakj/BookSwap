import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { genres, conditions, locations } from "@/data/dropdowns";
import { Check, ChevronsUpDown } from "lucide-react";
import { SearchContext } from "@/contexts/SearchProvider";

const SearchBar = ({}) => {
  const [genreOpen, setGenreOpen] = useState(false);
  const [conditionOpen, setConditionOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const {
    setGenreValue,
    setConditionValue,
    setLocationValue,
    genreValue,
    conditionValue,
    locationValue,
    update,
    refreshKey,
    searchKey,
    setSearchKey,
  } = useContext(SearchContext);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchKey(value);
    update();
  };

  return (
    <>
      <div className="flex w-full items-center space-x-2 mt-3">
        <Input
          type="text"
          placeholder="Search for a book..."
          value={searchKey}
          onChange={handleInputChange}
        />
        <Button type="submit">Search</Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Filter</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 z-30 bg-white shadow-lg rounded-lg p-3">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="genre" className="text-right">
                  Genre
                </Label>
                <Popover open={genreOpen} onOpenChange={setGenreOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={genreOpen}
                      className="col-span-3 justify-between mr-4"
                    >
                      {genreValue
                        ? genres.find((genre) => genre.value === genreValue)
                            ?.label
                        : "Select genre..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] z-40 p-0 shadow-lg rounded-lg">
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
                                  currentValue === genreValue
                                    ? ""
                                    : currentValue
                                );
                                setGenreOpen(false);
                                update();
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

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="condition" className="text-right">
                  Condition
                </Label>
                <Popover open={conditionOpen} onOpenChange={setConditionOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={conditionOpen}
                      className="col-span-3 justify-between mr-4"
                    >
                      {conditionValue
                        ? conditions.find(
                            (condition) => condition.value === conditionValue
                          )?.label
                        : "Select condition..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] z-40 p-0 shadow-lg rounded-lg">
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
                                update();
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

              <div className="grid grid-cols-4 items-center gap-3">
                <Label htmlFor="location" className="text-right">
                  Location
                </Label>
                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={locationOpen}
                      className="col-span-3 justify-between mr-4"
                    >
                      {locationValue
                        ? locations.find(
                            (location) => location.value === locationValue
                          )?.label
                        : "Select location..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] z-40 p-0 shadow-lg rounded-lg">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          {locations.map((location) => (
                            <CommandItem
                              key={location.value}
                              value={location.value}
                              onSelect={(currentValue) => {
                                setLocationValue(
                                  currentValue === locationValue
                                    ? ""
                                    : currentValue
                                );
                                setLocationOpen(false);
                                update();
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  locationValue === location.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {location.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

export default SearchBar;
