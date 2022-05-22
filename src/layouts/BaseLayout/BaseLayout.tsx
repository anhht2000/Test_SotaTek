import { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => (
  <div>
    {/* <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/nothing-here">Nothing Here</Link>
        </li>
      </ul>
    </nav>

    <hr /> */}

    {children || <Outlet />}
  </div>
);

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
