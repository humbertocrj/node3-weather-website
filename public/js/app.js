
const weatherForm = document.querySelector(".weather-search-form")

weatherForm.addEventListener("submit", (event) => {
    
    event.preventDefault()

    let s = document.querySelector('input').value
    let result = document.querySelector("#forecast p")

    result.innerHTML = "Loading..."
    
    fetch("http://localhost:3000/weather?address=" + s).then((response) => {
        return response.json()
    }).then((data) => {
        if (data.error) {
            result.innerHTML = (data.error)
        }
        result.innerHTML = (data.location + ", " + data.forecast)
    })
}) 