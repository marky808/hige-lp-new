// トンマネ（トーン＆マナー）統一のためのベース設定
const ANIMATION = {
  duration: 600,           // アニメーション時間（ミリ秒）
  easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',  // イージング関数
  delay: 50,              // 連続アニメーションの遅延
};

// ページ読み込み時の初期化
document.addEventListener('DOMContentLoaded', function() {
  // 各種機能の初期化
  initCarousel();         // カルーセル初期化
  initSmoothScroll();     // スムーススクロール
  initAnimations();       // アニメーション初期化
  initInteractions();     // インタラクション初期化
});

// カルーセルの初期化と設定
function initCarousel() {
  const carousel = document.getElementById('worry-carousel');
  if (!carousel) return;
  
  const cards = carousel.querySelectorAll('.worry-card');
  const dotsContainer = document.getElementById('carousel-dots');
  
  if (!cards.length) return;
  
  // デバイスサイズの検出
  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
  
  // デバイスサイズに応じたカード表示数
  let cardsPerView = isMobile ? 1 : (isTablet ? 2 : 3);
  
  // ドットナビゲーション生成
  if (dotsContainer) {
    generateDots(dotsContainer, cards.length, cardsPerView);
  }
  
  // タッチ操作イベント設定
  setupTouchEvents(carousel);
  
  // スクロールイベントでドット状態を更新
  carousel.addEventListener('scroll', function() {
    // スロットリングしつつ更新
    if (!carousel.isUpdatingDots) {
      carousel.isUpdatingDots = true;
      window.requestAnimationFrame(() => {
        updateActiveDot();
        carousel.isUpdatingDots = false;
      });
    }
  });
}

// ドットナビゲーション生成
function generateDots(container, totalCards, cardsPerView) {
  container.innerHTML = '';
  const dotCount = Math.ceil(totalCards / cardsPerView);
  
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    
    dot.addEventListener('click', function() {
      navigateToDot(i, cardsPerView);
    });
    
    container.appendChild(dot);
  }
}

// ドット選択時のナビゲーション
function navigateToDot(index, cardsPerView) {
  const carousel = document.getElementById('worry-carousel');
  if (!carousel) return;
  
  const cards = carousel.querySelectorAll('.worry-card');
  if (!cards.length) return;
  
  const cardWidth = cards[0].offsetWidth + parseFloat(window.getComputedStyle(cards[0]).marginRight);
  const scrollAmount = cardWidth * index * cardsPerView;
  
  carousel.scrollTo({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

// タッチ操作設定
function setupTouchEvents(carousel) {
  let touchStartX = 0;
  let touchEndX = 0;
  let touchStartY = 0;
  let touchEndY = 0;
  let startScrollPos = 0;
  
  carousel.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
    startScrollPos = carousel.scrollLeft;
    
    // スクロールをより滑らかにする
    carousel.style.scrollBehavior = 'auto';
  }, { passive: true });
  
  carousel.addEventListener('touchmove', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // 水平方向の動きが大きい場合は水平スクロールに集中
    if (Math.abs(diffX) > Math.abs(diffY)) {
      carousel.scrollLeft = startScrollPos + diffX;
    }
  }, { passive: true });
  
  carousel.addEventListener('touchend', function() {
    carousel.style.scrollBehavior = 'smooth';
    
    const diffX = touchStartX - touchEndX;
    const swipeThreshold = 50;
    
    if (Math.abs(diffX) > swipeThreshold) {
      const direction = diffX > 0 ? 1 : -1;
      moveCarousel(direction);
    } else {
      // スナップ処理（一番近いカードにスナップ）
      snapToNearestCard(carousel);
    }
  }, { passive: true });
}

// 一番近いカードの位置にスナップする
function snapToNearestCard(carousel) {
  const cards = carousel.querySelectorAll('.worry-card');
  if (!cards.length) return;
  
  const cardWidth = cards[0].offsetWidth + parseFloat(window.getComputedStyle(cards[0]).marginRight);
  const currentScroll = carousel.scrollLeft;
  const cardIndex = Math.round(currentScroll / cardWidth);
  
  carousel.scrollTo({
    left: cardWidth * cardIndex,
    behavior: 'smooth'
  });
}

// カルーセル移動関数
function moveCarousel(direction) {
  const carousel = document.getElementById('worry-carousel');
  if (!carousel) return;
  
  const cards = carousel.querySelectorAll('.worry-card');
  if (!cards.length) return;
  
  const cardWidth = cards[0].offsetWidth + parseFloat(window.getComputedStyle(cards[0]).marginRight);
  
  // デバイスサイズに応じたカード表示数とスクロール単位
  let cardsPerView;
  if (window.innerWidth < 768) {
    cardsPerView = 1;  // モバイル
  } else if (window.innerWidth < 1200) {
    cardsPerView = 2;  // タブレット
  } else {
    cardsPerView = 3;  // デスクトップ
  }

  // スクロールするカード数（1セット分移動）
  const scrollAmount = cardWidth * cardsPerView;
  
  // 現在のスクロール位置
  const currentScroll = carousel.scrollLeft;
  const targetScroll = currentScroll + (direction * scrollAmount);
  
  // 最大スクロール位置の計算（最終カードが表示されるようにする）
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  
  // 端に到達した場合の処理
  if (targetScroll < 0) {
    // 左端を超えた場合は左端へ
    carousel.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      updateActiveDot();
    }, 300);
    return;
  }
  
  if (targetScroll > maxScroll) {
    // 右端を超えた場合は右端へ（最終カードが表示されるように）
    carousel.scrollTo({
      left: maxScroll,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      updateActiveDot();
    }, 300);
    return;
  }
  
  // 通常のスクロール
  carousel.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });
  
  // スクロール後にアクティブドットを更新
  setTimeout(() => {
    updateActiveDot();
  }, 300);
}

// アクティブなドットを更新
function updateActiveDot() {
  const carousel = document.getElementById('worry-carousel');
  if (!carousel) return;
  
  const cards = carousel.querySelectorAll('.worry-card');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (!cards.length || !dots.length) return;
  
  const cardWidth = cards[0].offsetWidth + parseFloat(window.getComputedStyle(cards[0]).marginRight);
  let cardsPerView;
  
  // デバイスサイズに応じた表示カード数
  if (window.innerWidth < 768) {
    cardsPerView = 1;
  } else if (window.innerWidth < 1200) {
    cardsPerView = 2;
  } else {
    cardsPerView = 3;
  }
  
  const scrollPosition = carousel.scrollLeft;
  const maxScrollPosition = carousel.scrollWidth - carousel.clientWidth;
  
  // 端に到達したかどうかのチェック
  if (Math.abs(scrollPosition - maxScrollPosition) < 10) {
    // 最後のドットをアクティブに
    dots.forEach((dot, i) => dot.classList.toggle('active', i === dots.length - 1));
    return;
  }
  
  // 現在表示中のカードに対応するドットをアクティブに
  const activeIndex = Math.round(scrollPosition / (cardWidth * cardsPerView));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === activeIndex));
}

// スムーススクロール初期化
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        // デバイスに応じたオフセット調整
        const offset = window.innerWidth < 768 ? 60 : 80;
        
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });
}

// アニメーション初期化
function initAnimations() {
  // スクロール時のアニメーション
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  // セクション表示アニメーションのオブザーバー
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        
        // セクション内の子要素に順番に表示アニメーションを適用
        const animatedElements = entry.target.querySelectorAll('.animate-on-visible');
        animatedElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add('fade-in');
          }, ANIMATION.delay * index);
        });
      }
    });
  }, observerOptions);
  
  // セクションを監視
  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
    
    // セクション内の要素にアニメーションクラスを追加
    section.querySelectorAll('.diagnosis-type, .feature-item, .testimonial, .benefit-list li, .worry-action')
      .forEach(item => {
        item.classList.add('animate-on-visible');
      });
  });
  
  // 診断ポイントのホバーエフェクト
  document.querySelectorAll('.diagnosis-point').forEach(point => {
    point.addEventListener('mouseover', function() {
      this.querySelector('.point-number').style.animation = 'pulse 1s infinite';
    });
    
    point.addEventListener('mouseout', function() {
      this.querySelector('.point-number').style.animation = '';
    });
  });
}

// その他のインタラクション初期化
function initInteractions() {
  // タッチデバイスの検出と最適化
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // タッチターゲットサイズの最適化
    const touchTargets = document.querySelectorAll('.carousel-btn, .carousel-dot, .cta-button, .line-button');
    touchTargets.forEach(target => {
      target.style.minHeight = '44px';
    });
  }
  
  // LINE登録ボタンのクリック効果
  document.querySelectorAll('.line-button, .btn-line').forEach(button => {
    button.addEventListener('click', function() {
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 500);
    });
  });
  
  // スクロール位置に応じたヘッダーの見た目変更
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (!header) return;
    
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// リサイズのスロットリング処理
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // カルーセルと各セクションの調整
    const carousel = document.getElementById('worry-carousel');
    if (carousel) {
      const dotsContainer = document.getElementById('carousel-dots');
      if (dotsContainer && carousel.querySelectorAll('.worry-card').length) {
        // デバイスサイズに応じた表示カード数
        const cardsPerView = window.innerWidth < 768 ? 1 : 
                             (window.innerWidth < 1200 ? 2 : 3);
        
        // ドットの再生成
        generateDots(dotsContainer, carousel.querySelectorAll('.worry-card').length, cardsPerView);
        
        // 現在位置のドットをアクティブに
        updateActiveDot();
      }
    }
  }, 250);
});
