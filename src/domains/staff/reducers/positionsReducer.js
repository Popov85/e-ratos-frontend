const actual = [
    {
        "posId": 1,
        "name": "System admin"
    },
    {
        "posId": 2,
        "name": "Dean"
    },
    {
        "posId": 3,
        "name": "Head"
    },
    {
        "posId": 4,
        "name": "Professor"
    },
    {
        "posId": 5,
        "name": "Instructor"
    },
    {
        "posId": 6,
        "name": "Researcher"
    },
    {
        "posId": 7,
        "name": "Postgraduate"
    },
    {
        "posId": 8,
        "name": "Lab. assistant"
    },
];

const forEdit = [
    {
        value: 1,
        label: 'System. admin'
    },
    {
        value: 2,
        label: 'Dean'
    },
    {
        value: 3,
        label: 'Head'
    },
    {
        value: 4,
        label: 'Professor'
    },
    {
        value: 5,
        label: 'Instructor'
    },
    {
        value: 6,
        label: 'Researcher'
    },
    {
        value: 7,
        label: 'Postgraduate'
    },
    {
        value: 8,
        label: 'Lab. assistant'
    }
];

const forNew = [...forEdit, {value: "", label: "Select"}];

const forFilter = {
    1: "System admin",
    2: "Dean",
    3: "Head",
    4: "Professor",
    5: "Instructor",
    6: "Researcher",
    7: "Postgraduate",
    8: "Lab. assistant",
}

const testInitState = {
    actual,
    forEdit,
    forNew,
    forFilter
}

const initState = {
    actual: null,
    forEdit: null,
    forNew: null,
    forFilter: null
}

/**
 * Used to create a new user
 * @param state
 * @param action
 * @returns {Array|*}
 */
export const positionsReducer = (state = initState, action) => {
    switch (action.type) {
        case "SET_POSITIONS": {
            let positions = action.payload;
            let forEdit = positions.map(p => {
                let item = {};
                item.value = p.posId;
                item.label = p.name;
                return item;
            });
            let forNew = [...forEdit, {value: "", label: "Select"}];
            let forFilter = positions.reduce((map, position) => {
                map[position.posId] = position.name;
                return map;
            }, {});

            let result = {};
            result.actual = positions;
            result.forEdit = forEdit;
            result.forNew = forNew;
            result.forFilter = forFilter;
            return result;
        }
        default:
            return state;
    }
}