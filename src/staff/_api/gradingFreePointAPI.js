import {instance} from "../../common/_api/axios";

export const gradingFreePointAPI = {

    saveGradingFreePointDTO(gradingFreePointDTO) {
        return instance.post(`/instructor/free-point-gradings`, gradingFreePointDTO);
    },

    updateGradingFreePointDTO(gradingFreePointDTO) {
        return instance.put(`/instructor/free-point-gradings`, gradingFreePointDTO);
    },

    deleteGradingFreePointDTO(gradingFreePointId) {
        return instance.delete(`/instructor/free-point-gradings/${gradingFreePointId}`);
    },
    
    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllGradingsFreePointByDepartmentForDropDown() {
        return instance.get(`/department/free-point-gradings/all-free-point-gradings-with-default`);
    },

}