import type { Middleware } from "@reduxjs/toolkit";

function hasType(action: unknown): action is { type: string } {
  return (
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as { type: unknown }).type === "string"
  );
}

export const loggerMiddleware: Middleware =
  (storeAPI) => (next) => (action) => {
    if (!hasType(action)) {
      return next(action);
    }
    if (import.meta.env.PROD) {
      return next(action);
    }

    console.group(`🟣 Action: ${action.type}`);
    console.log("📦 Prev State:", storeAPI.getState());
    console.log("🚀 Action:", action);

    const result = next(action);

    console.log("✅ Next State:", storeAPI.getState());
    console.groupEnd();

    return result;
  };
