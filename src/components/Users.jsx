import React,{useState,useEffect,useRef} from 'react'
import {  onGotUsers, onDeleteUserById } from '../reducers/usersReducer'
import { connect } from 'react-redux'



function Users(props) {
  let [filenameState,setFilenameState]=useState(null)
  let dropArea = useRef(null)
  
  const usersJsx = props.users.map(item => {
    
    return <li></li>
  })


  useEffect(
    
    () => {let usersMass=[]
      dropArea.current = document.querySelector("#drop-area");
      window.addEventListener('mouseup', _onDragLeave);
      window.addEventListener('dragenter', _onDragEnter);
      window.addEventListener('dragover', _onDragOver);
      dropArea.current.addEventListener('dragleave', _onDragLeave)
      window.addEventListener('drop', _onDrop);
      function _onDrop(e) {
        e.preventDefault();
        let files = e.dataTransfer.files;
        handleDropedFiles(files[0])
        return false;
      }
      function handleDropedFiles(file) {
        let reader = new FileReader()
        if(!file){return}
        reader.onloadend = () => { 
          setFilenameState(file.name)
          parseFile(reader.result)
        }
      reader.readAsText(file)
      }
        
       
      
       async function parseFile(file) {
       
        const json = await JSON.parse(file)
       parseArray(json)
       props.onGotUsers(Array.from(new Set(usersMass)).sort())   
      }
      
      function parseArray(arr) {
        if (!Array.isArray(arr)) {
          if (arr.hasOwnProperty('user')) {  usersMass.push(arr.user);}
            if (arr.hasOwnProperty('replies')) parseArray(arr.replies)
          }
          if (Array.isArray(arr))
            for (var i = 0; i < arr.length; i++) {
              parseArray(arr[i])
            }
        
        }
      return ()=>{
      window.removeEventListener('mouseup', _onDragLeave);
      window.removeEventListener('dragenter', _onDragEnter);
      window.removeEventListener('dragover', _onDragOver);
      dropArea.current.removeEventListener('dragleave', _onDragLeave)
      window.removeEventListener('drop', _onDrop);
      }}
      
    , [props])

   function _onDragEnter(e) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    
    function _onDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    
    function _onDragLeave(e) {
    
      e.stopPropagation();
      e.preventDefault();
      return false;
    }
    





//var person = JSON.parse(personData);
 
    return (<>
   
      {filenameState?<h1>{filenameState}</h1>:''}
      
      
    { usersJsx }
    {!filenameState?<div id="drop-area" >
  <form className="my-form">
 DROP FILE!
  </form>
</div>:<div id="drop-area" className="nodisplay"></div>}
      
    </>)
  
}



 const mapStateToProps = (state) => {
   return {
      users: state.usersPage.users,
    }
  }
        

  
const UsersContainer = connect(mapStateToProps, {onGotUsers, onDeleteUserById})(Users);




export default UsersContainer;