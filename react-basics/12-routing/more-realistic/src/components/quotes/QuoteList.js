import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  // location returns an object for us to use with search having the string we want

  const queryParams = new URLSearchParams(location.search);
  // default JS constructor
  // more convient way to extract the data
  // this will have a sort key with the value of asc

  const isSortingAscending = queryParams.get('sort') === 'asc'; // get us the value stored in the key sort and return true or false

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    // we want to use query params to sort
    // and update the query parameters in the url itself

    //history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);

    // key name is up to us, doesnt need to be sort
    // step number 1 is to change the URL
    // step number 2 is to read this query param and change displayed info accordingly

    //**************** ALTERNATIVE SYNTAX FOR PUSH ************ // 
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    })
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
