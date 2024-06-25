import {dummy} from "../constants";

export const schemesTransformer = {

    toObject(schemes) {
        return schemes.reduce((map, scheme) => {
            map[scheme.schemeId] = scheme.name;
            return map;
        }, {});
    },

    toSelect(schemes) {
        return schemes.map(s => {
            let item = {};
            item.value = s.schemeId;
            item.label = s.name;
            return item;
        });
    },

    toSelectWithDummy(schemes) {
        let result = schemesTransformer
            .toSelect(schemes);
        result.unshift(dummy);
        return result;
    }

}