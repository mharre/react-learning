import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
        address: 'Some Address, 5, 12345 City',
        description: 'The first meetup'
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
        address: 'Some Address, 5, 12345 City',
        description: 'The second meetup'
    },
]

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
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 10
    };
}

export default HomePage