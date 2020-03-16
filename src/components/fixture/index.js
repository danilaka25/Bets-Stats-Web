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
import './../../style-soccer.css';
import moment from "moment";

import Card from './elements/Card';
import Goal from './elements/Goal';
import Substr from './elements/Substr';

import Timeline from './blocks/timeline';
import Results from './blocks/results';


 

import 'bootstrap/dist/css/bootstrap.css';

class Fixture extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            head2headData: []
        }
    }

    componentDidMount() {
         this.getOneFixture()
        //  this.getHead2Head()
    }


    getOneFixture = () => { //events
        fetch(
			 //"https://api-football-beta.p.rapidapi.com/fixtures/events?fixture=239076"  ,
            "https://api-football-beta.p.rapidapi.com/fixtures/events?fixture="  + this.props.location.state.fixtureID ,
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


    detectHomeTeam(teamId) {
        return this.props.location.state.teamHomeId === teamId ? 'game-timeline__team-1' : 'game-timeline__team-2';
    }

    detecEvent(data) {
        console.log( "detecEvent", data)
        switch(data.type) {
          case 'Goal':
            return <Goal data={data} />;
          case 'subst':
            return <Substr data={data} />
          default:
            return <Card data={data} />;
        }
      }


      getHead2Head () {
        //   fetch("https://api-football-beta.p.rapidapi.com/fixtures/headtohead?h2h=33-34", {
             fetch("https://api-football-beta.p.rapidapi.com/fixtures/headtohead?h2h=" + this.props.location.state.teamHomeId + "-" + this.props.location.state.teamAwayId, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
                "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
            }
        })
        .then(response => response.json())
        .then(response => {
            this.setState({
                    head2headData: response.response,
            });  
        })
        .catch(err => {
            console.log(err);
        });
      }


    render() {
        //  console.log("77", this.state.data)
        return (
            <div className="container" >



<section className="game-result__section">



{/* 
    <div className="head2head">
     {this.state.head2headData.map(item => (
             <div> {item.goals.home} /  {item.goals.away}</div>
     ))}    
    </div> */}

    
<div className="site-content">
	<div className="container">
		<div className="row">
			<div className="content col-lg-8">
				<div className="card">
					
					
						
						<Results fixtureId={this.props.location.state.fixtureID}/>

						<Timeline data={this.state.data} teamHomeId={this.props.location.state.teamHomeId}/>



					
				</div>
				<div className="row">
					<div className="col-md-6">
						<aside className="widget card card--has-table widget--sidebar widget-lineup-table">
							<div className="widget__title card__header">
								<h4>Alchemists Lineup</h4>
							</div>
							<div className="widget__content card__content">
								<div className="table-responsive">
									<table className="table lineup-table">
										<thead>
											<tr>
												<th className="lineup__num">NBR</th>
												<th className="lineup__pos">POS</th>
												<th className="lineup__name">Player Name</th>
												<th className="lineup__info"></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="lineup__num">01</td>
												<td className="lineup__pos">GK</td>
												<td className="lineup__name">Nick Rodgers</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">04</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Mark Ironson</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">03</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Brian Kingster</td>
												<td className="lineup__info"><i className="icon-svg icon-red-card"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">22</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">James Girobilli</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">05</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Thomas Black</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">08</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Christofer Grass</td>
												<td className="lineup__info"><i className="icon-svg icon-soccer-ball"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">02</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Spike Arrowhead</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">26</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Griffin Peterson</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">07</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">James Messinal</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">09</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Franklin Stevens</td>
												<td className="lineup__info"><i className="icon-svg icon-soccer-ball"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">18</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">David Hawkins</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num" colspan="2">Team Coach</td>
												<td className="lineup__name">Robert Frankson</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<th className="lineup__subheader" colspan="4">Substitute Players</th>
											</tr>
											<tr>
												<td className="lineup__num">32</td>
												<td className="lineup__pos">GK</td>
												<td className="lineup__name">Taylor Redner</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">27</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Christian Netteron</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">11</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Alex Walterston</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">19</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Kirk Hetfield</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">25</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">James Hammet</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</aside>
					</div>
					<div className="col-md-6">
						<aside className="widget card card--alt-color card--has-table widget--sidebar widget-lineup-table">
							<div className="widget__title card__header">
								<h4>Clovers Lineup</h4>
							</div>
							<div className="widget__content card__content">

								<div className="table-responsive">
									<table className="table lineup-table">
										<thead>
											<tr>
												<th className="lineup__num">NBR</th>
												<th className="lineup__pos">POS</th>
												<th className="lineup__name">Player Name</th>
												<th className="lineup__info"></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="lineup__num">04</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Danny Stark</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">03</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Martin Pierto</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">07</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Brad Rockers</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">05</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Johnny Griffin</td>
												<td className="lineup__info"><i className="icon-svg icon-yellow-card"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">08</td>
												<td className="lineup__pos">MD</td>
												<td className="lineup__name">Rick Valentine</td>
												<td className="lineup__info"><i className="icon-svg icon-out"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">02</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Alphonse Tucker</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">26</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Wally Christison</td>
												<td className="lineup__info"><i className="icon-svg icon-yellow-card"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">22</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Adam Howlett</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">09</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Michael Neter</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">18</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Chris Balleron</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">20</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">David Hawkins</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num" colspan="2">Team Coach</td>
												<td className="lineup__name">Carter Stevens</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<th className="lineup__subheader" colspan="4">Substitute Players</th>
											</tr>
											<tr>
												<td className="lineup__num">32</td>
												<td className="lineup__pos">GK</td>
												<td className="lineup__name">Joe D’Amico</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">27</td>
												<td className="lineup__pos">DF</td>
												<td className="lineup__name">Thomas Kent</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">11</td>
												<td className="lineup__pos">MF</td>
												<td className="lineup__name">Phillip West</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">19</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Markus Jackson</td>
												<td className="lineup__info"><i className="icon-svg icon-in"></i></td>
											</tr>
											<tr>
												<td className="lineup__num">25</td>
												<td className="lineup__pos">FD</td>
												<td className="lineup__name">Nicholas Wayne</td>
												<td className="lineup__info"><i className="icon-svg"></i></td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
			<div className="sidebar col-lg-4">
				<aside className="widget card widget--sidebar widget-lineup">
					<div className="widget__title card__header">
						<h4>Lineup and Tactic</h4>
					</div>
					<div className="widget__content card__content">
						
                        
						
                        
					</div>
				</aside>
				<aside className="widget card card--no-paddings widget--sidebar widget-commentary">
					<div className="widget__title card__header">
						<h4>Game Highlights</h4>
					</div>
					<div className="widget__content card__content">
						<ul className="commentary">
							<li className="commentary__item">
								<span className="commentary__time">4’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-whistle"></i>
								</div><strong>Rick Valentine (Clovers)</strong> wins a free kick in the attacking half of the field.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">12’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-corner-flag"></i>
								</div>Corner Kick for <strong>Alchemists</strong>. Conceded by Alphonse Tucker.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">17’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-whistle"></i>
								</div>Foul by <strong>Martin Pierto (Clovers)</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">22’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-soccer-ball"></i>
								</div>Goal! <strong>Franklin Stevens (Alchemists)</strong> scored with the right foot. Assisted by David Hawkins. (1-0)
							</li>
							<li className="commentary__item">
								<span className="commentary__time">29’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-injury"></i>
								</div>Paramedics entered the field to check <strong>Christofer Grass (Alchemists)</strong> for a nasty fall.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">36’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-yellow-card"></i>
								</div><strong>Johnny Griffin (Clovers)</strong> is shown the yellow card for a bad kick to Brian Kingster’s shin.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">42’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-whistle"></i>
								</div>Foul by <strong>Spike Arrowhead (Alchemists)</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">HT</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-stopwatch"></i>
								</div>After 2 additional minutes starts the <strong>Halftime</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">HT</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-substitution"></i>
								</div><strong>Markus Jackson</strong> enters the field and substitutes <strong>Rick Valentine</strong> for the <strong>Clovers</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">51’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-whistle"></i>
								</div>Foul by <strong>Dany Stak (Clovers)</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">59’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-red-card"></i>
								</div><strong>Brian Kingster (Alchemists)</strong> is shown the red card for an intentional kick to Martin Pierto.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">63’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-keepers-glove"></i>
								</div>Attempt saved. <strong>Nick Rodgers (Alchemists)</strong> made an incredible save in the top corner of the goal.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">67’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-whistle"></i>
								</div>Penalty Kick. <strong>Alphonse Tucker (Clovers)</strong> blocked a shot in the area with his hand.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">68’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-soccer-ball-penalty"></i>
								</div>Goal! <strong>Christofer Grass (Alchemists)</strong> scored a penalty kick after a hand by Alphonse Tucker. (2-0)
							</li>
							<li className="commentary__item">
								<span className="commentary__time">77’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-offside-flag"></i>
								</div>Offside of <strong>Chris Balleron (Clovers)</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">82’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-soccer-shoe"></i>
								</div>Attempt missed. <strong>Michael Netter (Clovers)</strong> right foot shot from outside the box is too high.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">84’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-yellow-card"></i>
								</div><strong>Wally Christison (Clovers)</strong> is shown the yellow card for a headbutt to David Hawkins’s face.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">90’</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-stopwatch"></i>
								</div>The referee adds 4 minutes of <strong>additional time</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">FT</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-stopwatch"></i>
								</div>End of the game. The <strong>Alchemists won 2-0</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">AD</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-soccer-ball-own-goal"></i>
								</div>Additional Icon: <strong>Soccer Ball Own Goal</strong>.
							</li>
							<li className="commentary__item">
								<span className="commentary__time">AD</span>
								<div className="commentary__icon">
									<i className="icon-svg icon-soccer-ball-missed-penalty"></i>
								</div>Additional Icon: <strong>Soccer Ball Missed Penalty</strong>.
							</li>
						</ul>
					</div>
				</aside>
			</div>
		</div>
	</div>
</div>






</section>

 




            </div>
        );
    }

}


export default Fixture;