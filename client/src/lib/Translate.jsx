let isTranslateLoaded = false;

export function loadGoogleTranslate() {
    if (isTranslateLoaded) return;
    isTranslateLoaded = true;

    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false,
            },
            "google_translate_element"
        );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
}


export function changeGoogleLanguage(lang) {
    const domain = window.location.hostname;

    // Set Google Translate cookie
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${domain}`;
    document.cookie = `googtrans=/en/${lang}; path=/`;
    
    window.location.reload();
}


export function getCurrentGoogleLanguage() {
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    return match ? match[1] : "en";
}
