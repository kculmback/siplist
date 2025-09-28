import { UserButton } from '@daveyplate/better-auth-ui';
import { Link } from '@tanstack/react-router';
import { SidebarTrigger } from './ui/sidebar';

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <nav className="flex flex-row justify-between items-center w-full">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <UserButton size="icon" />
          <SidebarTrigger className="-mr-1 ml-auto rotate-180 md:hidden" />
        </div>
      </nav>
    </header>
  );
}
