const utils = {

    /**
     * @deprecated use env. variables instead
     * Base URL for API calls
     * @returns {string|string}
     */
    baseUrl: function () {
        return location.protocol + '//'
            + location.hostname + (location.port ? ':'
                + location.port : '');
    },

    secToTime: function (sec) {
        let date = new Date(null);
        date.setSeconds(sec);
        let timeString = date.toISOString().substr(11, 8);
        return timeString;
    }
}

export default utils;


