import React, { SyntheticEvent } from 'react';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

import {
  PlaceHolder,
  DescriptionType,
  EmotionDropdownOptions,
  EmotionType,
  RecommendDropdownOptions,
  RecommendType,
} from '../constant';

import styles from './styles/RestaurantDescription.module.scss';

const style: any = styles;

type IProps = {
  location: string | null;
  phone: string | null;
  emotion: EmotionType | null;
  recommend: RecommendType | null;

  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => void;
  handleDropdown: (e: SyntheticEvent, data: DropdownProps, type: DescriptionType) => void;
};

const RestaurantDescription = ({
  location,
  phone,
  emotion,
  recommend,
  handleChangeText,
  handleDropdown,
}: IProps) => {
  let emotionIcon: [IconPrefix, IconName];
  let recommendIcon: [IconPrefix, IconName];

  // Matching icon with selected option
  switch (emotion) {
    case EmotionType.Love:
      emotionIcon = ['far', 'grin-hearts'];
      break;
    case EmotionType.Happy:
      emotionIcon = ['far', 'smile'];
      break;
    case EmotionType.Meh:
      emotionIcon = ['far', 'meh'];
      break;
    case EmotionType.Sad:
      emotionIcon = ['far', 'frown'];
      break;
    default:
      emotionIcon = ['far', 'surprise'];
      break;
  }

  switch (recommend) {
    case RecommendType.Yes:
      recommendIcon = ['far', 'check-circle'];
      break;
    case RecommendType.No:
      recommendIcon = ['far', 'times-circle'];
      break;
    default:
      recommendIcon = ['far', 'question-circle'];
      break;
  }

  return (
    <div className={style['restaurant-description_container']}>

      {/* Location */}
      <div className={style['restaurant-description']}>
        <span className={style['location_icon']}>
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
        </span>
        <input
          className={style['restaurant-description_location-input']}
          type="text"
          placeholder={PlaceHolder.Location}
          value={location || ''}
          onChange={(e) => handleChangeText(e, DescriptionType.Location)}
        />
      </div>

      {/* Phone Number */}
      <div className={style['restaurant-description']}>
        <span className={style['phone_icon']}>
          <FontAwesomeIcon icon={['fas', 'phone-alt']} />
        </span>
        <NumberFormat
          format="(###) ###-####"
          placeholder={PlaceHolder.Phone}
          mask="_"
          value={phone}
          onChange={(e) => handleChangeText(e, DescriptionType.Phone)}
        />
      </div>

      {/* Emotion */}
      <div className={style['restaurant-description']}>
        <span className={style['emotion_icon']}>
          <FontAwesomeIcon icon={emotionIcon} />
        </span>
        <Dropdown
          placeholder={PlaceHolder.Emotion}
          value={emotion || ''}
          scrolling
          selection
          options={EmotionDropdownOptions}
          onChange={(e, data) => handleDropdown(e, data, DescriptionType.Emotion)}
        />
      </div>

      {/* Recommendation */}
      <div className={style['restaurant-description']}>
        <span className={style['recommend_icon']}>
          <FontAwesomeIcon icon={recommendIcon} />
        </span>
        <Dropdown
          placeholder={PlaceHolder.Recommend}
          value={recommend || ''}
          scrolling
          selection
          options={RecommendDropdownOptions}
          onChange={(e, data) => handleDropdown(e, data, DescriptionType.Recommend)}
        />
      </div>
    </div>

  );
};

export default RestaurantDescription;
