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
     * Transform array of users from server form into an array required by table filter
     * @param users
     * @returns {*}
     */
    toFilter (users) {
        return users.reduce((map, user)=> {
            map[user.department.faculty.facId] = user.department.faculty.name;
            return map;
        }, {});
    },

    /**
     * Creates DTO object from form data to be passed to server create/update
     * @param data - data obj from redux form, nullable
     * @param organisations - all org from store
     * @returns {{}}
     */
    facFormToDTO (data, organisations) {
        let org = null;
        // If not null, search for full organisation object
        if (organisations) {
            org = organisations
                .find(o=>o.orgId===Number(data.orgId));
        }
        let fac = {};
        fac.facId = data.facId;
        fac.name = data.name;
        let facDTO = {...fac, orgId: data.orgId};
        let facObj = {...fac, organisation: org};
        return [facDTO, facObj];
    },

    /**
     * Extract a map of key = orgId, value is an array of corresponding faculties;
     * Used to implement "shortened list logic"
     * @param faculties
     */
    extractMapFromOriginalArray(faculties) {
        let result = new Map();
        faculties.forEach(f=>{
            let orgId = f.organisation.orgId;
            let item = {facId: f.facId, name: f.name};
            if (result.has(orgId)) {
                let array = result.get(orgId);
                array.push(item);
            } else {
                result.set(orgId, [item]);
            }
        });
        result.set(0, []);
        return result;
    }
}