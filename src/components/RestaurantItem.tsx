import React, { useState, useEffect } from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRestaurantItem } from '../constant';
import { checkEmotion, checkRecommend } from '../helper/checkIcon';
import styles from './styles/RestaurantItem.module.scss';

const style: any = styles;

interface IProps {
  item: IRestaurantItem,
  deleteItem:(item: IRestaurantItem) => void
}

const RestaurantItem = (props: IProps) => {
  const { item, deleteItem } = props;

  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotion(item.emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommend(item.recommend);

  const handleDelete = () => {
    deleteItem(item);
  };

  return (
    <div className={style['container']}>
      {/* Title + Emotion */}
      <header className={style['header']}>
        <h1 className={style['title']}>{item.name}</h1>

        <span className={style['emotion-icon']}>
          <FontAwesomeIcon icon={emotionIcon} />
        </span>
      </header>

      {/* Price */}
      <h2 className={style['price']}>
        {item.price ? `$${item.price}` : '$0.00'}
      </h2>
      <span className={style['recommend-icon']}>
        <FontAwesomeIcon icon={recommendIcon} />
      </span>
      <button type="button" className="remove-button" onClick={handleDelete}>
        <span className={style['remove-icon']}>
          <FontAwesomeIcon icon={['far', 'trash-alt']} />
        </span>
      </button>
    </div>
  );
};

export default RestaurantItem;
