// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NumberFormat from 'react-number-format';
import { Dropdown } from 'semantic-ui-react';

import RestaurantItem from './RestaurantItem';

import styles from './styles/Restaurant.module.scss';

const style: any = styles;

// Declaring Prop interface
type IProps = {
  id: string | string[] | undefined;
};

// Declaring State interface
type IState = {
  name: string;
  location: string;
  phone: string;
  emotion: string;
  recommend: string;
  itemList: number[];
  comments: string[];
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

class Restaurant extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: '',
      location: '',
      phone: '',
      emotion: '',
      recommend: '',
      itemList: [1, 2, 3, 4, 5, 6, 7, 8],
      comments: [],
    };
  }

  handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const placeHolder = e.target.placeholder;
    const { value } = e.target;

    console.log(placeHolder, 'Place holder');

    switch (placeHolder) {
      case PlaceHolder.Name:
        this.setState({
          name: value,
        });
        break;
      case PlaceHolder.Location:
        this.setState({
          location: value,
        });
        break;
      case PlaceHolder.Phone:
        this.setState({
          phone: value,
        });
        break;

      case 'How was it?':
        break;
      default:
        break;
    }
  };

  handleDropdown = (e: SyntheticEvent, type: OptionType) => {
    e.persist();
    const value = e.currentTarget.textContent;

    if (value) {
      if (type === OptionType.Emotion) {
        this.setState({ emotion: value }, this.updateEmotionIcon);
      }
      else if (type === OptionType.Recommend) {
        this.setState({ recommend: value }, this.updateRecommendIcon);
      }
    }
  };

  updateEmotionIcon = () => {
    const { emotion } = this.state;
    console.log(emotion, 'emotion');
  };

  updateRecommendIcon = () => {
    const { recommend } = this.state;
    console.log(recommend, 'emotion');
  };

  addItem = () => {
    const { itemList } = this.state;
    itemList.push(8);
    this.setState({ itemList });
  };

  render(): JSX.Element {
    const {
      name,
      location,
      phone,
      emotion,
      recommend,
      itemList,
      comments,
    } = this.state;

    return (
      <div className={style['restaurant_container']}>

        {/* Profile */}
        <div className={style['restaurant_profile']}>
          <input
            className={style['restaurant_profile-title']}
            type="text"
            placeholder={PlaceHolder.Name}
            value={name}
            onChange={(e) => this.handleChangeText(e)}
          />

          {/* Descriptions */}
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

          {/* Restaurant Items */}
          <ul className={style['restaurant_item-list']}>
            {itemList.map((id: number) => {
              return (
                <li key={id} className={style['restaurant_item-list_item']}>
                  <RestaurantItem />
                </li>
              );
            })}
          </ul>
          <button type="button" className="add-btn" onClick={this.addItem}>
            <span className="add-btn_icon">
              <FontAwesomeIcon icon={['fas', 'plus']} />
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Restaurant;
