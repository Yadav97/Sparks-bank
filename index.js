const express = require("express")
const mongoose = require("mongoose");
const customer = require("./models/customers")
require("dotenv").config();
console.log(process.env.SERVER)
// const name = "";
let krishnacurrbal = 0;

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    res.render("home")
})


app.get("/viewcustomers",async (req,res)=>{

  const allcust = await customer.find();
  // console.log("loaded customers");
  // console.log("allcust ---> ",allcust)
  // res.render("allcustomers")
  krishnacurrbal = Number(allcust[10].currbal);
  if (krishnacurrbal < 500)
    {
      krishnacurrbal = 100000
    }
    else
    {
      krishnacurrbal = 100000
    }
    
    
    

  res.render("allcustomers",{allcust,krishnacurrbal});

})


app.get("/transfer/form/:id",async (req,res)=>{
  // console.log(req.params.id)
  const custom = await customer.findById(req.params.id)
  // console.log(custom)
  res.render("transferform",{custom:custom})
 

})


app.post("/transfer",async (req,res)=>{
  
  // console.log("req.body-->",req.body);
  const transferamount = req.body.amount;
  const transfername= req.body.fullname;
  try
  {
    const singlecust = await customer.find({name:transfername});
    // console.log("singlecust --> ",singlecust)
    // amount addition
    const total = Number(singlecust[0].currbal) + Number(transferamount);
    const krishnaprevBal = krishnacurrbal;
    krishnacurrbal = krishnacurrbal - transferamount

    // console.log("krishnacurrbal-->",krishnacurrbal)
    // console.log("total---->",total)
    await customer.updateOne({name:transfername},{$set:{currbal:total}})
    await customer.updateOne({name:"krishna"},{$set:{currbal:krishnacurrbal}})
    // console.log("singlecust after update",singlecust)
    const singleName = singlecust[0].name;
    const prevBal = singlecust[0].currbal;
    res.render("result",{krishnacurrbal, singleName,prevBal,total,krishnaprevBal})


  }
  catch (error){
    console.log(error)
  
    res.render("notfound")

  }

  // console.log(transfername)


})


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("app is running on")

})



// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/sparks-bank');
//   console.log("hey database is connected")
// }


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.SERVER);
  console.log("hey database is connected")
}
