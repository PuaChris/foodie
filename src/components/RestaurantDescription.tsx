import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import { Dropdown } from 'semantic-ui-react';

import styles from './styles/RestaurantDescription.module.scss';

const style: any = styles;

type IProps = {
  id: string | string[] | undefined;
};

enum PlaceHolder {
  Name = 'Restaurant Name',
  Location = 'Location',
  Phone = 'Phone Number',
  Emotion = 'How was it?',
  Recommend = 'Would I go back?',
}

enum OptionType {
  Emotion,
  Recommend,
}

const emotionOptions = [
  {
    key: 'love',
    text: 'I loved it!',
    value: 'love',
  },
  {
    key: 'happy',
    text: 'It was good',
    value: 'happy',
  },
  {
    key: 'meh',
    text: 'It was okay',
    value: 'meh',
  },
  {
    key: 'sad',
    text: 'It was not good',
    value: 'sad',
  },
];

const recommendOptions = [
  {
    key: 'yes',
    text: 'I would go back',
    value: 'yes',
  },
  {
    key: 'no',
    text: 'I would not go back',
    value: 'no',
  },
];

const RestaurantDescription: React.FC = (): JSX.Element => {
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
          onChange={(e) => this.handleChangeText(e)}
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
          onChange={(e) => this.handleChangeText(e)}
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
          scrolling
          selection
          options={emotionOptions}
          onChange={(e) => this.handleDropdown(e, OptionType.Emotion)}
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
          scrolling
          selection
          options={recommendOptions}
          onChange={(e) => this.handleDropdown(e, OptionType.Recommend)}
        />

      </div>
    </div>

  );
};

export default RestaurantDescription;