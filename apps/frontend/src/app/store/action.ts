import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { History } from 'history';

//import { ProductWithPaginationRdo } from '@frontend/src/rdo/product-with-pagination.rdo';
import { ApiRoute, AppRoute } from '@frontend/src/const';
import {
  //Guitar,
  //GuitarType,
  //Product,
} from '@frontend/src/types/types';
import { StatusCodes } from 'http-status-codes';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  // FETCH_PRODUCT_TYPES: 'product-types/fetch',
  // FETCH_PRODUCTS: 'products/fetch',
  // FETCH_PRODUCT: 'product/fetch',
  // ADD_PRODUCT: 'product/add-product',
  // EDIT_PRODUCT: 'product/edit-product',
  // DELETE_PRODUCT: 'product/delete-product',
};

// export const fetchGuitarTypes = createAsyncThunk<
//   GuitarType,
//   undefined,
//   { extra: Extra }
// >(Action.FETCH_PRODUCT_TYPES, async (_arg, { extra }) => {
//   const { api } = extra;
//   const { data } = await api.get<GuitarType>(ApiRoute.ShopProductTypes);
//   return data;
// });

// export const fetchProducts = createAsyncThunk<
//   ProductWithPaginationRdo,
//   string,
//   { extra: Extra }
// >(Action.FETCH_PRODUCTS, async (queryParams: string, { extra }) => {
//   const { api } = extra;
//   const { data } = await api.get<ProductWithPaginationRdo>(
//     `${ApiRoute.ShopProducts}?${queryParams}`
//   );
//   return data;
// });

// export const fetchProduct = createAsyncThunk<
//   Guitar,
//   Guitar['id'],
//   { extra: Extra }
// >(Action.FETCH_PRODUCT, async (productId, { extra }) => {
//   const { api, history } = extra;

//   try {
//     const { data } = await api.get<Guitar>(
//       `${ApiRoute.ShopProducts}/${productId}`
//     );

//     return data;
//   } catch (error) {
//     const axiosError = error as AxiosError;

//     // if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
//     //   history.push(AppRoute.);
//     // }

//     return Promise.reject(error);
//   }
// });

// export const addProduct = createAsyncThunk<Guitar, FormData, { extra: Extra }>(
//   Action.ADD_PRODUCT,
//   async (newProduct, { extra }) => {
//     const { api, history } = extra;
//     const { data } = await api.post<Guitar>(ApiRoute.ShopProducts, newProduct);
//     history.push(AppRoute.Catalog);

//     return data;
//   }
// );

// export const editProduct = createAsyncThunk<Guitar, FormData, { extra: Extra }>(
//   Action.EDIT_PRODUCT,
//   async (product, { extra }) => {
//     const { api, history } = extra;
//     const productId = product.get('id') as string;
//     const { data } = await api.put<Guitar>(
//       `${ApiRoute.ShopProducts}/${productId}`,
//       product
//     );
//     history.push(AppRoute.Catalog);
//     return data;
//   }
// );

// export const deleteProduct = createAsyncThunk<
//   void,
//   Product['id'],
//   { extra: Extra }
// >(Action.DELETE_PRODUCT, async (productId, { extra }) => {
//   const { api, history } = extra;
//   await api.delete(`${ApiRoute.ShopProducts}/${productId}`);

//   history.push(AppRoute.Root);
// });
