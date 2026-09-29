import { type Component, Show } from "solid-js"
import { useSearchParams } from "@solidjs/router"
import AppLayout from "#layouts/AppLayout.tsx"
import { RLCard, RLFormField, RLInput, RLButton, RLCheckbox, RLLogo } from "@rimelight/ui"

export const ConstructionPage: Component = () => {
  const [searchParams] = useSearchParams()
  const redirect = () => (searchParams["redirect"] as string) || "/"
  const isError = () => searchParams["error"] === "invalid"

  return (
    <AppLayout
      title="Under Construction"
      description="This website is under construction."
      noindex={true}
    >
      <div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div class="w-full max-w-md space-y-6 text-center">
          <div class="flex flex-col items-center gap-4">
            <RLLogo class="h-12 w-auto" variant="logomark" />
            <h1 class="m-0 text-3xl font-bold tracking-tight sm:text-4xl">
              THIS WEBSITE IS UNDER CONSTRUCTION
            </h1>
            <p class="m-0 text-neutral-400 text-sm">
              If you have access, please enter the passphrase.
            </p>
          </div>

          <RLCard class="text-left w-full">
            <Show when={isError()}>
              <div
                class="mb-4 rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-400"
                role="alert"
              >
                Invalid credentials. Please try again.
              </div>
            </Show>

            {/* Native Server-Side Form POST */}
            <form method="post" action="/api/construction-guest" class="flex flex-col gap-4">
              <input type="hidden" name="redirect" value={redirect()} />

              <RLFormField label="Passphrase" required>
                <RLInput
                  id="construction-passphrase-input"
                  type="password"
                  name="passphrase"
                  placeholder="Enter passphrase..."
                  class="w-full"
                  required
                  autofocus
                  autocomplete="current-password"
                />
              </RLFormField>

              <RLCheckbox
                id="construction-remember-me-checkbox"
                name="rememberMe"
                label="Remember me"
                checked
              />

              <RLButton type="submit" color="primary" variant="solid" block class="w-full mt-2">
                Sign In
              </RLButton>
            </form>
          </RLCard>
        </div>
      </div>
    </AppLayout>
  )
}

export default ConstructionPage
