// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import update from 'immutability-helper';

import Item from '../item/Item';
import RestaurantDescription from './RestaurantDescription';
import ItemModal from '../item/ItemModal';
import Controller from '../../routes/controller';

import {
  IRestaurant,
  IRestaurantItem,
  PlaceHolder,
  DescriptionType,
  EmotionType,
  RecommendType,
} from '../../constant';

import styles from '../styles/restaurant/RestaurantProfile.module.scss';

const style: any = styles;

interface IProps {
  id: string,
}

// Declaring State interface
interface IState {
  restData: IRestaurant,
  isModalOpen: boolean,
  selectedItem?: IRestaurantItem,
  itemList: IRestaurantItem[],
}

class RestaurantProfile extends React.Component<IProps, IState> {
  private control: Controller;

  constructor(props: IProps) {
    super(props);

    this.control = new Controller();

    this.state = {
      restData: {
        id: props.id,
        name: '',
      },
      isModalOpen: false,
      selectedItem: undefined,
      itemList: [],
    };

    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.editRestaurant = this.editRestaurant.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = async () => {
    await this.getProfile();
  };

  getProfile = async () => {
    const { restData } = this.state;
    const { id } = restData;

    // Only retrieve
    if (id) {
      const newRestData: IRestaurant = await this.control.getRestaurant(id);
      this.setState({ restData: newRestData });
    }
  };

  handleChangeText = (e: React.ChangeEvent<HTMLInputElement>, type: DescriptionType) => {
    e.preventDefault();

    // Update restaurant name/location/phone state
    const { value } = e.target;
    const { restData } = this.state;

    switch (type) {
      case DescriptionType.Name:
        restData.name = value;
        this.setState({ restData }, () => console.log('Updated name.'));
        break;
      case DescriptionType.Location:
        restData.location = value;
        this.setState({ restData }, () => console.log('Updated location.'));
        break;
      case DescriptionType.Phone:
        restData.phone = value;
        this.setState({ restData }, () => console.log('Updated phone number.'));
        break;
      default:
        break;
    }
  };

  // TODO: Have an on submit button
  handleSelect = (e: SyntheticEvent, type: DescriptionType) => {
    e.preventDefault();

    const inputEvent = e.target as HTMLInputElement;
    const { value } = inputEvent;
    const { restData } = this.state;

    // Updating emotion/recommend state
    if (value) {
      if (type === DescriptionType.Emotion) {
        const emotion: EmotionType = value as EmotionType;
        restData.emotion = emotion;
        this.setState({ restData }, () => console.log('Updated emotion.'));
      }
      else if (type === DescriptionType.Recommend) {
        const recommend: RecommendType = value as RecommendType;
        restData.recommend = recommend;
        this.setState({ restData }, () => console.log('Updated recommendation.'));
      }
    }
  };

  editRestaurant = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const { restData } = this.state;

    // Only update the profile if changes were made
    if (await this.control.editRestaurant(restData)) {
      console.log('Successfully edited restaurant');
    }
    else console.log('Restaurant could not be edited');
  };

  // * Functions related to restaurant items

  addItem = (newItem: IRestaurantItem) => {
    // Using `unshift` to push a newly added item to the front of the array and display items in that order
    const { itemList } = this.state;
    itemList.unshift(newItem);

    this.setState({ itemList }, () => console.log('Successfully added new item.'));
  };

  editItem = (newItem: IRestaurantItem) => {
    const { itemList } = this.state;
    const matchingItem: IRestaurantItem | undefined = itemList.find((item) => item.id === newItem.id);

    if (matchingItem) {
      const index = itemList.indexOf(matchingItem);

      // Updating element at the same index
      const updatedItems = update(itemList, { $splice: [[index, 1, newItem]] });

      this.setState({
        isModalOpen: true,
        itemList: updatedItems,
      });
    }
  };

  // TODO: Something...does not seem right here. Something something bad code, testing will fail, etc.
  selectItem = (itemId: string) => {
    const { itemList } = this.state;
    const selectedItem: IRestaurantItem | undefined = itemList.find((item) => item.id === itemId);

    this.setState({
      isModalOpen: true,
      selectedItem,
    });
  };

  deleteItem = (itemId: string) => {
    this.setState(
      (prevState) => ({
        itemList: prevState.itemList.filter((item) => item.id !== itemId),
      }),
    );
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
      selectedItem: undefined,
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render(): JSX.Element {
    const {
      restData,
      isModalOpen,
      selectedItem,
      itemList,
    } = this.state;

    return (
      <div className={style['container']}>
        <ItemModal
          open={isModalOpen}
          item={selectedItem}
          addItem={this.addItem}
          editItem={this.editItem}
          deleteItem={this.deleteItem}
          closeModal={this.closeModal}
        />
        {/* Profile */}
        <div className={style['profile']}>
          <input
            className={style['profile-title']}
            type="text"
            placeholder={PlaceHolder.Name}
            value={restData.name || ''}
            onChange={(e) => this.handleChangeText(e, DescriptionType.Name)}
          />

          {/* Descriptions */}
          <RestaurantDescription
            location={restData.location}
            phone={restData.phone}
            emotion={restData.emotion}
            recommend={restData.recommend}
            handleChangeText={this.handleChangeText}
            handleSelect={this.handleSelect}
          />
          {/* Confirmation buttons */}
          <div className={style['button-container']}>
            <input
              className="save-button"
              type="button"
              value="Save"
              onClick={(e) => this.editRestaurant(e)}
            />
          </div>
          {/* Restaurant Items */}
          <ul className={style['item-list']}>
            {itemList.map((item) => {
              return (
                <li key={item.id} className={style['item']}>
                  <Item itemData={item} selectItem={this.selectItem} />
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

export default RestaurantProfile;
