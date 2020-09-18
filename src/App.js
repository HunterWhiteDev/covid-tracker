/*jshint esversion: 6 */
//Vid time: 1:19:22
import React, { useEffect, useState } from 'react';
import './App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import Infobox from "./Infobox";
import Map from "./Map";
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState([]);
//https://disease.sh/v3/covid-19/countries


useEffect(() =>{
 fetch("https://disease.sh/v3/covid-19/all")
 .then(response => response.json())
 .then((data) => {
   setCountryInfo(data);
 })
}, []);



useEffect(() =>{


 const getCountriesData = async () => {
   await fetch("https://disease.sh/v3/covid-19/countries")
   .then((response) => response.json())
   .then((data) => {
     console.log(data);
     const countries = data.map((country) => (
       {
         name: country.country,
         value: country.countryInfo.iso2
       }
     ));
     setCountries(countries)
   })
 }

getCountriesData();
}, [])


const onCountryChange = async (event) => {
  const countryCode = event.target.value;


const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" 
: `https://disease.sh/v3/covid-19/countries/${countryCode}`

console.log(url)

await fetch(url)
.then((response) => response.json())
.then((data) => {
  setCountry(countryCode)
   console.log(countryCode)
  setCountryInfo((data));


})

}
  return (
    <div className="app">
    <div className="app__left">
    <div className="app__header">


    <h1>COVID-19 TRACKER</h1>
     <FormControl className="app__dropdown">
       <Select 
       variant="outlined"
       value={country}
       onChange={onCountryChange}
       >
        {/* Loop Through all the countries and dispaly drop down list */}

        <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (        
           <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}


       </Select>
     </FormControl>
     </div>

    {/* Header */}
    {/* Title + Select Input dropdown filed */}

   <div className="app__stats">

   <Infobox title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases}/>

   <Infobox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}/>

   <Infobox title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}/>



   </div>

   <Map />

</div>


 <Card className="app__right">
    {/* Table */}
    {/* Graph */}
    <CardContent>
    <h3>Live Cases by Country</h3>
    <h3>Worldwide new cases</h3> 
    </CardContent>


</Card>
    </div>
  );
}
  

export default App;
