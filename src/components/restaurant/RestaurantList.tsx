import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { NextRouter, withRouter } from 'next/dist/client/router';

import RestaurantController from '../../routes/restaurantController';
import RestaurantModal from './RestaurantModal';
import SearchBar from '../util/SearchBar';

import styles from '../styles/restaurant/RestaurantList.module.scss';
import { IRestaurant } from '../../constant';
import { checkEmotion, checkRecommend } from '../../helper/checkIcon';

interface WithRouterProps {
  router: NextRouter
}

interface IProps extends WithRouterProps { }

interface IState {
  isModalOpen: boolean,
  restList: IRestaurant[],
}

const style: any = styles;
class RestaurantList extends React.Component<IProps, IState> {
  private control: RestaurantController;

  private router: NextRouter;

  constructor(props: IProps) {
    super(props);

    // Initialize API controller
    this.control = new RestaurantController();
    this.router = props.router;
    this.state = {
      isModalOpen: false,
      restList: [],
    };

    this.addRestaurant = this.addRestaurant.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }

  componentDidMount = async () => {
    this.getRestaurantList();
  };

  getRestaurantList = async () => {
    const restList: IRestaurant[] = await this.control.getRestaurantList();
    this.setState({ restList });
  };

  openModal = () => {
    console.log('Opening restaurant modal');
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  addRestaurant = async (newRest: IRestaurant) => {
    // Inserting into DB and retrieving uuid as confirmation
    const id: string = await this.control.addRestaurant(newRest);
    if (id) {
      newRest.id = id;

      // Updating UI with newly added restaurant
      const { restList } = this.state;
      restList.unshift(newRest);
      this.setState({ restList }, () => console.log('New restaurant added.'));
    }
    else {
      console.error('Could not save new restaurant');
    }
  };

  selectItem = (restId: string) => {
    if (restId) this.router.push('/[restaurant]', `/${restId}`);
    else console.error('Cannot select restaurant with invalid ID');
  };

  handleMouseClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, restId: string) => {
    e.preventDefault();
    this.selectItem(restId);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, restId: string) => {
    e.preventDefault();
    this.selectItem(restId);
  };

  render() {
    const {
      isModalOpen,
      restList,
    } = this.state;

    return (
      <div className={style['container']}>
        <h1 className={style['title']}>My Restaurants</h1>

        <RestaurantModal
          open={isModalOpen}
          addRestaurant={this.addRestaurant}
          closeModal={this.closeModal}
        />
        {/* <SearchBar /> */}
        <ul className={style['restaurant-list']}>
          {restList?.map((rest) => {
            const emotionIcon: [IconPrefix, IconName] = checkEmotion(rest.emotion);
            const recommendIcon: [IconPrefix, IconName] = checkRecommend(rest.recommend);

            return (
              <li key={rest.id}>
                <div
                  className={style['restaurant-card']}
                  onClick={(e) => this.handleMouseClick(e, rest.id)}
                  onKeyDown={(e) => this.handleKeyDown(e, rest.id)}
                  role="button"
                  tabIndex={-1}
                >

                  <div className={style['restaurant-text']}>
                    <h3 className={style['restaurant-name']}>{rest.name || 'New Restaurant'}</h3>
                    <p className={style['location']}>{rest.location}</p>
                  </div>

                  <div className={style['icons']}>
                    <FontAwesomeIcon className={style[`${rest.emotion}`]} icon={emotionIcon} />
                    <FontAwesomeIcon className={style[`${rest.recommend}`]} icon={recommendIcon} />
                    {/* <FontAwesomeIcon className={style['emotion']} icon={emotionIcon} />
                    <FontAwesomeIcon className={style['recommend']} icon={recommendIcon} /> */}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <button type="button" className="add-button" onClick={this.openModal}>
          <span className="add-button_icon">
            <FontAwesomeIcon icon={['fas', 'plus']} />
          </span>
        </button>
      </div>
    );
  }
}

export default withRouter(RestaurantList);
