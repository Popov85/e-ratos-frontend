const Utils = {

    baseUrl: function () {
        const baseUrl = location.protocol + '//'
            + location.hostname + (location.port ? ':'
                + location.port : '');
        return (!baseUrl || baseUrl === "http://localhost:1234") ?
            "http://localhost:8090" : baseUrl;
    },

    // split array into chunks of n
    chunkArray: function (arr, size) {
        var result = [];
        for (var i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    },

    isEmptyArray: function (array) {
        return (!Array.isArray(!array) || !array.length);
    },


    helper3: function (param1, param2) { }
}

export default Utils;


