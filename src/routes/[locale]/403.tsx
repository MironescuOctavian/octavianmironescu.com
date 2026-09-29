import AppLayout from "#layouts/AppLayout.tsx"
import AppError from "#components/app/AppError.tsx"

export default function ErrorPage403() {
  return (
    <AppLayout
      title="403 - Forbidden"
      description="You do not have permission to access this resource."
      noindex
    >
      <AppError
        code={403}
        title="Access Denied"
        description="You do not have permission to access this resource."
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
