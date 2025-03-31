import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { State, AppDispatch } from '../types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;

// import { AppDispatch } from '@frontend/types/state';
// import { useDispatch, useSelector } from 'react-redux';
// //import type { RootState, AppDispatch } from '@store/store';

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();
