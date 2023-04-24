import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import './ImageGallery.css';

export class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    error: PropTypes.string,
    images: PropTypes.array,
  };

  handelImageClick = imageURL => {
    this.props.onClick(imageURL);
  };

  render() {
    const { status, images, onLoadMore } = this.props;

    if (status === 'idle') {
      return <div className="Info">The gallery is empty</div>;
    }
    if (status === 'pending') {
      return <Loader />;
    }
    if (status === 'rejected') {
      toast.error('Search error');
    }
    if (status === 'resolved' && images.length !== 0) {
      return (
        <>
          <ul className="ImageGallery">
            {images.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                onClick={this.handelImageClick}
              />
            ))}
          </ul>
          {<Button onLoadMore={onLoadMore} />}
        </>
      );
    } else {
      return <div className="Info">We cant find it</div>;
    }
  }
}
