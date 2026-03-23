import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, Lock, Shield, User } from "lucide-react";
import type { UserRole } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { loginUser } from "@/lib/api";
import { Button } from "@/components/ui/button";


const DEMO_CREDENTIALS = [
  { username: 'emilys', password: 'emilyspass' },
  { username: 'michaelw', password: 'michaelwpass' },
];

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>("admin");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        // Input validation
        const trimmedUsername = username.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || trimmedUsername.length < 2 || trimmedUsername.length > 50) {
            setError('Username must be 2–50 characters');
            return;
        }
        if (!trimmedPassword || trimmedPassword.length < 4 || trimmedPassword.length > 100) {
            setError('Password must be 4–100 characters');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await loginUser(trimmedUsername, trimmedPassword);
            login(
                {
                    id: res.id,
                    username: res.username,
                    email: res.email,
                    firstName: res.firstName,
                    lastName: res.lastName,
                    image: res.image,
                    token: res.accessToken,
                },
                role
            );
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen login-gradient flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 mb-4">
                        <Briefcase className="w-7 h-7 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Interview Hub</h1>
                    <p className="text-slate-400 mt-2 text-sm">Sign in to manage interviews</p>
                </div>
                <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 bg-white/5 border-white/10 space-y-5" noValidate>
                    {error && (
                        <div>
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="username" className="block text-sm font-medium text-white mb-1">Username</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary"
                                maxLength={50}
                                autoComplete="username"
                                aria-required="true"
                                aria-invalid={submitted && !username.trim()}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-slate-300 text-sm font-medium">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-primary"
                                    maxLength={100}
                                    autoComplete="current-password"
                                    aria-required="true"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-slate-300 text-sm font-medium flex items-center gap-2">
                                <Shield className="w-3.5 h-3.5" /> Simulate Role
                            </Label>
                            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="ta_member">TA Member</SelectItem>
                                    <SelectItem value="panelist">Panelist</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Signing in…' : 'Sign In'}
                        </Button>

                        <div className="pt-3 border-t border-white/10">
                            <p className="text-xs text-slate-500 mb-2">Demo credentials:</p>
                            <div className="flex gap-2 flex-wrap">
                                {DEMO_CREDENTIALS.map((cred) => (
                                    <button
                                        key={cred.username}
                                        type="button"
                                        onClick={() => { setUsername(cred.username); setPassword(cred.password); }}
                                        className="text-xs px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-primary/50 transition-colors"
                                    >
                                        {cred.username}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    );
}
