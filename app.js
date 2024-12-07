const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const Health = require("./models/health.js");
const Family = require("./models/family.js");
const Agri = require("./models/agri.js");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

const MONGO_URL="mongodb://127.0.0.1:27017/Finance";
main().then(()=>console.log("connected to DB"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/home",(req,res)=>{
  res.render("Lists/home.ejs");
});

const calculateSIP = (monthlyInvestment, interestRate, timePeriod) => {
  const annualRate = interestRate / 100;
  const months = timePeriod * 12;
  const monthlyRate = annualRate / 12;

  const totalValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const investedAmount = monthlyInvestment * months;
  const estReturns = totalValue - investedAmount;

  return {
      investedAmount: investedAmount.toFixed(2),
      estReturns: estReturns.toFixed(2),
      totalValue: totalValue.toFixed(2),
  };
};
app.get("/home/calculate", (req, res) => {
  res.render("Lists/calculator", { result: null });
});
app.post("/home/calculate/Recalculate", (req, res) => {
  const { monthlyInvestment, interestRate, timePeriod } = req.body;
  const investment = parseFloat(monthlyInvestment);
  const rate = parseFloat(interestRate);
  const time = parseFloat(timePeriod);

  const result = calculateSIP(investment, rate, time);

  res.render("Lists/calculator", { result });
});

app.get("/home/quiz",(req,res)=>{
  res.render("Lists/quiz");
});

app.get("/home/loan",(req,res)=>{
  res.render("Lists/loan");
});

app.get("/home/ebook",(req,res)=>{
  res.render("Lists/ebook");
});

app.get("/home/ebook/e1",(req,res)=>{
  res.render("Lists/e1");
});

app.get("/home/ebook/e2",(req,res)=>{
  res.render("Lists/e2");
});

app.get("/home/agri",async (req,res)=>{
  const list = await Agri.find();
  let total =0;
      for(let res of list){
          total = total + Number(res.amount);
      }
      let result=total;
  res.render("Lists/agri",{list,result});
  });
  
  app.get("/home/agri/new",(req,res)=>{
    res.render("Lists/agrinew");
  });
  
  app.post("/home/agri", async(req,res)=>{
    const newlisting = new Agri(req.body.Listing);
    await newlisting.save();
    res.redirect("/home/agri");
   });
  
  app.get("/home/agri/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Agri.findById(id);
    res.render("Lists/agrishow",{listing});
   });
  
  app.get("/home/agri/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Agri.findById(id);
    res.render("Lists/agriedit",{listing});
  });
  
  app.put("/home/agri/:id", async(req,res)=>{
    let {id} = req.params;
    await Agri.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/home/agri`);
  });
  
  app.delete("/home/agri/:id",async (req,res) =>{
    let {id} = req.params;
    let deletelisting = await Agri.findByIdAndDelete(id);
    res.redirect("/home/agri");
  });


app.get("/home/family",async (req,res)=>{
  const list = await Family.find();
  let total =0;
      for(let res of list){
          total = total + Number(res.amount);
      }
      let result=total;
  res.render("Lists/family",{list,result});
  });
  
  app.get("/home/family/new",(req,res)=>{
    res.render("Lists/familynew");
  });
  
  app.post("/home/family", async(req,res)=>{
    const newlisting = new Family(req.body.Listing);
    await newlisting.save();
    res.redirect("/home/family");
   });
  
  app.get("/home/family/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Family.findById(id);
    res.render("Lists/familyshow",{listing});
   });
  
  app.get("/home/family/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Family.findById(id);
    res.render("Lists/familyedit",{listing});
  });
  
  app.put("/home/family/:id", async(req,res)=>{
    let {id} = req.params;
    await Family.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/home/family`);
  });
  
  app.delete("/home/family/:id",async (req,res) =>{
    let {id} = req.params;
    let deletelisting = await Family.findByIdAndDelete(id);
    res.redirect("/home/family");
  });

app.get("/home/health",async (req,res)=>{
const list = await Health.find();
let total =0;
    for(let res of list){
        total = total + Number(res.amount);
    }
    let result=total;
res.render("Lists/health",{list,result});
});

app.get("/home/health/new",(req,res)=>{
  res.render("Lists/healthnew");
});

app.post("/home/health", async(req,res)=>{
  const newlisting = new Health(req.body.Listing);
  await newlisting.save();
  res.redirect("/home/health");
 });

app.get("/home/health/:id",async (req,res)=>{
  let {id} = req.params;
  const listing = await Health.findById(id);
  res.render("Lists/healthshow",{listing});
 });

app.get("/home/health/:id/edit",async(req,res)=>{
  let {id} = req.params;
  const listing = await Health.findById(id);
  res.render("Lists/healthedit",{listing});
});

app.put("/home/health/:id", async(req,res)=>{
  let {id} = req.params;
  await Health.findByIdAndUpdate(id,{...req.body.Listing});
  res.redirect(`/home/health`);
});

app.delete("/home/health/:id",async (req,res) =>{
  let {id} = req.params;
  let deletelisting = await Health.findByIdAndDelete(id);
  res.redirect("/home/health");
});
app.get("/home/service",(req,res)=>{
  res.render("Lists/service");
});
app.listen(3000,(req,res)=>{
    console.log("Listening to the port 3000");
});