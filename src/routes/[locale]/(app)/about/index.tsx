import { useHead } from "@solidjs/web";
import { createPageHead } from "@rimelight/seo/head";
import { t } from "@rimelight/i18n";
import { For } from "solid-js";
import { RLButton } from "@rimelight/ui/components/button/RLButton.tsx";

const WorkList = {
  regularly: ["Java", "Spring Boot", "TypeScript", "SolidJS", "MongoDB"],
  whenNecessary: ["Python", "Kotlin", "AWS", "SQL"],
};

export default function AboutPage() {
  useHead(() =>
    createPageHead({
      title: t("app.text.about"),
      description: t("app.text.about-this-website"),
    }),
  );

  return (
    <>
      <div class={"flex flex-col gap-12 px-6 py-12 max-w-6xl mx-auto"}>
        <section class={"flex flex-col gap-12 px-6 py-12 max-w-6xl mx-auto"}>
          {/* About me section */}
          <header>
            <h1 class={"text-8xl font-bold mb-6"}>
              About Octavian<span class={"text-primary-500"}>.</span>
            </h1>
            <p class={"text-xl text-gray-400 mb-8"}>
              Software Developer, Bucharest. Multiple years of taking business problems
              <br />
              from first sketch to production code.
            </p>
          </header>

          <div class={"flex flex-col md:flex-row gap-12"}>
            <div class={"flex-1 space-y-6 leading-7 text-gray-400"}>
              <p>
                I'm a software developer working out of Bucharest, mostly in{" "}
                <strong class="text-white">Java on the backend and TypeScript on the front</strong>.
                The short version: I take a business problem, design the thing that answers it,
                build it, and stay around long enough to deploy it and fix what I got wrong.
              </p>

              <p>
                I studied computer science at Ovidius University in Constanța, a bachelor's degree
                and then a master's, finishing in 2023. My first role was at Property Pass, a real
                estate company in Utrecht, where I built the Kotlin and Spring Boot application
                behind their property passports, modelled the data in MongoDB, and wrote the
                aggregation pipelines the business side ran their reporting on.
              </p>

              <p>
                After that I spent most of 2023 at CoruScript in Bucharest, developing and
                maintaining the Java and Spring backend of a platform that builds applications for
                other companies, along with the AWS pipelines it ran on. Since February 2024 I've
                worked independently, one project at a time, for clients who need a website, an API,
                or the automation glue between the two.
              </p>

              <p>
                The work I'm best at sits between a real-world process and a screen: property
                records, quoting, ordering, the kind of software where{" "}
                <strong class="text-white">
                  the users have a day job and the software had better respect it.
                </strong>{" "}
                I work in English and Romanian fluently, am slowly adding German, and keep a small
                Discord automation bot in Java alive for the communities that still use it.
              </p>
            </div>

            <div class={"flex-1"}>
              <img
                src={"https://placehold.co/600x600/101010/16a34a?text=Photo"}
                alt={"Mironescu Octavian"}
                class={"w-full object-cover"}
              />
            </div>
          </div>
          <hr />
        </section>
        <section class="flex flex-col gap-12 px-6 py-12 max-w-6xl mx-auto">
          {/* What I work with section */}
          <h1 class="text-white font-bold text-5xl mb-4">
            What I work with<span class="text-primary-500">.</span>
          </h1>

          <div class="flex flex-col md:flex-row gap-12 w-full">
            {/* List Left */}
            <div class="flex-1 min-w-0">
              <p class="text-gray-400 mb-8">[Regularly]</p>

              <ul class="text-gray-300">
                <For each={WorkList.regularly}>
                  {(item) => <li class="border-b border-gray-700 py-5 text-lg">{item}</li>}
                </For>
              </ul>
            </div>

            {/* List Right */}
            <div class="flex-1 min-w-0">
              <p class="text-gray-400 mb-8">[When necessary.]</p>

              <ul class="text-gray-300">
                <For each={WorkList.whenNecessary}>
                  {(item) => <li class="border-b border-gray-700 py-5 text-lg">{item}</li>}
                </For>
              </ul>
            </div>
          </div>

          <p class="text-gray">
            No percentages, no star ratings. If you want the formal CV as a PDF,{" "}
            <a class="underline text-white">email me</a> and I'll send it over.
          </p>

          <hr />
        </section>
        <section class={"bg-primary-700"}>
          {/* Contact me*/}
          <div class={"flex flex-col gap-12 px-6 py-12 max-w-6xl mx-auto"}>
            <h1 class={"flex text-2xl font-bold justify-center"}>
              If you want to get in contact with me, you can reach me here:
            </h1>
            <div class={"flex flex-col items-center align-center"}>
              <RLButton href={"/contact"} size={"xl"} class={"font-bold text-white"}>
                Contact
              </RLButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
