import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const PageNotFound = (props: Props) => {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to='/'>Go to the home page</Link>
      </p>
    </div>
  );
};

export default PageNotFound;
