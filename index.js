const getElements = (type) => {
    return [...document.querySelectorAll(`.input-${type}`)]
} 

const showBmi = (bmi) => {
    document.querySelector(".welcome").style.display = "none";
    document.querySelector(".output-container").style.display = "flex";
    document.getElementById("bmi").textContent = bmi
}

const weightClassification =(bmi) => {

    if(bmi >= 30) {
        document.getElementById("classification").textContent ="Obese"
    } else if (bmi >= 25) {
        document.getElementById("classification").textContent ="Overweight"
    } else if (bmi >= 18.5) {
        document.getElementById("classification").textContent ="Normal"
    } else if ( bmi < 18.5) {
        document.getElementById("classification").textContent ="Underweight"
    }

}



const heightWeight = (height, type) => {
    const lowerBmi = 18.5;
    const upperBmi = 25;


    let lowerWeight, upperWeight;

    if (type === "metric") {
        const lowerWeightFormula = lowerBmi * Math.pow(height / 100, 2);
        const upperWeightFormula = upperBmi * Math.pow(height / 100, 2);


        const lowerWeightScore = lowerWeightFormula.toFixed(1);
        const upperWeightScore = upperWeightFormula.toFixed(1);

        lowerWeight = `${lowerWeightScore}kg`;
        upperWeight = `${upperWeightScore}kg`;
    } else {
        const lowerWeightFormulaImperial = (lowerBmi * height) / 703;
        const upperWeightFormulaImperial = (lowerBmi * height) / 703;


        const lowerStone = Math.floor(lowerWeightFormulaImperial / 14);
        const UpperStone = Math.floor(upperWeightFormulaImperial / 14);

        const lowerLbs = Math.floor(lowerWeightFormulaImperial % 14);
        const upperLbs = Math.floor(upperWeightFormulaImperial % 14);

        lowerWeight = `${lowerStone}st ${lowerLbs}`
        upperWeight = `${UpperStone}st ${upperLbs}`
    }

    document.getElementById("range").textContent = `${lowerWeight}st ${upperWeight}`

}


const getBmiMetric = () => {
    const elements = getElements("metric");
    const [cm, kg] = elements

    if(elements.every((input) => input.value !== "")) {
        const bmiMetric = kg.value / Math.pow(cm.value / 100, 2);

        const bmiMetricRoundUp = bmiMetric.toFixed(1)
        showBmi(bmiMetricRoundUp)
        weightClassification(bmiMetricRoundUp)
        heightWeight(cm.value, "metric")

    }
}


const getBmiImperial = () => {
    const elements = getElements("imperial");
    const [ft, pulg, st, lbs] = elements


    if (elements.every((input) => input.value !== "")) {
        const heightImperial = Math.pow(Number(ft.value * 12) + Number(pulg*value), 2)
        const bmiImperial = ((Number(st.value *14) + Number(lbs.value)) * 703)


        const bmiImperialRoundUp = bmiImperial.toFixed(1)
        showBmi(bmiImperialRoundUp)
        weightClassification(bmiImperialRoundUp)
        heightWeight(heightImperial, "imperial")
    }
}


document.querySelector(".radio").addEventListener("click", (e) => {
    const metricElement = document.getElementById("metric");
    const imperialElement = document.getElementById("imperial");
    const welcomeElement = document.querySelector(".welcome");
    const outputContainer = document.querySelector(".output-container")
    const inputTypeNumber = document.querySelectorAll("input[type='number']")



    if (e.target.value === "metric" || e.target.value === "imperial") {
        metricElement.style.display = e.target.value === "metric" ? "block" : "none";
        imperialElement.style.display = e.target.value === "imperial"? "block" : "none";


        welcomeElement.style.display = "block";
        outputContainer.style.display = "none";

        for (input of inputTypeNumber) {
            input.value = ""
        }
    }
})


const metricElement = getElements("metric");
metricElement.forEach((element) => {
    element.addEventListener("input", getBmiMetric)
})


const imperialElements = getElements("imperial");

imperialElements.forEach((element) => {
    element.addEventListener("input", getBmiImperial)
})