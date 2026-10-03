import AppLayout from "#layouts/AppLayout.tsx";
import AppError from "#components/app/AppError.tsx";

export default function ErrorPage401() {
  return (
    <AppLayout
      title="401 - Unauthorized"
      description="Authentication is required to access this page."
      noindex
    >
      <AppError
        code={401}
        title="Authentication Required"
        description="Authentication is required to access this page."
        actions={[
          {
            label: "Go to Home Page",
            href: "/",
            variant: "solid",
            color: "primary",
            icon: "i-lucide-home",
          },
        ]}
      />
    </AppLayout>
  );
}
