import React, { useState, useEffect } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

import styles from './styles/RestaurantModal.module.scss';

const style = styles;

type IProps = {
  open: boolean;
  closeModal:() => void;
};

const RestaurantModal = (props: IProps) => {
  // Setting initial state similar to constructor
  const { open, closeModal } = props;
  const [isOpen, setOpen] = useState(open);

  // Updating state on prop change
  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Modal
      onClose={() => {
        setOpen(false);
        closeModal();
      }}
      open={isOpen}
    >
      <Modal.Content>
        <Header>New Restaurant Item</Header>
      </Modal.Content>
      <Modal.Actions>
        <form onSubmit={(e) => {
          setOpen(false);
        }}
        >
          <label htmlFor="name">Name</label>
          <input
            name="name"
            className={style['name-input']}
            required
          />
          <label htmlFor="price">How much was it?</label>
          <input
            name="price"
            className={style['price-input']}
            required
          />
          <label htmlFor="tax">Tax?</label>
          <input
            name="tax"
            className={style['tax-dropdown']}
            required
          />
          <label htmlFor="emotion">How was it?</label>
          <input
            name="emotion"
            className={style['emotion-dropdown']}
            required
          />
          <label htmlFor="recommend">Would I order again?</label>
          <input
            name="recommend"
            className={style['recommend-dropdown']}
            required
          />
        </form>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          type="submit"
          onClick={() => console.log('New item added')}
          positive
        >
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
