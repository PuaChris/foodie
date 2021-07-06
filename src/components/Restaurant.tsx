// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RestaurantDescription from './RestaurantDescription';
import RestaurantItem from './RestaurantItem';
import RestaurantModal from './RestaurantModal';

import {
  IRestaurantData,
  IRestaurantItem,
  PlaceHolder,
  DescriptionType,
  EmotionType,
  RecommendType,
} from '../constant';

import styles from './styles/Restaurant.module.scss';

const style: any = styles;

// Declaring Prop interface
interface IProps extends IRestaurantData {

}

// Declaring State interface
interface IState {
  id?: string,
  name?: string,
  location?: string,
  phone?: string,
  emotion?: EmotionType,
  recommend?: RecommendType,
  isModalOpen: boolean,
  selectedItem?: IRestaurantItem,
  itemList: IRestaurantItem[],
  comments: string[],
}

class Restaurant extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const {
      id,
      name,
      location,
      phone,
      emotion,
      recommend,
    } = props;

    this.state = {
      id,
      name,
      location,
      phone,
      emotion,
      recommend,
      isModalOpen: false,
      selectedItem: undefined,
      itemList: [],
      comments: [],
    };

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.closeModal = this.closeModal.bind(this);
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

  addItem = (newItem: IRestaurantItem) => {
    // Using `unshift` to push a newly added item to the front of the array and display items in that order
    const { itemList } = this.state;
    itemList.unshift(newItem);

    this.setState({ itemList }, () => console.log('Successfully added new comment.'));
  };

  // TODO: Something...does not seem right here. Something something bad code, testing will fail, etc.
  editItem = (itemId: string) => {
    const { itemList } = this.state;
    const selectedItem: IRestaurantItem | undefined = itemList.find((item) => item.id === itemId);

    this.setState({
      isModalOpen: true,
      selectedItem,
    });
  };

  deleteItem = (itemToDelete: IRestaurantItem) => {
    this.setState(
      (prevState) => ({
        itemList: prevState.itemList.filter((item) => item !== itemToDelete),
      }),
    );
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
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
      selectedItem,
      itemList,
      comments,
    } = this.state;

    return (
      <div className={style['container']}>
        <RestaurantModal
          open={isModalOpen}
          item={selectedItem}
          addItem={this.addItem}
          deleteItem={this.deleteItem}
          closeModal={this.closeModal}
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
                <li key={item.id} className={style['item']}>
                  <RestaurantItem item={item} editItem={this.editItem} />
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="add-button"
            onClick={this.openModal}
          >
            <span className="add-button_icon">
              <FontAwesomeIcon icon={['fas', 'plus']} />
            </span>
          </button>
        </div>
      </div>
    );
  }
}

export default Restaurant;
