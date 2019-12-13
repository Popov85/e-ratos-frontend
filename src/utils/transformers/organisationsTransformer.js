export const organisationsTransformer = {

    /**
     * Transform array of organisations from server form into an array required by select component
     * @param organisations
     * @returns {*}
     */
    toSelect(organisations) {
        return organisations.map(o => {
            let item = {};
            item.value = o.orgId;
            item.label = o.name;
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
            map[user.department.faculty.organisation.orgId] = user.department.faculty.organisation.name;
            return map;
        }, {});
    }

}