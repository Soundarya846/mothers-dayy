// Floating Petals Animation
function createPetal() {
    const petal = document.createElement('div');
    const petals = ['🌸', '🌷', '🌸', '✨'];
    petal.innerHTML = petals[Math.floor(Math.random() * petals.length)];
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = Math.random() * 6 + 6 + 's'; // 6-12s
    petal.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    
    // Random horizontal sway
    const sway = Math.random() * 50 - 25;
    petal.style.transform = `translateX(${sway}px)`;

    document.getElementById('petals').appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);
}
setInterval(createPetal, 400);

// Persistent Media Storage Helper
const DB_NAME = 'MothersDayMediaDB';
const STORE_NAME = 'mediaStore';

function initDB() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            return reject('IndexedDB not supported');
        }
        try {
            const request = indexedDB.open(DB_NAME, 1);
            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        } catch (e) {
            reject(e);
        }
    });
}

function saveMedia(key, file, dataUrl) {
    // Try IndexedDB first
    initDB().then(db => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(file, key);
    }).catch(e => {
        // Fallback to localStorage
        console.log('IndexedDB failed, falling back to localStorage');
        try {
            localStorage.setItem(key, dataUrl);
            localStorage.setItem(key + '_type', file.type);
        } catch (err) {
            console.error('localStorage quota exceeded', err);
        }
    });
}

function loadMedia(key, callback) {
    initDB().then(db => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(key);
        req.onsuccess = () => {
            if (req.result) {
                const url = URL.createObjectURL(req.result);
                callback(url, req.result.type);
            } else {
                fallbackLoad(key, callback);
            }
        };
        req.onerror = () => fallbackLoad(key, callback);
    }).catch(e => {
        fallbackLoad(key, callback);
    });
}

function fallbackLoad(key, callback) {
    const dataUrl = localStorage.getItem(key);
    const type = localStorage.getItem(key + '_type') || 'image/jpeg';
    if (dataUrl) {
        callback(dataUrl, type);
    }
}

// Photo Upload Logic for Polaroids
const photoUploads = document.querySelectorAll('.photo-upload');
if (photoUploads.length > 0) {
    photoUploads.forEach((input, index) => {
        const key = 'gallery_photo_' + index;
        
        // Load saved photo
        loadMedia(key, (url, type) => {
            const img = input.previousElementSibling;
            const hint = img.previousElementSibling;
            img.src = url;
            img.style.display = 'block';
            if(hint) hint.style.display = 'none';
            input.parentElement.style.borderStyle = 'solid';
            input.parentElement.style.borderColor = 'transparent';
        });

        input.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    const dataUrl = event.target.result;
                    saveMedia(key, file, dataUrl);
                    
                    const img = input.previousElementSibling;
                    const hint = img.previousElementSibling;
                    img.src = dataUrl;
                    img.style.display = 'block';
                    if(hint) hint.style.display = 'none';
                    input.parentElement.style.borderStyle = 'solid';
                    input.parentElement.style.borderColor = 'transparent';
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Media Upload Logic for Timeline
const mediaUploads = document.querySelectorAll('.media-upload');
if (mediaUploads.length > 0) {
    mediaUploads.forEach((input, index) => {
        const key = 'timeline_media_' + index;
        
        // Load saved media
        loadMedia(key, (url, type) => {
            const video = input.previousElementSibling;
            const img = video.previousElementSibling;
            const hint = img.previousElementSibling;

            if (type && type.startsWith('video/')) {
                video.src = url;
                video.style.display = 'block';
                img.style.display = 'none';
            } else {
                img.src = url;
                img.style.display = 'block';
                video.style.display = 'none';
            }
            if(hint) hint.style.display = 'none';
            input.parentElement.style.borderStyle = 'solid';
            input.parentElement.style.borderColor = 'transparent';
        });

        input.addEventListener('change', function(e) {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = function(event) {
                    const dataUrl = event.target.result;
                    saveMedia(key, file, dataUrl);
                    
                    const video = input.previousElementSibling;
                    const img = video.previousElementSibling;
                    const hint = img.previousElementSibling;

                    if (file.type.startsWith('video/')) {
                        video.src = dataUrl;
                        video.style.display = 'block';
                        img.style.display = 'none';
                    } else {
                        img.src = dataUrl;
                        img.style.display = 'block';
                        video.style.display = 'none';
                    }
                    if(hint) hint.style.display = 'none';
                    input.parentElement.style.borderStyle = 'solid';
                    input.parentElement.style.borderColor = 'transparent';
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Timeline Scroll Animation
const timelineItems = document.querySelectorAll('.timeline-item');
if (timelineItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
    
    // Also trigger for items already in view initially
    setTimeout(() => {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if(rect.top < window.innerHeight) {
                item.classList.add('visible');
            }
        });
    }, 100);
}

// Gift Box Interaction
const giftBox = document.getElementById('giftBox');
if (giftBox) {
    const giftMessage = document.getElementById('giftMessage');
    const heartsBurst = document.getElementById('heartsBurst');
    
    giftBox.addEventListener('click', () => {
        if (!giftBox.classList.contains('opened')) {
            giftBox.classList.add('opened');
            
            // Burst hearts
            const emojis = ['❤️', '💕', '💗', '🌸', '✨'];
            for (let i = 0; i < 40; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                    heart.classList.add('burst-heart');
                    
                    const angle = Math.random() * Math.PI * 2;
                    const velocity = 150 + Math.random() * 250;
                    const tx = Math.cos(angle) * velocity + 'px';
                    const ty = Math.sin(angle) * velocity - 150 + 'px'; // blast upwards more
                    const rot = Math.random() * 360 + 'deg';
                    
                    heart.style.setProperty('--tx', tx);
                    heart.style.setProperty('--ty', ty);
                    heart.style.setProperty('--rot', rot);
                    
                    heartsBurst.appendChild(heart);
                    
                    setTimeout(() => heart.remove(), 2500);
                }, i * 30); // staggered burst
            }

            setTimeout(() => {
                if(giftMessage) giftMessage.classList.add('show');
            }, 800);
        }
    });
}

// Letter Envelope Interaction
const envelopeWrapper = document.getElementById('envelopeWrapper');
if (envelopeWrapper) {
    const envelope = document.getElementById('envelope');
    envelope.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        envelope.classList.add('open');
    });

    const editableLetter = document.getElementById('editableLetter');
    if (editableLetter) {
        // Load saved letter text
        const savedLetter = localStorage.getItem('mothersDayLetter');
        if (savedLetter) {
            editableLetter.innerHTML = savedLetter;
        }

        // Save on input
        editableLetter.addEventListener('input', () => {
            localStorage.setItem('mothersDayLetter', editableLetter.innerHTML);
        });
    }
}
