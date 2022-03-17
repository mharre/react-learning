import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
    return (
        <MeetupDetail
            image='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG'
            title='First Meetup'
            address='Some Street 5, Some City'
            description='This is a first meetup'
        />
    )
};

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                }
            },
        ]
    }
};

export async function getStaticProps(context) {
    //fetch data for single meet up
    const meetupId = context.params.meetupId;
    //meetupId because its what we have between []
    console.log(meetupId);
    // only see this console log in our terminal console but not terminal as all code here is for server

    return {
        props: {
            meetupData: {
                image:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
                id: meetupId,
                title: 'First Meetup',
                address: 'Some street 5, Some City',
                description: 'This is a first meetup'
            }
        }
    }
};

export default MeetupDetails;