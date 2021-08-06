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
    // Can return empty elements like this
    <>
      <header className="header-container">
        <div className="logo-container">

          {/* Making the logo link back to the home page */}
          <a href="/">
            {/* Have only one header tag with multiple <span> children instead of the reverse */}
            <h2>
              <span className="logo-red">foodie</span>
              <span className="logo-black">.io </span>
            </h2>
          </a>
        </div>
        <span className="sign-in">
          {/* <FontAwesomeIcon icon={['fas', 'user-circle']} /> */}
        </span>
      </header>
      <div className={style['home-container']}>
        {/* <style jsx global>{`
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
      </style> */}
        <RestaurantList />
      </div>
    </>
  );
};

export default index;
