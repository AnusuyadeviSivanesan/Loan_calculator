document.getElementById('YearRange').addEventListener('change', inpRangeDisplay)

function inpRangeDisplay() {
    let yearbarv = document.getElementById('YearRange').value;
    document.getElementById('InpYear').value = yearbarv;
}



document.getElementById('calculate').addEventListener('click', ValidateInput)

function ValidateInput(e) {
    e.preventDefault()
    let Loan = document.getElementById('LoanInput');
    let inst = document.getElementById('intrstpercent');
    let Inpyear = document.getElementById('InpYear');

    let Loanv = Loan.value;
    let instv = inst.value;
    let Yearv = Inpyear.value;

    let validvalues = true;
    if (!Loanv || Loanv < 10000 || Loanv > 5000000) {
        alert("Please Enter valid Amount between 10000 and 5000000")
        validvalues = false;
        return;
    }
    if (!instv || instv == 0 || instv > 100) {
        alert("Please enter valid Interest");
        validvalues = false;
        return;
    }
    if (!Yearv && Yearv >0) {
        alert("Please choose range for year");
        validvalues = false;
        return;
    }
    if (validvalues) {
        calculatePrincipalAmount(Loanv, instv, Yearv)
    }
}



function calculatePrincipalAmount(Loan, inst, Years) {
    // how many years , the loan will continue
    let Loanmonth = Years * 12;

    // monthly intereset
    let monthly_insrt = ((inst) / (100 * 12))

    // to get (1+ r)^n 
    let month_for_pow= (1+monthly_insrt)
    let month_power=Math.pow(month_for_pow, Loanmonth)
    
    let numerator= monthly_insrt*month_power;
    let denominator=month_power-1;

    let nume_by_deno= (numerator/denominator);

    // Monthly_payment 
    let monthly_payment=(Loan *(nume_by_deno)).toFixed(2);

    //Total Payment
    let total_payment=(monthly_payment*Loanmonth).toFixed(2);

    //Total_interest_whole
    let total_interest= (total_payment -Loan).toFixed(2);

    document.getElementById('dmonthPay').textContent = monthly_payment;
    document.getElementById('dtotalPay').textContent = total_payment;
    document.getElementById('dTotalintrst').textContent = total_interest;

    displayChart(total_payment,total_interest);
}





// displayChart()
function displayChart(payment,interest) {
    let xValues = ["Totally Paid", "Total Interest"]
    let yValues = [payment,interest]
    let barcolors = [
        "darkgreen",
        "darkcyan"
    ];

    new Chart('myChart', {
        type: "doughnut",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barcolors,
                data: yValues
            }]
        },
        Options: {
            title: {
                display: true,
                text: "Loan Calcultor Visuals in Chart"
            }
        }
    })
}