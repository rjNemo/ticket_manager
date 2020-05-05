export default interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
