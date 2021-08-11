import React from "react";

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <header>
        <h3>Didomi</h3>
      </header>
      <section>
        <div className="row">
          <nav className="col s4 m3 l2">left</nav>
          <article className="col s8 m9 l10">
            <div className="input-field col s6">
              <input placeholder="Placeholder" id="name" type="text" />
              <label htmlFor="name">Name</label>
            </div>
            <div className="input-field col s6">
              <input placeholder="Placeholder" id="emailAddress" type="text" />
              <label htmlFor="emailAddress">Email</label>
            </div>
            <div className="optionBoxes">
              <p>
                <label>
                  <input
                    type="checkbox"
                    id="receiveNewsletter"
                    className="filled-in"
                  />
                  <span>Receive newsletter</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="enableTargetAds"
                    className="filled-in"
                  />
                  <span>Be shown targeted ads</span>
                </label>
                <label>
                  <input
                    type="checkbox"
                    id="enableAnonymousStatistics"
                    className="filled-in"
                  />
                  <span>Contribute to anonymous visit statistics</span>
                </label>
              </p>
            </div>
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
