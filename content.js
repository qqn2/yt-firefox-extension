(function() {
  // 1. Get current page URL
  const url = window.location.href;

  // 2. Extract video ID from ?v= or &v=
  const match = url.match(/[?&]v=([^&]+)/);
  if (!match) {
    alert("No valid YouTube video ID found on this page.");
    return;
  }
  const videoId = match[1];

  // 3. Construct transcript URL
  const transcriptUrl = `https://youtubetotranscript.com/transcript?v=${videoId}`;

  // 4. Open that URL in a new tab
  window.open(transcriptUrl, "_blank");
})();
