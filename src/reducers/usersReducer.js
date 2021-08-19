const GOTUSERS = 'GOTUSERS', DELETEUSERBYID = 'DELETEUSERBYID'
    
const defaultstate= {
        users:
            []
    }
  
const userReducer=(state = defaultstate, action)=>{
    let newState = { ...state };
    switch (action.type){
        case GOTUSERS:  
            newState.users=[...action.users]
        return newState
    case DELETEUSERBYID:
        newState.users= newState.users.filter(item=>item!==action.user)
            return newState
        
        default: return state
    }
}

 export const onGotUsers=(users)=> { return { users,type: GOTUSERS } }
export const onDeleteUserById = (user) => { return { user, type: DELETEUSERBYID } }
 
export default userReducer