function solveWithMinPolynomial(matrixA, matrixb) {
    let inputMatrices = {"matrixA": matrixA, "matrixb": matrixb};
    $.ajax({
        async: false,
        type: "POST",
        url: "/postMinPol",
        contentType: "application/json",
        data: JSON.stringify(inputMatrices),
        success: function (response) {
            sendMinPolynomial();
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}

function sendMinPolynomial() {
    $.ajax({
        async: false,
        type: "GET",
        url: "/minPolynomial",
        dataType: "json",
        success: function (data) {
            htmlWithMinPolynomial(data);
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}


function solveWithCharPolynomial(matrixA) {
    let inputMatrices = {"matrixA": matrixA};
    $.ajax({
        async: false,
        type: "POST",
        url: "/postCharPol",
        contentType: "application/json",
        data: JSON.stringify(inputMatrices),
        success: function (response) {
            charPolynomial();
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}


function charPolynomial() {
    $.ajax({
        async: false,
        type: "GET",
        url: "/charPolynomial",
        dataType: "json",
        success: function (data) {
            htmlWithCharPolynomial(data);
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}


function checkSolutionPost(matrixP, matrixJ, matrixPInv) {
    let inputMatrices = {"matrixP": matrixP, "matrixJ": matrixJ, "matrixPInv": matrixPInv};
    $.ajax({
        async: false,
        type: "POST",
        url: "/postCheckSolution",
        contentType: "application/json",
        data: JSON.stringify(inputMatrices),
        success: function (response) {
            checkSolution();
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}


function checkSolution() {
    $.ajax({
        async: false,
        type: "GET",
        url: "/checkSolution",
        dataType: "json",
        success: function (data) {
            if (data.length === 1) //here is an error saved
                setErrorType(data[0][0]);
            else
                appendSolutionA(data);
            },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}

function calculateInvPost(matrixP) {
    let inputMatrices = {"matrixP": matrixP};
    $.ajax({
        async: false,
        type: "POST",
        url: "/postCalculateInv",
        contentType: "application/json",
        data: JSON.stringify(inputMatrices),
        success: function (response) {
            calculateInv();
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}


function calculateInv() {
    $.ajax({
        async: false,
        type: "GET",
        url: "/calculateInv",
        dataType: "json",
        success: function (data) {
            if (data.length === 1) //here is an error saved
                setErrorType(data[0][0]);
            else
                setMatrixP1(data);
        },
        error: function (e) {
            alert("Error: " + e);
        },
    });
}

