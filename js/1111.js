let arr1 = [
    [
        "gender",
        "male"
    ],
    [
        "age",
        "2"
    ],
    [
        "height",
        "2"
    ],
    [
        "weight",
        "2"
    ],
    [
        "activity",
        "min"
    ]
];

let userParameters = {

}

// функция: переписывает параметры из 2х массива в обьект
function rewriteUserParameters(arr) {
    let obj = {};
    for (let elem of arr) {
        for (let i = 0; i < elem.length; i++) {
            obj[elem[0]] = elem[1];
        }
    }
    return obj;
}

// userParameters = rewriteUserParameters(arr1);
// console.log(userParameters)

// function getUserParameters() {
//     let obj = {};
//     let formData = new FormData(form);
//     let arrFormData = Array.from(formData);
//     for (let elem of arrFormData) {
//         for (let i = 0; i < elem.length; i++) {
//             obj[elem[0]] = elem[1];
//         }
//     }
//     return obj;
// }