export const facultiesTransformer = {

    /**
     * Transform array of faculties from server form into an object required for table
     * @param faculties
     * @returns {*}
     */
    toObject(faculties) {
        return faculties.reduce((map, fac) => {
            map[fac.facId] = fac.name;
            return map;
        }, {});
    },

    /**
     * Transform array of faculties from server form into an array required by select component
     * @param faculties
     * @returns {*}
     */
    toSelect(faculties) {
        return faculties.map(f => {
            let item = {};
            item.value = f.facId;
            item.label = f.name;
            return item;
        });
    },

}