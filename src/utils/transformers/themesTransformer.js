export const themesTransformer = {

    toObject(themes) {
        return themes.reduce((map, theme) => {
            map[theme.themeId] = theme.name;
            return map;
        }, {});
    },

    toSelect(themes) {
        return themes.map(t => {
            let item = {};
            item.value = t.themeId;
            item.label = t.name;
            return item;
        });
    }

}