import { Suspense } from "react";
import Counter from "@/app/components/Counter";
import DelayedContent from "./components/DelayedContent";
import Comments from "./components/Comments";
import { submitForm } from "./actions";
import DynamicData from "./components/DynamicData";
import Spinner from "./components/Spinner";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        exercise 1
        <Suspense fallback={<p>Loading counter...</p>}>
          <Counter />
        </Suspense>
<hr />
        exercise 2
        <div>
          <h1> streaming example</h1>
          <Suspense fallback={<p>Loading...</p>}>
            <DelayedContent />
          </Suspense>
        </div>


        exercise 3
        <div>
          {/* Static Section */}
          <header>
            <h1>Blog Post</h1>
            <p>This header renders immediately (server-side).</p>
          </header>

          {/* Dynamic Section */}
          <Suspense fallback={<p>Loading comments...</p>}>
            <Comments />
          </Suspense>
        </div>

        exercise 4
        <div>
          <h1>Server Action Form</h1>

          <form action={submitForm}>
            <div>
              <label>Name</label>
              <input type="text" name="name" required />
            </div>

            <div>
              <label>Email</label>
              <input type="email" name="email" required />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>

        exercise 5
        <div>
          {/* Static Section */}
          <header>
            <h1>Next.js Partial Pre-rendering Demo</h1>
            <p>This header renders instantly.</p>
          </header>

          {/* Dynamic Section */}
          <Suspense fallback={<Spinner />}>
            <DynamicData />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
