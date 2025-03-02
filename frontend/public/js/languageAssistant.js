var translateButton = document.querySelector(".translate");

var speakButton = document.querySelector(".speak");


translateButton.addEventListener("click",async function (){
    console.log("Traslate clicked!")
    const inputText = document.getElementById("inputText").value;
    const languagePair = document.getElementById("languageSelect").value;

    if (!inputText) {
        alert("Please enter text to translate.");
        return;
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${languagePair}`;

    try {
        const response = await axios.get(url);
        document.getElementById("translatedText").value = response.data.responseData.translatedText;
    } catch (error) {
        document.getElementById("translatedText").value = "Error in translation. Try again.";
    }
});

speakButton.addEventListener("click", function (){
    console.log("Speaking in progress....")
    const text = document.getElementById("translatedText").value;

    if (!text) {
        alert("No translation available to read aloud.");
        return;
    }

    // Ensure SpeechSynthesis is available
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        const langCode = document.getElementById("languageSelect").value.split("|")[1];

        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Select an appropriate voice for the language
        let selectedVoice = voices.find(voice => voice.lang.startsWith(langCode));

        // If a matching voice is found, use it
        if (selectedVoice) {
            speech.voice = selectedVoice;
        } else {
            console.warn("No suitable voice found for", langCode);
        }

        speech.lang = langCode;
        
        // Required for Safari: Cancel and restart speech synthesis to apply settings
        window.speechSynthesis.cancel(); 
        setTimeout(() => {
            window.speechSynthesis.speak(speech);
        }, 100);
    } else {
        alert("Your browser does not support text-to-speech.");
    }
});

