import {PositionsActionTypes, SET_POSITIONS} from "../actions/positionsActions";
import {Position} from "../types/Position";
import {FormSelect} from "../types/form/FormSelect";
import {TableObject} from "../types/table/TableObject";

// Define the state shape
interface PositionsState {
    actual: Position[];
    forEdit: Array<FormSelect>;
    forNew: Array<FormSelect>;
    forFilter: TableObject;
}

// Initialize the state
const initState: PositionsState = {
    actual: [],
    forEdit: [],
    forNew: [],
    forFilter: {},
};

// The reducer function
export const positionsReducer = (state: PositionsState = initState, action: PositionsActionTypes): PositionsState => {
    switch (action.type) {
        case SET_POSITIONS: {
            if (!action.payload) return state;

            const {positions} = action.payload;

            if (positions.length === 0) return state;

            const forEdit: Array<FormSelect> = positions.map((p: Position): FormSelect => ({
                value: p.posId.toString(),
                label: p.name,
            }));

            const forNew: Array<FormSelect> = [...forEdit, {value: "", label: "Select"}];

            const forFilter: TableObject = positions.reduce<TableObject>((map: TableObject, position: Position) => {
                map[position.posId] = position.name;
                return map;
            }, {});

            return {
                actual: positions,
                forEdit,
                forNew,
                forFilter,
            };
        }
        default:
            return state;
    }
};
