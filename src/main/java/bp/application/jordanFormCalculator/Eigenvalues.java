package bp.application.jordanFormCalculator;

import bp.application.helpers.Fraction;
import static java.lang.Math.abs;

import java.util.*;

import static java.lang.Math.round;

public class Eigenvalues {
    private List<Double> eigenvalues;
    private Double missedEigenvalue;
    private double[][] imaginaryRoots;
    private HashMap<Double, Integer> eigenvaluesMap;
    private int nullRowEigenvalue;
    private double[] polynomial;
    private double[] eigenvaluesFromPolynomial;

    public Eigenvalues(double[] polynomial, double trace, double[][] matrixA) {
        setEigenvalues(new ArrayList<>());
        setEigenvaluesMap(new HashMap<>());
        findEigenvalues(createCoefficients(polynomial), trace, matrixA);
    }

    //convert array to list
    public List<Double> createCoefficients(double[] polynomial) {
        List<Double> coefficients = new ArrayList<>();

        for (double v : polynomial)
            coefficients.add(0, v);

        while (coefficients.get(0) == 0)
            coefficients.remove(0);

        resultPolynomial(coefficients);
        return coefficients;
    }

    private void resultPolynomial(List<Double> coefficients) {
        setPolynomial(new double[coefficients.size()]);
        for (int i = 0; i < coefficients.size(); i++)
            getPolynomial()[i] = coefficients.get(i);
    }

    public void findEigenvalues(List<Double> coefficients, double trace, double[][] matrixA) {

        findRoots(coefficients);

        checkResultAndAddEvOnlyFromPolynomial(matrixA, trace);
        eigenvalueToMapAndChangeNegativeZero();
    }

    private void checkResultAndAddEvOnlyFromPolynomial(double[][] matrixA, double trace) {
        copyEvToFromPolynomial();
        checkTrace(matrixA.length, trace);
        if (getEigenvalues().size() != matrixA.length)
            zeroRowInMatrixMeansZeroEigenvalue(matrixA);
        checkTrace(matrixA.length, trace);
    }

    private void checkTrace(int length, double trace) {
        if (length == getEigenvalues().size() + 1)  //one EV is missing
            findMissedEigenvalue(trace);
    }

    private void copyEvToFromPolynomial() {
        setEigenvaluesFromPolynomial(new double[getEigenvalues().size()]);
        sortEigenvalues();
        for (int i = 0; i < getEigenvalues().size(); i++)
            getEigenvaluesFromPolynomial()[i] = getEigenvalues().get(i);

    }

    private void zeroRowInMatrixMeansZeroEigenvalue(double[][] matrixA) {
        int zeroEigenvalue = 0;
        for (double[] rows : matrixA) {
            boolean zero = true;
            for (double value : rows) {
                if (value != 0.0) {
                    zero = false;
                    break;
                }
            }
            if (zero)
                zeroEigenvalue++;
        }
        addZeroToEigenvalues(zeroEigenvalue);
    }

    private void addZeroToEigenvalues(int zeroEigenvalue) {
        for (double value : getEigenvalues())
            if (value == 0.0)
                zeroEigenvalue--;


        setNullRowEigenvalue(zeroEigenvalue);

        while (zeroEigenvalue-- > 0)
            getEigenvalues().add(0.0);

    }

    private void sortEigenvalues() {
        Collections.sort(getEigenvalues());
        Collections.reverse(getEigenvalues());
    }

    public void eigenvalueToMapAndChangeNegativeZero() {
        for (int i = 0; i < getEigenvalues().size(); i++) {
            Double val = getEigenvalues().get(i);

            if (val == -0.0) {
                getEigenvalues().set(i, 0.0);
                val = 0.0;
            }

            getEigenvaluesMap().put(val, getEigenvaluesMap().containsKey(val) ? getEigenvaluesMap().get(val) + 1 : 1);
        }
    }

    // index 0 starts at leading coefficient and last index is the constant
      public void findRoots(List<Double> coefficients) {

        while (coefficients.get(0) == 0)
            coefficients.remove(0);

        if (coefficients.size() == 3)
            getQuadraticRoots(coefficients.get(0), coefficients.get(1), coefficients.get(2));

        else if (coefficients.size() == 2) {
            if (coefficients.get(1) == 0.0)
                getEigenvalues().add(0.0);
            else
                getEigenvalues().add(coefficients.get(1) * -1 / coefficients.get(0));
        } else if (coefficients.size() > 3) {
            List<Double> possibleRoots = findPossibleRoots(coefficients);
            Double x = findX(coefficients, possibleRoots);
            if (x != null) {
                getEigenvalues().add(x);
                coefficients = hornerScheme(coefficients, x);
                findRoots(coefficients);
            }
        }
    }

    private void changePolynom(List<Double> coefficients) {
        Fraction fraction = new Fraction();

        Double[] pow = new Double[coefficients.size()];
        Arrays.fill(pow, 1.0);
        for(int i = 0; i < coefficients.size(); i++){
            pow[i] = fraction.denominator(String.valueOf(coefficients.get(i)));
        }

        double leastCommonMultiple = fraction.lcm(pow);

        for(int i = 0; i < coefficients.size(); i++){
            coefficients.set(i, coefficients.get(i)* leastCommonMultiple);
        }

    }

    public List<Double> hornerScheme(List<Double> coefficients, Double x) {
        List<Double> newCoefficients = new ArrayList<>();
        newCoefficients.add(coefficients.get(0));

        for (int i = 1; i < coefficients.size() - 1; i++)
            newCoefficients.add(newCoefficients.get(i - 1) * x + coefficients.get(i));

        return newCoefficients;
    }

    public List<Double> findPossibleRoots(List<Double> coefficients) {

        if(coefficients.get(coefficients.size() - 1) % 1 != 0.0 || coefficients.get(0) % 1 != 0.0){
            changePolynom(coefficients);
        }

        List<Double> possibleRoots = new ArrayList<>();
        Double p = coefficients.get(coefficients.size() - 1); //p = last
        Double q = coefficients.get(0); //q = first



        for (int i = 1; i <= Math.abs(p) && i < 10000000; i++) { //p/q
            if (Math.abs(p) % i == 0) {
                if (!possibleRoots.contains((double) i)) possibleRoots.add((double) i);
                if (!possibleRoots.contains((double) i * (-1))) possibleRoots.add((double) i * (-1));

                for (int j = 1; j <= Math.abs(q); j++) {
                    if (Math.abs(q) % j == 0) {
                        if (!possibleRoots.contains((double) i / j)) possibleRoots.add(((double) i / j));
                        if (!possibleRoots.contains(((double) i / j) * (-1)))
                            possibleRoots.add(((double) i / j) * (-1));
                    }
                }
            }
        }
        return possibleRoots;
    }

    public Double findX(List<Double> coefficients, List<Double> possibleRoots) {
        if (coefficients.get(coefficients.size() - 1) == 0) return 0.0; //if last is null, 0 must be a root

        for (int index = possibleRoots.size() - 1; index >= 0; index--) {
            double sum = 0;

            for (int i = 0; i < coefficients.size(); i++)  // f(value) = sum
                sum += coefficients.get(i) * Math.pow(possibleRoots.get(index), coefficients.size() - 1 - i);

            if (abs(sum) < 0.000000003)  // if f(value) == 0
                return possibleRoots.get(index);
            else
                possibleRoots.remove(possibleRoots.get(index));
        }

        return null;
    }

    public void getQuadraticRoots(double a, double b, double c) {
        double discriminant = Math.pow(b, 2) - 4 * a * c;

        if (discriminant >= 0) {
            getEigenvalues().add(((b * -1 + Math.sqrt(discriminant)) / (2 * a)));
            getEigenvalues().add(((b * -1 - Math.sqrt(discriminant)) / (2 * a)));
        } else {
            setImaginaryRoots(new double[2][2]);

            getImaginaryRoots()[0][0] = -b / (2 * a);
            getImaginaryRoots()[0][1] = Math.sqrt(-discriminant) / (2 * a);

            getImaginaryRoots()[1][0] = -b / (2 * a);
            getImaginaryRoots()[1][1] = -Math.sqrt(-discriminant) / (2 * a);
        }
    }

    public void findMissedEigenvalue(double trace) {
        double sum = 0;
        for (double i : getEigenvalues())
            sum += i;

        setMissedEigenvalue(trace - sum);
        getEigenvalues().add(trace - sum);
    }


    public List<Double> getEigenvalues() {
        return eigenvalues;
    }

    public void setEigenvalues(List<Double> eigenvalues) {
        this.eigenvalues = eigenvalues;
    }

    public Double getMissedEigenvalue() {
        return missedEigenvalue;
    }

    public void setMissedEigenvalue(Double missedEigenvalue) {
        this.missedEigenvalue = missedEigenvalue;
    }

    public double[][] getImaginaryRoots() {
        return imaginaryRoots;
    }

    public void setImaginaryRoots(double[][] imaginaryRoots) {
        this.imaginaryRoots = imaginaryRoots;
    }

    public HashMap<Double, Integer> getEigenvaluesMap() {
        return eigenvaluesMap;
    }

    public void setEigenvaluesMap(HashMap<Double, Integer> eigenvaluesMap) {
        this.eigenvaluesMap = eigenvaluesMap;
    }

    public int getNullRowEigenvalue() {
        return nullRowEigenvalue;
    }

    public void setNullRowEigenvalue(int nullRowEigenvalue) {
        this.nullRowEigenvalue = nullRowEigenvalue;
    }

    public double[] getPolynomial() {
        return polynomial;
    }

    public void setPolynomial(double[] polynomial) {
        this.polynomial = polynomial;
    }

    public double[] getEigenvaluesFromPolynomial() {
        return eigenvaluesFromPolynomial;
    }

    public void setEigenvaluesFromPolynomial(double[] eigenvaluesFromPolynomial) {
        this.eigenvaluesFromPolynomial = eigenvaluesFromPolynomial;
    }
}
