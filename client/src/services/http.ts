import HttpResponse from "../types/HttpResponse";

export default class HttpHandler<T> {
  private newHeaders = async (token: string) => {
    // const { getTokenSilently } = useAuth0();
    // const token = await getTokenSilently();

    return new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
  };

  private execute = async (request: RequestInfo): Promise<HttpResponse<T>> => {
    const response: HttpResponse<T> = await fetch(request);
    try {
      response.parsedBody = await response.json();
    } catch (ex) {}
    if (!response.ok) {
      throw response.statusText;
    }
    return response;
  };

  get = async (path: string, token: string): Promise<HttpResponse<T>> => {
    const args: RequestInit = {
      method: "get",
      headers: await this.newHeaders(token),
    };
    return await this.execute(new Request(path, args));
  };

  post = async (
    path: string,
    body: any,
    token: string
  ): Promise<HttpResponse<T>> => {
    const args: RequestInit = {
      method: "post",
      headers: await this.newHeaders(token),
      body: JSON.stringify(body),
    };
    return await this.execute(new Request(path, args));
  };

  put = async (
    path: string,
    body: any,
    token: string
  ): Promise<HttpResponse<T>> => {
    const args: RequestInit = {
      method: "put",
      headers: await this.newHeaders(token),
      body: JSON.stringify(body),
    };
    return await this.execute(new Request(path, args));
  };

  patch = async (
    path: string,
    body: any,
    token: string
  ): Promise<HttpResponse<T>> => {
    const args: RequestInit = {
      method: "patch",
      headers: await this.newHeaders(token),
      body: JSON.stringify(body),
    };
    return await this.execute(new Request(path, args));
  };
}
