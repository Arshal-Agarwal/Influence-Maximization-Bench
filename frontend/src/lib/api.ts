export async function runIM(payload: any) {
  const start = performance.now();

  const res = await fetch("http://localhost:8000/api/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const end = performance.now();
  const localRuntime = end - start;

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("Backend returned non-JSON response (likely a 500 error)");
  }

  if (!res.ok) {
    throw new Error(json?.detail || "Server error");
  }

  return { ...json, localRuntime };
}
