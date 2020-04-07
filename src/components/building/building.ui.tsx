import React, { FunctionComponent } from "react";

import '../../style/Building.css';
import Floor from "../floor";
import { Lift } from ".";


interface BuildingProps {
    callLift(currentFloor: number): void;
    lifts: Lift[];
}

const UI: FunctionComponent<BuildingProps> = (props) => (
    <div className="building">
        {
            [0,1,2,3,4,5,6,7,8,9].reverse().map(floor => (
                <Floor
                    key={`floor-id-${floor}`}
                    currentFloor={floor}
                    callLift={props.callLift}
                    lifts={props.lifts}
                />
            ))
        }
    </div>
);

export default UI;
