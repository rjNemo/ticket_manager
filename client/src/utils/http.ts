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
  "Content-Type": "application/json"
});
