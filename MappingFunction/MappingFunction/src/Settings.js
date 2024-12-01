window.onload = function() {
    loadSettings();
};

// Function to change the theme (updates the value in localStorage)
function changeTheme() {
    const selectedTheme = document.getElementById("colorTheme").value;
    localStorage.setItem("theme", selectedTheme);
    showPopup("Theme selection updated. Click 'Save Settings' to apply.");
}

// Function to apply the theme across all pages (called when saving settings)
function saveSettings() {
    const theme = localStorage.getItem("theme") || "default";
    applyThemeToAllPages(theme);
    showPopup("All settings saved successfully!");
}

// Function to load settings and apply the theme on page load
function loadSettings() {
    const theme = localStorage.getItem("theme") || "default";
    document.getElementById("colorTheme").value = theme;

    // Apply the theme to the current page
    applyThemeToAllPages(theme);
}

// Function to apply the theme to the current page and iframes
function applyThemeToAllPages(theme) {
    document.body.className = theme;

    const iframes = document.querySelectorAll("iframe");
    iframes.forEach(iframe => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            iframeDoc.body.className = theme;
        } catch (error) {
            console.error("Unable to apply theme to iframe:", error);
        }
    });
}

// Function to show a custom popup message
function showPopup(message) {
    const popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000);
}
