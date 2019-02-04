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
    state = {
        lifts: [
            { ...defaultLiftState, number: 0 },
            { ...defaultLiftState, number: 1 },
            { ...defaultLiftState, number: 2 },
        ]
    }

    callLift = async (destinationFloor) => {
        console.log('Lift called to floor', destinationFloor);
        const chosenLift = await this.getClosestLift(destinationFloor);
        console.log('chosenLift', chosenLift.number);
        this.controllLift(destinationFloor, chosenLift)
    }

    async getClosestLift(destinationFloor) {
        const { lifts } = this.state;

        let chosenLift;
        let bestLiftDistance = Infinity;

        for (let lift of lifts) {
            // If lift currently at the floor and its not in motion, use that lift
            if (lift.atFloor === destinationFloor && !lift.inMotion) {
                chosenLift = lift;
                break;
            }

            // Calculate the distance metric of each lift
            const liftDistance = (Math.abs(lift.atFloor - destinationFloor) * (lift.inMotion ? 3 : 1));

            // If this lifts distance metric is better than the current best lift distance metric
            // then update the best current distance and set this lift as the current chosen lift
            if (liftDistance < bestLiftDistance) {
                bestLiftDistance = liftDistance;
                chosenLift = lift;
            }
        }

        return chosenLift;
    }

    /**
     * Update the state to show the chosen lift is now begun moving to the selected floor
     * Call 'moveLift' method every second until lift has arrived
     * @param {Number} destinationFloor 
     * @param {Object} lift 
     */
    controllLift(destinationFloor, liftToUpdate) {
        const { lifts} = this.state;
        const liftNumber = liftToUpdate.number;
        const newDirection = destinationFloor > liftToUpdate.atFloor ? 'up' : 'down';
    
        lifts[liftNumber] = {
            ...liftToUpdate,
            destinationFloor,
            inMotion: true,
            directionOfMotion: newDirection,
        };

        this.setState({ lifts }, () => {
            const moveLiftTimer = setInterval(() => {
                const updatedLifts = this.state.lifts;
                const lift = updatedLifts[liftNumber]
                if (lift.atFloor === destinationFloor) {
                    clearInterval(moveLiftTimer);
                    updatedLifts[liftNumber] = {
                        ...lift,
                        inMotion: false,
                        directionOfMotion: null,
                    }
                    this.setState({ lifts: updatedLifts});
                } else {
                    this.moveLift(liftNumber);
                }
            }, 1000);
        });
    }

    /**
     * Set the state of the chosen lift to increment/decrement its floor by 1
     * @param {*} lift 
     */
    moveLift(liftNumber) {
        const { lifts } = this.state;
        const liftToUpdate = lifts[liftNumber];
        const newFloor = liftToUpdate.directionOfMotion === 'up'
            ? liftToUpdate.atFloor + 1
            : liftToUpdate.atFloor - 1;

        lifts[liftToUpdate.number] = {
            ...liftToUpdate,
            atFloor: newFloor
        };

        this.setState({ lifts });
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