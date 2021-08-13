import React, { useMemo } from "react";
import { Redirect, Router, Route, Switch } from "react-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserHistory } from "history";
import { Toaster } from "react-hot-toast";
import routes from "routes/routes";
import { ConsentsContext, ConsentsContextValues } from "interfaces/interface";
import Nav from "components/Nav/nav.component";

// Initialize the History Browser History.
const history = createBrowserHistory();

// Initialize the Query Client.
const queryClient = new QueryClient();

const App: React.FC = (): JSX.Element => {
  const repoName = "consentsRepo";

  // Store values for context and memoize them.
  const values: ConsentsContextValues = useMemo(
    () => ({
      repoName,
    }),
    [repoName]
  );

  return (
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
              <Router history={history}>
                <Nav />
                <article className="col s12 m12 l10">
                  <Switch>
                    {routes.map((route, key) => {
                      return (
                        <Route
                          key={key}
                          path={route.path}
                          component={route.component}
                          exact={route.exact}
                        />
                      );
                    })}
                    <Redirect to="/give-consent" />
                  </Switch>
                </article>
              </Router>
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
  );
};

export default App;
