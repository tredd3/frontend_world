//urls path
export const baseURL = "http://localhost:8000/v1/";
export const createCustomerUrl = `${baseURL}customers`;
export function getInspectionsUrl(inspectorId: number) {
  return `${baseURL}inspectors/${inspectorId}/inspections`;
}

// BASE_NAME_PATH
export const baseName = "";
export const imagesPath = `${baseName}/images`;
