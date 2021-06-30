// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { uid } from 'react-uid';

import { DropdownItemProps, DropdownProps } from 'semantic-ui-react';
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
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleChangeText = (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => {
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

  handleDropdown = (e: SyntheticEvent, data: DropdownProps, type: DescriptionType) => {
    e.persist();
    if (data && data.options) {
      // Retrieving selected key from dropdown
      const { value } = data;
      const key: DropdownItemProps | undefined = data.options.find(
        (o) => o.value === value,
      );

      if (key) {
        if (type === DescriptionType.Emotion) {
          const emotionKey: EmotionType = key.value as EmotionType;
          this.setState({ emotion: emotionKey });
        }
        else if (type === DescriptionType.Recommend) {
          const recommendKey: RecommendType = key.value as RecommendType;
          this.setState({ recommend: recommendKey });
        }
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
            handleDropdown={this.handleDropdown}
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
