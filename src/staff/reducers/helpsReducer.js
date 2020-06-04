import {dev} from "../../profile";

const testInitState = {
    content:[
        {
            "helpId": 1,
            "name": "Help name #1",
            "help": "Help very long content #1",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "System admin"
            },
            "resource": {
                "resourceId": 1,
                "link": "https://resources.com/1",
                "description": "Resource 1",
                "type": "misc.",
                "width": 352,
                "height": 240,
                "lastUsed": "2020-01-28 18:59 (+0200)",
                "staff": {
                    "staffId": 1,
                    "name": "Daniel",
                    "surname": "Naroditsky",
                    "position": "System admin"
                }
            }
        },
        {
            "helpId": 2,
            "name": "Help name #2",
            "help": "Help very long content #2",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "System admin"
            },
            "resource": {
                "resourceId": 1,
                "link": "https://resources.com/1",
                "description": "Resource 1",
                "type": "misc.",
                "width": 352,
                "height": 240,
                "lastUsed": "2020-01-28 18:59 (+0200)",
                "staff": {
                    "staffId": 1,
                    "name": "Daniel",
                    "surname": "Naroditsky",
                    "position": "System admin"
                }
            }
        },
        {
            "helpId": 3,
            "name": "Help name #3",
            "help": "Help very long content #3",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "System admin"
            },
            "resource": {
                "resourceId": 2,
                "link": "https://resources.com/2",
                "description": "Resource 2",
                "type": "image",
                "width": 352,
                "height": 240,
                "lastUsed": "2020-01-28 18:59 (+0200)",
                "staff": {
                    "staffId": 1,
                    "name": "Daniel",
                    "surname": "Naroditsky",
                    "position": "System admin"
                }
            }
        },
        {
            "helpId": 4,
            "name": "Help name #4",
            "help": "Help very long content #4",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "System admin"
            },
            "resource": {
                "resourceId": 2,
                "link": "https://resources.com/2",
                "description": "Resource 2",
                "type": "image",
                "width": 352,
                "height": 240,
                "lastUsed": "2020-01-28 18:59 (+0200)",
                "staff": {
                    "staffId": 1,
                    "name": "Daniel",
                    "surname": "Naroditsky",
                    "position": "System admin"
                }
            }
        },
        {
            "helpId": 5,
            "name": "Help name #5",
            "help": "Help very long content #5",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "System admin"
            },
            "resource": {
                "resourceId": 5,
                "link": "https://resources.com/5",
                "description": "Resource 5",
                "type": "image",
                "width": 352,
                "height": 240,
                "lastUsed": "2020-01-28 18:59 (+0200)",
                "staff": {
                    "staffId": 1,
                    "name": "Daniel",
                    "surname": "Naroditsky",
                    "position": "System admin"
                }
            }
        },
        {
            "helpId": 6,
            "name": "Help name #6",
            "help": "Help very long content #6",
            "staff": {
                "staffId": 1,
                "name": "Daniel",
                "surname": "Naroditsky",
                "position": "System admin"
            },
            "resource": null
        },
        {
            "helpId": 7,
            "name": "Help name #7",
            "help": "Help very long content #7",
            "staff": {
                "staffId": 2,
                "name": "Andrey",
                "surname": "Popov",
                "position": "Instructor"
            },
            "resource": null
        },
        {
            "helpId": 8,
            "name": "Help name #8",
            "help": "Help very long content #8",
            "staff": {
                "staffId": 2,
                "name": "Andrey",
                "surname": "Popov",
                "position": "Instructor"
            },
            "resource": null
        },
        {
            "helpId": 9,
            "name": "Help name #9",
            "help": "Help very long content #9",
            "staff": {
                "staffId": 2,
                "name": "Andrey",
                "surname": "Popov",
                "position": "Instructor"
            },
            "resource": null
        },
        {
            "helpId": 10,
            "name": "Help name #10",
            "help": "Help very long content #10",
            "staff": {
                "staffId": 2,
                "name": "Andrey",
                "surname": "Popov",
                "position": "Instructor"
            },
            "resource": null
        }
    ]
}

const initState = {
    content: null,
    isLoading: false,
    error: null
}

export const helpsReducer = (state = (dev ? testInitState : initState), action) => {
    switch (action.type) {
        case "LOADING_ALL_HELPS": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_ALL_HELPS_FAILURE": {
            console.log("Error loading helps!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_ALL_HELPS_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_HELP": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_HELP_FAILURE": {
            console.log("Error updating a help!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_HELP_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_ALL_HELPS_FAILURES": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_ALL_HELPS": {
            const content = action.payload;
            return {...state, content};
        }
        case "ADD_HELP_IN_STORE": {
            const help = action.payload;
            return {...state, content: [...state.content, help]};
        }
        case "UPDATE_HELP_IN_STORE": {
            const help = action.payload;
            return {...state, content: state.content.map(h => h.helpId === help.helpId ? help : h)};
        }
        case "UPDATE_HELP_NAME_IN_STORE": {
            const {helpId, name} = action;
            return {...state, content: state.content.map(h => h.helpId === helpId ? {...h, name} : h)}
        }
        case "UPDATE_HELP_TEXT_IN_STORE": {
            const {helpId, help} = action;
            return {...state, content: state.content.map(h => h.helpId === helpId ? {...h, help} : h)}
        }
        case "DELETE_HELP_FROM_STORE": {
            const {helpId} = action;
            return {...state, content: state.content.filter(h => h.helpId !== helpId)}
        }
        default:
            return state;
    }
}