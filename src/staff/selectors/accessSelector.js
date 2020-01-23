import {createSelector} from "reselect";

const dummy = {value: "", label: "Select"};

export const getAllAccessesMin = (state) => state.access ? state.access.contentMin : null;

//------------------------------------------------Re-selectors----------------------------------------------------------

export const getAccessesForSelect = createSelector(getAllAccessesMin, (accesses) => {
    if (!accesses) return [dummy];
    let result = accesses.map(a => {
        let item = {};
        item.value = a.accessId;
        item.label = a.name;
        return item;
    });
    result.unshift(dummy);
    return result;
});

export const getAccessesForFilter = createSelector(getAllAccessesMin, (accesses) => {
    return accesses.reduce((map, a) => {
        map[a.accessId] = a.name;
        return map;
    }, {});
});