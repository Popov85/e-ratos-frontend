const testInitState = {
    content: [
        {
            "resourceId": 1,
            "link": "https://drive.google.com/file/d/170jMMCjhW-mOswjT1mSJlZGxB3NI8iAw/preview",
            "description": "From trip to Paris #1",
            "width":"360",
            "height":"240",
            "type":"image",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "Instructor"
            },
            "lastUsed": "2020-02-01 10:45 (+0300)"
        },
        {
            "resourceId": 2,
            "link": "https://drive.google.com/file/d/1tyFJiOpqdqXe27hs_PLpI9qHeX3wY3EY/preview",
            "description": "From trip to Paris #2",
            "width":"360",
            "height":"240",
            "type":"image",
            "staff": {
                "staffId": 2,
                "name": "Andrey",
                "surname": "Popov",
                "position": "Researcher"
            },
            "lastUsed": "2020-01-14 14:22 (+0300)"
        },
        {
            "resourceId": 3,
            "link": "https://drive.google.com/file/d/1GpEkKZp-o9kUzwgGdgiz7N4wHB2Ioweh/preview",
            "description": "From trip to Paris #3",
            "width":"360",
            "height":"240",
            "type":"image",
            "staff": {
                "staffId": 2,
                "name": "Andrey",
                "surname": "Popov",
                "position": "Researcher"
            },
            "lastUsed": "2020-02-02 14:19 (+0300)"
        },
        {
            "resourceId": 4,
            "link": "https://drive.google.com/file/d/11Pb51I7t2VJRiNnpVdxzJEWDhbP9HbTK/preview",
            "description": "From trip to Paris #4",
            "width":"360",
            "height":"240",
            "type":"image",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "Instructor"
            },
            "lastUsed": "2020-01-02 09:39 (+0300)"
        },
        {
            "resourceId": 5,
            "link": "https://drive.google.com/file/d/1WKAt0LBP3hPvQolOIGYc99NY_WAM5sVB/preview",
            "description": "From trip to Paris #5",
            "width":"360",
            "height":"240",
            "type":"image",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "Instructor"
            },
            "lastUsed": "2020-01-03 08:00 (+0300)"
        },
        {
            "resourceId": 6,
            "link": "https://drive.google.com/file/d/192DVKjniZbafQe7JQV1xNq3p9U1ppfNn/preview",
            "description": "My first mp3 audio file #1",
            "width":"360",
            "height":"240",
            "type":"audio",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "Instructor"
            },
            "lastUsed": "2020-02-03 09:32 (+0300)"
        },
        {
            "resourceId": 7,
            "link": "https://drive.google.com/file/d/13umBb6s5jk8c_d2sGC-y70Q-v6XDolZ1/preview",
            "description": "My first video audio file #1",
            "width":"360",
            "height":"240",
            "type":"video",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "Instructor"
            },
            "lastUsed": "2020-02-03 09:39 (+0300)"
        }
        ]
}

const initState = {
    content: null,
    isLoading: false,
    error: null
}

export const resourcesReducer = (state = testInitState, action) => {
    switch (action.type) {
        case "LOADING_ALL_RESOURCES": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_RESOURCES_FAILURE": {
            console.log("Error loading resources!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_RESOURCES_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_RESOURCE": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_RESOURCE_FAILURE": {
            console.log("Error updating a resource!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_RESOURCE_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_RESOURCES_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_RESOURCES": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_RESOURCE_IN_STORE": {
            const resource = action.payload;
            return {...state, content: [...state.content, resource]};
        }
        case "UPDATE_RESOURCE_IN_STORE": {
            const resource = action.payload;
            return {...state, content: state.content.map(r => r.resourceId === resource.resourceId ? resource : r)};
        }
        case "UPDATE_RESOURCE_URL_IN_STORE": {
            const {resId, link} = action;
            return {...state, content: state.content.map(r => r.resourceId === resId ? {...r, link} : r)}
        }
        case "UPDATE_RESOURCE_DESCRIPTION_IN_STORE": {
            const {resId, description} = action;
            return {...state, content: state.content.map(r => r.resourceId === resId ? {...r, description} : r)}
        }
        case "DELETE_RESOURCE_FROM_STORE": {
            const {resId} = action;
            return {...state, content: state.content.filter(r => r.resourceId !== resId)}
        }
        default:
            return state;
    }
}