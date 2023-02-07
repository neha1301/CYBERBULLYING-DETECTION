import React, { useState , useEffect } from 'react';
import './App.css';
import Post from './Post';
import {db, auth} from './firebase';
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import Imageupload from './ImageUpload';
import userEvent from '@testing-library/user-event';




function getModalStyle() {
  const top = 50;
  const left = 50; 
  return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      border:'2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
  },
}));


function App() { 
  const classes =useStyles();
  const [modalStyle]= useState(getModalStyle);
  const [posts, setPosts]= useState([]);
  const [open, setOpen]= useState(false);
  const[openSignIn, setOpenSignIn] =useState(false);
  const [username, setUsername]= useState('');
  const [password, setPassword]= useState('');
  const [email, setEmail]= useState('');
  const [user, setUser]= useState(null);
  const [image, setImage]= useState([]);
  
  useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((authUser)=>{
  if(authUser){
   console.log(authUser);
   setUser(authUser);
   if(authUser.displayName){
//
   }
   else{
    return authUser.updateProfile({
      displayName:username,
    });
   }
  }
  else{
   setUser(null);
  }
})
return()=>{
  unsubscribe();
}
  },[user, username]);



  // Runs a piece of code 
 useEffect(() => {
 db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot =>{
  setPosts(snapshot.docs.map(doc => ({
    id: doc.id,
     post: doc.data()})));
 })
 },[]);
 
 const signUp = (event)=>{
  event.preventDefault();
  auth
  .createUserWithEmailAndPassword(email, password)
  .then((authUser)=>{
    authUser.user.updateProfile({
      displayName:username
    })
  })
  .catch((error)=> alert(error.message))
} 
 const signIn = (event) => {
  event.preventDefault();
  auth
  .signInWithEmailAndPassword(email, password)
  .catch((error)=> alert(error.message))
  setOpenSignIn(false);
 }
  return (
    <div className="App">
      <Modal
      open={open}
      onClose={()=> setOpen(false)}
      >      
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
          <center>
            <img
              className="app__headerImage"
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
            </center>  
            <Input            
            placeholder='username'
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            />
            <Input            
            placeholder='email'
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
            placeholder='password'
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>
              Sign Up
            </Button>

          
          </form>
        </div>

      </Modal>

      <Modal
      open={openSignIn}
      onClose={()=> setOpenSignIn(false)}
      >      
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signIn">
          <center>
            <img
              className="app__headerImage"
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
           
            </center>  
            <Input            
            placeholder='email'
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
            placeholder='password'
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>

          
          </form>
        </div>

      </Modal>
       <Modal 
      open={openSignIn}
      onClose={()=> setOpenSignIn(false)}
      >      
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signIn">
          <center>
            <img
              className="app__headerImage"
              src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
           
            </center>  
            <Input            
            placeholder='email'
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <Input
            placeholder='password'
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn} className="sign">
              Sign In
            </Button>

          
          </form>
        </div>

      </Modal>





      <div className="app__header">
        <img
        className="app__headerImage"
        src=" https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
        />
       
        
        {user ?(
         <Button onClick={()=> auth.signOut()}>Log Out</Button>
      ):(     
        <div className= "app_loginContainer">
         <Button onClick={()=> setOpenSignIn(true)}>Sign In</Button>
         <Button onClick={()=> setOpen(true)}>Sign Up</Button>
         </div>
      )}
       
      </div>
      <div className="app_posts">
      {
        posts.map(({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      </div>
      
      {user?.displayName?(
      <Imageupload username={user.displayName}/>
      ):(
        <h3>Sorry You need to Login to Upload</h3>
      )}
      
      
    </div>
  );
}

export default App;
