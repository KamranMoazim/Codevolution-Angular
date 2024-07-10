const stt1 = () => {
    return new Promise((resolve, reject) => {
        console.log("stt1 called")
        setTimeout(() => {
            // reject(new Error('stt1 failed'));
            console.log("stt1 resolved")
            resolve('stt1 resolved');
        }, 5000);
    });
}


const stt2 = (value) => {
    console.log("stt2 called with value: ", value)
    return new Promise((resolve, reject) => {
        console.log("stt2 called")
        setTimeout(() => {
            // reject(new Error('stt1 failed'));
            console.log("stt2 resolved")
            resolve('stt2 resolved');
        }, 3000);
    });
}



const test = async () => {
    try {
        // const result1 = await stt1();
        const result1 = stt1();
        console.log(result1);
        // const result2 = await stt2(result1);
        // const result2 = await stt2("string");
        const result2 = stt2("string");
        console.log(result2);

        // Promise.all([stt1(), stt2("string")]).then((values) => {
        //     console.log(values);
        // });

        // console.log("first")
    } catch (err) {
        console.error(err);
    }
    // finally {
    //     process.exit()
    // }
}


await test();
// test();
