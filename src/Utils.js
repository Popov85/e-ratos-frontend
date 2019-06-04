const Utils = {

    // split array into chunks of n
    chunkArray: function (arr, size) {
        //console.log("chunkArray was invoked");
        var result = [];
        for (var i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    },

    helper1: function () {},
    helper2: function (param1) {},
    helper3: function (param1, param2) {}
}

export default Utils;


