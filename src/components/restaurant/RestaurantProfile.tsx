import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import _ from 'lodash';

import RestaurantDescription from './RestaurantDescription';
import RestaurantController from '../../helper/controller/restaurantController';
import RestaurantModal from './RestaurantModal';

import DeleteModal from '../util/DeleteModal';

import {
  restListCache,
  IRestaurant,
  DescriptionType,
  EmotionType,
  RecommendType,
  RestaurantModalType,
} from '../../constant';

import styles from '../styles/restaurant/RestaurantProfile.module.scss';
import ItemList from '../item/ItemList';

const style: any = styles;

interface IProps {
  id: string,
}

// Declaring State interface
interface IState {
  restData: IRestaurant,
  isEditModal: boolean,
  isDeleteModal: boolean,
}

class RestaurantProfile extends React.Component<IProps, IState> {
  private control: RestaurantController;

  constructor(props: IProps) {
    super(props);

    this.control = new RestaurantController();

    this.state = {
      restData: {
        id: props.id,
        name: '',
      },
      isEditModal: false,
      isDeleteModal: false,
    };

    this.closeModal = this.closeModal.bind(this);

    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

    this.editRestaurant = this.editRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }

  componentDidMount = async () => {
    // Check cache first before calling API for restaurants
    if (typeof window !== undefined) {
      const { restData } = this.state;
      const { id } = restData;

      const cache = window.localStorage.getItem(id) || undefined;
      if (cache !== undefined) {
        const cachedRestData = JSON.parse(cache);
        this.setState({ restData: cachedRestData }, () => console.log(`Retrieved '${cachedRestData.name}' data from cache`));
      }

      else {
        await this.getProfile();
      }
    }
    else {
      await this.getProfile();
    }
  };

  cache = (restData: IRestaurant) => {
    if (typeof window !== undefined) {
      const { id } = restData;
      window.localStorage.setItem(id, JSON.stringify(restData));
      console.log(`Caching ${restData.name} data`);
    }
  };

  getProfile = async () => {
    const { restData } = this.state;
    const { id } = restData;

    // Only retrieve
    if (id) {
      const newRestData: IRestaurant = await this.control.getRestaurant(id);
      this.setState({ restData: newRestData });

      this.cache(newRestData);
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

  editRestaurant = async (editRest: IRestaurant) => {
    const { restData } = this.state;

    // Only update the profile if changes were made
    if (!_.isEqual(restData, editRest)) {
      editRest.id = restData.id;
      if (await this.control.editRestaurant(editRest)) {
        console.log('Successfully edited restaurant');
        this.setState({ restData: editRest });
        this.cache(editRest);
      }
      else console.error('Changes could not be saved');
    }
    else console.log('No changes to be made');
  };

  deleteRestaurant = async () => {
    const { restData } = this.state;
    const { id } = restData;

    console.log(`Deleting all items from ${restData.name}`);

    if (id) {
      console.log(`Deleting ${restData.name}`);

      if (await this.control.deleteRestaurant(id)) {
        console.log('Successfully deleted restaurant');
        // Deleting from cache
        if (typeof window !== undefined) {
          window.localStorage.removeItem(id);

          // Deleting restaurant list from cache
          window.localStorage.removeItem(restListCache);

          this.setState({ isEditModal: false });
        }
      }
    }
    else console.log('Restaurant could not be deleted');
  };

  openEditModal = () => {
    this.setState({ isEditModal: true });
  };

  openDeleteModal = () => {
    this.setState({ isDeleteModal: true });
  };

  closeModal = () => {
    this.setState({ isEditModal: false, isDeleteModal: false });
  };

  render(): JSX.Element {
    const {
      restData,
      isEditModal,
      isDeleteModal,
    } = this.state;

    return (
      <div className={style['container']}>
        <RestaurantModal
          open={isEditModal}
          restData={restData}
          type={RestaurantModalType.Edit}
          restaurantAction={this.editRestaurant}
          closeModal={this.closeModal}
        />
        <DeleteModal
          open={isDeleteModal}
          name={restData.name}
          deleteRestaurant={this.deleteRestaurant}
          closeModal={this.closeModal}
        />

        {/* Profile */}
        <div className={style['profile-container']}>
          <div className={style['title-container']}>

            <span className={style['title']}>
              <h3 className={style['title-text']}> {restData.name || ''} </h3>
              <button
                type="button"
                className={style['edit-button']}
                onClick={this.openEditModal}
              >
                <span className={style['edit-button_icon']}>
                  <FontAwesomeIcon icon={['fas', 'edit']} />
                </span>
              </button>
            </span>

            <div className={style['icons']}>
              <button
                type="button"
                className={style['delete-button']}
                onClick={this.openDeleteModal}
              >
                <span className={style['delete-button_icon']}>
                  <FontAwesomeIcon icon={['far', 'trash-alt']} />
                </span>
              </button>
            </div>
          </div>

          {/* Descriptions */}
          <RestaurantDescription
            location={restData.location}
            phone={restData.phone}
            emotion={restData.emotion}
            recommend={restData.recommend}
          />
          <ItemList restId={restData.id} />
        </div>
      </div>
    );
  }
}

export default RestaurantProfile;
