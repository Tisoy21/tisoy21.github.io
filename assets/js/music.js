$(document).ready(function() {
    const $audio = $('#backgroundMusic');
    let isPlaying = false;
    let hasUserInteracted = false;
    let autoplayAttempted = false;
    
    // Set audio properties for better compatibility
    $audio[0].volume = 0.3;
    $audio[0].muted = false;
    
    // Attempt to play music
    function attemptPlay() {
        if (autoplayAttempted) return;
        autoplayAttempted = true;
        
        const playPromise = $audio[0].play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
            }).catch((error) => {
                console.log('Autoplay blocked:', error);
                isPlaying = false;
                // Try again after user interaction
                $(document).one('click touchstart', tryPlayAgain);
            });
        }
    }
    
    // Try to play again after user interaction
    function tryPlayAgain() {
        hasUserInteracted = true;
        const playPromise = $audio[0].play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                isPlaying = true;
            }).catch((error) => {
                console.log('Still blocked:', error);
                isPlaying = false;
            });
        }
    }
    
    // Enable audio after user interaction
    function enableAudio() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            attemptPlay();
        }
    }
    
    // Handle audio events
    $audio.on('play', function() {
        isPlaying = true;
    });
    
    $audio.on('pause', function() {
        isPlaying = false;
    });
    
    $audio.on('ended', function() {
        isPlaying = false;
    });
    
    $audio.on('error', function(e) {
        console.log('Audio error:', e);
        isPlaying = false;
    });
    
    // Enable audio on any user interaction
    $(document).on('click touchstart keydown', enableAudio);
    
    // Try autoplay on page load
    setTimeout(attemptPlay, 500);
});