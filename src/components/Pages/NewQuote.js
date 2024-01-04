import { useHistory } from "react-router-dom";
import QuoteForm from "../quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const { sendRequest, status, data:loadedQuote, error } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status, history]);

  const onAddQuoteHandler = (QuotesData) => {
    sendRequest(QuotesData);
  };
  return (
    <div>
      <QuoteForm isLoading = {status === 'pending'} onAddQuote={onAddQuoteHandler} />
    </div>
  );
};

export default NewQuote;
