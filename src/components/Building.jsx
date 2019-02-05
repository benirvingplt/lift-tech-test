import React, { Component } from 'react';
import '../style/Building.css';

import Floor from './Floor';

const defaultLiftState = {
    atFloor: 0,
    inMotion: false,
    directionOfMotion: null,
    destinationFloor: null,
}

export default class Building extends Component {
    // NOTE: The state and methods are suggestions. Feel free to change these at suits your needs.
    state = {
        lifts: [
            { ...defaultLiftState, number: 0 },
            { ...defaultLiftState, number: 1 },
            { ...defaultLiftState, number: 2 },
        ]
    }

    /**
     * (You will need to change the code to ensure 'this' works in this method)
     * Call the lift to the specified floor
     * @param {Number} destinationFloor 
     */
    callLift(destinationFloor) {
        return;
    }

    render() {
        return (
            <div className="building">
                {
                    [0,1,2,3,4,5,6,7,8,9].reverse().map(floor => (
                        <Floor
                            key={floor}
                            floorNumber={floor}
                            callLift={this.callLift}
                            lifts={this.state.lifts}
                        />
                    ))
                }
            </div>
        );
    }
}