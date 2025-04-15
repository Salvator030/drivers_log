export type Address = {
  id: number | null;
  name: string;
  existingStreetsId: number | null;
  street: string | null;
  houseNumber: string;
  existingPlzId: number | null;
  plz: string | null;
  existingPlaceId: number | null;
  place: string;
  info: string;
};

export type Street = {
  streetId: number | null;
  name: string | null;
};

export type Place = {
  placeId: number | null;
  name: string | null;
};

export type Plz = {
  plzId: number | null;
  name: string | null;
};

export type Route = {
  routeId: number | null;
  startAddressId: number;
  endAddressId: number;
  distance: number;
};

export type FullValueRoute = {
  routeId: number | null;
  startAddress: Address;
  endAddress: Address;
  distance: number;
};

export type DrivenRoute = {
  drivenRouteId: number | null;
  date: Date;
  routeId: number | null | undefined;
};
