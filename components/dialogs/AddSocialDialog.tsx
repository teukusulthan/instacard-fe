"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type Platform = {
  key: string;
  label: string;
};

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  platforms: Platform[];
  onSubmit: (formData: FormData) => void;
};

export function AddSocialDialog({
  open,
  onOpenChange,
  platforms,
  onSubmit,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background/70 ring-1 ring-border hover:bg-accent transition"
          aria-label="Add social"
        >
          <Plus className="h-[18px] w-[18px]" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add social</DialogTitle>
          <DialogDescription>
            Choose platform and enter your account url.
          </DialogDescription>
        </DialogHeader>

        <form action={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="platform">Platform</Label>
            <Select name="platform">
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((p) => (
                  <SelectItem key={p.key} value={p.key}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="socialUrl">URL</Label>
            <Input
              id="socialUrl"
              name="socialUrl"
              type="url"
              placeholder="https://instagram.com/username"
              required
            />
          </div>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
