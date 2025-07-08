export interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  closable?: boolean;
}

export function initializeToast() {
  // Ensure toast container exists
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(container);
  }
}

export function showToast(message: string, options: ToastOptions = {}) {
  const {
    type = 'info',
    duration = 4000,
    position = 'top-right',
    closable = true
  } = options;

  const container = document.getElementById('toast-container');
  if (!container) return;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `
    toast-item
    max-w-sm w-full
    bg-white dark:bg-gray-800
    border border-gray-200 dark:border-gray-700
    rounded-lg shadow-lg
    p-4
    transform transition-all duration-300 ease-in-out
    translate-x-full opacity-0
    ${getToastTypeClasses(type)}
  `;

  // Toast content
  toast.innerHTML = `
    <div class="flex items-start">
      <div class="flex-shrink-0">
        ${getToastIcon(type)}
      </div>
      <div class="ml-3 w-0 flex-1">
        <p class="text-sm font-medium text-gray-900 dark:text-white">
          ${message}
        </p>
      </div>
      ${closable ? `
        <div class="ml-4 flex-shrink-0 flex">
          <button class="toast-close bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <span class="sr-only">Close</span>
            <i class="fas fa-times text-sm"></i>
          </button>
        </div>
      ` : ''}
    </div>
  `;

  // Add to container
  container.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove('translate-x-full', 'opacity-0');
    toast.classList.add('translate-x-0', 'opacity-100');
  });

  // Add close functionality
  if (closable) {
    const closeButton = toast.querySelector('.toast-close');
    closeButton?.addEventListener('click', () => {
      removeToast(toast);
    });
  }

  // Auto remove after duration
  if (duration > 0) {
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  }

  // Play notification sound
  if (typeof window !== 'undefined' && window.playSound) {
    window.playSound(type === 'error' ? 'error' : 'notification');
  }

  return toast;
}

function removeToast(toast: HTMLElement) {
  toast.classList.add('translate-x-full', 'opacity-0');
  
  setTimeout(() => {
    toast.remove();
  }, 300);
}

function getToastTypeClasses(type: string): string {
  switch (type) {
    case 'success':
      return 'border-l-4 border-green-500';
    case 'error':
      return 'border-l-4 border-red-500';
    case 'warning':
      return 'border-l-4 border-yellow-500';
    case 'info':
    default:
      return 'border-l-4 border-blue-500';
  }
}

function getToastIcon(type: string): string {
  const iconClasses = 'w-5 h-5';
  
  switch (type) {
    case 'success':
      return `<i class="fas fa-check-circle ${iconClasses} text-green-500"></i>`;
    case 'error':
      return `<i class="fas fa-exclamation-circle ${iconClasses} text-red-500"></i>`;
    case 'warning':
      return `<i class="fas fa-exclamation-triangle ${iconClasses} text-yellow-500"></i>`;
    case 'info':
    default:
      return `<i class="fas fa-info-circle ${iconClasses} text-blue-500"></i>`;
  }
}

// Convenience methods
export function showSuccess(message: string, options?: Omit<ToastOptions, 'type'>) {
  return showToast(message, { ...options, type: 'success' });
}

export function showError(message: string, options?: Omit<ToastOptions, 'type'>) {
  return showToast(message, { ...options, type: 'error' });
}

export function showWarning(message: string, options?: Omit<ToastOptions, 'type'>) {
  return showToast(message, { ...options, type: 'warning' });
}

export function showInfo(message: string, options?: Omit<ToastOptions, 'type'>) {
  return showToast(message, { ...options, type: 'info' });
}

// Export for global use
declare global {
  interface Window {
    showToast: typeof showToast;
    showSuccess: typeof showSuccess;
    showError: typeof showError;
    showWarning: typeof showWarning;
    showInfo: typeof showInfo;
  }
}

if (typeof window !== 'undefined') {
  window.showToast = showToast;
  window.showSuccess = showSuccess;
  window.showError = showError;
  window.showWarning = showWarning;
  window.showInfo = showInfo;
}
