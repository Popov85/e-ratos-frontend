import { Location } from 'history';

const utilsURL = {
    getParam(location: Location, name: string): string | null {
        const params: URLSearchParams = new URLSearchParams(location.search);
        return params.get(name);
    }
}

export default utilsURL;
