
const UtilsResponse = {

    /**
    * Helper function for Fetch API
    * @param response Response object
    */
    process: function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return response.json()
                .then(error => { throw error });
        };
    },

    /**
  * Helper function for Fetch API, no body response expected
  * @param response Response object
  */
    processNoBody: function (response) {
        if (response.ok) {
            return "OK";
        } else {
            return response.json()
                .then(error => { throw error });
        };
    }
}

export default UtilsResponse;


