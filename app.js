const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

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

app.get("/home/service",(req,res)=>{
  res.render("Lists/service");
});
app.listen(3000,(req,res)=>{
    console.log("Listening to the port 3000");
});