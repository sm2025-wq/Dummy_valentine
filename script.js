
(function(){
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const answer = document.getElementById('answer');
  const confetti = document.getElementById('confetti');

  // Make the "No" button playfully dodge the cursor
  let dodgeCount = 0;
  function moveNo() {
    const card = document.querySelector('.center-card');
    const rect = card.getBoundingClientRect();
    const x = Math.random() * (rect.width - 120) + rect.left;
    const y = Math.random() * (rect.height - 60) + rect.top;
    noBtn.style.position = 'relative';
    noBtn.style.left = Math.round((x - noBtn.getBoundingClientRect().left)/2) + 'px';
    noBtn.style.top = Math.round((y - noBtn.getBoundingClientRect().top)/2) + 'px';
  }

  noBtn.addEventListener('mouseenter', ()=>{ dodgeCount++; moveNo(); if(dodgeCount>2){ noBtn.textContent = 'Maybe... 😳'; } });
  noBtn.addEventListener('click', (e)=>{ e.preventDefault(); dodgeCount++; moveNo(); });

  yesBtn.addEventListener('click', ()=>{
    answer.textContent = 'Yay! You just made my day 💞 Date at 7?';
    burstConfetti();
  });

  function burstConfetti(){
    // Simple confetti using colored rectangles
    const colors = ['#ff4d6d','#ff8fa3','#ffd6e0','#fcd34d','#60a5fa','#34d399'];
    const pieces = 120;
    const { innerWidth:w, innerHeight:h } = window;
    for(let i=0;i<pieces;i++){
      const el = document.createElement('i');
      el.style.left = Math.random()*w + 'px';
      el.style.top = '-10px';
      el.style.background = colors[Math.floor(Math.random()*colors.length)];
      el.style.transform = `rotate(${Math.random()*360}deg)`;
      el.style.opacity = 0.9;
      const fall = 800 + Math.random()*1200;
      const drift = (Math.random()*2-1)*120;
      el.animate([
        { transform: 'translate(0, -20px) rotate(0deg)' },
        { transform: `translate(${drift}px, ${h+40}px) rotate(${Math.random()*720}deg)` }
      ], { duration: fall, easing: 'cubic-bezier(.15,.6,.35,1)', fill: 'forwards' });
      confetti.appendChild(el);
      setTimeout(()=> el.remove(), fall+200);
    }
  }
})();
