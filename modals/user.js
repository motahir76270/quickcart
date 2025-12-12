import mogoose from 'mongoose';

const userSchema = new mogoose.Schema({
    _id: {
       type : String,
         required: true, 
    },
    name: {
        type: String,
        required: true,
    },
 email: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl:{
        type: String,
    },
    cartItem:{
        type: Object,
        default: {},
    } 

}, { minimize: false } );

const userModel = mongoose.models.user || mogoose.model('user', userSchema); 
export default userModel;