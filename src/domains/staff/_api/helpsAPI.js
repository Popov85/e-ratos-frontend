import {instance} from "../../common/_api/axios";

export const helpsAPI = {

    saveHelp(helpDTO) {
        return instance.post(`/instructor/helps`, helpDTO);
    },

    updateHelp(helpDTO) {
        return instance.put(`/instructor/helps`, helpDTO);
    },

    //--------------------------------------------PATCH-es--------------------------------------------------------------
    updateHelpName(helpId, name) {
        return instance.patch(`/instructor/helps/${helpId}/name`, {value: name});
    },

    updateHelpText(helpId, help) {
        return instance.patch(`/instructor/helps/${helpId}/help`, {value: help});
    },

    updateHelpResource(helpId, resId) {
        return instance.patch(`/instructor/helps/${helpId}/resource`, {value: resId});
    },
    
    deleteHelp(helpId) {
        return instance.delete(`/instructor/helps/${helpId}`);
    },

    //------------------------------------------------Table (all)-------------------------------------------------------

    fetchAllHelpsByDepartmentForTable() {
        return instance.get('/department/helps-table/all-helps-by-department');
    },
}