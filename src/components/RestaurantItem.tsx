import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles/RestaurantItem.module.scss';

const style: any = styles;

const RestaurantItem: React.FC = (): JSX.Element => {
  return (
    <div className={style['restaurant-item_container']}>
      {/* Title + Emotion */}
      <header className={style['restaurant-item_header']}>
        <h1 className={style['restaurant-item_title']}>Item Title</h1>

        <span className={style['emotion_icon']}>
          {/* <FontAwesomeIcon icon={['far', 'frown']} />
                <FontAwesomeIcon icon={['far', 'meh']} />
                <FontAwesomeIcon icon={['far', 'smile']} /> */}
          <FontAwesomeIcon icon={['far', 'grin-hearts']} />
        </span>
      </header>

      {/* Price */}
      <h2 className={style['restaurant-item_price']}>
        $11.99
      </h2>
    </div>
  );
};

export default RestaurantItem;
