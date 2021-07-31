import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';
import { Modal, Header } from 'semantic-ui-react';

import {
  IRestaurantItem,
  EmotionType,
  RecommendType,
  RecommendItemText,
  EmotionText,
} from '../../constant';

import styles from '../styles/item/ItemModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  item?: IRestaurantItem,
  addItem: (item: IRestaurantItem) => void,
  editItem: (item: IRestaurantItem) => void,
  deleteItem: (id: string) => void,
  closeModal: () => void,
}

const ItemModal = (props: IProps) => {
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
  const [emotion, setEmotion] = useState<EmotionType | undefined>(EmotionType.Question);
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
      // Have to also pass along the existing item ID or else it cannot be saved into the database
      newItem.id = item.id;
      editItem(newItem);
    }
    else addItem(newItem);

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
    setEmotion(item ? item.emotion : EmotionType.Question);
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
        <Header>New Item</Header>
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
            <label htmlFor="emotion">{EmotionText.Question}</label>
            <select
              name="emotion"
              className={style['emotion-dropdown']}
              required
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
          <div className={style['recommend-container']}>
            <label htmlFor="recommend">{RecommendItemText.Question}</label>
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
              <option value={RecommendType.Yes}>{RecommendItemText.Yes}</option>
              <option value={RecommendType.No}>{RecommendItemText.No}</option>
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

export default ItemModal;
