const initState = {
    content: [
        {
            "staffId" : 20,
            "user" : {
                "name" : "Anita",
                "surname" : "Efremova",
                "email" : "anita.efremova@example.com",
                "active" : true,
                "role" : "ROLE_INSTRUCTOR"
            },
            "position" : {
                "posId" : 6,
                "name" : "Researcher"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 16,
            "user" : {
                "name" : "Alex",
                "surname" : "Romanov",
                "email" : "alex.romanov@gmail.com",
                "active" : true,
                "role" : "ROLE_INSTRUCTOR"
            },
            "position" : {
                "posId" : 2,
                "name" : "Dean"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 17,
            "user" : {
                "name" : "Adam",
                "surname" : "Smakovskiy",
                "email" : "adam.smakovsky@gmail.com",
                "active" : true,
                "role" : "ROLE_LAB-ASSISTANT"
            },
            "position" : {
                "posId" : 3,
                "name" : "Head"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 18,
            "user" : {
                "name" : "Angelina",
                "surname" : "Krasovskaya",
                "email" : "angelina.krasowskaya@gmail.com",
                "active" : true,
                "role" : "ROLE_DEP-ADMIN"
            },
            "position" : {
                "posId" : 6,
                "name" : "Researcher"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 23,
            "user" : {
                "name" : "Garry",
                "surname" : "Efremov",
                "email" : "garry.efremov@example.com",
                "active" : true,
                "role" : "ROLE_LAB-ASSISTANT"
            },
            "position" : {
                "posId" : 8,
                "name" : "Lab. assistant"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 1,
            "user" : {
                "name" : "Staff",
                "surname" : "Staff",
                "email" : "staff.staff@example.com",
                "active" : true,
                "role" : "ROLE_DEP-ADMIN"
            },
            "position" : {
                "posId" : 1,
                "name" : "System admin"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 19,
            "user" : {
                "name" : "Andrey",
                "surname" : "Popov",
                "email" : "andrey.popov@example.com",
                "active" : true,
                "role" : "ROLE_INSTRUCTOR"
            },
            "position" : {
                "posId" : 5,
                "name" : "Instructor"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }, {
            "staffId" : 21,
            "user" : {
                "name" : "Boris",
                "surname" : "Levin",
                "email" : "boris.levin@example.com",
                "active" : false,
                "role" : "ROLE_INSTRUCTOR"
            },
            "position" : {
                "posId" : 1,
                "name" : "System admin"
            },
            "department" : {
                "depId" : 1,
                "name" : "Department"
            }
        }
    ]
}

export const usersReducer = (state = {}, action) => {
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
            return {...state, content: action.payload};
        }
        case "CLEAR_DEP_STAFF": {
            return {};
        }
        case "UPDATE_STAFF_NAME": {
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, user: {...s.user, name: action.name} } : s)}
        }
        case "UPDATE_STAFF_SURNAME": {
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, user: {...s.user, surname: action.surname} } : s)}
        }
        case "UPDATE_STAFF_EMAIL": {
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, user: {...s.user, email: action.email} } : s)}
        }
        case "UPDATE_STAFF_ROLE": {
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, user: {...s.user, role: action.role} } : s)}
        }
        case "UPDATE_STAFF_POSITION": {
            let positions = action.positions;
            let position = positions.find(p=>p.posId===Number(action.positionId));
            console.log("Found position to replace = ", position);
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, position: position } : s)}
        }
        case "ENABLE_STAFF": {
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, user: {...s.user, active: true} } : s)}
        }
        case "DISABLE_STAFF": {
            return {...state, content: state.content.map(s => s.staffId === action.staffId ? { ...s, user: {...s.user, active: false} } : s)}
        }
        case "SET_STAFF_FILTER": {
            return {...state, filter: action.payload};
        }
        default:
            return state;
    }
}