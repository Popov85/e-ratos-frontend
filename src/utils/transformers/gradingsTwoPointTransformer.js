import {dummy} from "../constants";

export const gradingsTwoPointTransformer = {

    toObject(gradings) {
        return gradings.reduce((map, grading) => {
            map[grading.twoId] = grading.name;
            return map;
        }, {});
    },

    toSelect(gradings) {
        return gradings.map(a => {
            let item = {};
            item.value = a.twoId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(gradings) {
        let result = gradingsTwoPointTransformer
            .toSelect(gradings);
        result.unshift(dummy);
        return result;
    }

}