import {dummy} from "../constants";

export const strategyTransformer = {

    toObject(strategies) {
        return strategies.reduce((map, strategy) => {
            map[strategy.strategyId] = strategy.name;
            return map;
        }, {});
    },

    toSelect(strategies) {
        return strategies.map(a => {
            let item = {};
            item.value = a.strId;
            item.label = a.name;
            return item;
        });
    },

    toSelectWithDummy(strategies) {
        let result = strategyTransformer
            .toSelect(strategies);
        result.unshift(dummy);
        return result;
    }

}