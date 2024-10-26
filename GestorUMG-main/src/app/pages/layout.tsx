"use client";
import { Props } from "../models/Props";
import { useState } from "react";
import BSidebar from "../components/BSidebar";
import BNavbar from "../components/BNavbar";
import BFooter from "../components/BFooter";

export default function PagesLayout({ children }: Props) {
  const [vertical, setVertical] = useState(false);
  const [contraer, setContraer] = useState(false);
  var changeVertical = () => {
    setVertical(!vertical);
  };
  var changeContraer = () => {
    setContraer(!contraer);
  };
  return (
    <>
      <main
        className={
          contraer
            ? "main navbar-vertical-collapsed dx-viewport"
            : "main dx-viewport"
        }
        id="top"
      >
        <BSidebar vertical={vertical} contraer={changeContraer} />
        <BNavbar verticalFunc={changeVertical} />
        <div className="content">
          {children}
          <BFooter />
        </div>
      </main>
    </>
  );
}