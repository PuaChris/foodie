import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/dist/client/link';

import _ from 'lodash';
import Controller from '../../routes/controller';

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

  // saveState = (state: any, callback?: () => void) => {
  //   // Save state in cache
  //   if (typeof window !== undefined) {
  //     window.localStorage.setItem('state', JSON.stringify(state));
  //   }
  //   this.setState(state);
  //   if (callback) {
  //     callback();
  //   }
  // };

  componentDidMount = () => {
    this.getRestaurants();

    // // Check cache first before calling API for restaurants
    // if (typeof window !== undefined) {
    //   const cache = window.localStorage.getItem('state') || undefined;
    //   if (cache !== undefined) {
    //     const state = JSON.parse(cache);
    //     this.setState(state);
    //   }

    //   else {
    //     this.getRestaurants();
    //   }
    // }
  };

  getRestaurants = async () => {
    const restList: IRestaurant[] = await this.control.getRestaurantList();

    this.setState({ restList });
  };

  openModal = () => {
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
    }
    else {
      console.error('Could not save new restaurant');
    }
  };

  editRestaurant = async (editRest: IRestaurant) => {
    const { restList } = this.state;
    const oldRest = restList.find((rest) => rest.id === editRest.id);

    if (editRest
      && oldRest
      && _.isEqual(editRest, oldRest)
      && await this.control.editRestaurant(editRest)
    ) {
      const matchingIndex = restList.indexOf(oldRest);

      // Replacing with new data at the same index as the restaurant to be edited
      if (matchingIndex !== 0) {
        restList.splice(matchingIndex, 1);
        restList.unshift(editRest);
      }

      this.setState({ restList }, () => console.log('Successfully edited restaurant'));

      restList.unshift(editRest);
      this.setState({ restList }, () => console.log('New restaurant added'));
    }
    else {
      console.error('Could not edit restaurant');
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
            // TODO: See link below for loading initial props for dynamic routing
            // https://stackoverflow.com/questions/55014235/next-js-express-dynamic-routing-causes-page-reload
            return (
              <li key={rest.id} className={style['restaurant-card']}>
                {/* Adding dynamic ID to new links */}
                <Link
                  href={{
                    pathname: '/[restaurant]',
                    query: {
                      id: rest.id,
                    },
                  }}
                  as={`/${rest.name.replace(/\s+/g, '-').toLowerCase() || 'new-restaurant'}`}
                >
                  {rest.name || 'New Restaurant'}
                </Link>
              </li>
            );
          })}
        </ul>
        <button type="button" className="add-button" onClick={() => this.openModal}>
          <span className="add-button_icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default RestaurantList;
