import { Request, Response } from 'express';

import Restaurant from '../../entities/Restaurant';

export default class Controller {
  public getRestaurants = async (): Promise<Restaurant[]> => {
    let restList: Restaurant[] = [];
    const domain = 'http://localhost:3000';
    const url = (new URL(`${domain}/restaurants`)).toString();
    const fetchOptions = { method: 'GET' };

    await fetch(url, fetchOptions)
      .then((data) => data.json())
      .then((data) => {
        if (data) {
          restList = data;
        }
      }).catch((e) => console.error(e));

    return restList;
  };

  public addRestaurant = async (req: Request, res: Response) => {

  };

  public getItems = async (req: Request, res: Response) => {

  };

  public addItem = async (req: Request, res: Response) => {

  };
}
