import React, { useEffect } from "react";
import QuoteList from "../quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import NewQuote from "./NewQuote";
const DummyQuotes = [
  { id: "1", author: "Max", text: "Learning React on work" },
  { id: "2", author: "MaxTwo", text: "Learning React on work" },
];
const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  if (status === "success" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return (
      <NewQuote/>
    );
  }

  return (
    <div>
      <QuoteList quotes={loadedQuotes} />
    </div>
  );
};

export default AllQuotes;
