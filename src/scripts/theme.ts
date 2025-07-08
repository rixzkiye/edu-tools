// Theme management with animated circular reveal
export function initializeTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const themeTransition = document.getElementById('theme-transition');
  
  if (!themeToggle || !themeTransition) return;
  
  themeToggle.addEventListener('click', (e) => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    // Get click position for circular reveal animation
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Calculate the maximum radius needed to cover the entire screen
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(x, window.innerWidth - x), 2) +
      Math.pow(Math.max(y, window.innerHeight - y), 2)
    );
    
    // Set up the transition element
    themeTransition.style.left = x + 'px';
    themeTransition.style.top = y + 'px';
    themeTransition.style.background = newTheme === 'dark' ? '#111827' : '#ffffff';
    themeTransition.style.borderRadius = '50%';
    themeTransition.style.transform = 'translate(-50%, -50%) scale(0)';
    themeTransition.style.opacity = '1';
    themeTransition.style.pointerEvents = 'all';
    
    // Animate the circular reveal
    themeTransition.animate([
      { transform: 'translate(-50%, -50%) scale(0)' },
      { transform: `translate(-50%, -50%) scale(${maxRadius * 2}px)` }
    ], {
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }).addEventListener('finish', () => {
      // Apply the theme change
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
      
      // Hide the transition element
      themeTransition.style.opacity = '0';
      themeTransition.style.pointerEvents = 'none';
      
      // Play theme change sound
      playSound('theme-change');
    });
  });
}

// Auto-detect system theme preference
export function detectSystemTheme() {
  if (typeof window === 'undefined') return 'light';
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) return savedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Listen for system theme changes
export function watchSystemTheme() {
  if (typeof window === 'undefined') return;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });
}
