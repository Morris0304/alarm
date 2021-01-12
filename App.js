import React from 'react';


import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './src/store/index'

import AllRouter from './src/navigation/index'

const store = createStore(reducers)



export default function App() {
  return (
    <Provider store={store}>
      <AllRouter/>
    </Provider>
    );
}