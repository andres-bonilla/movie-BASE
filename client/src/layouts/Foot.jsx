import React from "react";

import tmdbLogo from "../assets/tmdb_logo.svg";
import PortfolioLogo from "../assets/portfolio_logo.svg?react";

export const Foot = ({ colorMode }) => {
  return (
    <footer id="foot" className={`${colorMode} fade-in-large`}>
      <a
        id="portfolio"
        className="no-link-style"
        href="https://andres-bonilla.vercel.app"
      >
        <PortfolioLogo id="portfolio-logo" />

        <span id="name">
          Andrés
          <br />
          Bonilla
          <br />© 2024
        </span>
      </a>

      <span id="rights" className="label">
        All Rights Reserved.
      </span>

      <a id="tmdb" className="no-link-style" href="https://www.themoviedb.org">
        <span className="label">Powered by:</span>

        <img id="tmdb-logo" src={tmdbLogo} alt="TMDB" />
      </a>
    </footer>
  );
};
