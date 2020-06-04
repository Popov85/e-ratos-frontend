import {dummy} from "../constants";

export const accessTransformer = {

    toObject(accesses) {
        return accesses.reduce((map, access) => {
            map[access.accessId] = access.name;
            return map;
        }, {});
    },

    toSelect(accesses) {
        return accesses.map(a => {
            let item = {};
            item.value = a.accessId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(accesses) {
        let result = accessTransformer
            .toSelect(accesses);
        result.unshift(dummy);
        return result;
    }

}