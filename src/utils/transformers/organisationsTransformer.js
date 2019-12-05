export const organisationsTransformer = {

    /**
     * Transform array of organisations from server form into an array required by select component
     * @param organisations
     * @returns {*}
     */
    toSelect(organisations) {
        return organisations.map(o => {
            let item = {};
            item.value = o.orgId;
            item.label = o.name;
            return item;
        });
    },

}