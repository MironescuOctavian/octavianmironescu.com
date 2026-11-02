import { For, type Component } from "solid-js";
import { RLButton } from "@rimelight/ui";

export interface SocialLink {
  icon: string;
  href: string;
  ariaLabel: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    icon: "i-mdi-instagram",
    href: "https://www.instagram.com/notoctamusic/",
    ariaLabel: "Instagram",
  },
  {
    icon: "i-mdi-discord",
    href: "https://discord.com/users/402152425756295178",
    ariaLabel: "Discord",
  },
  {
    icon: "i-mdi-spotify",
    href: "https://open.spotify.com/user/goldydalion?si=598f3277e5b54442",
    ariaLabel: "Spotify",
  },
  {
    icon: "i-mdi-github",
    href: "https://github.com/MironescuOctavian",
    ariaLabel: "GitHub",
  },
  {
    icon: "i-mdi-linkedin",
    href: "https://www.linkedin.com/in/octavian-mironescu-a605b921a/",
    ariaLabel: "LinkedIn",
  },
] as const;

export interface SocialLinksProps {
  class?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const SocialLinks: Component<SocialLinksProps> = (props) => {
  return (
    <div class={`flex flex-wrap items-center gap-3 ${props.class ?? ""}`}>
      <For each={SOCIAL_LINKS}>
        {(socialLink) => (
          <RLButton
            href={socialLink.href}
            target="_blank"
            rel="noopener noreferrer"
            ariaLabel={socialLink.ariaLabel}
            icon={socialLink.icon}
            color="primary"
            variant="outline"
            square={true}
            size={props.size ?? "md"}
            class="rounded-xl border border-primary-700 bg-primary-950/30 text-primary-400 transition-all hover:-translate-y-0.5 hover:border-primary-400 hover:bg-primary-900/50 hover:text-primary-200"
          />
        )}
      </For>
    </div>
  );
};

export default SocialLinks;
