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


    //--------------------------------------------------Bad design!!!---------------------------------------------------
    /**
     * Transform array of users from server form into an array required by table filter
     * @param users
     * @returns {*}
     */
    toFilter (users) {
        return users.reduce((map, user)=> {
            map[user.department.depId] = user.department.name;
            return map;
        }, {});
    },

}