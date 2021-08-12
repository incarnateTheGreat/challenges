import React, { useMemo } from "react";
import { Router, Route, Switch } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserHistory } from "history";
import { Toaster } from "react-hot-toast";
import routes from "routes/routes";
import { ConsentsContext } from "interfaces/interface";
import { assignActivePageClass, handleNavClick } from "utils/utils";
import { store, persistor } from "reducers/store";

// Initialize the History Browser History.
const history = createBrowserHistory();

// Initialize the Query Client.
const queryClient = new QueryClient();

const App: React.FC = (): JSX.Element => {
  const repoName = "consentsRepo";

  // Store values for context and memoize them.
  const values: ConsentsContext = useMemo(
    () => ({
      repoName,
    }),
    [repoName]
  );

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ConsentsContext.Provider value={values}>
            <Toaster
              toastOptions={{
                duration: 5000,
              }}
            />
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
                            className={assignActivePageClass(route.path, "")}
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
          </ConsentsContext.Provider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
