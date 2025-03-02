var convertButton = document.querySelector(".btn");
var backButton = document.querySelector(".back-button");
convertButton.addEventListener("click", async function (){
    console.log("Convert Request Button!");
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    
    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }
    
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        let exchangeRate = data.rates[toCurrency];
        let convertedAmount = (amount * exchangeRate).toFixed(2);
        document.getElementById("result").innerText = `Converted Amount: ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching exchange rates", error);
        alert("Failed to fetch exchange rates. Try again later.");
    }
}
);

backButton.addEventListener("click", function (){
    window.location.href = './japanKoreaTrip.html';
});
