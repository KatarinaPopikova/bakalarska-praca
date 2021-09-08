package bp.application.jordanFormCalculator;

import java.util.ArrayList;
import java.util.List;

import static java.lang.Math.abs;

public class MatrixResult extends Matrix {

    public double[][] matrixResult(double[][] matrix, List<Integer> pivot) {

        gaussJordanElimination(matrix, null, pivot);

        return kernel(matrix, pivot);
    }

    public double[] matrixReslutInhomogeneousEasy(double[][] matrix, double[][] resultVector, List<double[][]> saveResult) {

        List<Integer> pivot = new ArrayList<>();
        double[][] cResultVector = doGaussJordanE(matrix, resultVector, pivot);
        saveResult.add(cResultVector);
        return makeFromResultVectorSolution(cResultVector, pivot);
    }

    public double[] makeFromResultVectorSolution(double[][] cResultVector, List<Integer> pivot) {
        double[] vector = new double[cResultVector.length];

        for (int i = 0; i < pivot.size(); i++)
            vector[pivot.get(i)] = cResultVector[i][0];

        return vector;
    }

    public double[][] matrixResultInhomogeneousHard(double[][] matrix, double[][] resultVector, List<Integer> pivot) {

        return doGaussJordanE(matrix, resultVector, pivot);
    }

    public double[][] doGaussJordanE(double[][] matrix, double[][] resultVector, List<Integer> pivot) {

        double[][] cMatrix = copyMatrix(matrix);
        double[][] cResultVector = copyMatrix(resultVector);

        gaussJordanElimination(cMatrix, cResultVector, pivot);

        return cResultVector;

    }

    public double[][] kernel(double[][] matrix, List<Integer> pivot) {
        double[][] kernel = new double[matrix[0].length][matrix[0].length - pivot.size()];
        List<Integer> parameter = setParameterAndOneToTheirPlace(kernel, pivot);

        for (int i = 0; i < pivot.size(); i++) {
            for (int j = 0; j < parameter.size(); j++) {
                kernel[pivot.get(i)][j] = roundIfNecessary(-matrix[i][parameter.get(j)]);
            }
        }

        return kernel;
    }

    public List<Integer> setParameterAndOneToTheirPlace(double[][] kernel, List<Integer> pivot) {
        List<Integer> parameter = new ArrayList<>();

        for (int col = 0, noPivot = 0; col < kernel.length; col++) {
            if (!pivot.contains(col)) {
                parameter.add(col);
                kernel[col][noPivot++] = 1.0;
            }
        }

        return parameter;
    }

    public void gaussJordanElimination(double[][] matrix, double[][] resultOfMatrix, List<Integer> pivots) {
        int pivot;
        int row = 0;
        for (int column = 0; column < matrix[0].length; column++) {
            if (row >= matrix.length)
                return;

            pivot = findPivot(row, column, matrix);  //at the beginning set row as pivot

            if (matrix[pivot][column] != 0) { // Matrix is singular, this column has not pivot
                pivots.add(column);

                swapPivotToRightRowInMatrixAndResult(row, pivot, matrix, resultOfMatrix);
                dividePivotToValueOne(row, column, matrix, resultOfMatrix);
                otherRowsInColumnSetToZero(row, column, matrix, resultOfMatrix);
                row++;
            }
        }
    }

    public int findPivot(int pivot, int column, double[][] matrix) {
        for (int row = pivot; row < matrix.length; row++) {
            if (abs(matrix[row][column]) == 1.0) {
                pivot = row;
                break;
            }

            if (abs(matrix[row][column]) > abs(matrix[pivot][column]))
                pivot = row;
        }

        return pivot;
    }

    public void swapPivotToRightRowInMatrixAndResult(int row, int pivot, double[][] matrix, double[][] resultOfMatrix) {
        if (pivot != row) {
            swapMaxValueOfColumnAsPivotToRightRow(row, pivot, matrix);

            if (resultOfMatrix != null)
                swapMaxValueOfColumnAsPivotToRightRow(row, pivot, resultOfMatrix);
        }
    }

    public void swapMaxValueOfColumnAsPivotToRightRow(int row, int pivot, double[][] matrix) {
        double[] temp = matrix[pivot];
        matrix[pivot] = matrix[row];
        matrix[row] = temp;
    }

    public void dividePivotToValueOne(int row, int column, double[][] matrix, double[][] resultOfMatrix) {
        if (matrix[row][column] != 1.0) {
            double divisor = matrix[row][column];

            divideRow(row, column, divisor, matrix);         //divide matrix
            if (resultOfMatrix != null)
                divideRow(row, 0, divisor, resultOfMatrix); //divide resultOfMatrix

        }
    }

    public void divideRow(int row, int column, double divisor, double[][] matrix) {
        for (int i = column; i < matrix[row].length; i++) {
            matrix[row][i] = matrix[row][i] / divisor;
            matrix[row][i] = roundIfNecessary(matrix[row][i]);
        }
    }

    public void otherRowsInColumnSetToZero(int row, int column, double[][] matrix, double[][] resultOfMatrix) {
        for (int i = 0; i < matrix.length; i++) {

            if (i != row) {
                double multiple = matrix[i][column] / matrix[row][column];

                for (int j = column; j < matrix[row].length; j++)
                    matrix[i][j] = roundIfNecessary((matrix[i][j] - multiple * matrix[row][j])); //0.00000000003->0.0

                if (resultOfMatrix != null)
                    for (int j = 0; j < resultOfMatrix[row].length; j++)
                        resultOfMatrix[i][j] = roundIfNecessary((resultOfMatrix[i][j] - multiple * resultOfMatrix[row][j])); //0.00000000003->0.0

            }
        }
    }

}
