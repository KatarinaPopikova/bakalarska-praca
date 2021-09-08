package bp.application.jordanFormCalculator;

public class CharacteristicPolynomial {
    private double[][][] determinant;

    public CharacteristicPolynomial(double[][] A) {
        setDeterminant(new double[A.length][A[0].length][A.length + 1]);
        createDeterminantWithLambda(A);
    }


    public void createDeterminantWithLambda(double[][] A) {
        for (int i = 0; i < A.length; i++) {

            for (int j = 0; j < A[i].length; j++) {
                getDeterminant()[i][j][0] = A[i][j];
                if (i == j)
                    getDeterminant()[i][j][1] = -1.0;
            }
        }
    }

    public double[] calculateDeterminant() {
        return det(getDeterminant());
    }

    public double[] det(double[][][] determinant) {
        double[] result = new double[determinant[0][0].length];

        if (determinant.length < 3)
            return checkDetLength(determinant, result);

        for (int i = 0; i < determinant[0].length; i++) {
            double[][][] temporary = new double[determinant.length - 1][determinant[0].length - 1][result.length];

            for (int j = 1; j < determinant.length; j++) {

                for (int k = 0; k < determinant[0].length; k++) {
                    if (k < i)
                        System.arraycopy(determinant[j][k], 0, temporary[j - 1][k], 0, determinant[0][0].length);
                    else if (k > i)
                        System.arraycopy(determinant[j][k], 0, temporary[j - 1][k - 1], 0, determinant[0][0].length);
                }
            }
            double[] temporaryResult = det(temporary);

            for (int j = 0; j < determinant[0][0].length; j++) {

                for (int k = 0; (j + k) < determinant[0][0].length; k++)
                    result[j + k] += determinant[0][i][j] * Math.pow(-1, i) * temporaryResult[k];
            }
        }

        return result;
    }

    public double[] checkDetLength(double[][][] determinant, double[] result) {
        if (determinant.length == 1)
            System.arraycopy(determinant[0][0], 0, result, 0, determinant[0][0].length);

        else {
            for (int i = 0; i < determinant[0][0].length; i++) {

                for (int j = 0; (i + j) < determinant[0][0].length; j++)
                    result[i + j] += ((determinant[0][0][i] * determinant[1][1][j]) - (determinant[0][1][i] * determinant[1][0][j]));
            }
        }

        return (result);
    }

    public double[][][] getDeterminant() {
        return determinant;
    }

    public void setDeterminant(double[][][] determinant) {
        this.determinant = determinant;
    }


}
