import { IRestaurant, HTTPMethodType } from '../constant';
import Controller from './controller';

export default class RestaurantController extends Controller {
  public getRestaurantList = async (): Promise<IRestaurant[]> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/restaurants`)).toString();

    const fetchOptions = this.initFetchOptions(HTTPMethodType.GET);

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
    const domain = window.location.origin;
    const url = new URL(`${domain}/restaurant/${restId}`);

    const fetchOptions = this.initFetchOptions(HTTPMethodType.GET);

    let rest: IRestaurant = {
      id: '',
      name: '',
    };

    await fetch(url.toString(), fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (data) rest = data;
      }).catch((e) => console.error(e));

    if (rest.id) return rest;
    throw new Error(`Could not retrieve restaurant profile for --> ${restId}`);
  };

  public addRestaurant = async (restData: IRestaurant): Promise<string> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/restaurant`)).toString();

    // Passing new restaurant information
    const requestBody = JSON.stringify(restData);
    console.log(`Saving restaurant into database: ${requestBody}`);

    const fetchOptions = this.initFetchOptions(HTTPMethodType.POST, requestBody);

    // Return new uuid for the restaurant to client as confirmation
    let restId: string = '';

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then((data) => {
        if (data) {
          restId = data.id;
          console.log(`Restaurant successfully saved with ID: ${restId}`);
        }
      }).catch((e) => console.error(e));

    return restId;
  };

  public editRestaurant = async (restData: IRestaurant): Promise<Boolean> => {
    const domain = window.location.origin;
    const restId: string = restData.id;
    const url = (new URL(`${domain}/restaurant/${restId}`)).toString();
    let isEdited: Boolean = false;

    // Passing new restaurant information
    const requestBody = JSON.stringify(restData);
    console.log(`Editing restaurant with new info: ${requestBody}`);

    const fetchOptions = this.initFetchOptions(HTTPMethodType.PUT, requestBody);

    await fetch(url, fetchOptions)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200 || res.status === 204) isEdited = true;
        else console.error(res.statusText);
      })
      .catch((e) => console.error(e));
    return isEdited;
  };

  public deleteRestaurant = async (restId: string): Promise<Boolean> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/restaurant/${restId}`)).toString();
    let isDeleted: Boolean = false;

    // Passing new restaurant information
    console.log(`Deleting restaurant: ${restId}`);

    const fetchOptions = this.initFetchOptions(HTTPMethodType.DELETE);

    await fetch(url, fetchOptions)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200 || res.status === 204) isDeleted = true;
        else console.error(res.statusText);
      })
      .catch((e) => console.error(e));
    return isDeleted;
  };
}
