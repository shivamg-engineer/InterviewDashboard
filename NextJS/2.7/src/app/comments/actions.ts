"use server";

import { resolve } from "path";

export async function addComment(comment: string) {
  // simulate slow server
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("New Comment:", comment);

  // INTENTIONAL FAILURE
  //   throw new Error("Server failed to save comment")
  // simulate failure example
  if (comment === "fail") {
    throw new Error("Failed to save comment");
  }

  return { success: true };
}
