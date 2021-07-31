import React from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  EmotionType,
  RecommendType,
} from '../../constant';
import {
  checkEmotionIcon,
  checkEmotionText,
  checkRecommendIcon,
  checkRecommendText,
} from '../../helper/checkEmotionRecommend';
import styles from '../styles/restaurant/RestaurantDescription.module.scss';

const style: any = styles;

interface IProps {
  location?: string,
  phone?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,
}

const RestaurantDescription = ({
  location,
  phone,
  emotion,
  recommend,
}: IProps) => {
  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotionIcon(emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommendIcon(recommend);

  return (
    <div
      className={style['container']}
    >
      {/* Location */}
      <div className={style['restaurant-description']}>
        <span className={style['icon']}>
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
        </span>
        <p className={style['text']}> {location || ''}</p>
      </div>

      {/* Phone number */}
      <div className={style['restaurant-description']}>
        <span className={style['icon']}>
          <FontAwesomeIcon icon={['fas', 'phone-alt']} />
        </span>
        <p className={style['text']}>{phone || '(___) ___-____'}</p>
      </div>

      {/* Emotion */}
      <div className={style['restaurant-description']}>
        <span className={style['icon']}>
          <FontAwesomeIcon className={`${emotion}`} icon={emotionIcon} />
        </span>
        <p className={style['text']}>{checkEmotionText(emotion)}</p>
      </div>

      {/* Recommendation */}
      <div className={style['restaurant-description']}>
        <span className={style['icon']}>
          <FontAwesomeIcon className={`${recommend}`} icon={recommendIcon} />
        </span>
        <p className={style['text']}>{checkRecommendText(true, recommend)} </p>
      </div>
    </div>
  );
};

export default RestaurantDescription;
