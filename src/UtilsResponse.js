
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
    }
}

export default UtilsResponse;


