export const lmsTransformer = {
    /**
     * Transform array of departments from server form into an array required by select component
     * @param departments
     * @returns {*}
     */
    toSelect(lmses) {
        return lmses.map(d => {
            let item = {};
            item.value = d.depId;
            item.label = d.name;
            return item;
        });
    },

    /**
     * Transform array of users from server form into an array required by table filter
     * @param lmses
     * @returns {*}
     */
    toFilter (lmses) {
        return lmses.reduce((map, user)=> {
            map[user.department.depId] = user.department.name;
            return map;
        }, {});
    },

}