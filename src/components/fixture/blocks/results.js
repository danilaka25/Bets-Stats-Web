import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  getFixtureStatistics() {
    fetch(
      "https://api-football-beta.p.rapidapi.com/fixtures/statistics?fixture=" +
        this.props.fixtureId,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-beta.p.rapidapi.com",
          "x-rapidapi-key": "5cd0d9f62cmsh26e688ce8c24379p154337jsne3668a2c22f7"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          data: responseJson.response
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getFixtureStatistics();
  }

  render() {
    console.log("000", this.props.fixtureId);
    return (
      <>
        <header className="card__header card__header--has-btn">
          <h4>Last Game Results</h4>
          <a
            className="btn btn-default btn-outline btn-xs card-header__button"
            href="#"
          >
            Check previous Results
          </a>
        </header>

        <div className="card__content">
          <div className="game-result">
            <section className="game-result__section pt-0">
              <header className="game-result__header game-result__header--alt">
                <span className="game-result__league">West League 2016</span>
                <h3 className="game-result__title">Madison Cube Stadium</h3>
                <time className="game-result__date" datetime="2017-03-17">
                  Saturday, March 17th, 2017
                </time>
              </header>
              <div className="game-result__content">
                <div className="game-result__team game-result__team--first">
                  <div className="game-result__team-logo">
                    <img
                      alt=""
                      src="../assets/soccer/alchemists_last_game_results_big.png"
                    />
                  </div>
                  <div className="game-result__team-info">
                    <h5 className="game-result__team-name">Alchemists</h5>
                    <div className="game-result__team-desc">
                      Elric Bros School
                    </div>
                  </div>
                </div>
                <div className="game-result__score-wrap">
                  <div className="game-result__score game-result__score--lg">
                    <span className="game-result__score-result game-result__score-result--winner">
                      2
                    </span>{" "}
                    <span className="game-result__score-dash">-</span>{" "}
                    <span className="game-result__score-result game-result__score-result--loser">
                      0
                    </span>
                  </div>
                  <div className="game-result__score-label">Final Score</div>
                </div>
                <div className="game-result__team game-result__team--second">
                  <div className="game-result__team-logo">
                    <img
                      alt=""
                      src="../assets/soccer/alchemists_last_game_results_big.png"
                    />
                  </div>
                  <div className="game-result__team-info">
                    <h5 className="game-result__team-name">Clovers</h5>
                    <div className="game-result__team-desc">
                      St Paddy's Institute
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="spacer"></div>
            <section className="game-result__section">
              <header className="game-result__header game-result__header--alt">
                <span className="game-result__goal">
                  Franklin Stevens (22’){" "}
                  <i className="icon-svg icon-soccer-ball"></i>
                </span>{" "}
                <span className="game-result__goal">
                  Christofer Grass (68’) (P){" "}
                  <i className="icon-svg icon-soccer-ball"></i>
                </span>
              </header>
              <div className="game-result__content mb-0">
                <div className="game-result__stats">
                  <div className="row">
                    <div className="col-12 col-md-6 order-md-2">
                      <div className="game-result__table-stats game-result__table-stats--soccer">
                        <table className="table table-wrap-bordered table-thead-color">
                          <thead>
                            <tr>
                              <th colspan="3">Game Statistics</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>25(14)</td>
                              <td>Shots (on goal)</td>
                              <td>16(6)</td>
                            </tr>
                            <tr>
                              <td>9</td>
                              <td>Corner Kicks</td>
                              <td>7</td>
                            </tr>
                            <tr>
                              <td>8</td>
                              <td>Saves</td>
                              <td>5</td>
                            </tr>
                            <tr>
                              <td>0</td>
                              <td>Yellow Cards</td>
                              <td>2</td>
                            </tr>
                            <tr>
                              <td>1</td>
                              <td>Red Cards</td>
                              <td>0</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 order-md-1 game-result__stats-team-1">
                      <div className="row">
                        <div className="col-6">
                          <div className="circular circular--size-70">
                            <div className="circular__bar" data-percent="84.5">
                              <span className="circular__percents">
                                84.5<small>%</small>
                              </span>
                              <canvas height="90" width="90"></canvas>
                            </div>
                            <span className="circular__label">
                              Shot Accuracy
                            </span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="circular circular--size-70">
                            <div className="circular__bar" data-percent="62.3">
                              <span className="circular__percents">
                                62.3<small>%</small>
                              </span>
                              <canvas height="90" width="90"></canvas>
                            </div>
                            <span className="circular__label">
                              Pass Accuracy
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="spacer"></div>
                      <div className="progress-stats">
                        <div className="progress__label">Sho</div>
                        <div className="progress">
                          <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow="90"
                            className="progress__bar progress__bar-width-90"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="progress__number">25</div>
                      </div>
                      <div className="progress-stats">
                        <div className="progress__label">Fou</div>
                        <div className="progress">
                          <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow="40"
                            className="progress__bar progress__bar-width-40"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="progress__number">12</div>
                      </div>
                      <div className="progress-stats">
                        <div className="progress__label">OFF</div>
                        <div className="progress">
                          <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow="30"
                            className="progress__bar progress__bar-width-30"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="progress__number">10</div>
                      </div>
                    </div>
                    <div className="col-6 col-md-3 order-md-3 game-result__stats-team-2">
                      <div className="row">
                        <div className="col-6">
                          <div className="circular circular--size-70">
                            <div
                              className="circular__bar"
                              data-bar-color="#9fe900"
                              data-percent="74.6"
                            >
                              <span className="circular__percents">
                                74.6<small>%</small>
                              </span>
                            </div>
                            <span className="circular__label">
                              Shot Accuracy
                            </span>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="circular circular--size-70">
                            <div
                              className="circular__bar"
                              data-bar-color="#9fe900"
                              data-percent="53.9"
                            >
                              <span className="circular__percents">
                                53.9<small>%</small>
                              </span>
                            </div>
                            <span className="circular__label">
                              Pass Accuracy
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="spacer"></div>
                      <div className="progress-stats">
                        <div className="progress__label">Sho</div>
                        <div className="progress">
                          <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow="80"
                            className="progress__bar progress__bar--success progress__bar-width-80"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="progress__number">25</div>
                      </div>
                      <div className="progress-stats">
                        <div className="progress__label">Fou</div>
                        <div className="progress">
                          <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow="60"
                            className="progress__bar progress__bar--success progress__bar-width-60"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="progress__number">14</div>
                      </div>
                      <div className="progress-stats">
                        <div className="progress__label">OFF</div>
                        <div className="progress">
                          <div
                            aria-valuemax="100"
                            aria-valuemin="0"
                            aria-valuenow="40"
                            className="progress__bar progress__bar--success progress__bar-width-40"
                            role="progressbar"
                          ></div>
                        </div>
                        <div className="progress__number">12</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="game-result__section">
              <header className="game-result__subheader card__subheader">
                <h5 className="game-result__subtitle">Ball Posession</h5>
              </header>
              <div className="game-result__content">
                <div className="spacer-sm"></div>
                <div className="progress-double-wrapper">
                  <div className="progress-inner-holder">
                    <div className="progress__digit progress__digit--left progress__digit--highlight">
                      62%
                    </div>
                    <div className="progress__double">
                      <div className="progress progress--lg">
                        <div
                          aria-valuemax="100"
                          aria-valuemin="0"
                          aria-valuenow="60"
                          className="progress__bar progress__bar-width-60"
                          role="progressbar"
                        ></div>
                      </div>
                      <div className="progress progress--lg">
                        <div
                          aria-valuemax="100"
                          aria-valuemin="0"
                          aria-valuenow="40"
                          className="progress__bar progress__bar--success progress__bar-width-40"
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                    <div className="progress__digit progress__digit--right progress__digit--highlight">
                      38%
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default Results;
