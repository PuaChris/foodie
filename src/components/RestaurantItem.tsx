import React from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRestaurantItem } from '../constant';
import { checkEmotion, checkRecommend } from '../helper/checkIcon';
import styles from './styles/RestaurantItem.module.scss';

const style: any = styles;

interface IProps {
  item: IRestaurantItem,
  selectItem: (itemId: string) => void,
}

const RestaurantItem = (props: IProps) => {
  const { item, selectItem } = props;

  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotion(item.emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommend(item.recommend);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    selectItem(item.id);
  };

  return (
    <div
      className={style['container']}
      onMouseUp={(e) => handleMouseClick(e)}
      role="button"
      tabIndex={-1}
    >
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
    </div>
  );
};

export default RestaurantItem;
