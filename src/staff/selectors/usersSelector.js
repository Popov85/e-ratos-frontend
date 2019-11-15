export const getUser = (state, staffId) => {
    const {content} = state.users;
    if (!content) return null;
    return content.find(s =>s.staffId === staffId);
}