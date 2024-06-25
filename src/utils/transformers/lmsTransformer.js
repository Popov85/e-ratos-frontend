import {dummy} from "../constants";

export const lmsTransformer = {

    toSelect(lmses) {
        return lmses.map(d => {
            let item = {};
            item.value = d.lmsId;
            item.label = d.name;
            return item;
        });
    },

    toFilter (lmses) {
        return lmses.reduce((map, lms)=> {
            map[lms.lmsId] = lms.name;
            return map;
        }, {});
    },

    toSelectWithDummy(lmses) {
        if (!lmses) {
            return [dummy];
        }
        let result = lmsTransformer
            .toSelect(lmses);
        result.unshift(dummy);
        return result;
    },

}