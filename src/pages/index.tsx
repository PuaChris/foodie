import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import styles from './styles/index.module.scss';
import RestaurantList from '../components/restaurant/RestaurantList';

library.add(fab, fas);

const style: any = styles;

const index = () => {
  return (
    <div className={style['home-container']}>
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
          background: #E7E5E5;
        }
      `}
      </style>
      <header className={style['container']}>
        <div className={style['logo-container']}>
          <h2 className={style['logo-red']}>foodie</h2>
          <h2 className={style['logo-black']}>.io</h2>
        </div>
        <span className={style['sign-in']}>
          {/* <FontAwesomeIcon icon={['fas', 'user-circle']} /> */}
        </span>
      </header>
      <RestaurantList />
    </div>
  );
};

export default index;
