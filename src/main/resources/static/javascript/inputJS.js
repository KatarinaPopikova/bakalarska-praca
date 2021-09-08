$(window).on("load", function () {
    $("#enter-side input[type='text']").css("width", "2ch");
    $("#enter-matrixB").hide();
    $("#solution-side-div").hide();
    $("#single-solve-button").hide();
    $("#solve-inverse-button").hide();
    $("#enter-check-solution").hide();
    $("#check-solution-header").hide();
    $("#solution-side").css("height", $("#enter-side").css("height"));

});


let inputOldValue;

function setInputOldValue(input) {
    inputOldValue = input.value;
}

function changeConstant(constant) {
    if (!constant.checkValidity())
        constant.value = inputOldValue;
    resizeInput(constant);
}


function resizeInput(input) {
    let index = $(input).parent().index();
    let tbodyChildren = $(input).parents("tbody").children();
    let width = getMaxWidth(index, tbodyChildren);
    $.each(tbodyChildren, function () {
        $($(this).children()[index]).find("input").css("width", (width + 1) + "ch");
    })
}

function getMaxWidth(index, tbodyChildren) {
    let width = 0;
    $.each(tbodyChildren, function () {
        let newWidth = $($(this).children()[index]).find("input").val().length;
        if (newWidth > width)
            width = newWidth;
    })
    return width;
}

function showMatrixB(checkBox) {
    let matrixB = $("#enter-matrixB");
    if ($(checkBox).is(":checked"))
        matrixB.show()
    else
        matrixB.hide();

}

function changeDiagonal(diagonalDiv) {
    if (!$(diagonalDiv).hasClass("diagonal-chosen")) {
        if (diagonalDiv.id === "diagonal-up") {
            $(".part-of-up").show();
            $(".part-of-down").hide();
            $("#diagonal-down").removeClass("diagonal-chosen");
            $(diagonalDiv).addClass("diagonal-chosen");
        } else {
            $(".part-of-up").hide();
            $(".part-of-down").show();
            $("#diagonal-up").removeClass("diagonal-chosen");
            $(diagonalDiv).addClass("diagonal-chosen");
        }
    }
}

function setDefaultDiagonalOne() {

    $("#diagonal-up").removeClass("diagonal-chosen");
    $("#diagonal-down").addClass("diagonal-chosen");
}

function addColRow() {
    let countSpan = $("#row-col-count");
    let countNumber = Number(countSpan.text());
    if (countNumber < 5) {
        addInputInMatrices(countNumber);
        countSpan.text(countNumber + 1);
    }

}

function addInputInMatrices(countNumber) {
    let tbody = $(".fullAdd tbody");
    tbody.children().each(function () {
        addInput(this);
    });
    tbody.append(createRow(countNumber));
    addInputInMatrixB();
    let height = $("#lottie-dots")
    $("#solution-side").css("height", $("#enter-side").css("height"));
    height.css("height", (parseInt(height.css("height")) + 20) + "px");
}

function addInputInMatrixB() {
    let tbody = $("#matrixB-div tbody");
    tbody.append(createRow(0));
}

function createRow(countRow) {
    let tr = document.createElement("tr")
    for (let i = 0; i <= countRow; i++) {
        addInput(tr);
    }
    return tr;
}

function addInput(row) {
    let td = document.createElement("td");
    td.append(createInput());
    row.append(td);
}

function createInput() {
    let input = document.createElement("input");
    $(input).attr({
        type: "text",
        placeholder: "0",
        "onkeydown": "setInputOldValue(this)",
        "oninput": "changeConstant(this)",
        "pattern": "^-$|^$|^-?([1-9]([0-9]+)?(\\/([1-9][0-9]*)?)?|([0]|[1-9]([0-9]+)?)(\\.[0-9]*?)?)$",
    });
    $(input).css("width", "2ch");
    return input;
}

function removeColRow() {
    let countSpan = $("#row-col-count");
    let countNumber = Number(countSpan.text());
    if (countNumber > 2) {
        removeInputFromMatrices(countNumber);
        countSpan.text(countNumber - 1);
    }
}

function removeInputFromMatrices() {
    let tbody = $(".fullAdd tbody");
    tbody.each(function () {
        $(this).children().last().remove();
    });
    tbody.children().each(function () {
        $(this).children().last().remove();
    });
    removeInputInMatrixB();
    let height = $("#lottie-dots");
    $("#solution-side").css("height", $("#enter-side").css("height"));
    height.css("height", (parseInt(height.css("height")) - 20) + "px");

}

function removeInputInMatrixB() {
    let tbody = $("#matrixB-div tbody");
    $(tbody).children().last().remove();
}

function changeView(button) {
    if (~$(button).text().indexOf("Over")) {
        $(".part-of-solution").hide();
        $("#waiting-solution").show();
        eraseOldSolution();
        hideAllDescriptions();
        $(button).text("Zadať príklad");
        $(".part-of-math-problem").hide();
        $(".part-of-check-solution").show();
        $("#enter-header").css("justify-content", "space-between");
        $("#enter-side").css("width", "57%");
        $("#solution-side").css("width", "33%");
    } else {
        $(button).text("Overiť výsledok");
        $(".part-of-solution").hide();
        $("#waiting-solution").show();
        eraseOldSolution();
        $(".part-of-math-problem").show();
        $(".part-of-check-solution").hide();
        $("#enter-header").css("justify-content", "flex-end");
        $("#enter-side").css("width", "33%");
        $("#solution-side").css("width", "57%");
    }
}

function hideAllDescriptions() {

    $(".part-of-solution").each(function () {
        $(this).find(".description-down").show();
        $(this).find(".description-up").hide();
        $(this).find(".description").css({
            "max-height": "0",
            "transition": 'max-height 0.2s ease-out',
        });
    })

}


function showDescription(descriptionParent) {
    let downArrow = $(descriptionParent).find(".description-down");
    if (downArrow.is(":hidden")) {
        downArrow.show();
        $(descriptionParent).find(".description-up").hide();
        $(descriptionParent).find(".description").css({
            "max-height": "0",
            "transition": 'max-height 0.2s ease-out',
        });
    } else {
        downArrow.hide();
        $(descriptionParent).find(".description-up").show();
        $(descriptionParent).find(".description").css({
            "max-height": '10000px',
            "transition": 'max-height 0.8s ease-in',
        })
    }
}

function showDetailDescription(descriptionParent) {
    let downArrow = $(descriptionParent).find(".more-button-down");
    if (downArrow.is(":hidden")) {
        downArrow.show();
        $(descriptionParent).find(".more-button-up").hide();
        $(descriptionParent).find(".detail-description").css({
            "max-height": "1px",
            "transition": 'max-height 0.1s ease-out',
        });
    } else {
        downArrow.hide();
        $(descriptionParent).find(".more-button-up").show();
        $(descriptionParent).find(".detail-description").css({
            "max-height": '1000px',
            "transition": 'max-height 0.8s ease-in',
        })
    }
}

function eraseOldSolution() {
    $(".solution").empty();
    $("#error-message").html("");
}

function solveCharPolynomial() {

    hideAllDescriptions();
    eraseOldSolution();
    setDefaultDiagonalOne();
    let matrixA = getMatrixA();

    solveWithCharPolynomial(matrixA);

}

function solveMinPolynomial() {
    hideAllDescriptions();
    eraseOldSolution();
    setDefaultDiagonalOne();
    let matrixA = getMatrixA();
    let matrixB = ($("#matrixB-check").is(":checked")) ? getVectorB() : null;

    solveWithMinPolynomial(matrixA, matrixB);

}

function calculateInverse() {
    let matrixP = getMatrixP();

    calculateInvPost(matrixP);
}

function solveCheckSolution() {
    let matrixP = getMatrixP();
    let matrixJ = getMatrixJ();
    let matrixP1 = getMatrixP1();


    checkSolutionPost(matrixP, matrixJ, matrixP1);
}

function getMatrixA() {
    return getMatrix($("#matrixA-div tr"));
}

function getVectorB() {
    return getMatrix($("#matrixB-div tr"));
}

function getMatrixP() {
    return getMatrix($("#matrixP-div tr"));
}

function getMatrixJ() {
    return getMatrix($("#matrixJ-div tr"));
}

function getMatrixP1() {
    return getMatrix($("#matrixP1-div tr"));
}

function getMatrix(matrixRows) {
    let matrix = [];
    matrixRows.each(function () {
        let row = [];
        $(this).find("input").each(function () {
            let inputValue = (this.value).trim();
            if (inputValue) {
                if (inputValue.charAt(inputValue.length - 1) === "/")
                    row.push(Fraction(inputValue.slice(0, -1)).valueOf());
                else
                    row.push(Fraction(inputValue).valueOf());
            } else
                row.push(0);
        })
        matrix.push(row);
    })
    return matrix;
}

function setMatrixP1(matrixP) {
    $("#matrixP1-div tr").each(function (i) {
        $(this).find("input").each(function (j) {
            $(this).val(matrixP[i][j]);
            $(this).css("width", (matrixP[i][j].length + 1) + "ch");
        })
    })
}

function createOnHover(element) {
    $("#" + element).on({
        mouseenter: function () {
            $("#" + element + "-text").show();
        },
        mouseleave: function () {
            $("#" + element + "-text").hide();
        }
    })
}