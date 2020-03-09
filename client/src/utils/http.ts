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
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UWkNSRFEzUkRnd1FUQXlNRFExTmtOQ09UQXlSamhGTURaRU1Ea3pNRGxHUkRrelFqZENSZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1meWpydm9oeC5hdXRoMC5jb20vIiwic3ViIjoiR3dlZTlGUnN3ejNWNE5vZFVRTjJIcjJyQjJTMDI1UmZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvYXBpL1YxLyIsImlhdCI6MTU4Mzc0MzE1OSwiZXhwIjoxNTgzODI5NTU5LCJhenAiOiJHd2VlOUZSc3d6M1Y0Tm9kVVFOMkhyMnJCMlMwMjVSZiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.G1PTca14OLP1Ty3YFJaW0n_LRiG8ib1Nw_OcDH4HgWKgK6sZlIQ6RuAxiJjE0X6c7sxiTmtVhsRF-dqnfXuQcMWouj-8nd5C1LdVco3D08t0megehCeSZ4ffjjDQXQjWwvahTfuxJhXFVwK1M7F-dtLnk6lUJC9EjRg5qwtT5pa_js47RawHZWSfm-h6A1tVVs_cjy4I4xQLThKYQ3bTR5fYGNjnfa2AybE9Dv2Q0JehSDqSt1zCyIAnZTxJmgUWPW7Rp2xnmHf6Usmpy_9P5HbnnuRXZ1IT3dllS6OMIki3xyTeJDlCxhI37Ib1Dtx6PaPbFAP88QiRy2hwSi_S6w"
});
