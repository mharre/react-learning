import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
    return (
        <MeetupList meetups={props.meetups} />
    )
};

//export async function getServerSideProps(context) {
//    const req = context.req;
//    const res = context.res;
//
//    //fetch data via API
//    return {
//        props: {
//            meetups: DUMMY_MEETUPS
//        }
//    };
//};

export async function getStaticProps() {
    // can execute any code here that you would run on a server, access file system securely connect to DB etc, never ends up on client side
    // ALWAYS return an obj, with props property, which holds a prop object which you recieve in your component function
    // they are then set as props for the page component

    const client = await MongoClient.connect('mongodb+srv://matthew:Ballsack290550!!@cluster0.z5bhi.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    
    const meetups = await meetupsCollection.find().toArray();
    // async func which returns a promise and will find all documents in that collection

    client.close();
    
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
            // required to map the meetups because of the unique object ID from mongo, also id is specific to mongo db to get the actual id from the mongodb object
        },
        revalidate: 10
    };
}

export default HomePage