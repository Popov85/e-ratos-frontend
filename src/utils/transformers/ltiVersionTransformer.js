import {dummy} from "../constants";

export const ltiVersionTransformer = {

    toSelect(ltiVersions) {
        return ltiVersions.map(i => {
            let item = {};
            item.value = i.versionId;
            item.label = i.version;
            return item;
        });
    },

    toFilter (ltiVersions) {
        return ltiVersions.reduce((map, ltiVer)=> {
            map[ltiVer.versionId] = ltiVer.version;
            return map;
        }, {});
    },

    toSelectWithDummy(ltiVersions) {
        if (!ltiVersions) {
            return [dummy];
        }
        let result = ltiVersionTransformer
            .toSelect(ltiVersions);
        result.unshift(dummy);
        return result;
    },

}