import type { ParentProps } from "solid-js";
import type { JSX } from "@solidjs/web";
import { useLocation } from "@solidjs/router";

type Props = ParentProps<JSX.AnchorHTMLAttributes<HTMLAnchorElement>>;

export default function HeaderLink(props: Props) {
  const location = useLocation();
  const pathname = () => location.pathname;
  const subpath = () => pathname().match(/[^/]+/g);
  const isActive = () =>
    props.href === pathname() || (props.href && props.href === "/" + (subpath()?.[0] || ""));

  return (
    <a
      {...props}
      class={`${props.class || ""} ${isActive() ? "active font-bold underline" : ""} inline-block no-underline`}
    >
      {props.children}
    </a>
  );
}
