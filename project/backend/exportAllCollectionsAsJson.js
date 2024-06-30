import { MongoClient } from 'mongodb';
import fs from 'fs';

async function exportAllCollectionsToJson() {
    const url = 'mongodb://localhost:27017';
    const dbName = 'meanStackDb';
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);

        // Get all collection names
        const collections = await db.listCollections().toArray();

        for (const collection of collections) {
            const collectionName = collection.name;
            const outputFileName = `${collectionName}.json`;
            const collectionData = db.collection(collectionName);

            // Fetch all documents
            const documents = await collectionData.find().toArray();

            // Write documents to JSON file
            fs.writeFileSync(outputFileName, JSON.stringify(documents, null, 2));
            console.log(`Exported ${documents.length} documents to ${outputFileName}`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

exportAllCollectionsToJson();
