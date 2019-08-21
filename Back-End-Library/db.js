import 'dotenv/config';
import mongoose from 'mongoose';
mongoose.connect(`mongodb+srv://Sam:${process.env.DB_PW}@library-backend-jepvu.mongodb.net/test?retryWrites=false`);
