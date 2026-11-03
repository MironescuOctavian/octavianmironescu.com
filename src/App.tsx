import { pageRoutes } from "virtual:file-routes";
import { fileRoutes } from "@solidjs/router/fs";
import { createRouter } from "@solidjs/router";
import { RLErrorBoundary } from "@rimelight/ui/components/error-boundary/RLErrorBoundary.tsx";
import { RLI18n } from "@rimelight/i18n/solid";
import { Loading } from "solid-js";

const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export default function App() {
  return (
    <Router>
      {(props) => (
        <RLErrorBoundary resetKey={props.location.pathname}>
          <Loading fallback={<main>Loading.</main>}>
            <RLI18n pathname={props.location.pathname}>{props.children}</RLI18n>
          </Loading>
        </RLErrorBoundary>
      )}
    </Router>
  );
}
