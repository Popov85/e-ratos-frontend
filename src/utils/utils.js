const utils = {

    baseUrl: function () {
        const baseUrl = location.protocol + '//'
            + location.hostname + (location.port ? ':'
                + location.port : '');
        return (!baseUrl || baseUrl === "http://localhost:1234") ?
            "http://localhost:8090" : baseUrl;
    },

    secToTime: function (sec) {
        let date = new Date(null);
        date.setSeconds(sec);
        let timeString = date.toISOString().substr(11, 8);
        return timeString;
    }
}

export default utils;


