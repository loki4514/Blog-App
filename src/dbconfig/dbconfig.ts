import mongoose from "mongoose";

export async function connect() {

    try {
        mongoose.connect(process.env.MONGO_URL!) // i will take care of it '!' you will get to it 
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log('MongoDB connected succesfully')
        })

        connection.on('error', (err) => {
            console.log(err)
        })

    } catch (error) {
        console.log('Something goes wrong')
        console.log(error)
    }
    
}