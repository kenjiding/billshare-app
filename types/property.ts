
export interface IProperty {
  id?: string;
  propertyId: string;
  managerId: string;
  address: string;
  state: string;
  postcode: string;
  piSerialNumber: string;
  city: string;
  photos: string[];
  trackableFacilities: string[];
  defaultFacilities: string[];
}
