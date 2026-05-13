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
import MonoChip from "./ui/MonoChip";
import TopoLine from "./ui/TopoLine";
import EditClimbImages from "./EditClimbImages";
import EditClimbVideo from "./EditClimbVideo";

const VGRADES = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "10", "11", "12", "13", "14", "15", "16", "17",
];

const SPORTGRADES = [
  "5.4", "5.5", "5.6", "5.7", "5.8", "5.9",
  "5.10a", "5.10b", "5.10c", "5.10d",
  "5.11a", "5.11b", "5.11c", "5.11d",
  "5.12a", "5.12b", "5.12c", "5.12d",
  "5.13a", "5.13b", "5.13c", "5.13d",
  "5.14a", "5.14b", "5.14c", "5.14d",
  "5.15a", "5.15b", "5.15c", "5.15d",
];

type AdminClimbProps = {
  climb: Climb;
  images?: ContentImage[];
  videos?: ContentVideo[];
};

export default function AdminEditClimb({ climb, images, videos }: AdminClimbProps) {
  const [climbType, setClimbType] = useState(climb.type || "");

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    editClimb(formData)
      .then(() => {
        toast.success("Climb edited successfully!");
      })
      .catch((error) => {
        console.error("Error editing climb:", error);
        toast.error(error.message || "Failed to edit climb");
      });
  }

  return (
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— EDIT CLIMB</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {climb.name}.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Edit route details, photos, and video.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={9} />
        </div>

        <form onSubmit={handleFormSubmit}>
          <Input type="hidden" name="climb_id" value={climb.id} />

          <div className="mt-8 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
            <MonoChip className="text-ember block mb-3">— ROUTE DETAILS</MonoChip>
            <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-6">
              Route information.
            </h2>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                  Name
                </label>
                <Input required defaultValue={climb.name} type="text" name="name" placeholder="Name" />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    Type
                  </label>
                  <Select required name="type" value={climbType} onValueChange={setClimbType}>
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

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    Grade
                  </label>
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
                    <Select required defaultValue={climb.grade} name="grade">
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
                    <Select required defaultValue={climb.grade} name="grade">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    City
                  </label>
                  <Input required type="text" defaultValue={climb.city} name="city" placeholder="City" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    Area
                  </label>
                  <Input required type="text" defaultValue={climb.area} name="area" placeholder="Area" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    Sub-Area
                  </label>
                  <Input required type="text" defaultValue={climb.subArea} name="sub-area" placeholder="Sub-Area" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>

        <div className="mt-4 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
          <MonoChip className="text-ember block mb-3">— MEDIA</MonoChip>
          <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-6">
            Photos &amp; video.
          </h2>
          <div className="flex flex-col gap-4">
            <EditClimbImages images={images || []} climb={climb} />
            <EditClimbVideo videos={videos || []} climb={climb} />
          </div>
        </div>

      </div>
    </div>
  );
}
