import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="backdrop-filter backdrop-blur-lg bg-opacity-30 flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
       <div className="flex flex-col gap-6">
            {image && (
              <div className="flex justify-center">
                <Image src={image} width={72} height={72} alt="reunionNueva" />
              </div>
            )}
            <h1 className={cn('text-3xl font-bold leading-[42px]' , className)}>{title}</h1>
            {children}
            <Button 
            className="bg-blue-1 focus-visible:ring-0 "
            onClick={handleClick}
            >
                {buttonIcon && (
                     <Image src={buttonIcon} width={13} height={13} alt="iconoBoton" />)} &nbsp;
               {buttonText || 'Agendar reunion'} 
            </Button>
       </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
