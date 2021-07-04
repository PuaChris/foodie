import React, { useState, useEffect } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';

import styles from './styles/RestaurantModal.module.scss';

const style = styles;

type IProps = {
  open: boolean;
};

const RestaurantModal = (props: IProps) => {
  // Setting initial state similar to constructor
  const { open } = props;
  const [isOpen, setOpen] = useState(open);

  // Updating state on prop change
  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <Modal
      onClose={() => setOpen(false)}
      open={isOpen}
    >
      <Modal.Header>New Restaurant</Modal.Header>
      <Modal.Content>
        <Header>Default Profile Image</Header>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
