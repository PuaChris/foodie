import { IItem, HTTPMethodType } from '../../constant';
import Controller from './controller';

export default class ItemController extends Controller {
  public getItemList = async (restId: string): Promise<IItem[]> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/api/restaurant/${restId}/items`)).toString();

    const fetchOptions = this.initFetchOptions(HTTPMethodType.GET);

    // Get list of items for restaurant
    let itemList: IItem[] = [];

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

  public addItem = async (restId: string, itemData: IItem): Promise<string> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/api/restaurant/${restId}/item`)).toString();

    // Passing new restaurant information
    const requestBody = JSON.stringify(itemData);
    console.log(`Saving item into database: ${requestBody}`);

    const fetchOptions = this.initFetchOptions(HTTPMethodType.POST, requestBody);

    // Return new uuid for the restaurant to client as confirmation
    let itemId: string = '';

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        return res.json();
      }).then((data) => {
        if (data) {
          itemId = data.id;
          console.log(`Item successfully saved with ID: ${itemId}`);
        }
      }).catch((e) => console.error(e));

    return itemId;
  };

  public editItem = async (restId: string, itemData: IItem): Promise<Boolean> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/api/restaurant/${restId}/item/${itemData.id}`)).toString();
    let isEdited: Boolean = false;

    // Passing new item information
    const requestBody = JSON.stringify(itemData);
    console.log(`Editing item with new info: ${requestBody}`);

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

  public deleteItem = async (restId: string, itemId: string): Promise<Boolean> => {
    const domain = window.location.origin;
    const url = (new URL(`${domain}/api/restaurant/${restId}/item/${itemId}`)).toString();
    let isDeleted: Boolean = false;

    console.log(`Deleting item: ${itemId}`);

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
