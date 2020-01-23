import {dummy} from "../constants";

export const organisationsTransformer = {

    /**
     * Transform array of organisations from server form into an object required for table
     * @param organisations
     * @returns {*}
     */
    toObject(organisations) {
        return organisations.reduce((map, org) => {
            map[org.orgId] = org.name;
            return map;
        }, {});
    },

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
     * Transform array of organisations from server form into an array required by select component with dummy value
     * @param organisations
     * @returns {*}
     */
    toSelectWithDummy(organisations) {
        let result = organisationsTransformer
            .toSelect(organisations);
        result.unshift(dummy);
        return result;
    },

    //--------------------------------------------------Bad design!!----------------------------------------------------

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
    }

}