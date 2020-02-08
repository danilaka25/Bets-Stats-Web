import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import './../../App.css';
import moment from "moment";

import 'bootstrap/dist/css/bootstrap.css';

class Player extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        data: [],
        refreshing: true
      };
    }
  
    componentDidMount = () => {  
      this.getPlayerStatistics();
    }
  
  
    getPlayerStatistics = () => {
      fetch(
        "https://api-football-beta.p.rapidapi.com/players?id=" + this.props.location.state.playerID, 
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
            "x-rapidapi-key": "360bc2e65dmsh50cec7b50ff31b8p1cfa59jsnff457afc9393"
          }
        }
      )
        .then(response => response.json())
        .then(responseJson => {
  
          this.setState({
            data: responseJson.response,
  
          });
        })
        .catch(err => {
          console.log(err);
        });
    }


    renderSwitch(param) {
      switch(param) {
        case 'foo':
          return 'bar';
        default:
          return 'foo';
      }
    }
  
  
    render() {
      //console.log(this.state.data)
      return (
        <div className="container" >
  
  
          {this.state.data.map(item => (
            <div className="row ">
              <div>{item.player.id}</div>
              <div>{item.player.name}</div>
              <div>{item.player.age}</div>
              <div>{item.player.birth.date}</div>
              <div>{item.player.height}</div>
              <div>{item.player.weight}</div>
              <div>Травмы: {item.player.injured}</div>
  
              <div class="table-responsive-lg">
                <table class="table">
                  <thead>
                    <tr>
                      <th>country</th>
                      <th>league</th>
                      <th>year</th>
                      <th>goals</th>
                      <th>cards</th>
                      <th>#</th>
  
                    </tr>
                  </thead>
                  {item.statistics.map(item => (
                    <tr>
                      <td>{item.league.country}</td>
                      <td>{item.league.name}</td>
                      <td>{item.league.season}</td>
                      <td>{item.goals.total}</td>
                      <td>{item.cards.yellow}</td>
                      <td>{item.team.name}</td>
                    </tr>
                  ))}
                </table>
              </div>
  
  
            </div>
          ))}
  
  
  
  
  
  
  
        </div>
      )
    }
  
  }

  export default Player;