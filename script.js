const apiKey = '98e58dc471cbe9110cd488e450584fe8'; 

$(document).ready(function() {
    $('#getWeatherBtn').click(function() {
        const city = $('#city').val();
        if (city) {
            getWeather(city);
        } else {
            alert('Пожалуйста, введите город');
        }
    });
});

function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;
    
    console.log(`Запрос к API: ${url}`); // Отладочный вывод
    $.getJSON(url, function(data) {
        const weatherInfo = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${data.name}, ${data.sys.country}</h5>
                    <p class="card-text">Температура: ${data.main.temp}°C</p>
                    <p class="card-text">Погода: ${data.weather[0].description}</p>
                    <p class="card-text">Влажность: ${data.main.humidity}%</p>
                </div>
            </div>
        `;
        $('#weatherResult').html(weatherInfo);
    }).fail(function(jqxhr, textStatus, error) {
        const err = textStatus + ", " + error;
        console.error("Ошибка API: " + err); // Отладочный вывод
        alert('Город не найден. Пожалуйста, проверьте название города.');
    });
}
document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const years = parseFloat(document.getElementById('years').value);
    const months = years * 12;
    
    // Формула для расчета ежемесячного платежа
    const x = Math.pow(1 + interestRate, months);
    const monthlyPayment = (loanAmount * x * interestRate) / (x - 1);

    // округление до двух знаков после запятой
    const result = monthlyPayment.toFixed(2);
    document.getElementById('result').innerText = `Ежемесячный платеж: ${result} руб.`;
});