export async function startAnonymousSession() {
  const response = await fetch("/api/anonymous-session/start", {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to start anonymous session");
  }
}
