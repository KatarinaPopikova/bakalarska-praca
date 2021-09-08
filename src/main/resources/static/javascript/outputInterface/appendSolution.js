function solutionDownPJP1(pjp1) {
    $("#matrix-solution").css("flex-direction","row");
    appendSolution(pjp1.matrixP, "part-of-down", "P-d");
    appendSolution(pjp1.matrixJ, "part-of-down", "J-d");
    appendSolution(pjp1.matrixPInv, "part-of-down", "P1-d");
}

function solutionUpPJP1(pjp1) {
    $("#matrix-solution").css("flex-direction","row");
    appendSolution(pjp1.matrixPUp, "part-of-up", "P-u");
    appendSolution(pjp1.matrixJUp, "part-of-up", "J-u");
    appendSolution(pjp1.matrixPInvUp, "part-of-up", "P1-u");
}

function appendSolution(matrix, addClass, matrixId) {
    makeMatrixDiv(matrix, addClass, "resultMatrix" + matrixId, "#matrix-solution");
    $("#waiting-solution").hide();
    $("#solution-side-div").show();
}

function appendSolutionA(matrix){
    $(createAppend("p", "#matrix-solution")).html("A");
    appendSolution(matrix, "result_A", "A");
    $("#matrix-solution").css({
        "align-items":"center",
        "flex-direction":"column"
    });
}

