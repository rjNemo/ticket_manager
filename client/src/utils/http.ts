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
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UWkNSRFEzUkRnd1FUQXlNRFExTmtOQ09UQXlSamhGTURaRU1Ea3pNRGxHUkRrelFqZENSZyJ9.eyJpc3MiOiJodHRwczovL2Rldi1meWpydm9oeC5hdXRoMC5jb20vIiwic3ViIjoiR3dlZTlGUnN3ejNWNE5vZFVRTjJIcjJyQjJTMDI1UmZAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjUwMDEvYXBpL1YxLyIsImlhdCI6MTU4MzI0ODU1NSwiZXhwIjoxNTgzMzM0OTU1LCJhenAiOiJHd2VlOUZSc3d6M1Y0Tm9kVVFOMkhyMnJCMlMwMjVSZiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyJ9.lfgZAwqq3VHNAM1Y33Vj7Jtal6IdN92qWJHwu5T8l-56kBXNC2g1pm6TshRhYDKmedoJmSddjKXClA9eLu1Ve1X8wLj7CbrhZtGNsOcIEStF9icahCy8y2OdP2U6UXJJt9HehwqvwT3JltH_MqyYeJsyMsah3a3rlu6LoEAHNqF4jk8RUxZKjlVJz_iW-tbJ_GoGYrTp_bgvw6IBpgZvJDPGveaA6ms20CoN4zpXaL2ucgtaRbasXfD-z4NDwYN5_9TRPNcf9cuxViZ28CJ66uWxK8BEKysWnABYkh239Q71K2t41hFvQV8ti5l1UKcuqFf_lUGo0wYo9F-MGK6RKA"
});
