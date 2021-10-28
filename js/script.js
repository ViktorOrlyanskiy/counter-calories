'use strict'

document.addEventListener('DOMContentLoaded', function () {

    /* 1 этап: сбор данных с документа */
    // инпуты
    const inputAge = document.querySelector('#age');
    const inputHeight = document.querySelector('#height');
    const inputWeight = document.querySelector('#weight');
    // кнопки
    const btnCalculate = document.querySelector('.form__submit-button');
    const btnReset = document.querySelector('.form__reset-button');
    // блок вывода результата
    const resultBlock = document.querySelector('.counter__result');
    const caloriesNorm = document.querySelector('#calories-norm');
    const caloriesMinimal = document.querySelector('#calories-minimal');
    const caloriesMaximal = document.querySelector('#calories-maximal');
    // форма
    let form = document.querySelector('form');
    // объект для параметров пользователя
    let userParameters = {};

    /* ------------------------------------------------------------------------ */

    //при каждом клики проверяет заполнение инпутов
    document.body.addEventListener('click', () => {
        let inputs = document.querySelectorAll('.input__wrapper')
        let flag = true;
        inputs.forEach(elem => {
            if (elem.children[0].value == '0' || elem.children[0].value == '') {
                flag = false;
            }
            if (elem.children[0].value != '0' || elem.children[0].value != '') {
                btnReset.removeAttribute('disabled');
            }
        })
        console.log(flag)
        if (flag === true) {
            btnCalculate.removeAttribute('disabled');
        } else if (flag === false) {
            btnCalculate.setAttribute('disabled', 'disabled');
        }
    })

    // расчитывает калорийность при нажатии кнопки 'Расчитать'
    btnCalculate.onclick = (event) => {
        event.preventDefault()
        removeClassCSS(resultBlock, 'counter__result--hidden');
        let formData = new FormData(form);
        userParameters = rewriteUserParameters(Array.from(formData));

        calculationCalorie(userParameters)
    }

    // скрывает блок с результатом
    btnReset.onclick = () => {
        addClassCSS(resultBlock, 'counter__result--hidden')
    }

    /* ------------------------------------------------------------------------ */
    // функция: удаляет передаваемый класс у элемента
    function removeClassCSS(elem, classCSS) {
        elem.classList.remove(`${classCSS}`)
    }
    // функция: добавляет передаваемый класс элементу
    function addClassCSS(elem, classCSS) {
        elem.classList.add(`${classCSS}`)
    }
    // функция: принимает объект с параметрами и считает калорийность
    function calculationCalorie(userObject) {

        let gender = getGenderCoefficient(userObject);
        let activity = getActivityCoefficient(userObject);
        let norm = Math.round(activity *
            ((10 * userObject.weight) + (6.25 * userObject.height) + (5 * userObject.age) + gender));
        let min = Math.round(norm * 0.85);
        let max = Math.round(norm * 1.15);

        caloriesNorm.textContent = spaceNumber(norm);
        caloriesMinimal.textContent = spaceNumber(min);
        caloriesMaximal.textContent = spaceNumber(max);

    }
    // функция: возвращает коэфф. пола
    function getGenderCoefficient(userObject) {
        if (userObject.gender == 'male') {
            return 5;
        } else if (userObject.gender == 'female') {
            return (-161)
        }
    }
    // функция: возвращает коэфф. активности
    function getActivityCoefficient(userObject) {
        if (userObject.activity == 'min') {
            return 1.2;
        } else if (userObject.activity == 'low') {
            return 1.375;
        } else if (userObject.activity == 'medium') {
            return 1.55;
        } else if (userObject.activity == 'high') {
            return 1.725;
        } else if (userObject.activity == 'max') {
            return 1.9;
        }
    }
    // функция: принимает число и добавляет в него пробелы (только для целых чисел)
    function spaceNumber(num) {
        let arr = String(num).split('');
        let arrNew = [];
        for (let i = arr.length - 1, k = 1; i >= 0; i--, k++) {
            if (k % 3 == 0) {
                arrNew.unshift(arr[i]);
                arrNew.unshift(' ');
            } else {
                arrNew.unshift(arr[i]);
            }
        }
        return (arrNew.join(''))
    }
    // функция: переписывает параметры из 2х массива в объект
    function rewriteUserParameters(arr) {
        let obj = {};
        for (let elem of arr) {
            for (let i = 0; i < elem.length; i++) {
                obj[elem[0]] = elem[1];
            }
        }
        return obj;
    }

});