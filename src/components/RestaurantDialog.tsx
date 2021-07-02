import React, { useState } from 'react';
import { Modal, Header, Button } from 'semantic-ui-react';
import RestaurantDescription from './RestaurantDescription';

import styles from './styles/RestaurantDialog.module.scss';

const style = styles;

const RestaurantDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Show Modal</Button>}
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

export default RestaurantDialog;
