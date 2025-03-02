
window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// Define API URLs for OpenAI and Nearby Places
const API_URL = window.location.hostname.includes("localhost")
    ? "http://localhost:5001/api/openai"  // Local Development
    : "https://bash-travels.vercel.app/api/openai";  // Deployed Vercel API

// System Prompt for OpenAI
const SYSTEM_PROMPT = "You are an expert travel assistant. Keep responses short, informative, and friendly.";

var aiButton = document.querySelector(".search-bar");

aiButton.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getAIResponse();
    }
});
// Function to determine query type and fetch data accordingly
async function getAIResponse() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const responseBox = document.getElementById("aiResponse");

    if (!query) {
        responseBox.innerHTML = "Please type a question!";
        responseBox.style.display = "block";
        return;
    }

    responseBox.innerHTML = "Bash AI is Thinking... 💭";
    responseBox.style.display = "block";

    // Detect if the user wants to find nearby places
    if (query.includes("nearest") || query.includes("nearby") || query.includes("find me") || query.includes("find")) {
        if (query.includes("bathroom") || query.includes("restroom") || query.includes("toilet")) {
            findNearbyPlaces("toilets");
            return;
        } else if (query.includes("restaurant") || query.includes("food") || query.includes("cafe") || query.includes("restaurants")) {
            findNearbyPlaces("restaurant");
            return;
        } else if (query.includes("clothes") || query.includes("shoes")) {
            findNearbyPlaces("clothing store");
            return;
        } else if (query.includes("hospital") || query.includes("urgent care")) {
            findNearbyPlaces("hospital");
            return;
        } else if (query.includes("police") || query.includes("cops")) {
            findNearbyPlaces("police station");
            return;
        } else if (query.includes("bars") || query.includes("clubs")) {
            findNearbyPlaces("bar");
            return;
        } else if (query.includes("convenience store") || query.includes("stores")) {
            findNearbyPlaces("convenience");
            return;
        }
    }

    // Otherwise, treat it as an OpenAI query
    fetchAIResponse(query);
}

// Function to fetch response from OpenAI (Using Cheapest Model: gpt-3.5-turbo)
async function fetchAIResponse(query) {
    const responseBox = document.getElementById("aiResponse");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",  // Cheapest OpenAI model
                question: `${SYSTEM_PROMPT} Question: ${query}`
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        responseBox.innerHTML = data.answer;
    } catch (error) {
        console.error("Error fetching response:", error);
        responseBox.innerHTML = "Error fetching response. Try again later.";
    }
}

// Function to find nearby places using OpenStreetMap's Overpass API
async function findNearbyPlaces(placeType) {
    if (!navigator.geolocation) {
        document.getElementById("aiResponse").innerHTML = "Geolocation is not supported by your browser.";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const query = `
            [out:json];
            node(around:3000, ${latitude}, ${longitude})["amenity"="${placeType}"];
            out body;
        `;
        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.elements.length === 0) {
                document.getElementById("aiResponse").innerHTML = `No ${placeType} found nearby.`;
                return;
            }

            let results = `Nearest ${placeType}:<br>`;
            data.elements.forEach((place, index) => {
                results += `${index + 1}. ${place.tags.name || "Unknown"} - 📍 <a href="https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}" target="_blank">View on Map</a><br>`;
            });

            document.getElementById("aiResponse").innerHTML = results;
        } catch (error) {
            console.error("Error fetching nearby places:", error);
            document.getElementById("aiResponse").innerHTML = "Error fetching nearby places. Try again later.";
        }
    }, () => {
        document.getElementById("aiResponse").innerHTML = "Unable to retrieve your location.";
    });
}

// Event listener for search button
document.getElementById("searchButton").addEventListener("click", getAIResponse);

// Allow pressing Enter key to trigger search
document.getElementById("searchInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        getAIResponse();
    }
});
