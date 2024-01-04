import { useCallback, useEffect, useState } from 'react';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import useHttp from '../hooks/use-http';
import {getAllComments} from "../lib/api"
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from "../comments/CommentsList"
const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  const {quoteId}=params ;

  const  {sendRequest, status, data:loadedComments}= useHttp(getAllComments);
  useEffect(()=>{
    sendRequest(quoteId)
  },[quoteId,sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let comments ;
   
  if (status === 'pending') {
      comments = <div className='centered'><LoadingSpinner/></div>
  }
if(status === 'completed' && (loadedComments && loadedComments > 0)){
   comments = <CommentsList comments={loadedComments}/>
}
if(status === 'completed'&& (!loadedComments || loadedComments.length === 0)){
  comments =<div className='centered'>Np comments yet added</div>
}

  const onAddCommentsHandler = useCallback(()=>{
    sendRequest(quoteId)
  }, [sendRequest,quoteId]);
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId= {params.quoteId }  onAddComments={onAddCommentsHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
