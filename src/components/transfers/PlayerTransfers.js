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

class PlayerTransfers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       data: [],
      //clubIds: [],
      load: false,
      //films: []
    };
  }

  // async getFilms(url) {
  //   const promises = await fetch(url)
  //     .then(response => response.json())
  //     .then(response => {
  //       //console.log(response.api.teams[0].logo)
  //       return response.episode_id;
  //     });
  //   return promises;
  // }

  // getUser() {
  //   fetch("https://api-football-beta.p.rapidapi.com/transfers?player=1578", {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
  //       "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(response => this.getFilms(response.films))
  //     .then(response => {
  //       let filmsData = [];

  //       (async () => {
  //         for (var i = 0; i < response.length; i++) {
  //           filmsData.push({
  //             transfer_date: response[i].date,
  //             type: response[i].type,
  //             logo: await this.getClubLogoById(response[i].team_in.team_id) //responseJson[i].team_in.team_id,
  //           });
  //         }
  //       })();

  //       this.setState({
  //         films: filmsData
  //       });
  //     });
  // }

  async getClubLogoById(id) {
    const promises = await fetch(
      "https://api-football-v1.p.rapidapi.com/v2/teams/team/" + id,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
        }
      }
    )
      .then(response => response.json())
      .then(response => {
        return response.api.teams[0].logo;
      })

      .catch(err => {
        console.log(err);
      });

    return promises;
  }

  //  componentDidMount  ()  {

    //https://stackoverflow.com/questions/55093309/loading-async-data-into-react-component
    //https://codesandbox.io/s/lrvwm88pv7
    
  //    this.setState({
  //     data: this.getPlayerTransfersById(19088)
  //   });

  // };

  componentDidMount  ()  {
    console.log(this.getPlayerTransfersById(19088))

  }

   getPlayerTransfersById  = id => {
    fetch("https://api-football-v1.p.rapidapi.com/v2/transfers/player/" + id, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
        "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
      }
    })
      .then(response => response.json())
      .then(responseJson => {        
        return responseJson.api.transfers;
      })
      .then(responseJson => {
        let newData = [];

        (async () => {
          for (var i = 0; i < responseJson.length; i++) {
            newData.push({
              transfer_date: responseJson[i].transfer_date,
              player_name: responseJson[i].player_name,
              type: responseJson[i].type,
              logo: await this.getClubLogoById(responseJson[i].team_in.team_id) //responseJson[i].team_in.team_id,
            });
          }
        })();
        return newData
      })
      // .then(responseJson => { 
      //     this.setState({
      //       data: responseJson ,             
      //     })     
      // })
      
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("data", this.state.data);
     
    const visible = this.state.load;
    const data = this.state.data;
  
    return (
      <div className="container">
        <div className="card card--has-table">
          <div className="card__header card__header--has-btn">
            {/* <h4>{this.state.data.player_name}</h4> */}
            <a
              className="btn btn-default btn-outline btn-xs card-header__button"
              href="_soccer_player-stats.html"
            >
              See complete games log
            </a>
          </div>
          <div className="card__content">
            <div className="table-responsive">
              <table className="table table-hover game-player-result">
                <thead>
                  <tr>
                    <th className="game-player-result__date">Transfer Date</th>
                    <th className="game-player-result__vs">Type</th>
                    <th className="game-player-result__score">Score</th>
                    <th className="game-player-result__min">Min</th>
                    <th className="game-player-result__tg">TG</th>
                    <th className="game-player-result__ts">TS</th>
                    <th className="game-player-result__ga">GA</th>
                    <th className="game-player-result__fc">FC</th>
                    <th className="game-player-result__fs">FS</th>
                    <th className="game-player-result__yc">YC</th>
                    <th className="game-player-result__rc">RC</th>
                  </tr>
                </thead>
                <tbody>
                {visible ? (
                  <>{data.map(item => (
                    <tr>
                      <td className="game-player-result__date">
                        {console.log(item)}
                        {item.transfer_date}
                      </td>
                      <td className="game-player-result__vs">
                        <div className="team-meta">
                          <div className="team-meta__logo"></div>
                          <div className="team-meta__info">
                            <h6 className="team-meta__name">
                              {item.player_name}
                            </h6>
                            <span className="team-meta__place">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="game-player-result__score">
                        <span className="game-player-result__game">W</span> 2-3
                      </td>
                      <td className="game-player-result__min">69</td>
                      <td className="game-player-result__tg">0</td>
                      <td className="game-player-result__ts">18</td>
                      <td className="game-player-result__ga">2</td>
                      <td className="game-player-result__fc">5</td>
                      <td className="game-player-result__fs">5</td>
                      <td className="game-player-result__yc">1</td>
                      <td className="game-player-result__rc">0</td>
                    </tr>
                  ))}</>
                  ) : (
                    <tr><td>LOADED</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlayerTransfers;
