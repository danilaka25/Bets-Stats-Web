import React from 'react';
import {
    Link,
} from "react-router-dom";

const Goal = (props) => {
    //console.log("this.props", this.props)
    return (
        <div>
            <div className="game-timeline__event-info">
                <div className="game-timeline__event-name">
                    <Link to={{
                        pathname: `/player/${props.data.player.id}`,
                        state: {
                            playerID: props.data.player.id
                        }
                    }}>
                        {props.data.player.name}
                    </Link>
                </div>
                <div className="game-timeline__event-desc">
                    Assist {props.data.assist.name}
                </div>
            </div>
            <i className="icon-svg icon-soccer-ball"></i>
        </div>
        )}
        
  export default Goal;