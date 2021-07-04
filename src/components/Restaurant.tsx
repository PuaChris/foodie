// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uid } from 'react-uid';

import RestaurantDescription from './RestaurantDescription';
import RestaurantItem from './RestaurantItem';
import RestaurantModal from './RestaurantModal';

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
  id?: string;
  name?: string;
  location?: string;
  phone?: string;
  emotion?: EmotionType;
  recommend?: RecommendType;
  isModalOpen: boolean;
  itemList: number[];
  comments: string[];
};

class Restaurant extends React.Component<RestaurantData, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name,
      location: props.location,
      phone: props.phone,
      emotion: props.emotion,
      recommend: props.recommend,
      isModalOpen: false,
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
    this.setState({ isModalOpen: true });
  };

  render(): JSX.Element {
    const {
      id,
      name,
      location,
      phone,
      emotion,
      recommend,
      isModalOpen,
      itemList,
      comments,
    } = this.state;

    return (
      <div className={style['container']}>
        <RestaurantModal
          open={isModalOpen}
        />
        {/* Profile */}
        <div className={style['profile']}>
          <input
            className={style['profile-title']}
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
          <ul className={style['item-list']}>
            {itemList.map((item) => {
              return (
                <li key={uid(item)} className={style['item']}>
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
