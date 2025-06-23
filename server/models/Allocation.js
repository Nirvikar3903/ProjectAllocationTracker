
import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema({
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true  
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    allocationPercentage:{
        type:Number,
        required:true,
        min:1,
        max:100
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    notes:String,
    status:{
        type:String,
        enum :['Active', 'Upcoming', 'Completed', 'Cancelled'],
        default: 'Active'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
},{
    timestamps:true,
});


allocationSchema.index({ employee: 1, project: 1, startDate: 1, endDate: 1 }, { unique: true });

const Allocation = mongoose.model('Allocation' , allocationSchema );
export default Allocation ;
