// Wait for the transcript element to appear, with a 10-second timeout
function waitForTranscript(timeout = 10000, interval = 200) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      console.log("Waiting for transcript element to appear...");
      const timer = setInterval(() => {
        const transcriptEl = document.getElementById("transcript");
        if (transcriptEl) {
          const text = transcriptEl.innerText.trim();
          console.log("Transcript element found, current text length:", text.length);
          if (text !== "") {
            clearInterval(timer);
            resolve(transcriptEl);
          }
        }
        if (Date.now() - startTime > timeout) {
          clearInterval(timer);
          console.error("Timeout reached: Transcript element not found or still empty after", timeout, "ms");
          reject(new Error("Timeout waiting for transcript element"));
        }
      }, interval);
    });
  }

  (function() {
    const hostname = window.location.hostname;
    console.log("Content script running on:", hostname);

    if (hostname.includes("youtube.com")) {
      console.log("Detected YouTube page");
      const url = window.location.href;
      console.log("YouTube URL:", url);
      const match = url.match(/[?&]v=([^&]+)/);
      if (!match) {
        console.error("No valid YouTube video ID found in URL:", url);
        alert("No valid YouTube video ID found on this page.");
        return;
      }
      const videoId = match[1];
      console.log("Extracted video ID:", videoId);
      const transcriptUrl = `https://youtubetotranscript.com/transcript?v=${videoId}`;
      console.log("Opening transcript page:", transcriptUrl);
      window.open(transcriptUrl, "_blank");
    } else if (hostname.includes("youtubetotranscript.com")) {
      console.log("Detected transcript page");
      waitForTranscript()
        .then(transcriptEl => {
          const transcriptText = transcriptEl.innerText.trim();
          console.log("Transcript text obtained (first 100 chars):", transcriptText.slice(0, 100));
          return navigator.clipboard.writeText(transcriptText);
        })
        .then(() => {
          console.log("Clipboard write successful");
          alert("Transcript copied to clipboard!");
        })
        .catch(err => {
          console.error("Error copying transcript:", err);
          alert("Unable to copy the transcript.");
        });
    } else {
      console.warn("Unsupported hostname:", hostname);
      alert("This extension only works on YouTube and transcript pages.");
    }
  })();
