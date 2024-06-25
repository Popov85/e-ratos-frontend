import {instance} from "../../common/_api/axios";

export const themesSupportAPI = {

    //--------------------------------------------For scheme themes creating support------------------------------------
    fetchAllQuestionsTypesAndLevelsByThemeId(themeId) {
        return instance.get(`/instructor/themes-map/${themeId}`);
    }

}