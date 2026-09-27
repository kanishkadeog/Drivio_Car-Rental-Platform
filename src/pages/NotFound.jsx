// car-rental-platform/src/pages/NotFound.jsx

import { Link } from "react-router-dom";
import PageTransition from "../components/common/PageTransition";
import Button from "../components/common/Button/Button";

function NotFound() {
  return (
    <PageTransition>
      <section className="section">
        <div className="container">
          <p className="section-label">
            404 — Page not found
          </p>

          <h1 className="section-title">
            Wrong turn.
          </h1>

          <p className="section-description">
            Looks like you've taken a road that doesn't
            exist.
          </p>

          <div style={{ marginTop: "32px" }}>
            <Link
              to="/"
              style={{
              display: "inline-flex",
              marginTop: "32px",
              }}
            >
              <Button>
                 Back home
              </Button>
           </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default NotFound;