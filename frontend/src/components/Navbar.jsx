import { Settings, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="h-16 bg-white shadow-sm flex items-center justify-between px-10">
      <h1 className="text-2xl font-bold text-blue-600">
        Zoom
      </h1>

      <div className="flex gap-5">
        <Settings className="cursor-pointer" />
        <UserCircle2 className="cursor-pointer" size={30} />
      </div>
    </nav>
  );
}