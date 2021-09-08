package bp.application.jordanFormCalculator;

import static java.lang.Math.abs;
import static java.lang.Math.round;

public abstract class Matrix {


    protected double[][] copyMatrix(double[][] matrix) {
        double[][] cMatrix = new double[matrix.length][matrix[0].length];

        for (int i = 0; i < matrix.length; i++)
            System.arraycopy(matrix[i], 0, cMatrix[i], 0, matrix[0].length);

        return cMatrix;
    }

    public double[][] multiplyMatrix(double[][] matrix1, double[][] matrix2) {
        double[][] resultMatrix = new double[matrix1.length][matrix2[0].length];
        for (int i = 0; i < matrix1.length; i++)
            for (int j = 0; j < matrix2[i].length; j++)
                for (int k = 0; k < matrix2.length; k++)
                    resultMatrix[i][j] = roundIfNecessary(resultMatrix[i][j] + matrix1[i][k] * matrix2[k][j]);

        return resultMatrix;
    }

    public void roundIfNecessaryPolynomial(double[] polynomial) {
        for (int i = 0; i < polynomial.length; i++) {
            double a = roundIfNecessary(polynomial[i]);
            polynomial[i] = a;
        }
    }

    public double roundIfNecessary(double value) {
        if (almostInt(value) || almostZero(value))
            return (double) round(value * 100) / 100;
        else
            return value;
    }

    public boolean almostZero(double value) {
        return (abs(value - round(value)) < 0.0000003);
    }

    public boolean almostInt(double value) {
        return (abs(value * 100 - round(value * 100)) < 0.0000003);
    }


}
