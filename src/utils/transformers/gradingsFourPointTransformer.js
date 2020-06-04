import {dummy} from "../constants";

export const gradingsFourPointTransformer = {

    toObject(gradings) {
        return gradings.reduce((map, grading) => {
            map[grading.fourId] = grading.name;
            return map;
        }, {});
    },

    toSelect(gradings) {
        return gradings.map(a => {
            let item = {};
            item.value = a.fourId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(gradings) {
        let result = gradingsFourPointTransformer
            .toSelect(gradings);
        result.unshift(dummy);
        return result;
    }

}