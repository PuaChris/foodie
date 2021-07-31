import React from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IItem } from '../../constant';
import { checkEmotionIcon, checkRecommendIcon } from '../../helper/checkEmotionRecommend';
import styles from '../styles/item/Item.module.scss';

const style: any = styles;

interface IProps {
  itemData: IItem,
  selectItem: (itemId: string) => void,
}

const RestaurantItem = (props: IProps) => {
  const { itemData, selectItem } = props;

  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotionIcon(itemData.emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommendIcon(itemData.recommend);

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    selectItem(itemData.id);
  };

  const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    selectItem(itemData.id);
  };

  return (
    <div
      className={style['container']}
      onClick={(e) => handleMouseClick(e)}
      onKeyDown={(e) => handleKeydown(e)}
      role="button"
      tabIndex={-1}
    >
      <div className={style['item-text']}>
        <h1 className={style['title']}>{itemData.name}</h1>

        <h2 className={style['price']}>
          {itemData.price ? `$${itemData.price}` : '$0.00'}
        </h2>
      </div>
      <div className={style['icons']}>
        <FontAwesomeIcon className={`${itemData.emotion}`} icon={emotionIcon} />
        <FontAwesomeIcon className={`${itemData.recommend}`} icon={recommendIcon} />
      </div>

    </div>
  );
};

export default RestaurantItem;
