import mongoose  from "mongoose";

const PostSchema =mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'User'
    },
   image: {
       type:String,

   },
   desc: {
       type:String,

   },
   likes: {
       type:Array,
       default:[]
   },
   comments:[{type:mongoose.Schema.Types.ObjectId, ref:'comment'}]


})

export default mongoose.model('Post',PostSchema)