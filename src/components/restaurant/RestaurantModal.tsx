import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'semantic-ui-react';

import {
  IRestaurant,
  RestaurantModalType,
  EmotionType,
  RecommendType,
  EmotionText,
  RecommendRestText,
} from '../../constant';

import styles from '../styles/restaurant/RestaurantModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  restData?: IRestaurant,
  type: RestaurantModalType,
  restaurantAction: (item: IRestaurant) => void,
  closeModal: () => void,
}

const RestaurantModal = (props: IProps) => {
  const {
    open,
    restData,
    type,
    restaurantAction,
    closeModal,
  } = props;

  const [isOpen, setOpen] = useState<boolean>(open);
  const [name, setName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [emotion, setEmotion] = useState<EmotionType | undefined>(EmotionType.Question);
  const [recommend, setRecommend] = useState<RecommendType | undefined>(RecommendType.Question);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rest = {
      name,
      location,
      phone,
      emotion,
      recommend,
    } as IRestaurant;

    restaurantAction(rest);

    console.log('Form submitted');
    closeModal();
  };

  // Updating state on prop change
  // useEffect runs after render finishes
  useEffect(() => {
    setOpen(open);
    if (restData && type === RestaurantModalType.Edit) {
      setName(restData.name);
      setLocation(restData.location);
      setPhone(restData.phone);
      setEmotion(restData.emotion);
      setRecommend(restData.recommend);
    }
    else {
      setName('');
      setLocation('');
      setPhone('');
      setEmotion(EmotionType.Question);
      setRecommend(RecommendType.Question);
    }
  }, [open]);

  return (
    <Modal
      size="tiny"
      onClose={() => {
        closeModal();
      }}
      open={isOpen}
    >
      <Modal.Content>
        <div className={style['header-container']}>
          <span className={style['header']}>
            <h1 className={style['header-text']}>{type === RestaurantModalType.Add ? 'New Restaurant' : 'Edit Restaurant'}</h1>
          </span>

          <button
            type="button"
            className={style['cancel-icon']}
            onClick={() => closeModal()}
          >
            <FontAwesomeIcon icon={['far', 'window-close']} />
          </button>
        </div>

      </Modal.Content>
      <Modal.Actions>
        <form
          className={style['container']}
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* Restaurant name */}
          <div className={style['name-container']}>
            <label className={style['label']} htmlFor="name">Name</label>
            <input
              name="name"
              className={style['name-input']}
              required
              autoComplete="off"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={style['secondary-container']}>
            {/* Restaurant location */}
            <div className={style['input-container']}>
              <label className={style['label']} htmlFor="location">Location</label>
              <input
                name="location"
                className={style['input']}
                autoComplete="off"
                defaultValue={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Restaurant phone number */}
            <div className={style['input-container']}>
              <label className={style['label']} htmlFor="phone">Phone number</label>
              <NumberFormat
                className={style['input']}
                format="(###) ###-####"
                mask="_"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className={style['secondary-container']}>
            {/* Emotion */}
            <div className={style['dropdown-container']}>
              <label className={style['label']} htmlFor="emotion">{EmotionText.Question}</label>
              <select
                name="emotion"
                className={style['dropdown']}
                defaultValue={emotion === EmotionType.Question ? 'placeholder' : emotion as string}
                onChange={(e) => {
                  const newEmotion: EmotionType = e.target.value as EmotionType;
                  setEmotion(newEmotion);
                }}
              >
                <option value="placeholder" disabled hidden> </option>
                <option value={EmotionType.Love}>{EmotionText.Love}</option>
                <option value={EmotionType.Happy}>{EmotionText.Happy}</option>
                <option value={EmotionType.Meh}>{EmotionText.Meh}</option>
                <option value={EmotionType.Sad}>{EmotionText.Sad}</option>
              </select>
            </div>

            {/* Recommend */}
            <div className={style['dropdown-container']}>
              <label className={style['label']} htmlFor="recommend">{RecommendRestText.Question}</label>
              <select
                name="recommend"
                className={style['dropdown']}
                defaultValue={recommend === RecommendType.Question ? 'placeholder' : recommend as string}
                onChange={(e) => {
                  const newRecommend: RecommendType = e.target.value as RecommendType;
                  setRecommend(newRecommend);
                }}
              >
                <option value="placeholder" disabled hidden> </option>
                <option value={RecommendType.Yes}>{RecommendRestText.Yes}</option>
                <option value={RecommendType.No}>{RecommendRestText.No}</option>
              </select>
            </div>
          </div>
          {/* Confirmation buttons */}
          <div className={style['button-container']}>
            <input
              className={style['cancel-button']}
              type="button"
              value="Cancel"
              onClick={() => closeModal()}
            />
            <input
              className={style['save-button']}
              type="submit"
              value="Save"
            />
          </div>
        </form>
      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
