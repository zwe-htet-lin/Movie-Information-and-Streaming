"use client";

import {
  Dialog,
  DialogClose,
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
  videoName: string;
  videoKey: string;
}

const VideoDialog = ({ open, setOpen, videoName, videoKey }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="border-0 bg-black p-0 md:min-h-[70%] md:min-w-[70%] lg:min-h-[90%] lg:min-w-[80%]">
        <DialogHeader className="min-w-0 px-4 py-2">
          <DialogTitle className="truncate text-left text-base">
            {videoName}
          </DialogTitle>
          {/* <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => handleClose()}
          >
            <X />
          </Button> */}
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <X className="h-4 w-4 text-white" />
            </Button>
          </DialogClose>
        </DialogHeader>
        {videoKey !== "" ? (
          <div className="relative pt-[50%]">
            <iframe
              src={`https://www.youtube.com/embed/${videoKey}`}
              allowFullScreen
              frameBorder="0"
              className="absolute top-0 left-0 h-full w-full object-contain"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <div className="relative pt-[50%]">
            <img
              src="/no-video-available.jpg"
              alt="No trailer available"
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
