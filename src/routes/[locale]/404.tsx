import AppLayout from "#layouts/AppLayout.tsx"
import AppError from "#components/app/AppError.tsx"

export default function ErrorPage404() {
  return (
    <AppLayout title="404 - Not Found" description="Page has not been found." noindex is404>
      <AppError
        code={404}
        title="Page Not Found"
        description="Page has not been found."
        actions={[
          {
            label: "Go to Home Page",
            href: "/",
            variant: "solid",
            color: "primary",
            icon: "i-lucide-home"
          }
        ]}
      />
    </AppLayout>
  )
}
