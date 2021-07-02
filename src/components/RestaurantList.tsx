import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Header } from 'semantic-ui-react';
import Link from 'next/dist/client/link';
import { uid } from 'react-uid';

import RestaurantDialog from './RestaurantDialog';
import { RestaurantData } from '../constant';
import styles from './styles/RestaurantList.module.scss';

// Declaring Prop interface
type IProps = {

};

// Declaring State interface
type IState = {
  restaurantList: RestaurantData[];
};

const style: any = styles;
class RestaurantList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // Retrieving cache
    // const oldRestaurants: number[] = JSON.parse(localStorage.getItem('restaurantList') || '{}');

    this.state = {
      restaurantList: [],
    };
  }

  componentDidMount = () => {
    // const { restaurants } = this.state;

    // // setter
    // localStorage.setItem('restaurantList', JSON.stringify(restaurants));
  };

  // onClick(event: React.MouseEvent<HTMLButtonElement>): void;

  addRestaurant = () => {
    // Create a new restaurant ID
    const newRestaurant: RestaurantData = { };
    newRestaurant.id = uid(newRestaurant);
    newRestaurant.name = 'new-restaurant';

    const { restaurantList } = this.state;

    restaurantList.push(newRestaurant);

    // TODO: Open a new restaurant dialog and fill in basic information
    this.setState({ restaurantList }, () => {
      // window.location.href = `/${newRestaurant.name}`;
    });
  };

  render() {
    const { restaurantList } = this.state;

    return (
      <div id={style['restaurant-list_container']}>
        <ul className={style['restaurant-list_list']}>
          {restaurantList.map((restaurant) => {
            return (
              <li key={restaurant.id} className={style['restaurant-list_card']}>
                {/* Adding dynamic ID to new links */}
                <Link href={`/${restaurant.name}`}>Restaurant</Link>
              </li>
            );
          })}
        </ul>
        <button type="button" className="add-btn" onClick={this.addRestaurant}>
          <span className="add-btn_icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default RestaurantList;
