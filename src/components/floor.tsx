import React, { Component } from "react";
import "../style/Floor.css"
import { Lift } from "./building";

export interface FloorProps {
    callLift(floorNumber: number): void;
    currentFloor: number;
    lifts: Lift[];
}

export default class Floor extends Component<FloorProps> {
    render() {
        return (
            <div className="floor">
                <div className="call-area floor-area">
                    <button onClick={() => this.props.callLift(this.props.currentFloor)}>Call</button>
                </div>
                <div className="lift-area floor-area">
                    {
                        this.props.lifts.map(lift => (
                            <div className="lift" key={`lift-id-${lift.id}`}>
                                {
                                    lift.atFloor === this.props.currentFloor &&
                                    lift.destinationFloor === this.props.currentFloor &&
                                    <div className="green-icon"></div>
                                }
                                {
                                    lift.atFloor === this.props.currentFloor &&
                                    lift.destinationFloor !== this.props.currentFloor &&
                                    <div className="amber-icon"></div>
                                }
                                {
                                    lift.atFloor !== this.props.currentFloor &&
                                    <div className="red-icon"></div>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="room-area floor-area">
                    Floor {this.props.currentFloor}
                </div>
            </div>
        );
    }
}
