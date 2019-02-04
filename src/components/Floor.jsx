import React, { Component } from 'react';
import '../style/Floor.css'

export default class Building extends Component {
    render() {
        return (
            <div className="floor">
                <div className="call-area floor-area">
                    <button onClick={() => this.props.callLift(this.props.floorNumber)}>Call</button>
                </div>
                <div className="lift-area floor-area">
                    {
                        this.props.lifts.map(lift => (
                            <div className="lift" key={lift.number}>
                                {
                                    lift.atFloor === this.props.floorNumber &&
                                    lift.destinationFloor === this.props.floorNumber &&
                                    <div className="green-icon"></div>
                                }
                                {
                                    lift.atFloor === this.props.floorNumber &&
                                    lift.destinationFloor !== this.props.floorNumber &&
                                    <div className="amber-icon"></div>
                                }
                                {
                                    lift.atFloor !== this.props.floorNumber &&
                                    <div className="red-icon"></div>
                                }
                            </div>
                        ))
                    }
                </div>
                <div className="room-area floor-area">
                    Floor {this.props.floorNumber}
                </div>
            </div>
        );
    }
}