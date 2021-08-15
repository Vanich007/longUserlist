import UsersContainer from './components/Users';
import DisplayUsersList from './components/DisplayUsersList'
import {  onGotUsers, onDeleteUserById } from './reducers/usersReducer'
import { connect } from 'react-redux'
import './App.css';

function Application(props) {
  return (<>
    <UsersContainer/>
    <DisplayUsersList  users={props.users} onDeleteUserById={props.onDeleteUserById}/>
  </>);
}

const mapStateToProps = (state) => {
  return {
     users: state.usersPage.users,
   }
 }
       

 
const App = connect(mapStateToProps, {onGotUsers, onDeleteUserById})(Application);
export default App;
