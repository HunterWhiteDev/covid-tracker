/*jshint esversion: 6 */
//Vid time: 1:19:22
import React, { useEffect, useState } from 'react';
import './App.css';
import {MenuItem, FormControl, Select} from "@material-ui/core";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
//https://disease.sh/v3/covid-19/countries


useEffect(() =>{


 const getCountriesData = async () =>{
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


const onCountryChange = (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);
} 


  return (
    <div className="app">
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

    {/* infobox */}
    {/* infobox */}
    {/* infobox */}

    {/* Table */}
    {/* Graph */}

    {/* Map */}



    </div>
  );
}
  

export default App;
