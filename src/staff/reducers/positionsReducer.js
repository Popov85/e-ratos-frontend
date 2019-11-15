const testAdapted = [
    {
        "key": "",
        "value": "Select"
    },
    {
        "key": 1,
        "value": "System admin"
    },
    {
        "key": 2,
        "value": "Dean"
    },
    {
        "key": 3,
        "value": "Head"
    },
    {
        "key": 4,
        "value": "Professor"
    },
    {
        "key": 5,
        "value": "Instructor"
    },
    {
        "key": 6,
        "value": "Researcher"
    },
    {
        "key": 7,
        "value": "Postgraduate"
    },
    {
        "key": 8,
        "value": "Lab. assistant"
    },
]

const initState = testAdapted;

/**
 * Used to create a new user
 * @param state
 * @param action
 * @returns {Array|*}
 */
export const positionsReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_POSITIONS": {
            let positions = action.payload.map(p => {
                let item = {};
                item.key = p.posId;
                item.value = p.name;
                return item;
            });
            positions.unshift({key: "", value: "Select"});
            console.log("Positions = ", positions);
            return positions;
        }
        default:
            return state;
    }
}