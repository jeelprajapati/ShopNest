import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './reducer/orderReducer';
import favoriteReducer from './reducer/favoriteReducer';
import categoryReducer from './reducer/categoryReducer';
import colorReducer from './reducer/colorReducer';
import tagReducer from './reducer/tagReducer';
import productReducer from './reducer/productReducer';
import singleProductReducer from './reducer/singleProductReducer';

export const store = configureStore({
    reducer: {
      orders:orderReducer,
      favorites:favoriteReducer,
      categories:categoryReducer,
      colors:colorReducer,
      tags:tagReducer,
      products:productReducer,
      singleProduct:singleProductReducer
    }
  })