import React from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRestaurantItem } from '../constant';
import { checkEmotion, checkRecommend } from '../helper/checkIcon';
import styles from './styles/RestaurantItem.module.scss';

const style: any = styles;

interface IProps {
  item: IRestaurantItem,
}

const RestaurantItem = (props: IProps) => {
  const { item } = props;

  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotion(item.emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommend(item.recommend);

  return (
    <div className={style['container']}>
      {/* Title + Emotion */}
      <header className={style['header']}>
        <h1 className={style['title']}>{item.name}</h1>

        <span className={style['emotion_icon']}>
          <FontAwesomeIcon icon={emotionIcon} />
        </span>
      </header>

      {/* Price */}
      <h2 className={style['price']}>
        {item.price ? `$${item.price}` : '$0.00'}
      </h2>
      <span className={style['recommend_icon']}>
        <FontAwesomeIcon icon={recommendIcon} />
      </span>
    </div>
  );
};

export default RestaurantItem;
