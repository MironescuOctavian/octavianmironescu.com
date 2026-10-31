import { pageRoutes } from "virtual:file-routes";
import { fileRoutes } from "@solidjs/router/fs";
import { createRouter } from "@solidjs/router";
import { Loading } from "solid-js";
import { RLErrorBoundary } from "@rimelight/ui";
import { RLI18n } from "@rimelight/i18n/solid";
import { t } from "@rimelight/i18n";

const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export default function App() {
  return (
    <Router>
      {(props) => (
        <RLErrorBoundary resetKey={props.location.pathname}>
          <Loading
            fallback={
              <main class="min-h-screen flex items-center justify-center">
                {t("app.loading.page")}
              </main>
            }
          >
            <RLI18n pathname={props.location.pathname}>{props.children}</RLI18n>
          </Loading>
        </RLErrorBoundary>
      )}
    </Router>
  );
}
