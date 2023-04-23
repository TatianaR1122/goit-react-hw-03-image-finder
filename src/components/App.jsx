import imagesApi from 'services/image-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import styles from './App.module.css';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';

const per_page = 12;

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState('');
  const [isLoader, setIsLoader] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    (async () => {
      setIsLoader(true);
      try {
        const { data } = await imagesApi(page, query, per_page);

        if (!data.totalHits) {
          setIsLoader(false);
          setTotalPages(0);
          return toast.error("Sorry! Can't find any pictures");
        }

        setImages(prevState => [...prevState, ...data.hits]);
        setTotalPages(Math.ceil(data.totalHits / per_page));

        page === 1 && toast.success(`We find ${data.totalHits} pictures`);
        Math.ceil(data.totalHits / per_page) === page &&
          toast.info('The last page');
      } catch (err) {
        console.log(err.massage);
      }
      setIsLoader(false);
    })();
  }, [query, page]);

  const getImages = ev => {
    ev.preventDefault();
    if (ev.target.nodeName === 'BUTTON') {
      const queryInput = ev.currentTarget.searchInput.value.trim();

      setImages([]);
      setPage(1);
      setQuery(queryInput);
    }
  };

  const loadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <div className={styles.app}>
      <Searchbar getImages={getImages} />

      {!totalPages && query && <p className={styles.err}>Error! Try again</p>}

      <ImageGallery images={images} />
      {totalPages > page && (
        <Button text="Load more" handleClick={loadMoreImages} />
      )}

      {isLoader && <Loader />}
      <ToastContainer autoClose={2000} theme="colored" />
    </div>
  );
};
