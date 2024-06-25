import {instance} from "../../common/_api/axios";

export const gradingTwoPointAPI = {

    saveGradingTwoPointDTO(gradingTwoPointDTO) {
        return instance.post(`/instructor/two-point-gradings`, gradingTwoPointDTO);
    },

    updateGradingTwoPointDTO(gradingTwoPointDTO) {
        return instance.put(`/instructor/two-point-gradings`, gradingTwoPointDTO);
    },

    // Reserve for the future
    deleteGradingTwoPointDTO(gradingTwoPointId) {
        return instance.delete(`/instructor/two-point-gradings/${gradingTwoPointId}`);
    },

    //--------------------------------------------Min set-s of information----------------------------------------------
    fetchAllGradingsTwoPointByDepartmentForDropDown() {
        return instance.get(`/department/two-point-gradings/all-two-point-gradings-with-default`);
    },

}