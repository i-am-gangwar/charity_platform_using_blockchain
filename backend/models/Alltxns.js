import mongoose from "mongoose";
const alltxnsSchema = new mongoose.Schema({
    from_account: { type: String },
    to_account: { type: String },
    amount: { type: Number },
    block_hash: { type: String },
    block_number: { type: Number },
    txn_hash: { type: String },
    gas_used: { type: Number },
    status: { type: String },
})
const AlltxnsModel = mongoose.model("alltxns", alltxnsSchema)
export default AlltxnsModel;