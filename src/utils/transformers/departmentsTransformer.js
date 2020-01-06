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

    /**
     * Creates DTO object from form data to be passed to server create/update
     * @param data - data obj from redux form, nullable
     * @param faculties - all fac from store
     * @returns {{}}
     */
    depFormToDTO (data, faculties) {
        let fac = null;
        // If not null, search for full organisation object
        if (faculties) {
            fac = faculties
                .find(f=>f.facId===Number(data.facId));
        }
        let dep = {};
        dep.depId = data.depId;
        dep.name = data.name;
        let depDTO = {...dep, facId: data.facId};
        let depObj = {...dep, faculty:fac};
        return [depDTO, depObj];
    },

}