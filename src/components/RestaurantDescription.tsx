import React, { SyntheticEvent } from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';

import {
  PlaceHolder,
  DescriptionType,
  EmotionType,
  RecommendType,
} from '../constant';
import { checkEmotion, checkRecommend } from '../helper/checkIcon';
import styles from './styles/RestaurantDescription.module.scss';

const style: any = styles;

interface IProps {
  location?: string,
  phone?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,

  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => void;
  handleSelect: (e: SyntheticEvent, type: DescriptionType) => void;
}

const RestaurantDescription = ({
  location,
  phone,
  emotion,
  recommend,
  handleChangeText,
  handleSelect,
}: IProps) => {
  // Matching icon with selected option
  const emotionIcon: [IconPrefix, IconName] = checkEmotion(emotion);
  const recommendIcon: [IconPrefix, IconName] = checkRecommend(recommend);

  return (
    // TODO: Add onSubmit here
    <form
      className={style['container']}
      action="/"
      method="get"
    >
      {/* Location */}
      <div className={style['restaurant-description']}>
        <span className={style['location-icon']}>
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
        </span>
        <input
          className={style['location-input']}
          type="text"
          placeholder={PlaceHolder.Location}
          value={location || ''}
          onChange={(e) => handleChangeText(e, DescriptionType.Location)}
        />
      </div>

      {/* Phone number */}
      <div className={style['restaurant-description']}>
        <span className={style['phone-icon']}>
          <FontAwesomeIcon icon={['fas', 'phone-alt']} />
        </span>
        <NumberFormat
          className={style['phone-input']}
          format="(###) ###-####"
          placeholder={PlaceHolder.Phone}
          mask="_"
          value={phone}
          onChange={(e) => handleChangeText(e, DescriptionType.Phone)}
        />
      </div>

      {/* Emotion */}
      <div className={style['restaurant-description']}>
        <span className={style['emotion-icon']}>
          <FontAwesomeIcon icon={emotionIcon} />
        </span>

        {/* Dropdown */}
        <select
          className={style['emotion-dropdown']}
          onChange={(e) => handleSelect(e, DescriptionType.Emotion)}
          defaultValue="placeholder"
        >
          <option value="placeholder" disabled hidden>How was it?</option>
          <option value="love">I loved it!</option>
          <option value="happy">It was good</option>
          <option value="meh">It was okay</option>
          <option value="sad">It was not good</option>
        </select>
      </div>

      {/* Recommendation */}
      <div className={style['restaurant-description']}>
        <span className={style['recommend-icon']}>
          <FontAwesomeIcon icon={recommendIcon} />
        </span>

        {/* Dropdown */}
        <select
          className={style['recommend-dropdown']}
          onChange={(e) => handleSelect(e, DescriptionType.Recommend)}
          defaultValue="placeholder"
        >
          <option value="placeholder" disabled hidden>Would I go back?</option>
          <option value="yes">I would go back</option>
          <option value="no">I would not go back</option>
        </select>

      </div>
    </form>

  );
};

export default RestaurantDescription;
