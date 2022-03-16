import { useRouter } from 'next/router';

function DetailPage() {
    const router = useRouter();
    
    const newsId = router.query.newsId;
    // send request to backend api to fetch news item with news id

    return <h1> The Detail Page for {newsId} </h1>
}

export default DetailPage;