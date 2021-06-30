import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import { Dropdown } from 'semantic-ui-react';

import {
  PlaceHolder,
  DescriptionType,
  EmotionOptions,
  RecommendOptions,
} from '../constant';

import styles from './styles/RestaurantDescription.module.scss';

const style: any = styles;

type IProps = {
  location: string;
  phone: string;
  emotion: string;
  recommend: string;

  handleChangeText: (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => void;
  handleDropdown: (e: SyntheticEvent, type: DescriptionType) => void;
};

const RestaurantDescription = ({
  location,
  phone,
  emotion,
  recommend,
  handleChangeText,
  handleDropdown,
}: IProps) => {
  return (
    <div className={style['restaurant_description_container']}>

      {/* Location */}
      <div className={style['restaurant_description']}>
        <span className={style['location_icon']}>
          <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
        </span>
        <input
          className={style['description_text']}
          type="text"
          placeholder={PlaceHolder.Location}
          value={location}
          onChange={(e) => handleChangeText(e, DescriptionType.Location)}
        />
      </div>

      {/* Phone Number */}
      <div className={style['restaurant_description']}>
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

      {/* Emotions */}
      <div className={style['restaurant_description']}>
        <span className={style['emotion_icon']}>
          {/* <FontAwesomeIcon icon={['far', 'frown']} />
                <FontAwesomeIcon icon={['far', 'meh']} />
                <FontAwesomeIcon icon={['far', 'smile']} /> */}
          <FontAwesomeIcon icon={['far', 'grin-hearts']} />
        </span>
        <Dropdown
          placeholder={PlaceHolder.Emotion}
          value={emotion}
          scrolling
          selection
          options={EmotionOptions}
          onChange={(e) => handleDropdown(e, DescriptionType.Emotion)}
        />

        {/* <p className={style['description_text']}>It was okay.</p> */}
      </div>

      {/* Recommendation */}
      <div className={style['restaurant_description']}>
        <span className={style['recommend_icon']}>
          <FontAwesomeIcon icon={['far', 'check-circle']} />
          {/* <FontAwesomeIcon icon={['far', 'times-circle']} /> */}
        </span>
        <Dropdown
          placeholder={PlaceHolder.Recommend}
          value={recommend}
          scrolling
          selection
          options={RecommendOptions}
          onChange={(e) => handleDropdown(e, DescriptionType.Recommend)}
        />
      </div>
    </div>

  );
};

export default RestaurantDescription;
