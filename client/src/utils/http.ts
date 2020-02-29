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
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UWkNSRFEzUkRnd1FUQXlNRFExTmtOQ09UQXlSamhGTURaRU1Ea3pNRGxHUkRrelFqZENSZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1meWpydm9oeC5hdXRoMC5jb20vIiwic3ViIjoiR3dlZTlGUnN3ejNWNE5vZFVRTjJIcjJyQjJTMDI1UmZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvYXBpL1YxLyIsImlhdCI6MTU4Mjk3MTQyMSwiZXhwIjoxNTgzMDU3ODIxLCJhenAiOiJHd2VlOUZSc3d6M1Y0Tm9kVVFOMkhyMnJCMlMwMjVSZiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.mH_ejE0gpMXrMIVUV7afuagTopCxm2x7F7Ash9L7zfOCQnw71E7NPsEh8w2_nFFz3lwm988vGbJhB_1G0oetK3VnqgahHn-ZJfk8RhQeKZQtCddbFCXSZzbsvi8XekpN2qLSZswrfxM4hiNfedQW1sM6wSbVbv4q6MrpPrtnepOo5lu67b9eHQZA5MQGqCLqqAZtEAa4Z8bVUCUcf3wU4e9W38LngrMSEMN62_ZZ8AVnjFVQ97zWEadJhYT54S9tVioY8jNR-38qjuYH_ZP3mVQg8INza9YFiYzIsIgdYufhorb_cSXc1qK1ZhHf4kRHaiHCYan-c9nN9SM9MCYA9A"
});
