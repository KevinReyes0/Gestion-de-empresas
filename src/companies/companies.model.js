import {Schema, model} from "mongoose";

const CompaniesSchema = Schema({
    nameCompany : {
        type: String,
        required: [true, 'Name company required'],
        maxLength: [50, 'Cant be overcome 50 characters'],
    },
    impact : {
        type: String,
        required: [true, 'impact required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    yearsOfExperience : {
        type: Number,
        required: true,
        min: 1
    },
    companyCategory : {
        type: String,
        required: [true, 'Company category required'],
        maxLength: [25, 'Cant be overcome 25 characters']
    },
    state: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true,
        versionKey: false,
    }
);
        

export default model('Companies', CompaniesSchema);