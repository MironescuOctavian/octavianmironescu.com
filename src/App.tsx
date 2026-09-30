import { Loading } from "solid-js";
import { Router } from "./router";

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
