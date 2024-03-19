import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb+srv://modingeroliver:Olivercolopa1@clustertst.cb6tmee.mongodb.net/test_bentor', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('-------Database connected-------');
    } catch (error) {
        console.error('-------Error Database connection-------', error);
    }
};
