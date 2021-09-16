
var forEach = function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

async function fetchJSON(path) {

    const response = await fetch(path);
    return response.json();
}
