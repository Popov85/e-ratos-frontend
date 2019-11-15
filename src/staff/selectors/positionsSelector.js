export const getPositions = (users) => {
    let result = users.reduce((map, user)=> {
        let key = user.position.name;
        map[key] = key;
        return map;
    }, {});
    //console.log("result = ", result);
    return result;
}