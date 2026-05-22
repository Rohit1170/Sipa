export interface PincodeResult {
  city: string;
  state: string;
}

interface PostalApiEntry {
  Status: string;
  PostOffice?: {
    District: string;
    Block: string;
    Division: string;
    State: string;
  }[];
}

export async function lookupPincode(
  pincode: string,
  signal?: AbortSignal
): Promise<PincodeResult | null> {
  const res = await fetch(`/api/pincode/${pincode}`, { signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data: PostalApiEntry[] = await res.json();
  const entry = data?.[0];

  if (entry?.Status !== "Success" || !entry?.PostOffice?.length) {
    return null;
  }

  const po = entry.PostOffice[0];
  return {
    city:  po.District || po.Block || po.Division || "",
    state: po.State || "",
  };
}
