import {Schema, model} from "mongoose";

const CompaniesAddSchema = Schema({
    keeperCompany: {
        type: Schema.Types.ObjectId,
        ref: 'Companies',
        required: true
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
        

export default model('CompaniesAdd', CompaniesAddSchema);