$(function() {
    const $audio = $('#backgroundMusic');
    let isPlaying = false;
    let hasUserInteracted = false;
    let autoplayAttempted = false;
    
    $audio[0].volume = 0.05;
    $audio[0].muted = false;
    
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
                $(document).one('click touchstart', tryPlayAgain);
            });
        }
    }
    
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
    
    function enableAudio() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            attemptPlay();
        }
    }
    
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
    
    $(document).on('click touchstart keydown', enableAudio);
    
    setTimeout(attemptPlay, 500);
});