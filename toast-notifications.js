/**
 * Toast Notifications System
 * A lightweight, customizable toast notification library
 * 
 * Usage:
 * showToast('Success!', 'Your changes have been saved.', 'success');
 * showToast('Error!', 'Something went wrong.', 'error');
 * showToast('Warning!', 'Please check your input.', 'warning');
 * showToast('Info', 'New updates available.', 'info');
 */

class ToastNotification {
    constructor() {
        this.container = null;
        this.toasts = [];
        this.init();
    }

    init() {
        // Create container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        } else {
            this.container = document.querySelector('.toast-container');
        }
    }

    show(title, message, type = 'info', options = {}) {
        const defaults = {
            duration: 5000,
            closable: true,
            progress: true,
            compact: false,
            position: 'top-right'
        };

        const config = { ...defaults, ...options };

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}${config.compact ? ' compact' : ''}`;

        // Get icon based on type
        const icon = this.getIcon(type);

        // Build toast HTML
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <p class="toast-title">${title}</p>
                ${message ? `<p class="toast-message">${message}</p>` : ''}
            </div>
            ${config.closable ? '<button class="toast-close" aria-label="Close">×</button>' : ''}
            ${config.progress ? `<div class="toast-progress" style="animation-duration: ${config.duration}ms"></div>` : ''}
        `;

        // Add to container
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Add close button listener
        if (config.closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => this.remove(toast));
        }

        // Auto remove after duration
        if (config.duration > 0) {
            setTimeout(() => this.remove(toast), config.duration);
        }

        // Add click to dismiss
        toast.addEventListener('click', (e) => {
            if (!e.target.classList.contains('toast-close')) {
                this.remove(toast);
            }
        });

        return toast;
    }

    remove(toast) {
        if (!toast || !toast.parentElement) return;

        toast.classList.add('removing');
        
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300);
    }

    removeAll() {
        this.toasts.forEach(toast => this.remove(toast));
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ',
            loading: '⟳'
        };
        return icons[type] || icons.info;
    }

    // Preset methods for convenience
    success(title, message, options) {
        return this.show(title, message, 'success', options);
    }

    error(title, message, options) {
        return this.show(title, message, 'error', options);
    }

    warning(title, message, options) {
        return this.show(title, message, 'warning', options);
    }

    info(title, message, options) {
        return this.show(title, message, 'info', options);
    }

    loading(title, message, options) {
        return this.show(title, message, 'loading', { ...options, duration: 0 });
    }

    promise(promise, messages) {
        const loadingToast = this.loading(
            messages.loading || 'Loading...',
            messages.loadingMessage || ''
        );

        return promise
            .then((result) => {
                this.remove(loadingToast);
                this.success(
                    messages.success || 'Success!',
                    messages.successMessage || ''
                );
                return result;
            })
            .catch((error) => {
                this.remove(loadingToast);
                this.error(
                    messages.error || 'Error!',
                    messages.errorMessage || error.message
                );
                throw error;
            });
    }
}

// Create global instance
const toast = new ToastNotification();

// Global helper functions for easy access
function showToast(title, message, type = 'info', options = {}) {
    return toast.show(title, message, type, options);
}

function showSuccessToast(title, message, options) {
    return toast.success(title, message, options);
}

function showErrorToast(title, message, options) {
    return toast.error(title, message, options);
}

function showWarningToast(title, message, options) {
    return toast.warning(title, message, options);
}

function showInfoToast(title, message, options) {
    return toast.info(title, message, options);
}

function showLoadingToast(title, message, options) {
    return toast.loading(title, message, options);
}

function removeAllToasts() {
    toast.removeAll();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toast,
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
        showLoadingToast,
        removeAllToasts
    };
}
