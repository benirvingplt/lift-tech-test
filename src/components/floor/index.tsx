import React, { FunctionComponent } from 'react';

import UI from "./floor.ui";
import { Lift } from "../building";

export interface FloorProps {
    callLift(floorNumber: number): void;
    currentFloor: number;
    lifts: Lift[];
}

const Container: FunctionComponent<FloorProps> = (props) => (
    <UI
        callLift={props.callLift}
        lifts={props.lifts}
        currentFloor={props.currentFloor}
    />
);

export default Container;
