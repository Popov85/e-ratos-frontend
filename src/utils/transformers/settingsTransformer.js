import {dummy} from "../constants";

export const settingsTransformer = {

    toObject(settings) {
        return settings.reduce((map, settings) => {
            map[settings.setId] = settings.name;
            return map;
        }, {});
    },

    toSelect(settings) {
        return settings.map(a => {
            let item = {};
            item.value = a.setId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(settings) {
        let result = settingsTransformer
            .toSelect(settings);
        result.unshift(dummy);
        return result;
    }

}