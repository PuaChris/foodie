import { URLSearchParams } from 'url';
import { IRestaurant } from '../constant';

enum MethodType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export default class Controller {
  public initFetchOptions = (method: MethodType, requestBody?: string): RequestInit => {
    const requestHeaders = new Headers();
    requestHeaders.set('Accept', 'application/json');

    if (method === MethodType.POST || method === MethodType.PUT) {
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

  public getRestaurantList = async (): Promise<IRestaurant[]> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = (new URL(`${domain}/restaurants`)).toString();

    const fetchOptions = this.initFetchOptions(MethodType.GET);

    // Get list of restaurants
    let restList: IRestaurant[] = [];

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (data) restList = data;
      }).catch((e) => console.error(e));

    return restList;
  };

  public getRestaurant = async (restId: string): Promise<IRestaurant> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = new URL(`${domain}/restaurant/${restId}`);

    const fetchOptions = this.initFetchOptions(MethodType.GET);

    let rest: IRestaurant = {
      id: '',
      name: '',
    };

    console.log(url.toString());
    await fetch(url.toString(), fetchOptions)
      .then((res) => {
        console.log(res);
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data) rest = data;
        console.log('Controller getRestaurant(): ', rest.id);
      }).catch((e) => console.error(e));

    if (rest.id) return rest;
    throw new Error(`Could not retrieve restaurant profile for --> ${restId}`);
  };

  public addRestaurant = async (restData: IRestaurant): Promise<string> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = (new URL(`${domain}/restaurants`)).toString();

    // Passing new restaurant information
    const requestBody = JSON.stringify(restData);
    console.log(`Saving restaurant into database: ${requestBody}`);

    const fetchOptions = this.initFetchOptions(MethodType.POST, requestBody);

    // Return new uuid for the restaurant to client as confirmation
    let id: string = '';

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then((data) => {
        if (data) {
          id = data.id;
          console.log(`Restaurant successfully saved with ID: ${id}`);
        }
      }).catch((e) => console.error(e));

    return id;
  };

  public editRestaurant = async (restData: IRestaurant): Promise<Boolean> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = (new URL(`${domain}/restaurants`)).toString();

    // Passing new restaurant information
    const requestBody = JSON.stringify(restData);
    console.log(`Editing restaurant with new info: ${requestBody}`);

    const fetchOptions = this.initFetchOptions(MethodType.PUT, requestBody);

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then((data) => {
        if (data) {
          console.log(`Request data JSON: ${data}`);
          return true;
        }
        throw new Error('No edited restaurant data returned from the server');
      }).catch((e) => console.error(e));
    return false;
  };
}
