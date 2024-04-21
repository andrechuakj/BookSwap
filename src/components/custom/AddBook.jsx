import { useState, useRef, useContext } from "react";
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
import { collection, addDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "@/firebase";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "../ui/toaster";

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

const AddBook = ({ open, handleClose, handleOpen, update }) => {
  const [genreOpen, setGenreOpen] = useState(false);
  const [genreValue, setGenreValue] = useState("");
  const [conditionOpen, setConditionOpen] = useState(false);
  const [conditionValue, setConditionValue] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const bookNameRef = useRef(null);
  const { toast } = useToast();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const storageRef = ref(storage, file.name);

      try {
        // Upload file to Firebase Storage
        await uploadBytes(storageRef, file);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    if (bookNameRef.current.value === "") {
      return toast({
        title: "Please enter a book name.",
        status: "error",
      });
    }
    const book = {
      name: bookNameRef.current.value,
      genre: genreValue,
      condition: conditionValue,
      image: fileUrl,
      owner: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
      exchanged: false,
    };
    try {
      const docRef = await addDoc(collection(db, "books"), book);
      updateDoc(docRef, { id: docRef.id });
      console.log("Document written with ID:", docRef.id);
      handleClose();
      update();
      return toast({
        title: bookNameRef.current.value + " added successfully",
      });
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={handleOpen}>
            List your book
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onPointerDownOutside={handleClose}
          onInteractOutside={handleClose}
          onEscapeKeyDown={handleClose}
        >
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
              <Input
                id="name"
                defaultValue=""
                className="col-span-3"
                ref={bookNameRef}
              />
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
                      ? genres.find((genre) => genre.value === genreValue)
                          ?.label
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
            <Button type="submit" onClick={handleSubmit}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
};

export default AddBook;
