const Utils = {

    baseUrl: function () {
        const baseUrl = location.protocol + '//'
            + location.hostname + (location.port ? ':'
                + location.port : '');
        return (!baseUrl || baseUrl === "http://localhost:1234") ?
            "http://localhost:8090" : baseUrl;
    },

    secToTime: function (sec) {
        var date = new Date(null);
        date.setSeconds(sec);
        var timeString = date.toISOString().substr(11, 8);
        return timeString;
    },

    isEmptyArray: function (array) {
        return (!Array.isArray(!array) || !array.length);
    }
}

export default Utils;


