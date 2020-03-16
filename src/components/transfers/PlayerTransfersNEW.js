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

class PlayerTransfersNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      playerName: ''
    };
  }


  async getClubLogoById(id) {
        const promises = await fetch("https://api-football-beta.p.rapidapi.com/teams?id=" + id, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
                "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
            }
        })
      .then(response => response.json())
      .then(response => {

         console.log(response.response[0].team.logo) 
        return response.response[0].team.logo;
      })

      .catch(err => {
        console.log(err);
      });

    return promises;
  }

 

   componentDidMount  ()  {
       this.getPlayerTransfersById(1571)
  
 
  }

   getPlayerTransfersById  = id => {
    fetch("https://api-football-beta.p.rapidapi.com/transfers?player=" + id, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "api-football-beta.p.rapidapi.com",
		"x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
	}
})
      .then(response => response.json())
      .then(responseJson => {   
         console.log("responseJson", responseJson)  
         this.setState({
            playerName: responseJson.response[0].player.name 
         })
         
         return responseJson.response[0].transfers;
      })
      .then(responseJson => {
        let newData = [];

        (async () => {
          for (var i = 0; i < responseJson.length; i++) {
            newData.push({
              transfer_date: responseJson[i].date,
              team_in: responseJson[i].teams.in.id,
              type: responseJson[i].type,
              logo: await this.getClubLogoById(responseJson[i].teams.in.id) //responseJson[i].team_in.team_id,
            });
          }
          await  this.setState({
            data: newData, 
            visible: true  })
        })();
        console.log(newData)
       
       
        return newData;

      })
    
      
      
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("data", this.state.data);
     
    const {data, visible} = this.state;
    
   
    return (
      <div className="container">
        <div className="card card--has-table">
          <div className="card__header card__header--has-btn">
            <h4>{this.state.playerName}</h4>
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
                    <th className="game-player-result__vs">Club logo</th>
                    <th className="game-player-result__score">Club name</th>
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
                         {item.transfer_date}
                        
                      </td>
                      <td className="game-player-result__vs">
                        <div className="team-meta">
                          <div className="team-meta__logo"><img src={item.logo}  /></div>
                          <div className="team-meta__info">
                            <h6 className="team-meta__name">
                             {item.team_in}
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

export default PlayerTransfersNew;
