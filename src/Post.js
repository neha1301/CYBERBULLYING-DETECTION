import React, { useEffect, useState } from 'react'
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import Filter from "bad-words";
import profanity from 'profanity-hindi';

function Post({postId, user, username, caption, imageUrl}) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const filterWord = new Filter();


  useEffect (()=>{
    let unsubscribe;
    if (postId){
      unsubscribe =db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map((doc)=> doc.data()));
      });
      setComment('');
    }
    return () =>{
      unsubscribe();
    };
    
  },[postId]);

  const postComment =(event)=>{

    event.preventDefault();
    var isDirty = profanity.isMessageDirty(comment);
    
    const isAbused = filterWord.clean(comment) !== comment;
    
    if(!(isAbused || isDirty)){
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
    });
    setComment("");

  } else{
    const newComment={
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      
    }
    setComments([...comments,newComment])
    setTimeout(()=>{
     setComments(comments.slice(-1))
    },1000)
    setComment("");
    
    //alert("Do NOt use")
  }
  

  }
  return (
    
    <div className="post">
    <div className="post_header">
    <Avatar
        className="post_avatar"
        alt='nehashar'
        src="https://png.pngitem.com/pimgs/s/22-223925_female-avatar-female-avatar-no-face-hd-png.png"
        />
        <h3>{username}</h3>

    </div>
        
      <img className="post_image" src={imageUrl} alt=""/>
      <h4 className="post_text"><strong>{username}</strong>{caption}</h4>

      
        <div className="post_comments" >
        {comments.map((comment)=>(
          <p>
            <b>{comment.username}</b> {comment.text}
          </p>
        ))}
        </div>
      
      {
        user && (
          <form className="post_commentBox">
          <input
          className="post_input"
          type="text"
          placeholder="add a comments.."
          value={comment}
          onChange={(e)=> setComment(e.target.value)}
          />
        
        <button
        className="post_button"
        disabled={!comment}
        type="submit"
        onClick={postComment}
        >
         Post
        </button>
        </form>
        )
      }
      </div>
      
  )
}

export default Post;
