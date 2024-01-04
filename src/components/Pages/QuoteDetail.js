import React,{useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom';
import Comments from "../comments/Comments"
import HighlightedQuote from "../quotes/HighlightedQuote"
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';
import {getSingleQuote} from "../lib/api.js"
import useHttp from '../hooks/use-http.js';
import LoadingSpinner from '../UI/LoadingSpinner.js';

const DummyQuotes = [
  {id:"1", author:"Max", text:"Learning React on work"},
  {id:"2", author:"MaxTwo", text:"Learning React on work"}
]
const QuoteDetail = () => {
  const {sendRequest, status, data:loadedQuote, error}=useHttp(getSingleQuote);
    const  params  = useParams();
   const match = useRouteMatch();
   const quoteId = params;
  useEffect(() => {
    sendRequest(quoteId)
  
   
  }, [sendRequest,quoteId])
  

  if(status === 'pending'){
    return <div className='centered'>
      <LoadingSpinner/>
    </div>
  }

  if (error) {
    return <div className='centered'>{error}</div>
  }
  if (!loadedQuote) {
    return <p>no quote Found!</p>
  }

    const quote = DummyQuotes.find(quote=> quote.id === params.quoteId);
    if(!quote){
      return <p>quote not available</p>;
    }

  return (
    <div>
        <h1>Quotes Details</h1>
        <p>{params.quoteId}</p>
        <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text}/>
        <Route path={match.path } exact>
        <div className="centred">
          <Link className="btn--flat" to={`${match.url}/comments`}>Load Comments</Link>
        </div>
        </Route> 
        <Route path={`${match.path}/comments`}>
            <Comments/>
        </Route>
    </div>
  )
}

export default QuoteDetail