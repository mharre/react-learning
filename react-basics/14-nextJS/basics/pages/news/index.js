import { Fragment } from "react";
import Link from 'next/link';

const NewsPage = () => {
    return (
        <Fragment>
            <h1>The News Page</h1>
            <ol>
                <li>
                    <Link href='/news/article1'>Article 1</Link>
                </li>
                <li>
                    <Link href='/news/article2'>Article 2</Link>
                </li>
            </ol>
        </Fragment>
    )
};

export default NewsPage;
