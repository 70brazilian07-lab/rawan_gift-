document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const heartSymbols = ['💞', '❤️', '🤍', '💖', '✨', '⭐', '💫', '🌠', '🌌'];
    const numHearts = 70;
    const warmthButton = document.getElementById('warmth-button');
    
    const secretMessageDiv = document.getElementById('secret-message');
    const secretMessageP = secretMessageDiv ? secretMessageDiv.querySelector('p') : null;
    
    // قائمة الرسائل التي ستظهر عشوائياً (مع الإيموجيات)
    const SECRET_MESSAGES_LIST = [
        "You look beautiful at all times. ✨",
        "Your eyes are like the bright moon 🌕",
        "You are the best person I have ever known in my life 💖",
        "I hope you are happy now 😊",
        "I wish you a better life 💫"
    ];

    // ----------------- وظيفة القلوب الطائرة (لم تتغير) -----------------
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart', 'floating-heart');
        
        const symbol = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.textContent = symbol;
        
        const left = Math.random() * 100; 
        const initialTop = 100 + Math.random() * 10; 

        heart.style.left = `${left}vw`; 
        heart.style.top = `${initialTop}vh`;
        heart.style.animationDuration = `${Math.random() * 8 + 10}s`; 
        heart.style.animationDelay = `-${Math.random() * 10}s`; 

        heart.addEventListener('click', (event) => {
            heart.classList.add('popped');
            setTimeout(() => {
                heart.remove();
                heartContainer.appendChild(createHeart()); 
            }, 500); 
            event.stopPropagation(); 
        });

        return heart;
    }

    if (heartContainer) {
        for (let i = 0; i < numHearts; i++) {
            heartContainer.appendChild(createHeart());
        }
    }


    // ----------------- وظيفة الزر: عرض رسالة عشوائية لكل ضغطة -----------------
    if (warmthButton && secretMessageDiv && secretMessageP) {
        
        // عند تحميل الصفحة، يتم إعداد نص الزر (كما تم تعديله مؤخراً)
        const initialButtonText = warmthButton.innerHTML; // A Secret Message Just For You
        
        warmthButton.addEventListener('click', () => {
            
            // إذا كان الزر في وضع التبريد (Cooldown)، لا تقم بأي شيء
            if (warmthButton.classList.contains('active-cooldown')) {
                return;
            }

            // 1. اختيار رسالة عشوائية
            const randomIndex = Math.floor(Math.random() * SECRET_MESSAGES_LIST.length);
            const message = SECRET_MESSAGES_LIST[randomIndex];
            
            // 2. تفعيل وضع التبريد لضمان سلاسة الانتقال
            warmthButton.classList.add('active-cooldown');
            warmthButton.innerHTML = 'Showing...';

            // 3. إخفاء الرسالة الحالية (إذا كانت معروضة) قبل عرض الجديدة
            secretMessageDiv.classList.remove('show');
            
            // 4. الانتظار حتى اكتمال انتقال الاختفاء السلس (0.5 ثانية)
            setTimeout(() => {
                // عرض الرسالة الجديدة
                secretMessageP.textContent = message;
                secretMessageDiv.classList.add('show');

                // 5. بعد 3 ثوانٍ، تبدأ الرسالة بالاختفاء تلقائياً وتفعيل الزر
                setTimeout(() => {
                    secretMessageDiv.classList.remove('show');
                    
                    // بعد اكتمال الاختفاء السلس (0.5 ثانية)، يتم تفعيل الزر وإعادة النص الأصلي
                    setTimeout(() => {
                        warmthButton.classList.remove('active-cooldown');
                        warmthButton.innerHTML = initialButtonText; 
                    }, 500); 
                    
                }, 3000); // المدة التي تبقى فيها الرسالة ظاهرة
                
            }, 500); // وقت انتقال الاختفاء قبل عرض الرسالة الجديدة
        });
    }
});

// ----------------- وظيفة النجوم لخلفية صفحة الرسالة (لم تتغير) -----------------
window.addEventListener('load', () => {
    const starContainer = document.getElementById('star-background-container');
    if (!starContainer) return;

    const numStars = 100;
    const starSymbols = ['•', '°', '.', '⭐', '✨']; 

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('message-star');
        
        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.fontSize = `${Math.random() * 0.7 + 0.4}em`; 
        star.style.animationDelay = `-${Math.random() * 6}s`; 
        
        const duration = Math.random() * 15 + 10; 
        star.style.setProperty('--duration', `${duration}s`);

        setTimeout(() => {
            star.remove();
            starContainer.appendChild(createStar()); 
        }, duration * 1000);

        return star;
    }

    for (let i = 0; i < numStars; i++) {
        starContainer.appendChild(createStar());
    }
});