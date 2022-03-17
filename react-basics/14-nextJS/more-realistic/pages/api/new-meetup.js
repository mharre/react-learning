import { MongoClient } from 'mongodb';

// /api/new-meetup would be the url to trigger the func
async function handler(req, res) {
    if (req.method === 'POST'){
        const data = req.body;

        //const { title, image, address, description } = data;
        //we look at our form and can expect all data from those form inputs which we destructure to pull out each
        const client = await MongoClient.connect('mongodb+srv://matthew:Ballsack290550!!@cluster0.z5bhi.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        // collections = "tables", documents = "entries" which are just JS objects / if not made it will create

        const result = await meetupsCollection.insertOne(data);
        // no error handling at the moment - assume it works
        console.log(result);

        client.close();
        
        // now need to send a response back
        res.status(201).json({message: 'meet up inserted!'});
    }
}

export default handler;