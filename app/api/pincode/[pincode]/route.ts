import { NextRequest, NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const pincodeLookup = require("india-pincode-lookup");

function toTitleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ pincode: string }> }
) {
  const { pincode } = await params;

  if (!/^\d{6}$/.test(pincode)) {
    return NextResponse.json({ error: "Invalid pincode" }, { status: 400 });
  }

  const results: { districtName: string; stateName: string }[] =
    pincodeLookup.lookup(Number(pincode));

  if (!results?.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    city:  results[0].districtName,
    state: toTitleCase(results[0].stateName),
  });
}
