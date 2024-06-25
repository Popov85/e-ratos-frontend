export const themesSupportTransformer = {

    toObject(themeSupport, theme, order) {
        let schemeTheme = {};
        schemeTheme.schemeThemeId = null;
        schemeTheme.schemeId = null;
        schemeTheme.themeId = themeSupport.themeId;
        schemeTheme.theme = theme;
        schemeTheme.order = order;
        schemeTheme.settings = Object
            .values(themeSupport.typeLevelMap)
            .filter(value=>{
                let level1 = Number(value.totalLevel1);
                let level2 = Number(value.totalLevel2);
                let level3 = Number(value.totalLevel3);
                if (level1+level2+level3<1) return false;
                return true;
            }).map((value) => {
                let schemeThemeSettings = {};
                schemeThemeSettings.schemeThemeSettingsId = null;
                schemeThemeSettings.schemeThemeId = null;
                schemeThemeSettings.questionTypeId = value.typeId;
                schemeThemeSettings.type = value.type;
                schemeThemeSettings.level1 = Number(value.totalLevel1);
                schemeThemeSettings.level2 = Number(value.totalLevel2);
                schemeThemeSettings.level3 = Number(value.totalLevel3);
                return schemeThemeSettings;
            });
        return schemeTheme;
    }

}