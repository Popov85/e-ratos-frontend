import {dummy} from "../constants";

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

    /**
     * Transform array of faculties from server form into an array required by select component with dummy value
     * @param faculties
     * @returns {*}
     */
    toSelectWithDummy(faculties) {
        let result = facultiesTransformer
            .toSelect(faculties);
        result.unshift(dummy);
        return result;
    },

    //--------------------------------------------------Bad design!!!---------------------------------------------------

    /**
     * TODO: consider to remove/rework!
     * Transform array of users from server form into an array required by table filter
     * @param users
     * @returns {*}
     */
    toFilter (users) {
        return users.reduce((map, user)=> {
            map[user.department.faculty.facId] = user.department.faculty.name;
            return map;
        }, {});
    }

}