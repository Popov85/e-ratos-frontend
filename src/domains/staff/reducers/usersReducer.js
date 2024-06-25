import {
    organisationsTransformer as organisationTransformer
} from "../../../utils/transformers/organisationsTransformer";
import {facultiesTransformer} from "../../../utils/transformers/facultiesTransformer";
import {departmentsTransformer} from "../../../utils/transformers/departmentsTransformer";


const testInitState = {
    content: [
        {
            "staffId": 20,
            "user": {
                "name": "Anita",
                "surname": "Efremova",
                "email": "anita.efremova@example.com",
                "active": true,
                "role": "ROLE_INSTRUCTOR"
            },
            "position": {
                "posId": 6,
                "name": "Researcher"
            },
            "department": {
                "depId": 2,
                "name": "Department #2",
                "faculty": {
                    "facId": 2,
                    "name": "Faculty #2",
                    "organisation": {
                        "orgId": 2,
                        "name": "Organisation #2",
                    }
                }
            }
        }, {
            "staffId": 16,
            "user": {
                "name": "Alex",
                "surname": "Romanov",
                "email": "alex.romanov@gmail.com",
                "active": true,
                "role": "ROLE_GLOBAL_ADMIN"
            },
            "position": {
                "posId": 2,
                "name": "Dean"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }, {
            "staffId": 17,
            "user": {
                "name": "Adam",
                "surname": "Smakovskiy",
                "email": "adam.smakovsky@gmail.com",
                "active": true,
                "role": "ROLE_LAB-ASSISTANT"
            },
            "position": {
                "posId": 3,
                "name": "Head"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }, {
            "staffId": 18,
            "user": {
                "name": "Angelina",
                "surname": "Krasovskaya",
                "email": "angelina.krasowskaya@gmail.com",
                "active": true,
                "role": "ROLE_DEP-ADMIN"
            },
            "position": {
                "posId": 6,
                "name": "Researcher"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }, {
            "staffId": 23,
            "user": {
                "name": "Garry",
                "surname": "Efremov",
                "email": "garry.efremov@example.com",
                "active": true,
                "role": "ROLE_LAB-ASSISTANT"
            },
            "position": {
                "posId": 8,
                "name": "Lab. assistant"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }, {
            "staffId": 1,
            "user": {
                "name": "Staff",
                "surname": "Staff",
                "email": "staff.staff@example.com",
                "active": true,
                "role": "ROLE_DEP-ADMIN"
            },
            "position": {
                "posId": 1,
                "name": "System admin"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }, {
            "staffId": 19,
            "user": {
                "name": "Andrey",
                "surname": "Popov",
                "email": "andrey.popov@example.com",
                "active": true,
                "role": "ROLE_INSTRUCTOR"
            },
            "position": {
                "posId": 5,
                "name": "Instructor"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }, {
            "staffId": 21,
            "user": {
                "name": "Boris",
                "surname": "Levin",
                "email": "boris.levin@example.com",
                "active": false,
                "role": "ROLE_INSTRUCTOR"
            },
            "position": {
                "posId": 1,
                "name": "System admin"
            },
            "department": {
                "depId": 1,
                "name": "Department",
                "faculty": {
                    "facId": 1,
                    "name": "Faculty",
                    "organisation": {
                        "orgId": 1,
                        "name": "Organisation",
                    }
                }
            }
        }
    ],
    departments: {
        1: "Department",
        2: "Department #1"
    },
    faculties: {
        1: "Faculty",
        2: "Faculty #1"
    },
    organisations: {
        1: "Organisation",
        2: "Organisation #1"
    }
}

const initState = {
    content: null,
    organisations: null,
    faculties: null,
    departments: null
}

export const usersReducer = (state = initState, action) => {
    switch (action.type) {
        case "LOADING_DEP_STAFF": {
            return {...state, isLoading: action.isLoading};
        }
        case "LOADING_DEP_STAFF_FAILURE": {
            console.log("Error loading dep. staff!", action.error);
            return {...state, error: action.error};
        }
        case "CLEAR_LOADING_DEP_STAFF_FAILURE": {
            return {...state, error: null};
        }
        case "UPDATING_DEP_STAFF": {
            return {...state, isUpdating: action.isUpdating};
        }
        case "UPDATING_DEP_STAFF_FAILURE": {
            console.log("Error updating dep. staff!", action.error);
            return {...state, errorUpdate: action.error};
        }
        case "CLEAR_UPDATING_DEP_STAFF_FAILURE": {
            return {...state, errorUpdate: null};
        }
        case "CLEAR_DEP_STAFF_FAILURE": {
            return {...state, error: null, errorUpdate: null};
        }
        case "SET_DEP_STAFF": {
            const content = action.payload;
            const organisations = organisationTransformer.fromUsersToFilter(content);
            const faculties = facultiesTransformer.toFilter(content);
            const departments = departmentsTransformer.toFilter(content);
            return {...state, content, organisations, faculties, departments};
        }
        case "CLEAR_DEP_STAFF": {
            return {};
        }
        case "ADD_STAFF_IN_STORE": {
            const staff = action.payload;
            return {...state, content: [...state.content, staff]};
        }
        case "UPDATE_STAFF_IN_STORE": {
            const staff = action.payload;
            return {...state, content: state.content.map(s => s.staffId === staff.staffId ? staff: s)};
        }
        case "UPDATE_STAFF_NAME_IN_STORE": {
            return {
                ...state,
                content: state.content.map(s => s.staffId === action.staffId ? {
                    ...s,
                    user: {...s.user, name: action.name}
                } : s)
            }
        }
        case "UPDATE_STAFF_SURNAME_IN_STORE": {
            return {
                ...state,
                content: state.content.map(s => s.staffId === action.staffId ? {
                    ...s,
                    user: {...s.user, surname: action.surname}
                } : s)
            }
        }
        case "UPDATE_STAFF_EMAIL_IN_STORE": {
            return {
                ...state,
                content: state.content.map(s => s.staffId === action.staffId ? {
                    ...s,
                    user: {...s.user, email: action.email}
                } : s)
            }
        }
        case "DELETE_STAFF_FROM_STORE": {
            const {staffId} = action;
            return {...state, content: state.content.filter(s => s.staffId !== staffId)}
        }
        case "SET_STAFF_FILTER": {
            return {...state, filter: action.payload};
        }
        default:
            return state;
    }
}