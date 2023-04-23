import styles from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const toggleModal = () => {
    setIsShowModal(prevState => !prevState);
  };

  const closeModal = () => {
    setIsShowModal(prevState => false);
  };

  return (
    <li className={styles.gallery_item}>
      <img
        src={webformatURL}
        alt=""
        className={styles.image}
        onClick={toggleModal}
      />
      {isShowModal && (
        <Modal
          largeImageURL={largeImageURL}
          toggleModal={toggleModal}
          closeModal={closeModal}
        >
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
