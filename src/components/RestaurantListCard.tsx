import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles/RestaurantListCard.module.scss';

const style: any = styles;
const RestaurantListCard: React.FC = (): JSX.Element => {
  return (
    <div className={style['restaurant-list-card']}>
      hello
    </div>
  );
};

export default RestaurantListCard;
