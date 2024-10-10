document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copyButton');
    const statusText = document.getElementById('status');

    copyButton.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: getSelectedText,
            }, function(results) {
                if (chrome.runtime.lastError) {
                    statusText.textContent = "Error: " + chrome.runtime.lastError.message;
                    return;
                }

                const selectedText = results[0].result;
                if (selectedText) {
                    navigator.clipboard.writeText(selectedText).then(function() {
                        statusText.textContent = "Text copied!";
                        statusText.style.color = "#4CAF50";
                    }).catch(function(err) {
                        statusText.textContent = "Failed to copy text";
                        statusText.style.color = "#F44336";
                    });
                } else {
                    statusText.textContent = "No text selected";
                    statusText.style.color = "#F44336";
                }
            });
        });
    });
});

function getSelectedText() {
    return window.getSelection().toString();
}