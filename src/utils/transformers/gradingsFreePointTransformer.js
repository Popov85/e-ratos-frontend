import {dummy} from "../constants";

export const gradingsFreePointTransformer = {

    toObject(gradings) {
        return gradings.reduce((map, grading) => {
            map[grading.freeId] = grading.name;
            return map;
        }, {});
    },

    toSelect(gradings) {
        return gradings.map(a => {
            let item = {};
            item.value = a.freeId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(gradings) {
        let result = gradingsFreePointTransformer
            .toSelect(gradings);
        result.unshift(dummy);
        return result;
    }

}