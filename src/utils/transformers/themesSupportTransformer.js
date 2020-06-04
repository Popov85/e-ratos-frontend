/*
Support
   {
            themeId : 17,
            totalByTheme : 21,
            typeLevelMap : {
                1 : {
                    type : "MCQ",
                    totalLevel1 : 21,
                    totalLevel2 : 0,
                    totalLevel3 : 0,
                    total : 21
                }
            }
        },
*/

/*
Real
      "themes":[
                    {
                        "schemeThemeId": 1, // nullable
                        "schemeId": 1, // nullable
                        "themeId": 3,
                        "theme": "Theme: Consequat etiam laborumcurabitur ipsum occaecat et tincidunt .",
                        "order": 0,
                        "settings":[
                            {
                                "schemeThemeSettingsId": 1, //nullable
                                "schemeThemeId": 1, // nullable
                                "typeId": 1,
                                "type": "MCQ",
                                "level1": 10,
                                "level2": 0,
                                "level3": 0
                            }
                        ]
                    }
                ],
 */

export const themesSupportTransformer = {

    toObject(themeSupport, schemeId, theme, order) {
        let schemeTheme = {};
        schemeTheme.schemeThemeId = null;
        schemeTheme.schemeId = schemeId;
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