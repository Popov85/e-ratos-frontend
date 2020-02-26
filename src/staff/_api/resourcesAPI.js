import {instance} from "../../common/_api/axios";

export const resourcesAPI = {

    saveResource(resourceDTO) {
        return instance.post(`/instructor/resources`, resourceDTO);
    },

    updateResource(resourceDTO) {
        return instance.put(`/instructor/themes`, resourceDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------
    updateResourceUrl(resId, url) {
        return instance.patch(`/instructor/resources/${resId}/link`, {value: url});
    },

    updateResourceDescription(resId, description) {
        return instance.patch(`/instructor/resources/${resId}/description`, {value: description});
    },
    
    deleteResource(resId) {
        return instance.delete(`/instructor/resources/${resId}`);
    },

    //------------------------------------------------Table (all)-------------------------------------------------------

    fetchAllResourcesByDepartmentForTable() {
        return instance.get('/department/resources-table/all-res-by-department');
    },
}