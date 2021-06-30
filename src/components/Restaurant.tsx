// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DropdownItemProps, DropdownProps } from 'semantic-ui-react';
import RestaurantDescription from './RestaurantDescription';
import RestaurantItem from './RestaurantItem';

import {
  PlaceHolder,
  DescriptionType,
  EmotionType,
  RecommendType,
} from '../constant';

import styles from './styles/Restaurant.module.scss';

const style: any = styles;

// Declaring Prop interface
type IProps = {
  id: string | string[] | undefined;
};

// Declaring State interface
type IState = {
  name: string | null;
  location: string | null;
  phone: string | null;
  emotion: EmotionType | null;
  recommend: RecommendType | null;
  itemList: number[];
  comments: string[];
};

class Restaurant extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: null,
      location: null,
      phone: null,
      emotion: null,
      recommend: null,
      itemList: [1, 2, 3, 4, 5, 6, 7, 8],
      comments: [],
    };

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
  }

  handleChangeText = (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => {
    const placeHolder = e.target.placeholder;
    const { value } = e.target;

    console.log(placeHolder, 'Placeholder');

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

      case DescriptionType.Emotion:
        break;
      case DescriptionType.Recommend:
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
          this.setState({ emotion: emotionKey }, this.updateEmotionIcon);
        }
        else if (type === DescriptionType.Recommend) {
          const recommendKey: RecommendType = key.value as RecommendType;
          this.setState({ recommend: recommendKey }, this.updateRecommendIcon);
        }
      }
    }
  };

  updateEmotionIcon = () => {
    const { emotion } = this.state;
    console.log(emotion, 'emotion');
  };

  updateRecommendIcon = () => {
    const { recommend } = this.state;
    console.log(recommend, 'recommend');
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
