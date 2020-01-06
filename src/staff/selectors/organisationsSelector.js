const dummy = {
    label: "Select",
    value: ""
}

// For editing an existing org.
export const getOrgById = (state, orgId) => {
    const {content} = state.organisations;
    if (!content) return null;
    return content.find(o=>o.orgId===orgId);
}

// For Table filter
export const getAllOrgForFilter = (state) => {
    const {content} = state.organisations;
    if (!content) return null;
    return content.reduce((map, org)=> {
        map[org.orgId] = org.name;
        return map;
    }, {});
}

// For Select drop-down
export const getAllOrgForEdit = (state) => {
    const {content} = state.organisations;
    if (!content) return null;
    return content.map(o => {
        let item = {};
        item.value = o.orgId;
        item.label = o.name;
        return item;
    });
}

// For new form with empty default option
export const getAllOrgForNew = (state) => {
    let all = getAllOrgForEdit(state);
    all.unshift(dummy);
    return all;
}


