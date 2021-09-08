package bp.application.outputModels;

import bp.application.jordanFormCalculator.MainJordanFormCalculator;

public class MainJordanFormCalculatorOutput {
    private JordanFormString jordanForm;
    private EigenvalueCalcString evalCalculation;
    private EigenvectorCalcString evecCalc;
    private int error;

    public MainJordanFormCalculatorOutput(MainJordanFormCalculator mainJordanFormCalculator, int error) {
        setError((error != 0) ? error : mainJordanFormCalculator.getJordanForm().getError());

        if (getError() != 0) {
            setEvalCalculation(new EigenvalueCalcString(mainJordanFormCalculator, getError()));
        } else {
            setJordanForm(new JordanFormString(mainJordanFormCalculator.getJordanForm()));
            setEvalCalculation(new EigenvalueCalcString(mainJordanFormCalculator, error));
            setEvecCalc(new EigenvectorCalcString(mainJordanFormCalculator.getEigenvectors()));
        }
    }


    public JordanFormString getJordanForm() {
        return jordanForm;
    }

    public void setJordanForm(JordanFormString jordanForm) {
        this.jordanForm = jordanForm;
    }

    public EigenvalueCalcString getEvalCalculation() {
        return evalCalculation;
    }

    public void setEvalCalculation(EigenvalueCalcString evalCalculation) {
        this.evalCalculation = evalCalculation;
    }

    public int getError() {
        return error;
    }

    public void setError(int error) {
        this.error = error;
    }

    public EigenvectorCalcString getEvecCalc() {
        return evecCalc;
    }

    public void setEvecCalc(EigenvectorCalcString evecCalc) {
        this.evecCalc = evecCalc;
    }
}
