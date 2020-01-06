const dummy = {
    label: "Select",
    value: ""
}
// For editing an existing fac.
export const getFacById = (state, facId) => {
    const {content} = state.faculties;
    if (!content) return null;
    return content.find(f=>f.facId===facId);
}

// For Table filter
export const getAllFacForFilter = (state) => {
    const {content} = state.faculties;
    if (!content) return null;
    return facultiesToObj(content);
}

// For Select drop-down
export const getAllFacForEdit = (state) => {
    const {content} = state.faculties;
    if (!content) return null;
    return facultiesToSelect(content);
}

// For new form with empty default option
export const getAllFacForNew = (state) => {
    let all = getAllFacForEdit(state);
    all.unshift(dummy);
    return all;
}

export const getFacFromStoreForNewByOrgId = (state) => {
    // Selected orgId, default 0
    const {selectedId} = state.organisations;
    // Map of key - orgId, value - array of corresponding faculties
    const {map} = state.faculties;
    let content = map.get(selectedId);
    if (!content) return [dummy];
    return facultiesToSelectWithDummy(content);
}

export const getFacFromStoreForFilterByOrgId = (state) => {
    // Selected orgId, default 0
    const {selectedId} = state.organisations;
    // Return all existing faculties;
    if (selectedId === 0)
        return facultiesToObj(state.faculties.content);
    // Map of key - orgId, value - array of corresponding faculties
    const {map} = state.faculties;
    let content = map.get(selectedId);
    if (!content)
        throw new Error("No faculties found in the store for this organisation!");
    return facultiesToObj(content);
}

const facultiesToObj = (content) => {
    return content.reduce((map, fac) => {
        map[fac.facId] = fac.name;
        return map;
    }, {});
}

const facultiesToSelect = (content) => {
    return content.map(f => {
        let item = {};
        item.value = f.facId;
        item.label = f.name;
        return item;
    });
}

const facultiesToSelectWithDummy = (content) => {
    let result = facultiesToSelect(content);
    result.unshift(dummy);
    return result;
}