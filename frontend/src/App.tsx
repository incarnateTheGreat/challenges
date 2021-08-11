import React from "react";
import { Router, Route, Switch } from "react-router";
import { createBrowserHistory } from "history";
import routes from "routes/routes";
import { handleNavClick } from "utils/utils";

// Initialize the History Browser History.
const history = createBrowserHistory();

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <header>
        <h3>Didomi</h3>
      </header>
      <section>
        <div className="row">
          <nav className="col s4 m3 l2">
            <ul>
              {routes.map((route, key) => {
                return (
                  <li
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
          <article className="col s8 m9 l10">
            <Router history={history}>
              <Switch>
                {routes.map((route, key) => (
                  <Route
                    key={key}
                    path={route.path}
                    component={route.component}
                    exact={route.exact}
                  />
                ))}
              </Switch>
            </Router>
          </article>
        </div>
      </section>
      <footer>
        <div className="footer-container">
          &copy; Didomi {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default App;
