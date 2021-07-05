import React, { useState, useEffect, useRef } from 'react';
import NumberFormat from 'react-number-format';
import { Modal, Header } from 'semantic-ui-react';

import {
  EmotionType,
  IRestaurantItem,
  RecommendType,
} from '../constant';

import styles from './styles/RestaurantModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  addNewItem: (item: IRestaurantItem) => void,
  closeModal: () => void,
}

const RestaurantModal = (props: IProps) => {
  // Setting initial state similar to constructor
  const { open, addNewItem, closeModal } = props;
  const [isOpen, setOpen] = useState<boolean>(open);
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [emotion, setEmotion] = useState<EmotionType>();
  const [recommend, setRecommend] = useState<RecommendType>();

  const emotionRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item = {
      name,
      price,
      emotion,
      recommend,
    } as IRestaurantItem;
    addNewItem(item);
    console.log('Form submitted');
    closeModal();
  };

  // Updating state on prop change
  // useEffect runs after render finishes
  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Modal
      onClose={() => {
        closeModal();
      }}
      open={isOpen}
    >
      <Modal.Content>
        <Header>New Restaurant Item</Header>
      </Modal.Content>
      <Modal.Actions>
        <form
          className={style['container']}
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* Item name */}
          <div className={style['name-container']}>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              className={style['name-input']}
              required
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Item price */}
          <div className={style['price-container']}>
            <label htmlFor="price">How much was it?</label>
            <NumberFormat
              name="price"
              ref={emotionRef}
              prefix="$"
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              className={style['price-input']}
              autoComplete="off"
              onValueChange={(e) => {
                const newPrice: string | undefined = e.value;
                setPrice(newPrice);
              }}
            />

          </div>

          {/* Emotion */}
          <div className={style['emotion-container']}>
            <label htmlFor="emotion">How was it?</label>
            <select
              name="emotion"
              className={style['emotion-dropdown']}
              required
              defaultValue="placeholder"
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
              required
              defaultValue="placeholder"
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
          </div>

        </form>

      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
