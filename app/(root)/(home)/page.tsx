import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("es-ES", {
    dateStyle: "full",
  }).format(now);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
  <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
    <div className="flex h-full flex-col justify-between px-5 py-8 lg:p-11 max-md:px-5 max-md:py-8">
      <h2 className="glassmorphism max-w-[373px] rounded py-2 text-center text-base font-normal">
        Próxima reunión el 14 de mayo a las 21:00
      </h2>
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
      </div>
    </div>
  </div>

      <MeetingTypeList />

    </section>
  );
};

export default Home;
