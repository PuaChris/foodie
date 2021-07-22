import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Modal, Header } from 'semantic-ui-react';

import {
  IRestaurant,
  EmotionType,
  RecommendType,
} from '../../constant';

import styles from '../styles/restaurant/RestaurantModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  addRestaurant: (item: IRestaurant) => void,
  closeModal: () => void,
}

const RestaurantModal = (props: IProps) => {
  const {
    open,
    addRestaurant,
    closeModal,
  } = props;

  const [isOpen, setOpen] = useState<boolean>(open);
  const [name, setName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [phone, setPhone] = useState<string>();
  const [emotion, setEmotion] = useState<EmotionType | undefined>(EmotionType.Surprise);
  const [recommend, setRecommend] = useState<RecommendType | undefined>(RecommendType.Question);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newRest = {
      name,
      location,
      phone,
      emotion,
      recommend,
    } as IRestaurant;

    addRestaurant(newRest);

    console.log('Form submitted');
    closeModal();
  };

  const handleDelete = () => {
    closeModal();
  };

  // Updating state on prop change
  // useEffect runs after render finishes
  useEffect(() => {
    setOpen(open);

    setName('');
    setLocation('');
    setPhone('');
    setEmotion(EmotionType.Surprise);
    setRecommend(RecommendType.Question);
  }, [open]);

  return (
    <Modal
      onClose={() => {
        closeModal();
      }}
      open={isOpen}
    >
      <Modal.Content>
        <Header>New Restaurant</Header>
      </Modal.Content>
      <Modal.Actions>
        <form
          className={style['container']}
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* Restaurant name */}
          <div className={style['name-container']}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className={style['name-input']}
              required
              autoComplete="off"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Restaurant location */}
          <div className={style['location-container']}>
            <label htmlFor="location">Where are they located</label>
            <input
              name="location"
              className={style['location-input']}
              autoComplete="off"
              defaultValue={location}
              onChange={(e) => setLocation(e.target.value)}
            />

          </div>

          {/* Restaurant phone number */}
          <div className={style['phone-container']}>
            <label htmlFor="phone">Phone number</label>
            <NumberFormat
              className={style['phone-input']}
              format="(###) ###-####"
              mask="_"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>

          {/* Emotion */}
          <div className={style['emotion-container']}>
            <label htmlFor="emotion">How was it?</label>
            <select
              name="emotion"
              className={style['emotion-dropdown']}
              defaultValue={emotion === EmotionType.Surprise ? 'placeholder' : emotion as string}
              onChange={(e) => {
                const newEmotion: EmotionType = e.target.value as EmotionType;
                setEmotion(newEmotion);
              }}
            >
              <option value="placeholder" disabled hidden> </option>
              <option value="love">I loved it!</option>
              <option value="happy">It was good</option>
              <option value="meh">It was okay</option>
              <option value="sad">It was not good</option>
            </select>
          </div>

          {/* Recommend */}
          <div className={style['recommend-container']}>
            <label htmlFor="recommend">Would I order again?</label>
            <select
              name="recommend"
              className={style['recommend-dropdown']}
              defaultValue={recommend === RecommendType.Question ? 'placeholder' : recommend as string}
              onChange={(e) => {
                const newRecommend: RecommendType = e.target.value as RecommendType;
                setRecommend(newRecommend);
              }}
            >
              <option value="placeholder" disabled hidden> </option>
              <option value="yes">I would order again</option>
              <option value="no">I would not order again</option>
            </select>
          </div>

          {/* Confirmation buttons */}
          <div className={style['button-container']}>
            <input
              className="cancel-button"
              type="button"
              value="Cancel"
              onClick={() => closeModal()}
            />
            <input
              className="save-button"
              type="submit"
              value="Save"
            />
            <input
              className="delete-button"
              type="button"
              value="Delete"
              onClick={handleDelete}
            />

          </div>

        </form>

      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
