import React, { Component } from 'react';

import UI from "./building.ui";

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
        const updatedLifts = [...lifts];
        const nearestLift = this.getNearestLift(destinationFloor);

        console.log(destinationFloor, nearestLift);

        const isGoingUp = nearestLift.atFloor < destinationFloor;

        updatedLifts[nearestLift.id] = {
            ...nearestLift,
            directionOfMotion: isGoingUp
                ? "up"
                : "down",
            atFloor: destinationFloor,
            destinationFloor,
        };

        this.setState({
            lifts: updatedLifts,
        }, () => this.moveLift(nearestLift.id));
    }

    getNearestLift(destinationFloor: number) {
        const { lifts } = this.state;

        // Find the lifts that's not in motion
        const stationaryLifts = lifts.filter((lift) => lift.inMotion === false);


        // Find the nearest lift closest to the destination floor
        return stationaryLifts.reduce((prev, curr) => (
            Math.abs(curr.atFloor - destinationFloor) < (Math.abs(prev.atFloor - destinationFloor))
                ? curr
                : prev 
        ));
    }

    isLiftAtDestination(id: number) {
        const { lifts } = this.state;
        const currentLift = lifts[id];

        return currentLift.destinationFloor === currentLift.atFloor;
    }

    moveLift(id: number) {
        const { lifts } = this.state;
        const updatedLifts = [...lifts];
        const liftToMove = lifts[0];

        if (this.isLiftAtDestination(id)) {
            updatedLifts[id] = {
                ...liftToMove,
                inMotion: false,
                directionOfMotion: null,
            }

            this.setState({
                lifts: updatedLifts,
            }, () => console.log(this.state.lifts));
        } else {
            updatedLifts[id] = {
                ...liftToMove,
                inMotion: true,
                atFloor: liftToMove.directionOfMotion === "up"
                    ? liftToMove.atFloor + 1
                    : liftToMove.atFloor - 1,
            }

            this.setState({
                lifts: updatedLifts,
            }, () => {
                setTimeout(() => {
                    this.moveLift(id);
                }, 500);
            });
        }
    }
        


    render() {
        return (
            <UI
                callLift={this.callLift}
                lifts={this.state.lifts}
            />
        );
    }
}
