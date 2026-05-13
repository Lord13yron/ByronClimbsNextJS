"use client";

import AddClimbImages from "@/components/AddClimbImages";
import AddClimbVideo from "@/components/AddClimbVideo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MonoChip from "@/components/ui/MonoChip";
import TopoLine from "@/components/ui/TopoLine";
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

export default function AddClimb() {
  const [climbType, setClimbType] = useState("");

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    addClimb(formData)
      .then((result) => {
        if (result && "error" in result) {
          toast.error(result.error);
          return;
        }
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
    <div className="bg-chalk min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6">
          <MonoChip className="text-ember mb-3 block">— ADD A CLIMB</MonoChip>
          <h1
            className="font-display uppercase font-extrabold leading-[0.92] tracking-[0.01em] text-granite-100"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            Log a route.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-slate-700 font-body">
            Add a new climb to the database.
          </p>
        </div>

        <div className="text-chalk-3 opacity-60">
          <TopoLine height={36} seed={8} />
        </div>

        <form onSubmit={handleFormSubmit}>
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
                <Input required type="text" name="name" placeholder="e.g. The Mandala" />
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    City
                  </label>
                  <Input required type="text" name="city" placeholder="e.g. Bishop" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    Area
                  </label>
                  <Input required type="text" name="area" placeholder="e.g. The Buttermilks" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono uppercase text-[11px] tracking-widest text-slate-500">
                    Sub-Area
                  </label>
                  <Input required type="text" name="sub-area" placeholder="e.g. Peabody Boulders" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-chalk-2 border border-chalk-3 rounded-sm p-8">
            <MonoChip className="text-ember block mb-3">— MEDIA</MonoChip>
            <h2 className="font-display uppercase font-bold text-[28px] leading-none text-granite-100 mb-6">
              Photos &amp; video.
            </h2>
            <div className="flex flex-col gap-4">
              <AddClimbImages />
              <AddClimbVideo />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button type="submit">Add Climb</Button>
          </div>
        </form>

      </div>
    </div>
  );
}
