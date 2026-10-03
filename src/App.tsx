import { Loading } from "solid-js";
import { pageRoutes } from "virtual:file-routes";
import { createRouter } from "@solidjs/router";
import { fileRoutes } from "@solidjs/router/fs";

const Router = createRouter({ routes: fileRoutes(pageRoutes) });

export default function App() {
  return (
    <Router>
      {(props) => (
        <Loading
          fallback={<main class="min-h-screen flex items-center justify-center">Loading…</main>}
        >
          {props.children}
        </Loading>
      )}
    </Router>
  );
}
