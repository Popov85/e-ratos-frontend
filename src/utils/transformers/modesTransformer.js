import {dummy} from "../constants";

export const modesTransformer = {

    toObject(modes) {
        return modes.reduce((map, mode) => {
            map[mode.modeId] = mode.name;
            return map;
        }, {});
    },

    toSelect(modes) {
        return modes.map(a => {
            let item = {};
            item.value = a.modeId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(modes) {
        let result = modesTransformer
            .toSelect(modes);
        result.unshift(dummy);
        return result;
    }

}