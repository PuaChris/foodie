import { faEdit } from '@fortawesome/free-regular-svg-icons';
import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { uid } from 'react-uid';
import { Modal, Header, Item } from 'semantic-ui-react';

import {
  EmotionType,
  IRestaurantItem,
  RecommendType,
} from '../constant';

import styles from './styles/RestaurantModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  item?: IRestaurantItem,
  addItem: (item: IRestaurantItem) => void,
  editItem: (item: IRestaurantItem) => void,
  deleteItem: (id: string) => void,
  closeModal: () => void,
}

const RestaurantModal = (props: IProps) => {
  const {
    open,
    item,
    addItem,
    editItem,
    deleteItem,
    closeModal,
  } = props;

  const [isOpen, setOpen] = useState<boolean>(open);
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [emotion, setEmotion] = useState<EmotionType | undefined>(EmotionType.Surprise);
  const [recommend, setRecommend] = useState<RecommendType | undefined>(RecommendType.Question);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newItem = {
      name,
      price,
      emotion,
      recommend,
    } as IRestaurantItem;

    if (item) {
      newItem.id = item.id;
      editItem(newItem);
    }
    else {
      newItem.id = uid(newItem);
      addItem(newItem);
    }

    console.log('Form submitted');
    closeModal();
  };

  const handleDelete = () => {
    if (item) deleteItem(item.id);
    closeModal();
  };

  // Updating state on prop change
  // useEffect runs after render finishes
  useEffect(() => {
    setOpen(open);

    setName(item ? item.name : '');
    setPrice(item ? item.price : '');
    setEmotion(item ? item.emotion : EmotionType.Surprise);
    setRecommend(item ? item.recommend : RecommendType.Question);
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
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Item price */}
          <div className={style['price-container']}>
            <label htmlFor="price">How much was it?</label>
            <NumberFormat
              name="price"
              prefix="$"
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              className={style['price-input']}
              autoComplete="off"
              defaultValue={price}
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
              required
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
            {item ? (
              <input
                className="delete-button"
                type="button"
                value="Delete"
                onClick={handleDelete}
              />
            ) : null}
          </div>

        </form>

      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
