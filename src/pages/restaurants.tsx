import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles/restaurants.module.scss';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';

const style: any = styles;

const RestaurantsHomePage: React.FC = (): JSX.Element => {
  return (
    <div id={style['restaurant-homepage_container']}>
      {/* Remove horizontal scroll bar in mobile */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
        }
        body {
          position: relative;
          width: 100%;
          margin: 0;
        }
      `}
      </style>
      <header id={style['header_container']}>
        <h1 className={style['header_title']}>My Restaurants</h1>
        <span className={style['header_profile_icon']}>
          <FontAwesomeIcon icon={['fas', 'user-circle']} />
        </span>
      </header>
      <SearchBar />
      <RestaurantList />
    </div>
  );
};

export default RestaurantsHomePage;
