
const utilsURL = {

    getParam(location, name) {
        const params = new URLSearchParams(location.search);
        return params.get(name);
    }
}

export default utilsURL;