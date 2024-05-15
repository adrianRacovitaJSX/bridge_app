"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { start } from "repl";

const Table = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium lg:text-xl xl:min-w-32">{title}</h1>
    <h2 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
      {description}
    </h2>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const meetingId = user?.id;
  const router = useRouter();
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reunion/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);
  const { toast } = useToast();
  const startRoom = async () => {

    if(!client || !user) return;

    if(!call) {
    const newCall = client.call('default', meetingId!)
    await newCall.getOrCreate({
      data: {
        starts_at: new Date().toISOString(),
      }
    })
  }
  router.push(`/reunion/${meetingId}?personal=true`)
};

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Reunión personal</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table
          title="Descripcion:"
          description={`Reunión de ${user?.username}`}
        />
        <Table title="ID de reunión:" description={meetingId} />
        <Table title="Enlace de invitación:" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Iniciar reunión
        </Button>
        <Button
          className="bg-dark-3"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({
              title: "¡Enlace copiado!",
            });
          }}
        >
          Copiar invitación
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
