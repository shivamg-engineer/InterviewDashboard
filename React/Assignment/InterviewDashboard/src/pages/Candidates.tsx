import { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_PERMISSIONS, type DummyUser, type InterviewStatus } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Search, ChevronLeft, ChevronRight, Eye, MessageSquare, ArrowUpDown } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

function getInterviewStatus(user: DummyUser): InterviewStatus {
  const hash = user.id * 7;
  const statuses: InterviewStatus[] = ['scheduled', 'completed', 'no_show', 'pending'];
  return statuses[hash % statuses.length];
}

const statusStyles: Record<InterviewStatus, string> = {
  scheduled: 'bg-info/10 text-info border-info/20',
  completed: 'bg-success/10 text-success border-success/20',
  no_show: 'bg-destructive/10 text-destructive border-destructive/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
};

export default function Candidates() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const perms = ROLE_PERMISSIONS[user!.role];

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(0);
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'department'>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  // Debounce search
  const debounceTimer = useCallback(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);
  useMemo(debounceTimer, [debounceTimer]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['candidates', debouncedSearch],
    queryFn: () => fetchUsers(100, 0, debouncedSearch),
  });

  const users: DummyUser[] = data?.users ?? [];

  const departments = useMemo(() => {
    const deps = [...new Set(users.map((u) => u.company.department))];
    return deps.sort();
  }, [users]);

  const filtered = useMemo(() => {
    let result = users;
    if (departmentFilter !== 'all') {
      result = result.filter((u) => u.company.department === departmentFilter);
    }
    result.sort((a, b) => {
      const valA = sortField === 'name' ? `${a.firstName} ${a.lastName}` : a.company.department;
      const valB = sortField === 'name' ? `${b.firstName} ${b.lastName}` : b.company.department;
      return sortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
    return result;
  }, [users, departmentFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  const toggleSort = (field: 'name' | 'department') => {
    if (sortField === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortField(field); setSortDir('asc'); }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-destructive">Failed to load candidates. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Candidates</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage and review interview candidates</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-10"
            maxLength={100}
            aria-label="Search candidates"
          />
        </div>
        <Select value={departmentFilter} onValueChange={(v) => { setDepartmentFilter(v); setPage(0); }}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {departments.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" role="table">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium text-muted-foreground">
                    <button onClick={() => toggleSort('name')} className="inline-flex items-center gap-1 hover:text-foreground">
                      Name <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">
                    <button onClick={() => toggleSort('department')} className="inline-flex items-center gap-1 hover:text-foreground">
                      Department <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Role</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td colSpan={5} className="p-4"><Skeleton className="h-8 w-full" /></td>
                    </tr>
                  ))
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">No candidates found</td>
                  </tr>
                ) : (
                  paginated.map((u) => {
                    const status = getInterviewStatus(u);
                    return (
                      <tr key={u.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={u.image} alt="" className="w-8 h-8 rounded-full bg-muted" />
                            <div>
                              <p className="font-medium">{u.firstName} {u.lastName}</p>
                              <p className="text-xs text-muted-foreground">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 hidden md:table-cell text-muted-foreground">{u.company.department}</td>
                        <td className="p-4 hidden lg:table-cell text-muted-foreground">{u.company.title}</td>
                        <td className="p-4">
                          <Badge variant="outline" className={statusStyles[status]}>
                            {status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => navigate(`/candidates/${u.id}`)} aria-label={`View ${u.firstName}`}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            {perms.canSubmitFeedback && (
                              <Button variant="ghost" size="sm" onClick={() => navigate(`/candidates/${u.id}?tab=feedback`)} aria-label={`Feedback for ${u.firstName}`}>
                                <MessageSquare className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing {page * ITEMS_PER_PAGE + 1}–{Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
