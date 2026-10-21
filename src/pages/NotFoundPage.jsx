import Icon from "../components/ui/Icon";
import { Button } from "../components/ui/Button";

export default function NotFoundPage({ onNavigate }) {
  return (
    <main className="w-full min-h-[75vh] flex items-center justify-center bg-background px-4 sm:px-lg py-24 text-center">
      <div className="max-w-md mx-auto flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon name="search_off" size={48} />
        </div>

        <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">
          404 Page Not Found
        </span>

        <h1 className="font-hero-lg text-4xl sm:text-5xl font-extrabold text-on-surface tracking-tight">
          Page Couldn't Be Located
        </h1>

        <p className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed">
          The requested page or resource doesn't exist or has been moved. You can return to the homepage or explore our core IT services.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto pt-2">
          <Button size="md" variant="primary" onClick={() => onNavigate("home")} icon="home">
            Return Home
          </Button>
          <Button size="md" variant="outline" onClick={() => onNavigate("services")} icon="grid_view">
            Explore Services
          </Button>
        </div>
      </div>
    </main>
  );
}
