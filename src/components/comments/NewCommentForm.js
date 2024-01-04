import { useRef,useEffect } from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from "../hooks/use-http";
import {addComment} from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner"
const NewCommentForm = (props) => {
  
  const {sendRequest, status, error} = useHttp(addComment);
  const commentTextRef = useRef();
  const onAddComments = props;
  const enteredText = commentTextRef.current.value;

  useEffect(() => {
   if(status === 'success' && !error){
    onAddComments()
   }
  }, [status, error, onAddComments])
  



  const submitFormHandler = (event) => {
    event.preventDefault();

    // optional: Could validate here
    sendRequest({commentsData:{text:enteredText}, quoteId :props.quoteId})
    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && <div className='centered'><LoadingSpinner/></div>}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
