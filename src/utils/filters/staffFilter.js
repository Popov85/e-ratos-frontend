export const staffFilter = {

    getStaffSorted (a, b, order) {
        let surnameA=a.surname.toLowerCase(), surnameB=b.surname.toLowerCase();
        if (order === 'asc') {
            if (surnameA < surnameB) //sort string ascending
                return -1;
            if (surnameA > surnameB)
                return 1;
            return 0;
        } else {
            if (surnameB < surnameA) //sort string descending
                return -1;
            if (surnameB > surnameA)
                return 1;
            return 0;
        }
    },

    getStaffFiltered (filterVal, data) {
        if (filterVal) {
            return data.filter(item =>
                (item.staff.name.includes(filterVal, 0)
                    || item.staff.surname.includes(filterVal, 0)));
        }
        return data;
    }

}