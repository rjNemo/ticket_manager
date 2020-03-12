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
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UWkNSRFEzUkRnd1FUQXlNRFExTmtOQ09UQXlSamhGTURaRU1Ea3pNRGxHUkRrelFqZENSZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1meWpydm9oeC5hdXRoMC5jb20vIiwic3ViIjoiR3dlZTlGUnN3ejNWNE5vZFVRTjJIcjJyQjJTMDI1UmZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvYXBpL1YxLyIsImlhdCI6MTU4NDAzNzQyMCwiZXhwIjoxNTg0MTIzODIwLCJhenAiOiJHd2VlOUZSc3d6M1Y0Tm9kVVFOMkhyMnJCMlMwMjVSZiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.hbn9fRaMYZuvapjCWB0cvwWlEZ6oDoN8nPN8cSkX720VNHYg4JxwVRf4wnf5nOMLUUEIbUudmkBeCZSeW87SQUi41rEHnB9xDXxbVTiEkmyy1yiZUdsDc9Z_hi1nCzKtrbTRmSA6Uo8aHFF2hBGK2_QUcY6hx3Dqx3OYeNbAVx0xjp5OV4XvhVqA9TH3PP_OziJ9NtZAgGzn8pBRlbuTP0ZXL4pXvbcDNcnInx8r5xT_YYxdGqWBgpSqTrfv5t0fUrnjr4ICW49zSBHhA2Nee456c-hlijJ6ufsFcbqegsN7DkFcpWysrY943bIqXJK9XhZlFnz7kBK2nf8culwtmw"
});
