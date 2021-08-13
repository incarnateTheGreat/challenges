import routes from "routes/routes";
import { withRouter } from "react-router-dom";
import { assignActivePageClass, handleNavClick } from "utils/utils";

const Nav = ({ history }) => {
  return (
    <nav className="siteNav col s12 m12 l2">
      <ul>
        {routes.map((route, key) => {
          return (
            <li
              className={assignActivePageClass(
                route.path,
                history.location.pathname
              )}
              key={key}
              onClick={handleNavClick(route.path, history)}
              title={route.label}
            >
              {route.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withRouter(Nav);
