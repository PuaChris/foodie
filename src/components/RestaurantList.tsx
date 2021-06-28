import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/dist/client/link';

import styles from './styles/RestaurantList.module.scss';

// Declaring Prop interface
type IProps = {

};

// Declaring State interface
type IState = {
  restaurants: number[];
};

const style: any = styles;
class RestaurantList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    // Retrieving cache
    // const oldRestaurants: number[] = JSON.parse(localStorage.getItem('restaurantList') || '{}');

    this.state = {
      restaurants: [0, 1, 2],
    };
  }

  componentDidMount = () => {
    // const { restaurants } = this.state;

    // // setter
    // localStorage.setItem('restaurantList', JSON.stringify(restaurants));
  };

  // onClick(event: React.MouseEvent<HTMLButtonElement>): void;

  addRestaurant = () => {
    const { restaurants } = this.state;
    restaurants.push(8);
    this.setState({ restaurants });
  };

  render() {
    const { restaurants } = this.state;

    return (
      <div id={style['restaurant-list_container']}>
        <ul className={style['restaurant-list_list']}>
          {restaurants.map((item) => {
            return (
              <li key={item} className={style['restaurant-list-card']}>
                {/* Adding dynamic ID to new links */}
                <Link href={`/${item}`}>Restaurant</Link>
              </li>
            );
          })}
        </ul>
        <button type="button" className={style['restaurant-list_add-btn']} onClick={this.addRestaurant}>
          <span className={style['restaurant-list_add-btn_icon']}>
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default RestaurantList;
