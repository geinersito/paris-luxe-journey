import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-28 pb-12 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-secondary">
          404
        </p>
        <h1 className="mt-3 text-3xl font-display font-bold text-primary">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          The page you requested is not available. You can continue to booking
          or go back to the home page.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            onClick={() => navigate("/booking")}
            className="w-full sm:w-auto"
          >
            Go to Booking
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
