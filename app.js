const resetBtn = document.querySelector(".btn-reset");
const billInput = document.querySelector("#bill-input");
const customInput = document.querySelector("#custom");
const numPeopleInput = document.querySelector(".peopleNum-input");
const tipAmountPerPerson = document.querySelector(".spn-tip-per-person");
const totalAmountPerPerson = document.querySelector(".spn-total-per-person");
const errorText = document.querySelector(".error-text");


let bill = parseFloat(billInput.value);
let numPeople = parseInt(numPeopleInput.value);

const percentButtons = document.querySelectorAll(".label-option");
const inputs = document.querySelectorAll(".input");

let selectedTipPercentage = 0;

//Disable reset button on app start
resetBtn.disabled = true;


const checkInputs = () => {
    // Enable the reset button if bill > 0, numPeople > 0, and a tip percentage is selected
    if (bill > 0 && (selectedTipPercentage > 0 || customInput.value > 0) && numPeople > 0) {
        resetBtn.disabled = false;
    } else {
        resetBtn.disabled = true;
    }
}


const disableButton = () => {
    if (bill === "" && numPeople === "") {
        resetBtn.disabled = true;
    } else {
        resetBtn.disabled = false;
    }
}


//Reset the form to initial values
const resetForm = () => {
    // Reseting the inputs
    billInput.value = 0;
    numPeopleInput.value = 0;
    customInput.value = "";

    // Reset the tip percentage selection and remove active class
    resetPercentButtons();
    tipAmountPerPerson.textContent = "$0.00";
    totalAmountPerPerson.textContent = "$0.00";

    resetBtn.disabled = true;
    // Reset the error message
    removeErrorMessage();

}

resetBtn.addEventListener("click", () => {

    resetForm();

});


const errorMessage = () => {
    if (numPeopleInput.value == 0) {
        errorText.classList.add("show-error");
        numPeopleInput.classList.add("peopleNum-input-error");

    } else {
        errorText.classList.remove("show-error");
        numPeopleInput.classList.remove("peopleNum-input-error");
    }

};

const removeErrorMessage = () => {
    errorText.classList.remove("show-error");
    numPeopleInput.classList.remove("peopleNum-input-error");
};


percentButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove the active class from all buttons
        resetPercentButtons();

        // Add the active class to the clicked button
        button.classList.add("clicked");

        // Store the selected percentage based on the button the use clicked
        selectedTipPercentage = parseFloat(button.getAttribute("value")) || 0;

        errorMessage();
        calcTipPerPerson();
        checkInputs();
    });

});

const resetPercentButtons = () => {
    percentButtons.forEach((btn) => {
        btn.classList.remove("clicked");
    });
};


const calcTipPerPerson = () => {

    bill = parseFloat(billInput.value);
    numPeople = (numPeopleInput.value);

    if (isNaN(bill) || bill <= 0 || isNaN(numPeople) || numPeople <= 0 || (selectedTipPercentage === 0 && customInput.value === "")) {
        tipAmountPerPerson.textContent = "$0.00";
        totalAmountPerPerson.textContent = "$0.00";
        errorMessage();
        return;

    } else {

        //If custom input is provided, use that, otherwise use the selected percentage button

        const tipPercentage = customInput.value > 0 ? parseFloat(customInput.value) / 100 : selectedTipPercentage

        const tipPerPerson = (bill * tipPercentage) / numPeople;
        const totalPerPerson = (bill + (bill * tipPercentage)) / numPeople;


        tipAmountPerPerson.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountPerPerson.textContent = `$${totalPerPerson.toFixed(2)}`;

    }


};


customInput.addEventListener("input", () => {

    selectedTipPercentage = customInput.value > 0 ? parseFloat(customInput.value) / 100 : 0;
    errorMessage();
    calcTipPerPerson();
    checkInputs();
})

billInput.addEventListener("input", () => {
    checkInputs();
    calcTipPerPerson();
});


numPeopleInput.addEventListener("input", () => {
    checkInputs();
    calcTipPerPerson();
    errorMessage();
});


