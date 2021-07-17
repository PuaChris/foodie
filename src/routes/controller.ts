import { IRestaurant } from '../constant';

export default class Controller {
  public getRestaurants = async (): Promise<IRestaurant[]> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = (new URL(`${domain}/restaurants`)).toString();

    const requestHeaders = new Headers();
    requestHeaders.set('Accept', 'application/json');

    const fetchOptions = {
      method: 'GET',
      headers: requestHeaders,
    };

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
        if (data) {
          restList = data;
        }
      }).catch((e) => console.error(e));

    return restList;
  };

  public addRestaurant = async (restData: IRestaurant): Promise<string> => {
    const domain = process.env.NEXT_PUBLIC_API_LINK;
    const url = (new URL(`${domain}/restaurants`)).toString();

    const requestHeaders = new Headers();
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Content-Type', 'application/json');

    // Passing new restaurant information
    const requestBody = JSON.stringify(restData);
    console.log(`Saving restaurant into database: ${requestBody}`);

    const fetchOptions = {
      method: 'POST',
      headers: requestHeaders,
      body: requestBody,
    };

    // Return new uuid for the restaurant to client as confirmation
    let id: string = '';

    await fetch(url, fetchOptions)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res.statusText);
        }
        console.log(`Request data: ${res}`);
        return res.json();
      }).then((data) => {
        if (data) {
          console.log(`Request data JSON: ${data}`);
          id = data.id;
          console.log(`Restaurant data successfully saved with ID: ${id}`);
        }
      }).catch((e) => console.error(e));

    return id;
  };

  // public getItems = async (req: Request, res: Response) => {

  // };

  // public addItem = async (req: Request, res: Response) => {

  // };
}
