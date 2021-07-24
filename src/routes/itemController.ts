import { IRestaurantItem, HTTPMethodType } from '../constant';
import Controller from './controller';

export default class ItemController extends Controller {
  public getItemList = async (restId: string): Promise<IRestaurantItem[]> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = (new URL(`${domain}/restaurant/${restId}/items`)).toString();

    const fetchOptions = this.initFetchOptions(HTTPMethodType.GET);

    // Get list of items for restaurant
    let itemList: IRestaurantItem[] = [];

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (data) itemList = data;
      }).catch((e) => console.error(e));

    return itemList;
  };

  // public getRestaurant = async (restId: string): Promise<IRestaurantItem> => {
  //   const domain = process.env.NEXT_PUBLIC_API_LINK;
  //   const url = new URL(`${domain}/restaurant/${restId}`);

  //   const fetchOptions = this.initFetchOptions(HTTPMethodType.GET);

  //   let rest: IRestaurantItem = {
  //     id: '',
  //     name: '',
  //   };

  //   await fetch(url.toString(), fetchOptions)
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       if (data) rest = data;
  //     }).catch((e) => console.error(e));

  //   if (rest.id) return rest;
  //   throw new Error(`Could not retrieve restaurant profile for --> ${restId}`);
  // };

  // public addRestaurant = async (restData: IRestaurant): Promise<string> => {
  //   const domain = process.env.NEXT_PUBLIC_API_LINK;
  //   const url = (new URL(`${domain}/restaurant`)).toString();

  //   // Passing new restaurant information
  //   const requestBody = JSON.stringify(restData);
  //   console.log(`Saving restaurant into database: ${requestBody}`);

  //   const fetchOptions = this.initFetchOptions(HTTPMethodType.POST, requestBody);

  //   // Return new uuid for the restaurant to client as confirmation
  //   let id: string = '';

  //   await fetch(url, fetchOptions)
  //     .then((res) => {
  //       if (res.status !== 200) {
  //         throw new Error(res.statusText);
  //       }
  //       return res.json();
  //     }).then((data) => {
  //       if (data) {
  //         id = data.id;
  //         console.log(`Restaurant successfully saved with ID: ${id}`);
  //       }
  //     }).catch((e) => console.error(e));

  //   return id;
  // };

  // public editRestaurant = async (restData: IRestaurant): Promise<Boolean> => {
  //   const domain = process.env.NEXT_PUBLIC_API_LINK;
  //   const url = (new URL(`${domain}/restaurant/${restData.id}`)).toString();
  //   let isEdited: Boolean = false;

  //   // Passing new restaurant information
  //   const requestBody = JSON.stringify(restData);
  //   console.log(`Editing restaurant with new info: ${requestBody}`);

  //   const fetchOptions = this.initFetchOptions(HTTPMethodType.PUT, requestBody);

  //   await fetch(url, fetchOptions)
  //     .then((res) => {
  //       console.log(res.status);
  //       if (res.status === 200 || res.status === 204) isEdited = true;
  //       else console.error(res.statusText);
  //     })
  //     .catch((e) => console.error(e));
  //   return isEdited;
  // };

  // public deleteRestaurant = async (id: string): Promise<Boolean> => {
  //   const domain = process.env.NEXT_PUBLIC_API_LINK;
  //   const url = (new URL(`${domain}/restaurant/${id}`)).toString();
  //   let isDeleted: Boolean = false;

  //   // Passing new restaurant information
  //   console.log(`Deleting restaurant: ${id}`);

  //   const fetchOptions = this.initFetchOptions(HTTPMethodType.DELETE);

  //   await fetch(url, fetchOptions)
  //     .then((res) => {
  //       console.log(res.status);
  //       if (res.status === 200 || res.status === 204) isDeleted = true;
  //       else console.error(res.statusText);
  //     })
  //     .catch((e) => console.error(e));
  //   return isDeleted;
  // };
}
