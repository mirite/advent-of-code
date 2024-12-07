"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var rowPattern = /^(\d+): ([\d ]+)$/gm;
function parse(raw) {
    var output = [];
    var lines = raw.matchAll(rowPattern);
    if (!lines)
        throw new Error("Input invalid");
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        output.push([
            Number.parseInt(line[1]),
            line[2].split(" ").map(function (i) { return Number.parseInt(i); }),
        ]);
    }
    return output;
}
function add(a, b) {
    return a + b;
}
function multiply(a, b) {
    return a * b;
}
function isRowSolvable(equation) {
    var operations = [];
    for (var i = 0; i < equation[1].length - 1; i++) {
        for (var _i = 0, _a = [add, multiply]; _i < _a.length; _i++) {
            var operation = _a[_i];
            operations.push(operation);
        }
    }
    for (var _b = 0, operations_1 = operations; _b < operations_1.length; _b++) {
        var option = operations_1[_b];
        console.log(option);
    }
    return true;
}
(function () {
    var dataString = node_fs_1.default.readFileSync("sample-data.txt").toString();
    var equations = parse(dataString);
    var solvable = equations.filter(isRowSolvable);
    console.log(equations);
})();
