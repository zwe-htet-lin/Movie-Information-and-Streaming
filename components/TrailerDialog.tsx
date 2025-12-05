"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  trailer: string;
}

const TrailerDialog = ({ open, setOpen, trailer }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 border-0 bg-black w-[95%] md:min-h-[50%] lg:min-w-[80%] lg:min-h-[90%]">
        <DialogHeader className="px-4">
          <DialogTitle className="text-white text-base">
            Play Trailer
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => setOpen(false)}
          >
            <X />
          </Button>
        </DialogHeader>
        {trailer !== "" ? (
          <div className="relative pt-[50%]">
            <iframe
              src={`https://www.youtube.com/embed/${trailer}`}
              allowFullScreen
              frameBorder="0"
              className="absolute top-0 left-0 w-full h-full object-contain"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <div className="relative pt-[50%]">
            <img
              src="/no-video-available.jpg"
              alt="No trailer available"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TrailerDialog;
