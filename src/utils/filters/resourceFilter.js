export const resourceFilter = {

    getResourceFiltered (filterVal, data) {
        if (filterVal) {
            if (filterVal === 'no-resource') {
                return data.filter(item => !item.resource);
            } else {
                return data.filter(item => item.resource);
            }
        }
        return data;
    }

}