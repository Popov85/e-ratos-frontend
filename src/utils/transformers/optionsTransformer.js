import {dummy} from "../constants";

export const optionsTransformer = {

    toObject(options) {
        return options.reduce((map, options) => {
            map[options.optId] = options.name;
            return map;
        }, {});
    },

    toSelect(options) {
        return options.map(a => {
            let item = {};
            item.value = a.optId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(options) {
        let result = optionsTransformer
            .toSelect(options);
        result.unshift(dummy);
        return result;
    }

}