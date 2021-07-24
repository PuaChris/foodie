// TODO: Share icon
// TODO: Image gallery

import React, { SyntheticEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RestaurantDescription from './RestaurantDescription';
import RestaurantController from '../../routes/restaurantController';

import DeleteModal from '../util/DeleteModal';

import {
  IRestaurant,
  PlaceHolder,
  DescriptionType,
  EmotionType,
  RecommendType,
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
  isModalOpen: boolean,
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
      isModalOpen: false,
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
      this.cache(restData);
    }
    else console.log('Restaurant could not be edited');
  };

  deleteRestaurant = async () => {
    const { restData } = this.state;
    const { id } = restData;
    if (id && await this.control.deleteRestaurant(id)) {
      console.log('Successfully deleted restaurant');

      // Deleting from cache
      if (typeof window !== undefined) {
        window.localStorage.removeItem(id);

        // Deleting restaurant list from cache
        const restListCache: string = process.env.NEXT_PUBLIC_RESTLIST_CACHE as string;
        window.localStorage.removeItem(restListCache);
      }
    }
    else console.log('Restaurant could not be deleted');
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render(): JSX.Element {
    const {
      restData,
      isModalOpen,
    } = this.state;

    return (
      <div className={style['container']}>

        <DeleteModal
          open={isModalOpen}
          name={restData.name}
          deleteRestaurant={this.deleteRestaurant}
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
          <button
            type="button"
            className="delete-button"
            onClick={this.openModal}
          >
            <span className="delete-button_icon">
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </span>
          </button>

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
          <ItemList restId={restData.id} />
        </div>
      </div>
    );
  }
}

export default RestaurantProfile;
