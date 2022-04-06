/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Link } from "react-router-dom";


function PageNotFound() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default PageNotFound;
