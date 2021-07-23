import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/dist/client/link';

import Controller from '../../routes/restaurantController';

import RestaurantModal from './RestaurantModal';

import styles from '../styles/restaurant/RestaurantList.module.scss';
import { IRestaurant } from '../../constant';

// Declaring State interface
interface IProps {

}
interface IState {
  isModalOpen: boolean,
  restList: IRestaurant[],
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

  componentDidMount = async () => {
    // Check cache first before calling API for restaurants
    if (typeof window !== undefined) {
      const cache = window.localStorage.getItem(process.env.NEXT_PUBLIC_RESTLIST_CACHE as string) || undefined;
      if (cache !== undefined) {
        const restList = JSON.parse(cache);
        this.setState({ restList }, () => console.log('Retrieved restaurant list from cache'));
      }

      else {
        await this.getRestaurants();
      }
    }
    else {
      await this.getRestaurants();
    }
  };

  cache = (restList: IRestaurant[]) => {
    if (typeof window !== undefined) {
      window.localStorage.setItem(process.env.NEXT_PUBLIC_RESTLIST_CACHE as string, JSON.stringify(restList));
      console.log('Caching restaurant list');
    }
  };

  getRestaurants = async () => {
    const restList: IRestaurant[] = await this.control.getRestaurantList();
    this.cache(restList);
    this.setState({ restList });
  };

  openModal = () => {
    console.log('Opening restaurant modal');
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  addRestaurant = async (newRest: IRestaurant) => {
    // Inserting into DB and retrieving uuid as confirmation
    const id: string = await this.control.addRestaurant(newRest);
    if (id) {
      newRest.id = id;

      // Updating UI with newly added restaurant
      const { restList } = this.state;
      restList.unshift(newRest);
      this.setState({ restList }, () => console.log('New restaurant added.'));
      this.cache(restList);
    }
    else {
      console.error('Could not save new restaurant');
    }
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
          {restList?.map((rest) => {
            return (
              <li key={rest.id} className={style['restaurant-card']}>
                {/* Adding dynamic ID to new links */}
                <Link
                  href="/[restaurant]"
                  as={`/${rest.id}`}
                >
                  {rest.name || 'New Restaurant'}
                </Link>
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
