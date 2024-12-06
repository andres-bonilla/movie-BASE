import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { Search } from "../components/Search";

import MBLogo from "../assets/mb.svg?react";
import SmallMBLogo from "../assets/small-mb.svg?react";

export const Head = ({ colorMode }) => {
  const { pathname } = useLocation();
  const [isFloat, setIsFloat] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isHome, setIsHome] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsFloat(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsDetails(pathname.indexOf("details") !== -1);
    setIsHome(pathname === "/");
  }, [pathname]);

  const floatWithShadow = isFloat && !isDetails ? "float with-shadow" : "";

  return (
    <header id="head" className={`${colorMode} ${floatWithShadow}`}>
      <Link
        to="/"
        className={isDetails ? "logo-on-details" : isHome ? "disable-link" : ""}
      >
        <MBLogo id="mb-logo" className={!isDetails ? "fade-in-large" : ""} />
        <SmallMBLogo
          id="small-mb-logo"
          className={!isDetails ? "fade-in-large" : ""}
        />
      </Link>
      <Search withMargin={isDetails ? "with-left-space" : ""} />
    </header>
  );
};
