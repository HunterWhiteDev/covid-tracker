
import React, { useEffect, useState } from 'react';
import './App.css';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table"
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(["worldwide"]);
  const [countryInfo, setCountryInfo] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746, lng: -40.4796
  });
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState(["cases"]);


  //https://disease.sh/v3/covid-19/countries


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, []);



  useEffect(() => {


    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        })
    }

    getCountriesData();
  }, [])


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;


    const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all"
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`



    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)

        if (countryCode === "worldwide") {
          setMapCenter([34.80746, -40.4796])
          setMapZoom(3);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
        }



      })

  }


  return (<div className= "app" >
    <div className="app__left" >
      <div className="app__header" >


        <h1>COVID - 19 TRACKER < /h1>
          < FormControl className = "app__dropdown" >
            <Select 
       variant="outlined"
  value = { country }
  onChange = { onCountryChange }
    >
    {/* Loop Through all the countries and dispaly drop down list */ }

    < MenuItem value = "worldwide" > Worldwide < /MenuItem>
  {
    countries.map((country) => (
      <MenuItem value= { country.value } > { country.name } < /MenuItem>
    ))
  }


  </Select>
    < /FormControl>
    < /div>

  {/* Header */ }
  {/* Title + Select Input dropdown filed */ }

  <div className="app__stats" >

    <Infobox isRed active = { casesType === "cases"
} onClick = { e => setCasesType("cases") }title = "Coronavirus cases" total = { prettyPrintStat(countryInfo.cases) } cases = { prettyPrintStat(countryInfo.todayCases) } />

  <Infobox  active={ casesType === "recovered" } onClick = { e => setCasesType("recovered") }title = "Recovered" total = { prettyPrintStat(countryInfo.recovered) } cases = { prettyPrintStat(countryInfo.todayRecovered) } />

    <Infobox  isRed active = { casesType === "deaths"} onClick = { e => setCasesType("deaths") }title = "Deaths" total = { prettyPrintStat(countryInfo.deaths) } cases = { prettyPrintStat(countryInfo.todayDeaths) } />



      </div>

      < Map
countries = { mapCountries }
center = { mapCenter }
zoom = { mapZoom }
casesType = { casesType }
  />

  </div>


  < Card className = "app__right" >
    {/* Table */ }
{/* Graph */ }
<CardContent>
  <h3>Live Cases by Country < /h3>
    < Table countries = { tableData } />
      <h3 className="app__graphTitle" > World wide new { casesType } < /h3>
        < LineGraph className = "app__graph" casesType = { casesType } />
          </CardContent>


          < /Card>
          < /div>
  );
}


export default App;
