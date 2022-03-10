import React from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';

import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

const DUMMY_QUOTES = [
    {id: 'q1', author: 'Bob', text: 'This quote sucks'},
    {id: 'q2', author: 'Robert', text: 'This quote is good'},
];

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();

    //console.log(match);

    const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

    if (!quote) {
        return <p>No quote found!</p>;
    }

    return (
        <React.Fragment>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path={match.path} exact>
                <div className='centered'>
                    <Link className='btn--flat' to={`${match.url}/comments`}>
                        View Comments
                    </Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </React.Fragment>
    )
};

export default QuoteDetail;
// add link below highlighted which loads the comments and navigate us to the path on the route below