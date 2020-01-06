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
    fromUsersToFilter (users) {
        return users.reduce((map, user)=> {
            map[user.department.faculty.organisation.orgId] = user.department.faculty.organisation.name;
            return map;
        }, {});
    },

    /**
     * Creates DTO object from form data to be passed to server create/update
     * @param data - data obj from redux form, nullable
     * @returns {{}}
     */
    orgFormToDTO (data) {
        let orgDTO = {};
        orgDTO.orgId = data.orgId;
        orgDTO.name = data.name;
        return orgDTO;
    },

}