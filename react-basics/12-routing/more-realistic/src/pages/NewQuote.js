import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote,);
    const history = useHistory();

    useEffect(() => { // want to define a side effect func to be triggered whenever our dependency (status) changes
        if (status === 'completed') {
            history.push('/quotes')
        }
    }, [status, history]);

    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
    };

    return (
        <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
    )
};

export default NewQuote;