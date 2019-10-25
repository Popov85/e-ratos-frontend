
const utilsURL = {

    getSearchParams() {
        return new URLSearchParams(window.location.search);
    },

    getSchemeId() {
        return utilsURL.getSearchParams().get('schemeId');
    }
}

export default utilsURL;