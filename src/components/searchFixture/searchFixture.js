import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

class SearchFixture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      leagues: [],
      showLeagues: false,
      selectedLeagues: []
    };

    this.handleCountrieClick = this.handleCountrieClick.bind(this);
    this.handleLeagueClick = this.handleLeagueClick.bind(this);
  }

  handleCountrieClick = (countrieName, event) => {
    event.preventDefault();

    if (event.currentTarget.classList.contains("clicked-country")) {
      event.currentTarget.classList.remove("clicked-country");
      this.deleteLeaguesByCountry(countrieName);
    } else {
      event.currentTarget.classList.add("clicked-country");
      this.getLeaguesByCountry(countrieName);
    }
  };

  handleLeagueClick = (leagueId, country, event) => {
    event.preventDefault();
    if (event.currentTarget.classList.contains("clicked-league")) {
      event.currentTarget.classList.remove("clicked-league");
      this.deleteClickedLeagues(leagueId, country);
    } else {
      event.currentTarget.classList.add("clicked-league");
      this.saveClickedLeagues(leagueId, country);
    }
  };

  saveClickedLeagues(leagueId, country) {
    let newData = [];

    if (this.state.selectedLeagues.length > 0) {
      newData = this.state.selectedLeagues;
    }

    newData.push({
      id: leagueId,
      country: country
    });

    this.setState({
      selectedLeagues: newData
    });
  }

  deleteClickedLeagues(leagueId, country) {
    let tempData = this.state.selectedLeagues;
    let newData = [];

    for (var i = 0; i < tempData.length; i++) {
      if (tempData[i].id !== leagueId) {
        newData.push({
          id: tempData[i].id,
          country: country
        });
      }
    }

    this.setState({
      selectedLeagues: newData
    });
  }

  componentDidMount() {
    this.getCountries();
  }

  getCountries = () => {
    fetch("https://api-football-beta.p.rapidapi.com/countries", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
        "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
      }
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response);
        this.setState({
          countries: response.response
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  deleteLeaguesByCountry = countryName => {
    console.log("DELETE", countryName);

    let tempData = this.state.leagues;
    let newData = [];

    let tempData2 = this.state.selectedLeagues;
    let newData2 = [];

    for (var i = 0; i < tempData.length; i++) {
      if (tempData[i].country !== countryName) {
        newData.push({
          id: tempData[i].id,
          name: tempData[i].name,
          country: tempData[i].country,
          logo: tempData[i].logo
        });
      }
    }

    for (var k = 0; k < tempData2.length; k++) {
      // delete from selectedLeagues if flag was disabled

      if (tempData2[k].country !== countryName) {
        newData2.push({
          id: tempData2[k].id,
          country: tempData2[k].country
        });
      }
    }

    this.setState({
      leagues: newData,
      selectedLeagues: newData2
    });
  };

  getLeaguesByCountry = countryName => {
    fetch(
      "https://api-football-beta.p.rapidapi.com/leagues?country=" + countryName,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        let tempData = response.response;
        let newData = [];
        let item;

        if (this.state.leagues.length > 0) {
          newData = this.state.leagues;
        }

        for (item in tempData) {
          newData.push({
            id: tempData[item].league.id,
            name: tempData[item].league.name,
            country: tempData[item].country.name,
            logo: tempData[item].league.logo
          });
        }

        return newData;
      })
      .then(response => {
        // console.log(response.response);
        this.setState({
          leagues: response,
          showLeagues: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let { countries, leagues, showLeagues, selectedLeagues } = this.state;
    console.log("selectedLeagues", selectedLeagues);
    return (
      <>
        <div className="countriesList">
          {countries.map(item => (
            <button
              className="itemCountries"
              onClick={e => this.handleCountrieClick(item.name, e)}
            >
              <img
                src={item.flag}
                className="country_flag"
                alt={item.country}
              />
              <div className="country_name">{item.name}</div>
            </button>
          ))}
        </div>

        <div className="leaguesList">
          {showLeagues ? (
            leagues.map(item => (
              <button
                className="itemLeague"
                onClick={e => this.handleLeagueClick(item.id, item.country, e)}
              >
                {item.name}
                {item.id}
                {item.country}
                {item.logo}
              </button>
            ))
          ) : (
            <div>123</div>
          )}
        </div>
      </>
    );
  }
}

export default SearchFixture;
