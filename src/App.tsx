import "./index.css";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import BitcoinPoker from "./components/games/BitcoinPoker";
import logo from "./logo.svg";
import reactLogo from "./react.svg";


export function App() {
  return (
    // <div className="container mx-auto p-8 text-center">
        <BitcoinPoker />
  );
}

export default App;
