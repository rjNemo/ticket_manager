import { HttpResponse } from "../types/HttpResponse";

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);
  try {
    response.parsedBody = await response.json();
  } catch (ex) {}
  if (!response.ok) {
    throw response.statusText;
  }
  return response;
}

export async function get<T>(
  path: string,
  args: RequestInit = { method: "get", headers: headers }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "post",
    headers: headers,
    body: JSON.stringify(body)
  }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "put",
    headers: headers,
    body: JSON.stringify(body)
  }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

export async function patch<T>(
  path: string,
  body: any,
  args: RequestInit = {
    method: "patch",
    headers: headers,
    body: JSON.stringify(body)
  }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args));
}

const headers: Headers = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UWkNSRFEzUkRnd1FUQXlNRFExTmtOQ09UQXlSamhGTURaRU1Ea3pNRGxHUkRrelFqZENSZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1meWpydm9oeC5hdXRoMC5jb20vIiwic3ViIjoiR3dlZTlGUnN3ejNWNE5vZFVRTjJIcjJyQjJTMDI1UmZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvYXBpL1YxLyIsImlhdCI6MTU4NDE5ODQ4MCwiZXhwIjoxNTg0Mjg0ODgwLCJhenAiOiJHd2VlOUZSc3d6M1Y0Tm9kVVFOMkhyMnJCMlMwMjVSZiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.I1D49ILGBLhnq9biIA0y6Ra93zTKRDJI_rfGvU05MtT1zkI1ZliX9P-7LyKeWBv8tPonB6gT12lJiai_GHBET8kKbXNqwfVvDJ3eqYK-TtTqfL65RfWL9tQfQybHbfuF9M0oiXMqWMqmsc5Umpp4a3bLTQgwkUEKxcdMm84L7zoaqMycns4mFojWpQJKfPa64oZFDIXYy6hPDXcX50Djuk1m-aqMhtpmqkZvPfwEjvtEtGGCTOJHV7uugn3r8Wk4HX02ShrV676GICE1Yw7eHufAbY7yvHz3ImZ1cfEVrRbbijPA2vogXd5RmqNyindDDlT1Y_C80U0DyvhS7P7apQ"
});
