import React from 'react';

import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Bob', text: 'This quote sucks'},
    {id: 'q2', author: 'Robert', text: 'This quote is good'},
];

const AllQuotes = () => {
    return (
        <QuoteList quotes={DUMMY_QUOTES} />
    )
};

export default AllQuotes;
