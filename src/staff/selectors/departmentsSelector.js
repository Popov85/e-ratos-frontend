// For editing an existing dep.
export const getDepById = (state, depId) => {
    const {content} = state.departments;
    if (!content) return null;
    return content.find(d=>d.depId===depId);
}