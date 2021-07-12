import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles/index.module.scss';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';

library.add(fab, fas);

const style: any = styles;

const index = () => {
  return (
    <div className={style['home_container']}>
      {/* Remove horizontal scroll bar in mobile */}
      <style jsx global>{`
        html, body {
          overflow-x: hidden;
        }
        body {
          position: relative;
          width: 100%;
          margin: 0;
          padding: 0;
        }
      `}
      </style>
      <header className={style['header_container']}>
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

export default index;
