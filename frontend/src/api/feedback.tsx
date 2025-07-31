export async function sendFeedback(feedback: string): Promise<void> {
  // Send feedback to the server
  try {
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ feedback }),
    });
  } catch (error) {
    console.error("Failed to send feedback:", error);
  }
}
