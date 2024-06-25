import {instance} from "../../common/_api/axios";

export const gradingFourPointAPI = {

    saveGradingFourPointDTO(gradingFourPointDTO) {
        return instance.post(`/instructor/four-point-gradings`, gradingFourPointDTO);
    },

    updateGradingFourPointDTO(gradingFourPointDTO) {
        return instance.put(`/instructor/four-point-gradings`, gradingFourPointDTO);
    },

    deleteGradingFourPointDTO(gradingFourPointId) {
        return instance.delete(`/instructor/four-point-gradings/${gradingFourPointId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllGradingsFourPointByDepartmentForDropDown() {
        return instance.get(`/department/four-point-gradings/all-four-point-gradings-with-default`);
    },

}