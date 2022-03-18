import { useRouter } from 'next/router';
import NewMeetUpForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';
import { Fragment } from 'react';

const NewMeetUpPage = () => {
    const router = useRouter();
    const addMeetupHandler = async (enteredMeetupData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.push('/');
    };

    return (
        <Fragment>
            <Head>
                <title>Add a meetup</title>
                <meta name='description' content='add your own meetups!'/>
            </Head>
            <NewMeetUpForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
};

export default NewMeetUpPage