import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imagesAPI from './services/image-api';
import { Searchbar } from './components/Searchbar/Searchbar';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Modal } from './components/Modal/Modal';

import './App.css';

export class App extends Component {
  state = {
    findValue: '',
    pageNumber: 1,
    images: [],
    status: 'idle',
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  handleFormSubmit = findValue => {
    this.setState({
      findValue: findValue,
      pageNumber: 1,
      images: [],
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevFindValue = prevState.findValue;
    const nextFindValue = this.state.findValue;

    if (prevFindValue !== nextFindValue) {
      this.setState({ status: 'pending' });

      this.getImages();
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  getImages = () => {
    const { findValue, pageNumber } = this.state;

    imagesAPI
      .fetchImages(findValue, pageNumber)
      .then(res =>
        this.setState(({ images, pageNumber }) => ({
          images: [...images, ...res],
          status: 'resolved',
          pageNumber: pageNumber + 1,
        }))
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  onLoadMore = () => {
    this.getImages();
  };

  onOpenModal = url => {
    this.setState({ largeImageURL: url });
    this.modalToggle();
  };

  modalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { status, error, images, showModal, largeImageURL } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          status={status}
          error={error}
          images={images}
          onClick={this.onOpenModal}
          onLoadMore={this.onLoadMore}
        />
        {showModal && <Modal src={largeImageURL} onCloseModal={this.modalToggle} />}
        <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      </div>
    );
  }
}