import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/dist/client/link';

// https://stackoverflow.com/questions/63353141/for-typescript-the-error-for-decorators-legacy-isnt-currently-enabled-event
import Restaurant from '../entities/Restaurant';
import Controller from '../pages/routes/controller';

import styles from './styles/RestaurantList.module.scss';

// Declaring State interface
interface IProps {

}
interface IState {
  restList: Restaurant[],
}

const style: any = styles;
class RestaurantList extends React.Component<IProps, IState> {
  private control: Controller;

  constructor(props: IProps) {
    super(props);

    // Initialize API controller
    this.control = new Controller();

    this.state = {
      restList: [],
    };
  }

  setState(state: any) {
    if (typeof window !== undefined) {
      window.localStorage.setItem('state', JSON.stringify(state));
    }
    super.setState(state);
  }

  componentDidMount = () => {
    if (typeof window !== undefined) {
      const cache = window.localStorage.getItem('state') || undefined;
      if (cache !== undefined) {
        const state = JSON.parse(cache);
        this.setState(state);
      }
    }
  };

  getRestaurants = async () => {
    const restList: Restaurant[] = await this.control.getRestaurants();
    console.log(restList);
    this.setState({
      restList,
    });
  };

  addRestaurant = () => {
    this.getRestaurants();
    // const newRestaurant: Partial<Restaurant> = { name: 'new-restaurant' };
    // newRestaurant.id = uid(newRestaurant);

    // const { restList } = this.state;

    // restaurantList.push(newRestaurant);
  };

  render() {
    const { restList: restaurantList } = this.state;

    return (
      <div className={style['container']}>
        <ul className={style['restaurant-list']}>
          {restaurantList.map((restaurant) => {
            return (
              <li key={restaurant.id} className={style['restaurant-card']}>
                {/* Adding dynamic ID to new links */}
                <Link href={`/${restaurant.name}`}>Restaurant</Link>
              </li>
            );
          })}
        </ul>
        <button type="button" className="add-button" onClick={this.addRestaurant}>
          <span className="add-button_icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default RestaurantList;
