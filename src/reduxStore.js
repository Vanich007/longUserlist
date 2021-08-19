import userReducer from './reducers/usersReducer'
import{ combineReducers, createStore} from 'redux'

let reducers = combineReducers({
    usersPage: userReducer,
})
let store=createStore(reducers)

export default store;

