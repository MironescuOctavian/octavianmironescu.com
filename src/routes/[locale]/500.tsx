import AppLayout from "#layouts/AppLayout.tsx"
import AppError from "#components/app/AppError.tsx"

interface ErrorPage500Props {
  error?: Error | undefined
}

export default function ErrorPage500(props: ErrorPage500Props) {
  return (
    <AppLayout
      title="500 - Internal Server Error"
      description="An unexpected error occurred on the server."
      noindex
    >
      <AppError
        code={500}
        title="Internal Server Error"
        description={
          props.error instanceof Error
            ? props.error.message
            : "An unexpected error occurred on the server."
        }
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
