export const helpFilter = {

    getHelpFiltered (filterVal, data) {
        if (filterVal) {
            if (filterVal === 'no-help') {
                return data.filter(item => !item.help);
            } else {
                return data.filter(item => item.help);
            }
        }
        return data;
    }

}