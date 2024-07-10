

// generic pipeline executors

export async function ExecutePipeline(model, pipeline){
    return await model.aggregate(pipeline)
}

export async function ExecutePipeline_ClearOldDataAndInsertNew(model, newCollectionName, pipeline){

    const url = 'mongodb://localhost:27017/'
    const dbName = 'meanStackDb';

    await connectDB(url + dbName);
    const client = new MongoClient(url);
    const db = client.db(dbName);

    await model.deleteMany({});

    const data = await ExecutePipeline(model, pipeline);

    await db.collection(newCollectionName).insertMany(data);

    return data;
}



export async function ExecutePipeline_KeepOldDataAndInsertNewWithUpdates(model, newCollectionName, pipeline){

    const url = 'mongodb://localhost:27017/'
    const dbName = 'meanStackDb';

    await connectDB(url + dbName);
    const client = new MongoClient(url);
    const db = client.db(dbName);

    const data = await ExecutePipeline(model, pipeline);

    const bulkOperations = data.map(item => ({
        updateOne: {
            filter: {
                _id: item._id,
            },
            update: { $set: item },
            upsert: true,
        }
    }));

    // Execute bulk write operations
    const bulkWriteResult = await db.collection(newCollectionName).bulkWrite(bulkOperations);

    console.log('Bulk write result:', bulkWriteResult);

    return data;
}