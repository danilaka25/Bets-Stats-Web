import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import './App.css';
// import './style-soccer.css';


import moment from "moment";

import 'bootstrap/dist/css/bootstrap.css';

import Player from './components/player/index';
import Fixture from './components/fixture/index';



export default function App() {
  return (

    <section>
      <Router>
        <Link to="/">Home</Link>

        <Link to="/users">Users</Link>
        <Route exact path="/" component={Home} />
        <Route exact path="/fixture" component={Fixture} />
        <Route exact path="/fixture/:id" component={Fixture} />


        <Route exact path="/player/:id" component={Player} />


      </Router>
    </section>

  );
}







class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      todayDate: moment(new Date()).format("YYYY-MM-DD"), // 2020-01-23
      data: [],
      refreshing: true
    };
  }

  getFixtureToday = () => {
    fetch(
      // "https://api-football-beta.p.rapidapi.com/fixtures?date=" +
      //   this.state.todayDate,
      "https://api-football-beta.p.rapidapi.com/fixtures?live=all",

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
         console.log(responseJson.response);
        this.setState({
          data: responseJson.response,
          refreshing: false
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.setState({ isReady: true });
    this.getFixtureToday();
    // let match = useRouteMatch();
  }


  detectTopLeague  (id)  {


   // return id === 135 ? "77777" : "6666";

    let topLeague = [78 , 61, 40, 135, 140, 39]


    for (var i = 0; i < topLeague.length; i++) {
      if (id === topLeague[i]){
        return "color_row"
      }
    }
            
      
   
 

       
      
  



  }



  render() {
    return (
      <div className="container">

        {this.state.data.map(item => ( //78 , 61, 40, 135, 140

          <Link to={{
            pathname: `/fixture/${item.fixture.id}`,
            state: {
              fixtureID: item.fixture.id,
              teamHomeId: item.teams.home.id,
              teamAwayId: item.teams.away.id,
            }
          }} key={item.fixture.id}>


            <div  className={this.detectTopLeague( item.league.id  )}>
              {console.log(this.detectTopLeague( item.league.id  ))}

              <div className="row event_live">
                
              <img src={item.league.flag} className="country_flag" /> 
                id {item.league.id}
                {/* {item.teams.home.id} /
                {item.teams.away.id}
                <img src={item.league.logo} className="league_logo" />
                <img src={item.league.flag} className="country_flag" /> */}

              </div>

              <div className="row event_live" >
                <div className="col-md-4 team_home">{item.teams.home.name} <img src={item.teams.home.logo} className="club_icon" /></div>

                <div className="col-md-4 event_score">
                  {item.goals.home} - {item.goals.away} / {item.fixture.status.elapsed}

                </div>

                <div className="col-md-4 team_away">{item.teams.away.name} <img src={item.teams.away.logo} className="club_icon" /></div>
              </div>
            </div>
          </Link>
        ))}
      </div>




    )

  }

}



