export interface PincodeResult {
  city: string;
  state: string;
}

export async function lookupPincode(
  pincode: string,
  signal?: AbortSignal
): Promise<PincodeResult | null> {
  const res = await fetch(`/api/pincode/${pincode}`, { signal });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: PincodeResult = await res.json();
  return data.city && data.state ? data : null;
}
