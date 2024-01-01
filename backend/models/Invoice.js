const { default: mongoose } = require("mongoose");
const {Schema} = mongoose;
const InvoiceSchema = new Schema({
    firm:{
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    invoiceNumber:{
        type : Number,
        required : true
    },
    buyerName:{
        type : String,
        required : true
    },
    buyerAddress:{
        type : String,
        required : true
    },
    buyerPincode:{
        type : Number,
        required : false
    },
    buyerContact:{
        type : Number,
        required : true
    },
    buyerGstIn:{
        type : String,
        required : true
    },
    date:{
        type : Date,
        required : true
    },
    itemName:{
        type : Array,
        required : true
    },
    itemHsn:{
        type : Array,
        required : true
    },
    itemSgst:{
        type : Array,
        required : true
    },
    itemCgst:{
        type : Array,
        required : true
    },
    itemQuantity:{
        type : Array,
        required : true
    },
    itemPrice:{
        type : Array,
        required : true
    },
    totalAmount:{
        type: Number,
        required: true,
    }
})

module.exports = mongoose.model('invoice', InvoiceSchema);