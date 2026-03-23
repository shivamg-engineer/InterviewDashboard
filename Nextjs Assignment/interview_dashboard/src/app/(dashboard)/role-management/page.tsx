"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/lib/api';
import type { DummyUser, UserRole } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, Save, CheckCircle } from 'lucide-react';

const ROLES: UserRole[] = ['admin', 'ta_member', 'panelist'];

const roleBadgeStyle: Record<UserRole, string> = {
  admin: 'bg-primary/10 text-primary border-primary/20',
  ta_member: 'bg-info/10 text-info border-info/20',
  panelist: 'bg-warning/10 text-warning border-warning/20',
};

export default function RoleManagement() {
  const { data, isLoading } = useQuery({
    queryKey: ['users-roles'],
    queryFn: () => fetchUsers(20, 0),
  });

  const users: DummyUser[] = data?.users ?? [];

  const [assignments, setAssignments] = useState<Record<number, UserRole>>({});
  const [saved, setSaved] = useState<Set<number>>(new Set());

  const getRole = (user: DummyUser): UserRole => {
    if (assignments[user.id]) return assignments[user.id];
    // Simulate role from id
    return ROLES[user.id % 3];
  };

  const handleRoleChange = (userId: number, role: UserRole) => {
    setAssignments((prev) => ({ ...prev, [userId]: role }));
    setSaved((prev) => { const n = new Set(prev); n.delete(userId); return n; });
  };

  const handleSave = (userId: number) => {
    setSaved((prev) => new Set(prev).add(userId));
    // Simulate save
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary" /> Role Management
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Assign and manage user roles (simulated)</p>
      </div>

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-medium text-muted-foreground">Permission</th>
                  {ROLES.map((r) => (
                    <th key={r} className="text-center p-3 font-medium text-muted-foreground capitalize">{r.replace('_', ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['View Dashboard', true, true, true],
                  ['View Candidates', true, true, true],
                  ['View Feedback', true, true, true],
                  ['Submit Feedback', false, false, true],
                  ['Manage Roles', true, false, false],
                  ['View Schedule', true, true, true],
                ].map(([perm, ...vals]) => (
                  <tr key={String(perm)} className="border-b border-border/50">
                    <td className="p-3">{String(perm)}</td>
                    {vals.map((v, i) => (
                      <td key={i} className="p-3 text-center">
                        {v ? <span className="text-success">✓</span> : <span className="text-muted-foreground">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User role assignments */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">User Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}</div>
          ) : (
            <div className="space-y-2">
              {users.slice(0, 15).map((u) => {
                const currentRole = getRole(u);
                const isSaved = saved.has(u.id);
                return (
                  <div key={u.id} className="flex items-center justify-between py-3 px-4 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={u.image} alt="" className="w-8 h-8 rounded-full bg-muted" />
                      <div>
                        <p className="text-sm font-medium">{u.firstName} {u.lastName}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={currentRole} onValueChange={(v) => handleRoleChange(u.id, v as UserRole)}>
                        <SelectTrigger className="w-36 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ROLES.map((r) => (
                            <SelectItem key={r} value={r} className="capitalize">{r.replace('_', ' ')}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" onClick={() => handleSave(u.id)} disabled={isSaved}>
                        {isSaved ? <CheckCircle className="w-4 h-4 text-success" /> : <Save className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
