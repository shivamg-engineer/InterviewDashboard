import { useAuth } from "@/context/AuthContext";

function KPICard({ title, value, subtitle, icon, Icon, accentClass }: {
  title:string; 
  value:string | number;
   subtitle:string; 
   icon:React.ElementType; 
   accentClass:string;
}) {

}

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen p-6">
      <div className="glass-card rounded-2xl p-6 max-w-2xl mx-auto text-left">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as <span className="font-mono">{user?.username}</span> ({user?.role})
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-4 rounded-lg bg-secondary px-3 py-2 text-secondary-foreground"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

