import { HTTPMethodType } from '../../constant';

export default class Controller {
  public initFetchOptions = (method: HTTPMethodType, requestBody?: string): RequestInit => {
    const requestHeaders = new Headers();
    requestHeaders.set('Accept', 'application/json');

    if (method === HTTPMethodType.POST || method === HTTPMethodType.PUT) {
      requestHeaders.set('Content-Type', 'application/json');
      return {
        method,
        headers: requestHeaders,
        body: requestBody,
      };
    }

    // GET Requests
    return {
      method,
      headers: requestHeaders,
    };
  };
}
