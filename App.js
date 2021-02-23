
import React from 'react';
import PlacesNavigator from './navigator/PlacesNavigator';
import { createStore , combineReducers , applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import placesReducer from './store/places-reducer';
import { init } from './helper/db'
init()
  .then(() => { 
    console.log("Initialized successfully.");
  })
  .catch((err) => { 
    console.log("Initialized Failed.")
    console.log( "Error:" ,err);
  });

const rootReducer = combineReducers({
  places : placesReducer
});

const store = createStore(rootReducer , applyMiddleware(ReduxThunk));

const  App = () =>  {
  return (
    <Provider store={store} >
      <PlacesNavigator />
    </Provider>
  );
};


export default App;