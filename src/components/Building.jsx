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
        // getClosesLift()
        // controllLift()
    }

    /**
     * Return the best lift to use
     * @param {Number} destinationFloor 
     */
    getClosestLift(destinationFloor) {
        return;
    }

    /**
     * Update the state to show the chosen lift is now begun moving to the selected floor
     * Call 'moveLift' method every second until lift has arrived
     * @param {Number} destinationFloor 
     * @param {Object} lift 
     */
    controllLift(destinationFloor, liftToUpdate) {
        // moveLift()
    }

    /**
     * Set the state of the chosen lift to increment/decrement its floor by 1
     * @param {Number} liftNumber 
     */
    moveLift(liftNumber) {

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