const express = require("express");
const router = express.Router();
const {jsPDF} = require('jspdf');
require('jspdf-autotable')
const InvoiceModel = require("../models/Invoice");
const { body, validationResult } = require("express-validator");
//not adding middleware
//check InvoiceModel variable name if get error

function valueInWords(value) { 
  let ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  let tens = [
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  let digit = 0;
  if (value < 20) return ones[value];
  if (value < 100) {
    digit = value % 10; //remainder
    return (
      tens[Math.floor(value / 10) - 2] + " " + (digit > 0 ? ones[digit] : "")
    );
  }
  if (value < 1000) {
    return (
      ones[Math.floor(value / 100)] +
      " Hundred " +
      (value % 100 > 0 ? valueInWords(value % 100) : "")
    );
  }
  if (value < 100000) {
    return (
      valueInWords(Math.floor(value / 1000)) +
      " Thousand " +
      (value % 1000 > 0 ? valueInWords(value % 1000) : "")
    );
  }
  if (value < 10000000) {
    return (
      valueInWords(Math.floor(value / 100000)) +
      " Lakh " +
      (value % 100000 > 0 ? valueInWords(value % 100000) : "")
    );
  }
  return (
    valueInWords(Math.floor(value / 10000000)) +
    " Crore " +
    (value % 10000000 > 0 ? valueInWords(value % 10000000) : "")
  );
}

// Route 1: Making a pdf
router.post(
  "/makepdf",
//   [
//     body("contact", "Enter a valid phone number!")
//       .isNumeric()
//       .isLength({ min: 10, max: 14 }),
//     body("email", "Enter a valid email!").isEmail(),
//   ],
  async (req, res) => {
    // console.log(req.body);  
    try {
      console.log(req.body)
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      //if all checks satisfy
      const {
        firm,
        invoiceNumber,
        date,
        buyerName,
        buyerAddress,
        buyerPincode,
        buyerContact,
        buyerGstIn,
        itemDetails
      } = req.body;
      const itemName = [];
      const itemHsn = [];
      const itemSgst = [];
      const itemCgst = [];
      const itemQuantity = [];
      const itemPrice = [];
      console.log(itemDetails, "354435");
      for(let i = 0;i<itemDetails.length;i++)
      {
        const {itemNamep, itemCgstp, itemHsnp, itemPricep, itemQuantityp, itemSgstp} = itemDetails[i];
        itemName.push(itemNamep)
        itemHsn.push(itemHsnp)
        itemSgst.push(itemSgstp)
        itemCgst.push(itemCgstp)
        itemQuantity.push(itemQuantityp)
        itemPrice.push(itemPricep)

      }
      const doc = new jsPDF();
      console.log("theek hai theek hai");
      //authentication not adding as no middleware present

      // start with pdf creation
      // heading
      // console.log(doc.getFontList())
      doc.setFontSize(25);
      doc.setFont("times", "bold");
      doc.text("INVOICE", 105, 20, "center");

      var line = 35;

      // Seller's Information
      //we will get seller's information from mongo
      //but since right now we are not having mongo connection
      // I am hardcoding the seller's values
      var sellerFirm = "DK Enterprises";
      var sellerAddress = "Kalam Hostel, IIT Patna";
      var sellerPincode = 130293;
      var sellerGstIn = "GSTAKJ8293JSJ";

      doc.setFontSize(10);
      doc.text(sellerFirm, 15, (line += 5));

      doc.setFont("times", "normal");
      doc.text(sellerAddress, 15, (line += 5));
      doc.text("Pincode : " + sellerPincode.toString(), 15, (line += 5));
      doc.text(sellerGstIn, 15, (line += 5));

      // Buyer's Information
      doc.setFont("times", "bold");
      doc.text(buyerName, 15, (line += 10));

      doc.setFont("times", "normal");
      doc.text(buyerAddress, 15, (line += 5));
      doc.text("Pincode : " + buyerPincode.toString(), 15, (line += 5));
      doc.text(buyerGstIn, 15, (line += 5));

      // Date and Invoice number
      doc.text("Invoice Number : " + invoiceNumber.toString(), 195, 40, "right");
      doc.text("Date : " + date.toString(), 195, 45, "right");

      const tableArray = [];
      var sum = 0;
      console.log(itemName)
      for(let i = 0; i<itemName.length;i++)
      {
        const arrayElement = [];
        console.log(itemPrice[i]);
        arrayElement.push((i+1).toString());
        arrayElement.push(itemName[i]);
        arrayElement.push(itemHsn[i].toString());
        arrayElement.push(itemPrice[i].toFixed(2).toString());
        arrayElement.push(itemQuantity[i].toString());
        arrayElement.push((itemQuantity[i]*itemPrice[i]).toFixed(2).toString());
        arrayElement.push(itemSgst[i].toString()+"%");
        arrayElement.push(itemCgst[i].toString()+"%");
        arrayElement.push((itemQuantity[i]*itemPrice[i]*(100+itemCgst[i])*(100+itemSgst[i])/10000).toFixed(2).toString());
        tableArray.push(arrayElement);
        sum=sum+((itemQuantity[i]*itemPrice[i]*(100+itemCgst[i])*(100+itemSgst[i]))/10000);
      }
      console.log(tableArray)

      doc.autoTable({
        startY: 100,
        head: [
          ["S. No.", "Item", "HSN/SAC", "Price", "Quantity", "Taxable", "SGST", "CGST", "Amount"],
        ],
        body: tableArray,
      });

      line += tableArray.length * 5 + 50;
      doc.setTextColor("#FF0000");
      doc.text(15, (line += 5), "Total Amount : Rs. " + sum.toFixed(2).toString() + "/-");
      doc.setTextColor("#000000");
      console.log(sum);
      doc.text(
        15,
        (line += 5),
        "Total Amount (in words) : Rupees " + valueInWords(sum.toFixed()) + " Only."
      );

      doc.text(195, (line += 5), "Authorised Signatory", "right");

      // footer
      console.log("abhi moye moye nahin hua hai")
      doc.setFontSize(7);
      doc.setFont("times", "italic");
      doc.text(105, 290, "This invoice is computer generated.", "center");
      doc.save("a4.pdf");
      return res.json({answer:"Inki pinki ponky!"})
    } catch (error) {
        console.log("moye moye!");
        console.log(error)
    }
  }
);

router.get('/makepdf/downloadpdf', (req, res)=>{
  res.download('./a4.pdf');
})


module.exports = router;
