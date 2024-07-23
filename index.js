import express from "express";
import bodyParser from "body-parser";
import country_code from 'country-code-lookup';

const app = express();
const port = 3000;
var countries = ['IN'];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render('index.ejs', {
    total: countries.length,
    countries: countries
  });
});

app.post('/add', async (req, res) => {
  var visit_country = req.body.country;
  var nation = "";
  nation += visit_country[0].toUpperCase();
  for(var i = 1; i < visit_country.length; i++){
    if(upper){
      nation += ' '+visit_country[i].toUpperCase();
      upper = false
    }
    else if(visit_country[i] == ' '){
      var upper = true
    }
    else{
      nation += visit_country[i];
    }
  }
  console.log(nation);
  var code = country_code.byCountry(nation).iso2;
  console.log(code);
  countries.push(code);
  res.render('index.ejs', {
    total: countries.length,
    countries: countries
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
