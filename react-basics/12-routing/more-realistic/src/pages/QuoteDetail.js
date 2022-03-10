import React from 'react';
import { useParams, Route, Link } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Bob', text: 'This quote sucks'},
    {id: 'q2', author: 'Robert', text: 'This quote is good'},
];

const QuoteDetail = () => {
    const params = useParams();

    const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    if (!quote) {
        return <p>No quote found!</p>;
    }

    return (
        <React.Fragment>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path={`/quotes/${params.quoteId}`} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>
                        View Comments
                    </Link>
                </div>
            </Route>
            <Route path={`/quotes/${params.quoteId}/comments`}>
                <Comments />
            </Route>
        </React.Fragment>
    )
};

export default QuoteDetail;
// add link below highlighted which loads the comments and navigate us to the path on the route below