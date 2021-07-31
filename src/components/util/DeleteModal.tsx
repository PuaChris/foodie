import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'semantic-ui-react';
import { useRouter } from 'next/dist/client/router';

import styles from '../styles/util/DeleteModal.module.scss';

const style = styles;

interface IProps {
  open: boolean,
  name: string,
  deleteRestaurant: () => Promise<void>,
  closeModal: () => void,
}

const DeleteModal = (props: IProps) => {
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
      size="mini"
      onClose={() => {
        closeModal();
      }}
      open={isOpen}
    >
      <Modal.Content>
        <div className={style['header-container']}>
          <span className={style['header']}>
            <h1 className={style['header-text']}>Delete Restaurant</h1>
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
        >
          <p className={style['text']}>Do you want to delete <strong >{name}</strong>?</p>
          {/* Confirmation buttons */}
          <div className={style['button-container']}>
            <input
              className={style['no-button']}
              type="button"
              value="No"
              onClick={() => closeModal()}
            />
            <input
              className={style['yes-button']}
              type="button"
              value="Yes"
              onClick={(e) => handleDelete(e)}
            />
          </div>
        </form>

      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
