import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducer';

const reducer = combineReducers({
  // Reducers
  userLogin: userLoginReducer,
});
const initialState = {

};
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;