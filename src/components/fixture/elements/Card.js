import React from 'react';
import {
    Link,
} from "react-router-dom";

const Card = (props) => {
    return  (
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
                     {props.data.detail}
                </div>
            </div>
             <i class="icon-svg icon-yellow-card"></i>
        </div>
        )}

  export default Card;