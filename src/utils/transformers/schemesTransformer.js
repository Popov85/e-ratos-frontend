export const schemesTransformer = {

    toObject(schemes) {
        return schemes.reduce((map, scheme) => {
            map[scheme.schemeId] = scheme.name;
            return map;
        }, {});
    },

}