import React, { Component } from 'react';
import '../style/Building.css';

import Floor from './floor';

export interface Lift {
    atFloor: number;
    inMotion: boolean;
    directionOfMotion: string | null;
    destinationFloor: number | null;
    id?: number;
}

interface BuildingProps {};

interface BuildingState {
    lifts: Lift[];
}


const defaultLiftState: Lift = {
    atFloor: 0,
    inMotion: false,
    directionOfMotion: null,
    destinationFloor: null,
}

export default class Building extends Component<BuildingProps, BuildingState> {
    constructor(props: BuildingProps) {
        super(props);

        this.callLift = this.callLift.bind(this);
        this.isLiftAtDestination = this.isLiftAtDestination.bind(this);
        this.moveLift = this.moveLift.bind(this);
    }
    // NOTE: The state and methods are suggestions. Feel free to change these at suits your needs.
    state = {
        lifts: [
            { ...defaultLiftState, id: 0 },
            { ...defaultLiftState, id: 1 },
            { ...defaultLiftState, id: 2 },
        ]
    }

    /**
     * (You will need to change the code to ensure 'this' works in this method)
     * Call the lift to the specified floor
     * @param {Number} destinationFloor 
     */
    callLift(destinationFloor: number) {
        const { lifts } = this.state;

        // Find the lifts that's not in motion
        const stationaryLifts = lifts.filter((lift) => lift.inMotion === false);


        // Find the nearest lift closest to the destination floor
        const nearestLift = stationaryLifts.reduce((prev, curr) => (
            Math.abs(curr.atFloor - destinationFloor) < (Math.abs(prev.atFloor - destinationFloor))
                ? curr
                : prev 
        ));

        console.log(nearestLift.id);

        const isGoingUp = nearestLift.atFloor < destinationFloor;

        lifts[nearestLift.id] = {
            ...nearestLift,
            directionOfMotion: isGoingUp
                ? "up"
                : "down",
            destinationFloor,
        };

        console.log(JSON.stringify(lifts));

        this.setState({
            lifts,
        }, () => this.moveLift(nearestLift.id));
    }

    isLiftAtDestination(id: number) {
        const { lifts } = this.state;
        const currentLift = lifts[id];

        return currentLift.destinationFloor === currentLift.atFloor;
    }

    moveLift(id: number) {
        const { lifts } = this.state;
        const liftToMove = lifts[0];

        if (this.isLiftAtDestination(id)) {
            lifts[id] = {
                ...liftToMove,
                inMotion: false,
                directionOfMotion: null,
                destinationFloor: null,
            }

            this.setState({
                lifts,
            }, () => console.log(this.state.lifts));
        } else {
            lifts[id] = {
                ...liftToMove,
                inMotion: true,
                atFloor: liftToMove.directionOfMotion === "up"
                    ? liftToMove.atFloor + 1
                    : liftToMove.atFloor - 1,
            }

            this.setState({
                lifts,
            }, () => {
                setTimeout(() => {
                    this.moveLift(id);
                }, 500);
            });
        }
    }
        


    render() {
        return (
            <div className="building">
                {
                    [0,1,2,3,4,5,6,7,8,9].reverse().map(floor => (
                        <Floor
                            key={`floor-id-${floor}`}
                            currentFloor={floor}
                            callLift={this.callLift}
                            lifts={this.state.lifts}
                        />
                    ))
                }
            </div>
        );
    }
}
