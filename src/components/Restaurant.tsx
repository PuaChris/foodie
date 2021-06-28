// TODO: Share icon
// TODO: Image gallery

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RestaurantItem from './RestaurantItem';

import styles from './styles/Restaurant.module.scss';

const style: any = styles;

// Declaring Prop interface
type IProps = {
  id: string | string[] | undefined;
};

// Declaring State interface
type IState = {
  comments: string[];
  itemList: number[];
};

class Restaurant extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      itemList: [1, 2, 3, 4, 5, 6, 7, 8],
      comments: [],
    };
  }

  addItem = () => {
    const { itemList } = this.state;
    itemList.push(8);
    this.setState({ itemList });
  };

  render(): JSX.Element {
    const { itemList, comments } = this.state;

    return (
      <div className={style['restaurant_container']}>

        {/* Profile */}
        <div className={style['restaurant_profile']}>
          <h1 className={style['restaurant_profile-title']}>
            Anh Dao
          </h1>

          {/* Descriptions */}
          <div className={style['restaurant_description_container']}>

            {/* Location */}
            <div className={style['restaurant_description']}>
              <span className="location_icon">
                <FontAwesomeIcon icon={['fas', 'map-marker-alt']} />
              </span>
              <p className={style['description_text']}>383 Spadina Ave, Toronto, Ontario M5T 2G6 Canada</p>
            </div>

            {/* Phone Number */}
            <div className={style['restaurant_description']}>
              <span className="phone_icon">
                <FontAwesomeIcon icon={['fas', 'phone-alt']} />
              </span>
              <p className={style['description_text']}>+1 (416)-598-4514</p>
            </div>

            {/* Emotions */}
            <div className={style['restaurant_description']}>
              <span className="emotion_icon">
                {/* <FontAwesomeIcon icon={['far', 'frown']} />
                <FontAwesomeIcon icon={['far', 'meh']} />
                <FontAwesomeIcon icon={['far', 'smile']} /> */}
                <FontAwesomeIcon icon={['far', 'grin-hearts']} />
              </span>
              <p className={style['description_text']}>It was okay.</p>
            </div>

            {/* Recommendation */}
            <div className={style['restaurant_description']}>
              <span className="recommend_icon">
                <FontAwesomeIcon icon={['far', 'check-circle']} />
                {/* <FontAwesomeIcon icon={['far', 'times-circle']} /> */}
              </span>
              <p className={style['description_text']}>Would I go back?</p>
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
