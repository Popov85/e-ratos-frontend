import {dummy} from "../constants";

export const gradingsTransformer = {

    toObject(gradings) {
        return gradings.reduce((map, grading) => {
            map[grading.gradingId] = grading.name;
            return map;
        }, {});
    },

    toSelect(gradings) {
        return gradings.map(g => {
            let item = {};
            item.value = g.gradingId;
            item.label = g.name;
            return item;
        });
    },

    toSelectWithDummy(gradings) {
        let result = gradingsTransformer
            .toSelect(gradings);
        result.unshift(dummy);
        return result;
    }

}