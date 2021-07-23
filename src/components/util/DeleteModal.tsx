import React, { useState, useEffect } from 'react';
import { Modal, Header } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';

import styles from '../styles/util/DeleteModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  name: string,
  deleteRestaurant: () => Promise<void>,
  closeModal: () => void,
}

const RestaurantModal = (props: IProps) => {
  const {
    open,
    name,
    deleteRestaurant,
    closeModal,
  } = props;

  const router = useRouter();
  const [isOpen, setOpen] = useState<boolean>(open);

  const handleDelete = async (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    await deleteRestaurant();

    console.log('Form submitted');
    closeModal();

    router.push('/');
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
        <Header>New Restaurant</Header>
      </Modal.Content>
      <Modal.Actions>
        <form
          className={style['container']}
        >
          <h1>Are you sure you want to delete {name}?</h1>
          {/* Confirmation buttons */}
          <div className={style['button-container']}>
            <input
              className="cancel-button"
              type="button"
              value="Cancel"
              onClick={() => closeModal()}
            />
            <input
              className="delete-button"
              type="button"
              value="Delete"
              onClick={(e) => handleDelete(e)}
            />

          </div>

        </form>

      </Modal.Actions>
    </Modal>
  );
};

export default RestaurantModal;
