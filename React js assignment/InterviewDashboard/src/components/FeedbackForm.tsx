import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

const feedbackSchema = z.object({
  overallScore: z.coerce
    .number({ invalid_type_error: 'Score is required' })
    .min(1, 'Minimum score is 1')
    .max(5, 'Maximum score is 5'),
  strengths: z.string().trim().min(5, 'At least 5 characters').max(500, 'Max 500 characters'),
  areasForImprovement: z.string().trim().min(5, 'At least 5 characters').max(500, 'Max 500 characters'),
});

type FormValues = z.infer<typeof feedbackSchema>;

export default function FeedbackForm({ candidateId }: { candidateId: number }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<FormValues>({
    resolver: zodResolver(feedbackSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues) => {
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
          <h3 className="text-lg font-semibold">Feedback Submitted</h3>
          <p className="text-sm text-muted-foreground mt-1">Your feedback for candidate #{candidateId} has been recorded.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Submit Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-2">
            <Label htmlFor="overallScore">Overall Score (1–5)</Label>
            <Input
              id="overallScore"
              type="number"
              min={1}
              max={5}
              step={1}
              {...register('overallScore')}
              aria-invalid={!!errors.overallScore}
              aria-describedby="score-error"
            />
            {errors.overallScore && <p id="score-error" className="text-xs text-destructive">{errors.overallScore.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="strengths">Strengths</Label>
            <Textarea
              id="strengths"
              placeholder="Candidate's key strengths…"
              maxLength={500}
              {...register('strengths')}
              aria-invalid={!!errors.strengths}
            />
            {errors.strengths && <p className="text-xs text-destructive">{errors.strengths.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="areasForImprovement">Areas for Improvement</Label>
            <Textarea
              id="areasForImprovement"
              placeholder="Areas where the candidate could improve…"
              maxLength={500}
              {...register('areasForImprovement')}
              aria-invalid={!!errors.areasForImprovement}
            />
            {errors.areasForImprovement && <p className="text-xs text-destructive">{errors.areasForImprovement.message}</p>}
          </div>

          <Button type="submit" disabled={!isValid || submitting}>
            {submitting ? 'Submitting…' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
