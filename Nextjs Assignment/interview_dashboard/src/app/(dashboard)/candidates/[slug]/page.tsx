"use client";

import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchUserById, fetchTodosByUser, fetchPostsByUser } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_PERMISSIONS } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Mail, Phone, MapPin, Building, GraduationCap } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';
import Image from 'next/image';

export default function CandidateDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const id = slug;
  const searchParams = useSearchParams();
  const { user: authUser } = useAuth();
  const perms = ROLE_PERMISSIONS[authUser!.role];
  const defaultTab = searchParams.get('tab') || 'profile';
  const userId = Number(id);

  const { data: candidate, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: !isNaN(userId),
  });

  const { data: todosData } = useQuery({
    queryKey: ['todos', userId],
    queryFn: () => fetchTodosByUser(userId),
    enabled: !isNaN(userId) && perms.canViewSchedule,
  });

  const { data: postsData } = useQuery({
    queryKey: ['posts', userId],
    queryFn: () => fetchPostsByUser(userId),
    enabled: !isNaN(userId) && perms.canViewFeedback,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (!candidate) {
    return <p className="text-center text-muted-foreground py-16">Candidate not found</p>;
  }

  const todos = todosData?.todos ?? [];
  const posts = postsData?.posts ?? [];

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Image src={candidate.image} alt="candidate" width={64} height={64} className="rounded-full bg-muted" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{candidate.firstName} {candidate.lastName}</h1>
              <p className="text-muted-foreground">{candidate.company?.title} &middot; {candidate.company?.department}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" />{candidate.email}</span>
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" />{candidate.phone}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{candidate.address?.city}, {candidate.address?.state}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue={defaultTab}>
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          {perms.canViewSchedule && <TabsTrigger value="schedule">Schedule</TabsTrigger>}
          {perms.canViewFeedback && <TabsTrigger value="feedback">Feedback</TabsTrigger>}
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Personal Info</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Age</span><span>{candidate.age}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Gender</span><span className="capitalize">{candidate.gender}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Birth Date</span><span>{candidate.birthDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Blood Group</span><span>{candidate.bloodGroup}</span></div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><Building className="w-4 h-4" />Company</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Company</span><span>{candidate.company?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Department</span><span>{candidate.company?.department}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Title</span><span>{candidate.company?.title}</span></div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader><CardTitle className="text-base flex items-center gap-2"><GraduationCap className="w-4 h-4" />Education</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm">{candidate.university}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {perms.canViewSchedule && (
          <TabsContent value="schedule" className="mt-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Interview Schedule</CardTitle></CardHeader>
              <CardContent>
                {todos.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">No scheduled interviews</p>
                ) : (
                  <div className="space-y-3">
                    {todos.slice(0, 10).map((todo: any) => (
                      <div key={todo.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                        <p className="text-sm font-medium">{todo.todo}</p>
                        <Badge variant="outline" className={todo.completed ? 'bg-success/10 text-success border-success/20' : 'bg-warning/10 text-warning border-warning/20'}>
                          {todo.completed ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {perms.canViewFeedback && (
          <TabsContent value="feedback" className="mt-4 space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Previous Feedback</CardTitle></CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <p className="text-muted-foreground text-sm py-4 text-center">No feedback submitted yet</p>
                ) : (
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post: any) => (
                      <div key={post.id} className="border border-border/50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{post.title}</h4>
                          <div className="flex gap-1">
                            {post.tags?.map((tag: string) => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.body}</p>
                        <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{post.reactions?.likes} likes</span>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {perms.canSubmitFeedback && <FeedbackForm candidateId={userId} />}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
