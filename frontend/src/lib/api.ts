// frontend/src/lib/api.ts
export const API_BASE = 'http://localhost:5000/api';

export async function apiGet(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });
  if (!res.ok) throw new Error('API Error');
  return res.json();
}

export async function apiPost(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('API Error');
  return res.json();
}