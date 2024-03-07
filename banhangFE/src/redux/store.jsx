import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/CounterSlide'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})