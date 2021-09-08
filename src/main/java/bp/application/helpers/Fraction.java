//https://stackoverflow.com/questions/31585931/how-to-convert-decimal-to-fractions/58989121#58989121?newreg=4bc70c353add42a2b0baa03faf1a6d61

package bp.application.helpers;

import org.thymeleaf.util.StringUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

public class Fraction {

    public BigDecimal finalResult = new BigDecimal("0");

    public boolean check(short[] checks) {
        boolean isContinues = true;
        int index = -1;
        for (short ind : checks) {
            index++;
            if (ind == 1) {

            } else if (ind == 0) {
                isContinues = false;
                break;
            } else if (ind == -1) {
                if (index == 0) {
                    isContinues = false;
                }
                break;
            }
        }

        return isContinues;
    }

    public int[] analyzeDecimal() { // will return int[3]
        int[] analysis = new int[3];
        int dot = finalResult.toString().indexOf(".");
        String num = finalResult.toString();
        int state = -1;
        int firstPart = 0; // first part will be compared with each secondPart!
        int secondPart = 0;
        String part = ""; // without the dot
        int index = 0; // index for every loop!
        int loop = 6;
        int originalLoop = loop;
        int size = 0; // until six!
        int ps = -1;
        short[] checks = new short[]{-1, -1, -1, -1, -1, -1, -1, -1, -1, -1}; // 10 compares for each part!
        // length of checks is 10!
        int continues = -1; // -1 means there is no continues part!
        boolean stop = false;
        while (true) { // while for size!
            if (size != 6) {
                while (true) { // we need to compare a part with a part!
                    // while for loop
                    // 6 loops, every loop will increase the compared part by 1!
                    if (loop != -1) { // TODO : check every part with the increasing pos
                        firstPart = dot + 1 + (originalLoop - loop); // changed
                        try {
                            part = num.substring(firstPart, firstPart + (size + 1));
                        } catch (StringIndexOutOfBoundsException ex) {
                            break;
                        }
                        int partSize = part.length();
                        int afterDecimal = num.length() - (dot + 1);
                        while (index != checks.length &&
                                firstPart + partSize + index * partSize - (dot + 1) <= afterDecimal) { // while for index!
                            secondPart = firstPart + partSize + index * partSize;
                            String comparedPart;
                            try {
                                comparedPart = num.substring(secondPart, secondPart + partSize);
                            } catch (StringIndexOutOfBoundsException ex) {
                                break;
                            }
                            if (part.equals(comparedPart)) {
                                checks[index] = 1;
                            } else {
                                checks[index] = 0;
                            }
                            index++;
                        }
                        index = 0;
                        if (check(checks)) {
                            stop = true;
                            continues = firstPart;
                            ps = partSize;
                        }
                        for (int i = 0; i != 10; i++) {
                            checks[i] = -1;
                        }
                    } else { // finished!
                        break;
                    }
                    loop--;
                    if (stop) {
                        break;
                    }
                }
                loop = originalLoop;
                size++;
                if (stop) {
                    break;
                }
            } else {
                break;
            }
        }
        if (continues == -1) {
            state = 2;
        } else {
            if (dot + 1 == continues) {
                state = 1;
            } else {
                state = 0;
            }
        }
        analysis[0] = state;
        analysis[1] = continues;
        analysis[2] = ps;

        return analysis;
    }

    public String convertToStandard() {
        // determine the state first :

        int[] analysis = analyzeDecimal();
        int dot = finalResult.toString().indexOf('.') + 1;
        int continues = analysis[1];
        int partSize = analysis[2]; // how many steps after the continues part
        if (analysis[0] == 0) { // constant + continues
            String number = finalResult.toString().substring(0, continues + partSize);
            int numOfConst = continues - dot;
            int numOfDecimals = continues + partSize - dot;
            int den = (int) (Math.pow(10, numOfDecimals) - Math.pow(10, numOfConst)); // (10^numOfDecimals)-(10^numOfConst);
            int num;
            int toSubtract;
            try {
                toSubtract = Integer.parseInt(number.substring(0, dot - 1) + number.substring(dot, dot + numOfConst));
            } catch (NumberFormatException e) {
                return number;
            }
            if (number.charAt(0) == 0) {
                num = Integer.parseInt(number.substring(dot));
            } else {
                try {
                    num = Integer.parseInt(number.replace(".", ""));
                } catch (NumberFormatException e) {
                    return number;
                }
            }
            num -= toSubtract;
            return simplify(num, den);
        } else if (analysis[0] == 1) { // continues
            int num, den;
            // we always have  to subtract by only one x!
            String n = finalResult.toString().substring(0, dot + partSize).replace(".", "");
            num = Integer.parseInt(n);
            den = nines(partSize);
            int toSubtract = Integer.parseInt(finalResult.toString().substring(0, dot - 1));
            num -= toSubtract;
            return simplify(num, den);
        } else if (analysis[0] == 2) { // constant
            partSize = finalResult.toString().length() - dot;
            int num;
            try {
                num = Integer.parseInt(finalResult.toString().replace(".", ""));
            } catch (Exception e) {
                return null;
            }
            int den = (int) Math.pow(10, partSize);
            return simplify(num, den);
        } else {
            System.out.println("[Error] State is not determined!");
        }

        return "STATE NOT DETERMINED!";


    }

    public String simplify(int num, int den) {
        BigInteger n1 = new BigInteger(Integer.toString(num));
        BigInteger n2 = new BigInteger(Integer.toString(den));
        BigInteger GCD = n1.gcd(n2);
        String number = Integer.toString(num / GCD.intValue()) + "/" + Integer.toString(den / GCD.intValue());

        return number;
    }

    public int nines(int n) {
        StringBuilder result = new StringBuilder();
        while (n != 0) {
            n--;
            result.append("9");
        }
        return Integer.parseInt(result.toString());
    }

    public List<String> listToString(List<Double> eigenvalues) {
        List<String> evalString = new ArrayList<>();
        for (Double eval : eigenvalues) {
            evalString.add(valueToString(eval));
        }
        return evalString;
    }

    public String[][][] dim3ArrayToString(double[][][] det) {
        String[][][] matrix = new String[det.length][][];
        for (int row = 0; row < det.length; row++)
            matrix[row] = matrixToString(det[row]);

        return matrix;
    }

    public String[][] matrixToString(double[][] A, int length) {
        String[][] matrix = new String[length][];
        for (int i = 0; i < length; i++)
            matrix[i] = arrayToString(A[i]);

        return matrix;
    }

    public String[][] matrixToString(double[][] A) {
        return matrixToString(A, A.length);
    }

    public String[] arrayToString(double[] array) {
        String[] arrayString = new String[array.length];
        for (int j = 0; j < array.length; j++)
            arrayString[j] = valueToString(array[j]);
        return arrayString;
    }

    public String valueToString(double val) {
        String fraction = (val % 1 != 0.0) ? fraction(String.valueOf(val)) : String.valueOf((int) val);
        return (fraction == null) ? maxSubstring(val) : fraction; //max 6 char

    }

    private String maxSubstring(double value) {
        return StringUtils.substring(String.valueOf(value), 0, String.valueOf(value).indexOf(".") + 6);
    }


    public String fraction(String s) {
        finalResult = new BigDecimal(s);
        return convertToStandard();
    }

    public Double denominator(String s) {
        String fraction = fraction(s);
        return (fraction == null) ? null : Double.parseDouble(fraction.substring(fraction.lastIndexOf("/") + 1));
    }

    private double gcd(double a, double b) {
        while (b > 0) {
            double temp = b;
            b = a % b; // % is remainder
            a = temp;
        }
        return a;
    }

    private double lcm(double a, double b) {
        return a * (b / gcd(a, b));
    }

    public double lcm(Double[] input) {
        double result = input[0];
        for (int i = 1; i < input.length; i++) result = lcm(result, input[i]);
        return result;
    }


}
