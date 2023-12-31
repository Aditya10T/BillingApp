const express = require("express");
const router = express.Router();
const { jsPDF } = require("jspdf");
const Invoice = require("../models/Invoice");
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
require("jspdf-autotable");
//not adding middleware
//check InvoiceModel variable name if get error

//importing and setting up cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "df8yirbq9",
  api_key: "382357723465976",
  api_secret: "LG9qTeHHWcFuH4F9QukgRWqdrJY",
});

//funtion to convert number(integer) into words
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
      console.log(req.body);
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }
      //if any check does not pass, return the error


      // move values from request body to variables
      const {
        id,
        firmName,
        firmAddress,
        firmContact,
        firmGstIn,
        firmPincode,
        invoiceNumber,
        date,
        buyerName,
        buyerAddress,
        buyerPincode,
        buyerContact,
        buyerGstIn,
        itemDetails,
      } = req.body;

      // initialise empty arrays to append all data in homogeneous form, 
      // this change in data structure is being done so as to ease out storage in mongo
      const itemName = [];
      const itemHsn = [];
      const itemSgst = [];
      const itemCgst = [];
      const itemQuantity = [];
      const itemPrice = [];

      // loop to generate the homogeneous arrays
      for (let i = 0; i < itemDetails.length; i++) {
        const {
          itemNamep,
          itemCgstp,
          itemHsnp,
          itemPricep,
          itemQuantityp,
          itemSgstp,
        } = itemDetails[i];
        itemName.push(itemNamep);
        itemHsn.push(itemHsnp);
        itemSgst.push(itemSgstp);
        itemCgst.push(itemCgstp);
        itemQuantity.push(itemQuantityp);
        itemPrice.push(itemPricep);
      }

      // initialising the pdf document
      const doc = new jsPDF();
      //authentication not adding as no middleware present

      // start with pdf creation
      // heading
      doc.setFontSize(25);
      doc.setFont("times", "bold");
      doc.text("INVOICE", 105, 20, "center");

      // a variable which will change as per convinience to switch between lines
      var line = 35;

      // Seller's Details
      doc.setFontSize(10);
      doc.text(firmName, 15, (line += 5));
      doc.setFont("times", "normal");
      doc.text(firmAddress, 15, (line += 5));
      doc.text("Pincode : " + firmPincode.toString(), 15, (line += 5));
      doc.text(firmGstIn, 15, (line += 5));

      // Buyer's Details
      doc.setFont("times", "bold");
      doc.text(buyerName, 15, (line += 10));
      doc.setFont("times", "normal");
      doc.text(buyerAddress, 15, (line += 5));
      doc.text("Pincode : " + buyerPincode.toString(), 15, (line += 5));
      doc.text(buyerGstIn, 15, (line += 5));

      // Date and Invoice number
      doc.text(
        "Invoice Number : " + invoiceNumber.toString(),
        195,
        40,
        "right"
      );
      doc.text("Date : " + date.toString(), 195, 45, "right");

      //a 2D array whose element arrays will serve as row entries.
      const tableArray = [];
      var sum = 0;
      console.log(itemName);
      for (let i = 0; i < itemName.length; i++) {
        const arrayElement = [];
        console.log(itemPrice[i]);
        arrayElement.push((i + 1).toString());
        arrayElement.push(itemName[i]);
        arrayElement.push(itemHsn[i].toString());
        arrayElement.push(itemPrice[i].toFixed(2).toString());
        arrayElement.push(itemQuantity[i].toString());
        arrayElement.push(
          (itemQuantity[i] * itemPrice[i]).toFixed(2).toString()
        );
        arrayElement.push(itemSgst[i].toString() + "%");
        arrayElement.push(itemCgst[i].toString() + "%");
        arrayElement.push(
          (
            (itemQuantity[i] *
              itemPrice[i] *
              (100 + itemCgst[i]) *
              (100 + itemSgst[i])) /
            10000
          )
            .toFixed(2)
            .toString()
        );
        tableArray.push(arrayElement);
        sum =
          sum +
          (itemQuantity[i] *
            itemPrice[i] *
            (100 + itemCgst[i]) *
            (100 + itemSgst[i])) /
            10000;
      }

      // table generation for products
      doc.autoTable({
        startY: 100,
        head: [
          [
            "S. No.",
            "Item",
            "HSN/SAC",
            "Price",
            "Quantity",
            "Taxable",
            "SGST",
            "CGST",
            "Amount",
          ],
        ],
        body: tableArray,
      });


      line += tableArray.length * 5 + 50;
      doc.setTextColor("#FF0000");
      doc.text(
        15,
        (line += 5),
        "Total Amount : Rs. " + sum.toFixed(2).toString() + "/-"
      );


      doc.setTextColor("#000000");
      doc.text(
        15,
        (line += 5),
        "Total Amount (in words) : Rupees " +
          valueInWords(sum.toFixed()) +
          " Only."
      );

      doc.text(195, (line += 5), "Authorised Signatory", "right");

      // footer
      console.log("abhi moye moye nahin hua hai");
      doc.setFontSize(7);
      doc.setFont("times", "italic");
      doc.text(105, 290, "This invoice is computer generated.", "center");
      doc.save("a4.pdf");

      let pdf_link = "",
        jpg_link = "";

      await cloudinary.uploader
        .upload("a4.pdf", { resource_type: "raw" })
        .then((result) => {
          pdf_link = result.secure_url;
        });

      await cloudinary.uploader.upload("a4.pdf").then((result) => {
        jpg_link = result.secure_url;
      });

      jpg_link = jpg_link.substring(0, jpg_link.length - 3) + "jpg";
      console.log("PDF = " + pdf_link);
      console.log("JPG = " + jpg_link);

      const invoice = await Invoice.create({
        firm: id,
        date: date,
        invoiceNumber: invoiceNumber,
        buyerName: buyerName,
        buyerAddress: buyerAddress,
        buyerContact: buyerContact,
        buyerGstIn: buyerGstIn,
        itemName: itemName,
        itemHsn: itemHsn,
        itemSgst: itemSgst,
        itemCgst: itemCgst,
        itemPrice: itemPrice,
        itemQuantity: itemQuantity,
        pdfLink: pdf_link,
        jpgLink: jpg_link,
        totalAmount : sum.toFixed(2),
      });

      await User.updateOne({ _id: id }, { $inc: { invoiceCount: 1 } });
      const latestInv = await Invoice.findOne({ firm: id }).sort({
        $natural: -1,
      });

      return res.json({
        pdf_link: pdf_link,
        jpg_link: jpg_link,
        invId: latestInv._id,
      });
    } catch (error) {
      console.log("moye moye!");
      console.log(error);
    }
  }
);


// gives a list of all invoices generated by the requesting user
router.post("/invoiceList", async (req, res) => {
  try {
    const invoiceList = await Invoice.find({ firm: req.body.firm });
    res.send(invoiceList);
  } catch (error) {
    console.log("Error : ", error);
  }
});


// gives detail about the requested invoice
router.post("/invoicedetails", async (req, res) => {
  try {
    console.log(req.body);
    const invoiceDetails = await Invoice.find({ _id: req.body.id });
    console.log("detail: ", invoiceDetails);
    res.send(invoiceDetails);
  } catch (error) {
    console.log("code fat gaya details laane mein...");
  }
});


// updates the pdf details of the invoice whose id is recieved.
// function is almost same as create new invoice.
router.post(
  "/updatepdf",
  //   [
  //     body("contact", "Enter a valid phone number!")
  //       .isNumeric()
  //       .isLength({ min: 10, max: 14 }),
  //     body("email", "Enter a valid email!").isEmail(),
  //   ],
  async (req, res) => {
    try {
      console.log(req.body);
      let success = false;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
      }

      //if all checks satisfy
      const {
        id,
        firmName,
        firmAddress,
        firmContact,
        firmGstIn,
        firmPincode,
        invoiceNumber,
        date,
        buyerName,
        buyerAddress,
        buyerPincode,
        buyerContact,
        buyerGstIn,
        itemDetails,
      } = req.body;
      const itemName = [];
      const itemHsn = [];
      const itemSgst = [];
      const itemCgst = [];
      const itemQuantity = [];
      const itemPrice = [];

      for (let i = 0; i < itemDetails.length; i++) {
        const {
          itemNamep,
          itemCgstp,
          itemHsnp,
          itemPricep,
          itemQuantityp,
          itemSgstp,
        } = itemDetails[i];
        itemName.push(itemNamep);
        itemHsn.push(itemHsnp);
        itemSgst.push(itemSgstp);
        itemCgst.push(itemCgstp);
        itemQuantity.push(itemQuantityp);
        itemPrice.push(itemPricep);
      }

      const doc = new jsPDF();
      
      //authentication not adding as no middleware present

      // start with pdf creation
      // heading
      doc.setFontSize(25);
      doc.setFont("times", "bold");
      doc.text("INVOICE", 105, 20, "center");

      var line = 35;

      // Seller's Information
      doc.setFontSize(10);
      doc.text(firmName, 15, (line += 5));
      doc.setFont("times", "normal");
      doc.text(firmAddress, 15, (line += 5));
      doc.text("Pincode : " + firmPincode.toString(), 15, (line += 5));
      doc.text(firmGstIn, 15, (line += 5));

      // Buyer's Information
      doc.setFont("times", "bold");
      doc.text(buyerName, 15, (line += 10));
      doc.setFont("times", "normal");
      doc.text(buyerAddress, 15, (line += 5));
      doc.text("Pincode : " + buyerPincode.toString(), 15, (line += 5));
      doc.text(buyerGstIn, 15, (line += 5));

      // Date and Invoice number
      doc.text(
        "Invoice Number : " + invoiceNumber.toString(),
        195,
        40,
        "right"
      );
      doc.text("Date : " + date.toString(), 195, 45, "right");

      const tableArray = [];
      var sum = 0;
      console.log(itemSgst);
      for (let i = 0; i < itemName.length; i++) {
        const arrayElement = [];
        arrayElement.push((i + 1).toString());
        arrayElement.push(itemName[i]);
        arrayElement.push(itemHsn[i].toString());
        arrayElement.push(itemPrice[i].toFixed(2).toString());
        arrayElement.push(itemQuantity[i].toString());
        arrayElement.push(
          (itemQuantity[i] * itemPrice[i]).toFixed(2).toString()
        );
        arrayElement.push(itemSgst[i].toString() + "%");
        arrayElement.push(itemCgst[i].toString() + "%");
        arrayElement.push(
          (
            (itemQuantity[i] *
              itemPrice[i] *
              (100 + itemCgst[i]) *
              (100 + itemSgst[i])) /
            10000
          )
            .toFixed(2)
            .toString()
        );

        tableArray.push(arrayElement);
        sum =
          sum +
          (itemQuantity[i] *
            itemPrice[i] *
            (100 + itemCgst[i]) *
            (100 + itemSgst[i])) /
            10000;
      }

      doc.autoTable({
        startY: 100,
        head: [
          [
            "S. No.",
            "Item",
            "HSN/SAC",
            "Price",
            "Quantity",
            "Taxable",
            "SGST",
            "CGST",
            "Amount",
          ],
        ],
        body: tableArray,
      });

      line += tableArray.length * 5 + 50;
      doc.setTextColor("#FF0000");
      doc.text(
        15,
        (line += 5),
        "Total Amount : Rs. " + sum.toFixed(2).toString() + "/-"
      );
      doc.setTextColor("#000000");
      doc.text(
        15,
        (line += 5),
        "Total Amount (in words) : Rupees " +
          valueInWords(sum.toFixed()) +
          " Only."
      );

      doc.text(195, (line += 5), "Authorised Signatory", "right");

      // footer
      doc.setFontSize(7);
      doc.setFont("times", "italic");
      doc.text(105, 290, "This invoice is computer generated.", "center");
      doc.save("a4.pdf");

      let pdf_link = "",
        jpg_link = "";
      await cloudinary.uploader
        .upload("a4.pdf", { resource_type: "raw" })
        .then((result) => {
          pdf_link = result.secure_url;
        });

      await cloudinary.uploader.upload("a4.pdf").then((result) => {
        jpg_link = result.secure_url;
      });

      jpg_link = jpg_link.substring(0, jpg_link.length - 3) + "jpg";

      console.log(id);
      const invoice = await Invoice.updateOne(
        { _id: id },
        {
          $set: {
            buyerName: buyerName,
            buyerAddress: buyerAddress,
            buyerContact: buyerContact,
            buyerGstIn: buyerGstIn,
            itemName: itemName,
            itemHsn: itemHsn,
            itemSgst: itemSgst,
            itemCgst: itemCgst,
            itemPrice: itemPrice,
            itemQuantity: itemQuantity,
            pdfLink: pdf_link,
            jpgLink: jpg_link,
            totalAmount: sum.toFixed(2),
          },
        }
      );

      return res.json({ pdf_link: pdf_link, jpg_link: jpg_link });
    } catch (error) {
      console.log("Error in updation : \n", error);
    }
  }
);


// gives the invoice count of the requesting user
router.post("/getinvoicenumber", async (req, res) => {
  try {
    console.log(req.body.id);
    const user = await User.findById(req.body.id);
    res.send({ invCount: user.invoiceCount });
  } catch (error) {
    console.log(error);
  }
});



// NOTE FOR USER
// made for debugging and to be used only in development mode.
// deletes all invoices of a particular user
router.post("/invoicedeleteall", async (req, res) => {
  try {
    const invoiceDeleted = await Invoice.deleteMany({ firm: req.body.firm });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
