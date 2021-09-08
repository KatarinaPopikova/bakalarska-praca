package bp.application.jordanFormCalculator;

import java.util.ArrayList;
import java.util.List;

public class MinimalPolynomial extends MatrixResult {
    private double[][] matrixForPolynomial;
    private double[][][] multiplicationMatrices;
    private double[][] matrixForPolynomialGEM;
    private Integer[] pivot;
    private double[][] kernel;

    public MinimalPolynomial(double[][] matrixA, double[][] matrixb) {

        setMultiplicationMatrices(new double[matrixA.length + 1][][]);
        collectMultiplicationMatrices(matrixA, matrixb);

    }

    public void collectMultiplicationMatrices(double[][] matrix1, double[][] matrix2) {
        if (matrix2 == null)
            matrix2 = makeIdentityMatrix(matrix1.length);

        setMatrixForPolynomial(new double[matrix1.length * matrix2[0].length][matrix1.length + 1]);
        for (int i = 0; i <= matrix1.length; i++) {

            if (i != 0)
                matrix2 = multiplyMatrix(matrix1, matrix2);

            saveMatrix2(matrix2, i);
            for (int r = 0; r < matrix1.length; r++) {
                for (int c = 0; c < matrix2[0].length; c++) {
                    getMatrixForPolynomial()[c * (matrix2[0].length - 1) + r + c][i] = matrix2[r][c];
                }
            }

        }
    }

    private void saveMatrix2(double[][] matrix2, int i) {
        getMultiplicationMatrices()[i] = matrix2;

    }

    public double[][] makeIdentityMatrix(int length) { //I^{nxn}
        double[][] identityMatrix = new double[length][length];
        for (int i = 0; i < length; i++)
            identityMatrix[i][i] = 1.0;

        return identityMatrix;
    }

    public double[] createPolynomial() {
        setMatrixForPolynomialGEM(copyMatrix(getMatrixForPolynomial()));
        List<Integer> pivot = new ArrayList<>();
        setKernel(matrixResult(getMatrixForPolynomialGEM(), pivot));
        setPivot(pivot.toArray(new Integer[0]));


        return createPolynomialFromMatrixResult(getKernel());
    }

    public double[] createPolynomialFromMatrixResult(double[][] kernel) {
        double[] polynomial = new double[kernel.length];

        for (int i = 0; i < kernel.length; i++)
            polynomial[i] = kernel[i][0];

        return polynomial;
    }

    public double[][] getMatrixForPolynomial() {
        return matrixForPolynomial;
    }

    public void setMatrixForPolynomial(double[][] matrixForPolynomial) {
        this.matrixForPolynomial = matrixForPolynomial;
    }

    public double[][][] getMultiplicationMatrices() {
        return multiplicationMatrices;
    }

    public void setMultiplicationMatrices(double[][][] multiplicationMatrices) {
        this.multiplicationMatrices = multiplicationMatrices;
    }

    public double[][] getMatrixForPolynomialGEM() {
        return matrixForPolynomialGEM;
    }

    public void setMatrixForPolynomialGEM(double[][] matrixForPolynomialGEM) {
        this.matrixForPolynomialGEM = matrixForPolynomialGEM;
    }

    public Integer[] getPivot() {
        return pivot;
    }

    public void setPivot(Integer[] pivot) {
        this.pivot = pivot;
    }

    public double[][] getKernel() {
        return kernel;
    }

    public void setKernel(double[][] kernel) {
        this.kernel = kernel;
    }
}
