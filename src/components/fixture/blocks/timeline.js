import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";


import moment from "moment";

import Card from './../elements/Card';
import Goal from './../elements/Goal';
import Substr from './../elements/Substr';

class Timeline extends React.Component {



        constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }



        componentDidMount() {
            this.getOneFixture()
        }





    detectHomeTeam(teamId) {
        return this.props.teamHomeId === teamId ? 'game-timeline__team-1' : 'game-timeline__team-2';
    }

    detecEvent(data) {
        // console.log( "detecEvent", data)
        switch(data.type) {
          case 'Goal':
            return <Goal data={data} />;
          case 'subst':
            return <Substr data={data} />
          default:
            return <Card data={data} />;
        }
      }

          getOneFixture = () => { //events
        fetch(
			// "https://api-football-beta.p.rapidapi.com/fixtures/events?fixture=157280"  ,
             "https://api-football-beta.p.rapidapi.com/fixtures/events?fixture="  + this.props.data ,
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
                console.log(responseJson);
                this.setState({
                    data: responseJson.response,
                });
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.log(err);
            });
    };



        render() {
                    // console.log("77", this.props.data)

         return (
     <>    
     <section className="game-result__section">   
	{/* <header className="game-result__subheader card__subheader">
		<h5 className="game-result__subtitle">Game Timeline{this.props.location.state.teamHomeId} / {this.props.location.state.teamAwayId}</h5>
	</header> */}
    
	<div className="game-result__content game-result__content--visible mb-0">

		<div className="game-timeline-wrapper">
			<div className="game-timeline">


				
                <div className="game-timeline__event">
					<div className="game-timeline__team-1">
						<div className="game-timeline__team-shirt">
							<i className="icon-svg icon-shirt"></i>
						</div>
					</div>
					<div className="game-timeline__time">
						0’
					</div>
					<div className="game-timeline__team-2">
						<div className="game-timeline__team-shirt">
							<i className="icon-svg icon-shirt-alt"></i>
						</div>
					</div>
				</div>

                {this.props.data.map(item => (


				<div className="game-timeline__event game-timeline__event--22">
					<div className={this.detectHomeTeam(item.team.id)}>
                    {/* <div> */}
                        {this.detecEvent(item)}
					</div>
					<div className="game-timeline__time">
                    {item.time.elapsed}’
					</div>
				</div>

                ))}



				<div className="game-timeline__event game-timeline__event--ft">
					<div className="game-timeline__time">
						FT
					</div>
				</div>




			</div>
		</div>
		<div className="spacer"></div>
		<div className="game-result__section-decor"></div>
	</div>
    </section>
     </> 
        )}


}


export default Timeline;