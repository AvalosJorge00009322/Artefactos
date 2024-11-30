import React from "react";
import Navbar from "./Navbar";
import CardField from "./CardField";

const InternalGreenHouse = () => {
  return (
    <main className="min-h-[100dvh] h-full bg-[#162D1B] text-white p-6">
      <Navbar title="MONITOREO INTERNO" />
      <section className="container mx-auto mt-6">
        <h2 className="text-center text-3xl font-bold mb-8">
          Secciones del Invernadero
        </h2>
        <CardField />
      </section>
    </main>
  );
};

export default InternalGreenHouse;
