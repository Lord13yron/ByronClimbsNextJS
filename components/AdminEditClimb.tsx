"use client";
import { editClimb } from "@/lib/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { Button } from "./ui/button";
import { Climb, ContentImage, ContentVideo } from "@/app/types/types";
import { Label } from "./ui/label";
import EditClimbImages from "./EditClimbImages";
import EditClimbVideo from "./EditClimbVideo";

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

type AdminClimbProps = {
  climb: Climb;
  images?: ContentImage[];
  videos?: ContentVideo[];
};
export default function AdminEditClimb({
  climb,
  images,
  videos,
}: AdminClimbProps) {
  const [climbType, setClimbType] = useState(climb.type || "");

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    editClimb(formData)
      .then(() => {
        console.log("Climb edited successfully");
        toast.success("Climb edited successfully!");
      })
      .catch((error) => {
        console.error("Error editing climb:", error);
        toast.error(error.message || "Failed to edit climb");
      });
  }

  return (
    <div className="flex flex-col min-h-screen max-w-6xl w-full p-4 items-center mx-auto">
      <h1 className=" mb-4">Edit Climb {climb.name}</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-4 w-full pr-4"
      >
        <Input type="hidden" name="climb_id" value={climb.id} />
        <Label htmlFor="name">Climb Name</Label>
        <Input
          required
          defaultValue={climb.name}
          type="text"
          name="name"
          placeholder="Name"
        />
        <div className="flex gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Climb Type</Label>
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
          </div>
          {climbType === "" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="grade">Grade</Label>
              <Select disabled>
                <SelectTrigger className="w-30 ">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Select Type First</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {climbType === "boulder" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="grade">Grade</Label>
              <Select required defaultValue={climb.grade} name="grade">
                <SelectTrigger className="w-30 ">
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
            </div>
          )}
          {climbType === "sport" && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="grade">Grade</Label>
              <Select required defaultValue={climb.grade} name="grade">
                <SelectTrigger className="w-30 ">
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
            </div>
          )}
        </div>
        <Label htmlFor="city">City</Label>
        <Input
          required
          type="text"
          defaultValue={climb.city}
          name="city"
          placeholder="City"
        />
        <Label htmlFor="area">Area</Label>
        <Input
          required
          type="text"
          defaultValue={climb.area}
          name="area"
          placeholder="Area"
        />
        <Label htmlFor="sub-area">Sub-Area</Label>
        <Input
          required
          type="text"
          defaultValue={climb.subArea}
          name="sub-area"
          placeholder="Sub-Area"
        />

        <Button type="submit">Edit Climb</Button>
      </form>
      <div className="w-full flex flex-col mt-4 gap-2">
        <EditClimbImages images={images || []} climb={climb} />
        <EditClimbVideo videos={videos || []} climb={climb} />
      </div>
    </div>
  );
}
