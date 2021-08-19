import {PureComponent} from 'react'
import VirtualList from 'react-virtual-list';

const MyList = ({
  virtual,
 
}) => (
  <ul>
    {virtual.items}
  </ul>
);

const MyVirtualList = VirtualList()(MyList);


class DisplayUsersList extends PureComponent{

  render(){
    const UsersVirt=this.props.users.map(item=>{    //подготовим список с разметкой
      return(
        <li className="user_item" key={`item_${item}`} >
        <div className="username">{item}</div>
        <button onClick={()=>{this.props.onDeleteUserById(item)}} className="delete_user"> x </button>
      </li>
      )
    })

    return (<>
    <div className={this.props.users.length?'wrapper':'nodisplay'} > 
    <div className="list">
      <MyVirtualList
      items={UsersVirt}
      itemHeight={20}
    />
    </div></div>
    </>)
  }
}



export default DisplayUsersList;
