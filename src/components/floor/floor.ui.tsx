import React, { FunctionComponent } from "react";

import "../../style/Floor.css";
import { FloorProps } from "./index";

const UI: FunctionComponent<FloorProps> = (props) => (
    <div className="floor">
        <div className="call-area floor-area">
            <button onClick={() => props.callLift(props.currentFloor)}>Call</button>
        </div>
        <div className="lift-area floor-area">
            {
                props.lifts.map(lift => (
                    <div className="lift" key={`lift-id-${lift.id}`}>
                        {
                            lift.atFloor === props.currentFloor &&
                            lift.destinationFloor === props.currentFloor &&
                            <div className="green-icon"></div>
                        }
                        {
                            lift.atFloor === props.currentFloor &&
                            lift.destinationFloor !== props.currentFloor &&
                            <div className="amber-icon"></div>
                        }
                        {
                            lift.atFloor !== props.currentFloor &&
                            <div className="red-icon"></div>
                        }
                    </div>
                ))
            }
        </div>
        <div className="room-area floor-area">
            Floor {props.currentFloor}
        </div>
    </div>
);

export default UI;
