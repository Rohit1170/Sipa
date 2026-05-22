export interface ParsedAddress {
  address1: string;
  city: string;
  state: string;
  pincode: string;
}

type GeocoderComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

export function parseAddressComponents(
  components: GeocoderComponent[]
): ParsedAddress {
  const get = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name ?? "";

  const subpremise   = get("subpremise");
  const premise      = get("premise");
  const streetNumber = get("street_number");
  const route        = get("route");
  const sublocality3 = get("sublocality_level_3");
  const sublocality2 = get("sublocality_level_2");
  const sublocality1 = get("sublocality_level_1");

  const address1 = [subpremise, premise, streetNumber, route, sublocality3, sublocality2, sublocality1]
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  const city =
    get("locality") ||
    get("administrative_area_level_3") ||
    get("administrative_area_level_2");

  return {
    address1: address1 || sublocality1 || "",
    city,
    state: get("administrative_area_level_1"),
    pincode: get("postal_code"),
  };
}
