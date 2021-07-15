import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/dist/client/link';

// https://stackoverflow.com/questions/63353141/for-typescript-the-error-for-decorators-legacy-isnt-currently-enabled-event
import Restaurant from '../../entities/Restaurant';
import Controller from '../../routes/controller';

import RestaurantModal from './RestaurantModal';

import styles from '../styles/restaurant/RestaurantList.module.scss';

// Declaring State interface
interface IProps {

}
interface IState {
  isModalOpen: boolean,
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
      isModalOpen: false,
      restList: [],
    };

    this.addRestaurant = this.addRestaurant.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  // setState(state: any) {
  //   if (typeof window !== undefined) {
  //     window.localStorage.setItem('state', JSON.stringify(state));
  //   }
  //   super.setState(state);
  // }

  componentDidMount = () => {
    if (typeof window !== undefined) {
      const cache = window.localStorage.getItem('state') || undefined;
      if (cache !== undefined) {
        const state = JSON.parse(cache);
        this.setState(state);
      }

      else {
        this.getRestaurants();
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

  openModal = () => {
    // ! Could have repercussions with caching but unsure
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  addRestaurant = (newRest: Restaurant) => {
    const { restList } = this.state;
    restList.unshift(newRest);

    this.setState({ restList }, () => console.log('Successfully added new restaurant.'));

    // TODO: Make POST request to API
    // TODO: Remove adding a new uuid from RestaurantModal
    // const newRestaurant: Partial<Restaurant> = { name: 'new-restaurant' };
    // newRestaurant.id = uid(newRestaurant);

    // const { restList } = this.state;

    // restaurantList.push(newRestaurant);
  };

  render() {
    const {
      isModalOpen,
      restList,
    } = this.state;

    return (
      <div className={style['container']}>
        <RestaurantModal
          open={isModalOpen}
          addRestaurant={this.addRestaurant}
          closeModal={this.closeModal}
        />
        <ul className={style['restaurant-list']}>
          {restList.map((rest) => {
            return (
              <li key={rest.id} className={style['restaurant-card']}>
                {/* Adding dynamic ID to new links */}
                <Link href={`/${rest.name}`}>{rest.name}</Link>
              </li>
            );
          })}
        </ul>
        <button type="button" className="add-button" onClick={this.openModal}>
          <span className="add-button_icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default RestaurantList;
