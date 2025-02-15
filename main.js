document.addEventListener("DOMContentLoaded", function () {
    // LED Switch Controls
    const led1 = document.getElementById("check");
    const led2 = document.getElementById("check1");
    const led3 = document.getElementById("check2");

    // Mode Selection
    const mode1 = document.getElementById("btnradio1");
    const mode2 = document.getElementById("btnradio2");
    const mode3 = document.getElementById("btnradio3");

    // Function to send LED state to ESP32
    function sendLEDState(led, state) {
        let ledNumber = led === led1 ? 1 : led === led2 ? 2 : 3;
        let url = `/led${ledNumber}?state=${state ? "on" : "off"}`;

        fetch(url)
            .then(response => response.text())
            .then(data => console.log(`LED ${ledNumber}: ${data}`))
            .catch(error => console.error("Error:", error));
    }

    // Attach event listeners for LED toggles
    [led1, led2, led3].forEach(led => {
        led.addEventListener("change", function () {
            sendLEDState(led, this.checked);
        });
    });

    // Function to set mode on ESP32
    function setMode(mode) {
        fetch(`/mode${mode}`)
            .then(response => response.text())
            .then(data => console.log(`Mode ${mode} Activated: ${data}`))
            .catch(error => console.error("Error:", error));
    }

    // Attach event listeners for mode selection
    mode1.addEventListener("click", () => setMode(1));
    mode2.addEventListener("click", () => setMode(2));
    mode3.addEventListener("click", () => setMode(3));
});
