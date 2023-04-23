import axios from 'axios';

const KEY = '34349101-ec25eec32b9371237ca900ff3';

function getImagesPixabay(page = 1, query, per_page) {
  const res = axios(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
  );
  return res;
}

export default getImagesPixabay;
