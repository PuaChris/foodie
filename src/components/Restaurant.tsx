// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uid } from 'react-uid';

import RestaurantDescription from './RestaurantDescription';
import RestaurantItem from './RestaurantItem';

import {
  RestaurantData,
  PlaceHolder,
  DescriptionType,
  EmotionType,
  RecommendType,
} from '../constant';

import styles from './styles/Restaurant.module.scss';

const style: any = styles;

// Declaring Prop interface
type IProps = RestaurantData;

// Declaring State interface
type IState = {
  id: string | undefined;
  name: string | null;
  location: string | null;
  phone: string | null;
  emotion: EmotionType | null;
  recommend: RecommendType | null;
  itemList: number[];
  comments: string[];
};

class Restaurant extends React.Component<RestaurantData, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name || null,
      location: props.location || null,
      phone: props.phone || null,
      emotion: props.emotion || null,
      recommend: props.recommend || null,
      itemList: [],
      comments: [],
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChangeText = (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => {
    e.preventDefault();

    // Update restaurant name/location/phone state
    const { value } = e.target;
    switch (type) {
      case DescriptionType.Name:
        this.setState({
          name: value,
        });
        break;
      case DescriptionType.Location:
        this.setState({
          location: value,
        });
        break;
      case DescriptionType.Phone:
        this.setState({
          phone: value,
        });
        break;
      default:
        break;
    }
  };

  handleSelect = (e: SyntheticEvent, type: DescriptionType) => {
    e.preventDefault();

    const inputEvent = e.target as HTMLInputElement;
    const { value } = inputEvent;

    // Updating emotion/recommend state
    if (value) {
      if (type === DescriptionType.Emotion) {
        const emotion: EmotionType = value as EmotionType;
        this.setState({ emotion }, () => console.log('Updated emotion.'));
      }
      else if (type === DescriptionType.Recommend) {
        const recommend: RecommendType = value as RecommendType;
        this.setState({ recommend }, () => console.log('Updated recommendation.'));
      }
    }
  };

  addItem = () => {
    const { itemList } = this.state;
    itemList.push(8);
    this.setState({ itemList });
  };

  render(): JSX.Element {
    const {
      id,
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
            value={name || ''}
            onChange={(e) => this.handleChangeText(e, DescriptionType.Name)}
          />

          {/* Descriptions */}
          <RestaurantDescription
            location={location}
            phone={phone}
            emotion={emotion}
            recommend={recommend}
            handleChangeText={this.handleChangeText}
            handleSelect={this.handleSelect}
          />

          {/* Restaurant Items */}
          <ul className={style['restaurant_item-list']}>
            {itemList.map((item) => {
              return (
                <li key={uid(item)} className={style['restaurant_item-list_item']}>
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
