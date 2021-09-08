//**********  EIGENVALUE PART MINIMAL POLYNOMIAL  ************************
function htmlWithMinPolynomial(data) {

    matricesForMinPol(data.evalCalculation.multiplicationMatrices);
    showMatrixForPolynomial(data.evalCalculation.matrixForPolynomial);
    if (data.evalCalculation.matrixForPolynomialGEM.length > 0) {
        showMatrixForPolynomialGEM(data.evalCalculation.matrixForPolynomialGEM);

        showResultMatrixForPolynomial(data.evalCalculation.kernelPol, isBChecked());
        let minPolynomial = (!isBChecked()) ? "m<sub>A</sub>(λ) = " : "m<sub>A,b</sub>(λ) = ";
        appendToHtml(data, minPolynomial);
        minimalPolynomial(data.evalCalculation.kernelPol, data.evalCalculation.trace);
    } else
        appendToHtml(data, null);

}

//**********  EIGENVALUE PART CHARACTERISTIC POLYNOMIAL  ************************
function htmlWithCharPolynomial(data) {

    showDeterminant(data.evalCalculation.determinant);
    appendToHtml(data, "p<sub>A</sub>(λ) = ");
    makeDescription(data);

}

//********** ALL TO HTML ************************
function appendToHtml(data, typeOfPolynomial) {
    startShow();
    if (typeOfPolynomial)
        showPolynomial(data.evalCalculation, typeOfPolynomial, data.error);
    if (data.error !== 0)
        setErrorType((data.error.toString() === "1" || data.error.toString() === "2") ? "5" : data.error.toString());
    if (data.error !== 3) {
        eigenvalue(data.evalCalculation);
    }
    if (data.error === 0) {
        $("#waiting-solution").hide();
        $(".part-of-solution").show();
        $(".article-vector").hide();
        jordan(data);
        eigenvectorsPart(data.evecCalc, data.evalCalculation.eigenValFromMap);
        solutionPJP1(data.jordanForm);

    }

    blockDiagonalDescription(data.evecCalc.blocksOfVectors);

    $(".part-of-up").hide();
    $(".part-of-down").show();
}

function startShow() {
    $("#waiting-solution").show();
    $(".part-of-solution").hide();
    $(".article-vector").hide();
    linearOperator();
    eigenvalueDescription();
}

//**********  SOLUTION JORDAN FORM PJP1 (IP/DOWN)  ************************
function solutionPJP1(jordanForm) {

    solutionDownPJP1(jordanForm);
    solutionUpPJP1(jordanForm);
}

//**********  ERROR  ************************
function setErrorType(error) {
    if (error === "1")
        setError("Hodnosť transformačnej matice (P) ≠ počtu riadkov (n)");
    else if (error === "2")
        setError("Inverzná matica je nesprávna");
    else if (error === "3")
        setError("Pomocou tohto postupu aplikácia nevypočíta všetky vlastné čísla");
    else if (error === "4")
        setError("Aplikáciu nie je možné použiť na určenie matíc P, J, P<sup>-1</sup>, pokiaľ nie sú všetky vlastné čísla reálne");
    else if (error === "5")
        setError("Aplikácia zlyhala pri výpočte");

}

function setError(error) {
    $("#error-message").html(error);

}

function parameterArray() {
    return [["a"], ["b"], ["c"], ["d"], ["e"], ["f"], ["g"], ["h"]];
}

function matrixLength() {
    return $('#row-col-count').get(0).innerText;
}

function inputMatrix(inputMatrix) {
    let div = makeMatrixDiv(inputMatrix, "", "inputMatrix", whereAppend);
}


function makeMatrixDiv(matrix, addClass, addId, whereAppend) {
    let div = createAppend("div", whereAppend);
    $(div).addClass("matrix-style " + addClass);
    if (typeof matrix[0] !== 'string')
        matrixToHTML(addId, matrix, div);
    else
        vectorToHTML(addId, matrix, div);
    return div;

}

//----------------create Table in DIV------------------------
function matrixToHTML(matrixId, matrix, div) {
    let table = createAddId("table", div, matrixId);
    createAddId("thead", table, "thead-" + matrixId);
    let tbody = createAddClass("tbody", table, "matrix-body");
    for (let r = 0; r < matrix.length; r++) {
        let tr = createAppend("tr", tbody);
        for (let d = 0; d < matrix[r].length; d++) {
            let td = createAppend("td", tr);
            $(td).html(matrix[r][d]);
        }
    }
}

function vectorToHTML(vectorId, matrix, div) {
    let table = createAddId("table", div, vectorId);
    createAddId("thead", table, "thead-" + vectorId);
    let tbody = createAddClass("tbody", table, "matrix-body");
    for (let r = 0; r < matrix.length; r++) {
        let tr = createAppend("tr", tbody);
        $(createAppend("td", tr)).html(matrix[r]);

    }
}

function isBChecked() {
    return $("#matrixB-check").is(":checked");
}

function createAddClassId(cElement, aElement, eId, eClass) {
    return $(createAddId(cElement, aElement, eId)).addClass(eClass);
}

function createAddClass(cElement, aElement, eClass) {
    return $(createAppend(cElement, aElement)).addClass(eClass);
}

function createAddId(cElement, aElement, eId) {
    return $(createAppend(cElement, aElement)).attr("id", eId);
}


function createAppend(cElement, aElement) {
    let element = createElement(cElement);
    $(aElement).append(element);
    return element;
}

function createElement(element) {
    return document.createElement(element);
}



