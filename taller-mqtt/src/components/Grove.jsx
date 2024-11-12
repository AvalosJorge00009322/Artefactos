import React from "react";
import Navbar from "./Navbar";
import CardField from "./CardField";

const Grove = () => {
    return (
    <main className="min-h-[100dvh] h-full bg-[#162D1B] justify-center items-center">
      <Navbar title="HUERTO"/>
      <CardField />    
    </main>
    );
  };
  
  export default Grove;