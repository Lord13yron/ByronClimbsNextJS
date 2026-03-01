"use client";

import AddClimbImages from "@/components/AddClimbImages";
import AddClimbVideo from "@/components/AddClimbVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addClimb } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";

const VGRADES = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
];

const SPORTGRADES = [
  "5.4",
  "5.5",
  "5.6",
  "5.7",
  "5.8",
  "5.9",
  "5.10a",
  "5.10b",
  "5.10c",
  "5.10d",
  "5.11a",
  "5.11b",
  "5.11c",
  "5.11d",
  "5.12a",
  "5.12b",
  "5.12c",
  "5.12d",
  "5.13a",
  "5.13b",
  "5.13c",
  "5.13d",
  "5.14a",
  "5.14b",
  "5.14c",
  "5.14d",
  "5.15a",
  "5.15b",
  "5.15c",
  "5.15d",
];

export default function AddClimb() {
  const [climbType, setClimbType] = useState("");

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    addClimb(formData)
      .then(() => {
        console.log("Climb added successfully");
        form.reset();
        toast.success("Climb added successfully!");
        setClimbType("");
      })
      .catch((error) => {
        console.error("Error adding climb:", error);
        toast.error(error.message || "Failed to add climb");
      });
  }

  return (
    <div className="flex flex-col min-h-screen max-w-2xl w-full p-4 items-center mx-auto">
      <h1 className=" mb-4">Add a new Climb</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 w-full">
        <Input required type="text" name="name" placeholder="Name" />
        <div className="flex gap-4">
          <Select
            required
            name="type"
            value={climbType}
            onValueChange={setClimbType}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="boulder">Boulder</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {climbType === "" && (
            <Select disabled>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">Select Type First</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {climbType === "boulder" && (
            <Select required name="grade">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {VGRADES.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      V{grade}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          {climbType === "sport" && (
            <Select required name="grade">
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SPORTGRADES.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <Input required type="text" name="city" placeholder="City" />
        <Input required type="text" name="area" placeholder="Area" />
        <Input required type="text" name="sub-area" placeholder="Sub-Area" />
        <AddClimbImages />
        <AddClimbVideo />
        <Button type="submit">Add Climb</Button>
      </form>
    </div>
  );
}
