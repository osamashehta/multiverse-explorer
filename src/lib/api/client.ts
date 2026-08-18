const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing Rick and Morty API URL");
}

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, options);

  if (!response.ok) {
    const body = (await response.json()) as { error?: string };

    throw new Error(body.error ?? "Something went wrong");
  }

  return (await response.json()) as T;
}
