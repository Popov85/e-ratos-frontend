export const departmentsTransformer = {

    /**
     * Transform array of departments from server form into an array required by select component
     * @param departments
     * @returns {*}
     */
    toSelect(departments) {
        return departments.map(d => {
            let item = {};
            item.value = d.depId;
            item.label = d.name;
            return item;
        });
    },

}