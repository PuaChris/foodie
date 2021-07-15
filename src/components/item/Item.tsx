import React from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRestaurantItem } from '../../constant';
import { checkEmotion, checkRecommend } from '../../helper/checkIcon';
import styles from '../styles/item/Item.module.scss';

const style: any = styles;

interface IProps {
  itemData: IRestaurantItem,
  selectItem: (itemId: string) => void,
}

const RestaurantItem = (props: IProps) => {
  const { itemData, selectItem } = props;

  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotion(itemData.emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommend(itemData.recommend);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    selectItem(itemData.id);
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
        <h1 className={style['title']}>{itemData.name}</h1>

        <span className={style['emotion-icon']}>
          <FontAwesomeIcon icon={emotionIcon} />
        </span>
      </header>

      {/* Price */}
      <h2 className={style['price']}>
        {itemData.price ? `$${itemData.price}` : '$0.00'}
      </h2>
      <span className={style['recommend-icon']}>
        <FontAwesomeIcon icon={recommendIcon} />
      </span>
    </div>
  );
};

export default RestaurantItem;
