document.addEventListener("DOMContentLoaded", function () {
  // ========================================================
  // 1. 全導覽列分頁切換控制邏輯 (Tab Switcher)
  // ========================================================
  const navButtons = document.querySelectorAll(".nav-btn");
  const tabSections = document.querySelectorAll(".tab-content");

  navButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetTabId = this.getAttribute("data-tab");

      navButtons.forEach((btn) => btn.classList.remove("active"));
      tabSections.forEach((section) => section.classList.remove("active"));

      this.classList.add("active");
      const targetSection = document.getElementById(targetTabId);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });

  // ========================================================
  // 2. 英雄背景完整故事大彈窗管理邏輯 (Modal Controller)
  // ========================================================
  const modal = document.getElementById("story-modal");
  const modalTitle = document.getElementById("modal-champ-title");
  const modalName = document.getElementById("modal-champ-name");
  const modalStory = document.getElementById("modal-champ-story");
  const closeBtn = document.querySelector(".modal-close-btn");

  document.querySelectorAll(".open-story-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".lore-card");

      const champTitle = card.querySelector(".champ-title").innerText;
      const champName = card.querySelector(".champ-name").innerText;
      const fullStory = card.querySelector(".hidden-full-story").innerText;

      modalTitle.innerText = champTitle;
      modalName.innerText = champName;
      modalStory.innerText = fullStory;

      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  
  /* --- 1. 分頁切換邏輯 --- */
  const navBtns = document.querySelectorAll('.nav-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* --- 2. 英雄故事彈窗邏輯 --- */
  const modalOverlay = document.getElementById('storyModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const openStoryBtns = document.querySelectorAll('.open-story-btn');

  openStoryBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cardContent = e.target.closest('.card-content');
      const champName = cardContent.querySelector('.champ-name').innerText;
      const fullStory = cardContent.querySelector('.hidden-full-story').innerText;

      modalTitle.innerText = champName;
      modalText.innerText = fullStory;
      modalOverlay.classList.add('active');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  /* --- 3. 動態渲染 20 場 OP.GG 戰績資料 --- */
  const matchesContainer = document.getElementById('matchesContainer');
  
  const pool = [
    { name: '阿璃', id: 'Ahri', kda: '12 / 2 / 8', ratio: '10.00', time: '25:14', win: true, mode: '單排/雙排' },
    { name: '犽宿', id: 'Yasuo', kda: '3 / 8 / 4', ratio: '0.88', time: '32:45', win: false, mode: '單排/雙排' },
    { name: '吉茵珂絲', id: 'Jinx', kda: '15 / 4 / 10', ratio: '6.25', time: '28:10', win: true, mode: '彈性積分' },
    { name: '李星', id: 'LeeSin', kda: '6 / 6 / 9', ratio: '2.50', time: '41:05', win: false, mode: '單排/雙排' },
    { name: '拉克絲', id: 'Lux', kda: '4 / 1 / 18', ratio: '22.00', time: '22:15', win: true, mode: '隨機單中' },
    { name: '劫', id: 'Zed', kda: '9 / 7 / 3', ratio: '1.71', time: '30:12', win: false, mode: '單排/雙排' }
  ];

  let matchesHTML = '';
  for (let i = 1; i <= 20; i++) {
    const mockData = pool[Math.floor(Math.random() * pool.length)];
    const statusClass = mockData.win ? 'win' : 'lose';
    const statusText = mockData.win ? '勝利' : '落敗';
    const textColor = mockData.win ? 'text-blue' : 'text-red';

    matchesHTML += `
      <div class="match-row ${statusClass}">
        <div class="match-meta">
          <span class="status-text ${textColor}">${statusText}</span>
          <span class="mode-text">${mockData.mode}</span>
        </div>
        <div class="match-champ">
          <img src="https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${mockData.id}.png" class="mini-champ-icon" alt="${mockData.name}">
          <span>${mockData.name}</span>
        </div>
        <div class="match-kda">
          <span class="kda-num">${mockData.kda}</span>
          <span class="kda-ratio">${mockData.ratio} KDA</span>
        </div>
        <div class="match-time">${mockData.time}</div>
      </div>
    `;
  }
  if(matchesContainer) {
    matchesContainer.innerHTML = matchesHTML;
  }

  /* --- 4. 照片輪播邏輯 (Carousel) --- */
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  let currentSlide = 0;

  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    function goToSlide(idx) {
      currentSlide = idx;
      updateCarousel();
    }

    if(nextBtn && prevBtn) {
      nextBtn.addEventListener('click', nextSlide);
      prevBtn.addEventListener('click', prevSlide);
    }

    // 每 5 秒自動切換照片
    setInterval(nextSlide, 5000);
  }

  /* --- 5. 回到最上方按鍵邏輯 (Back to Top) --- */
  const backToTopBtn = document.getElementById('backToTopBtn');

  if(backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});