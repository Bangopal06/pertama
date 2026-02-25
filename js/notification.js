// Sistem Notifikasi Toast
function showNotification(message, type = 'success') {
    // Hapus notifikasi lama jika ada
    const oldNotif = document.querySelector('.toast-notification');
    if (oldNotif) {
        oldNotif.remove();
    }
    
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = `toast-notification toast-${type}`;
    
    // Icon berdasarkan type
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto hide setelah 3 detik
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Tambahkan CSS untuk notifikasi
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .toast-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        min-width: 300px;
        max-width: 500px;
    }
    
    .toast-notification.show {
        transform: translateX(0);
    }
    
    .toast-success {
        background: #10b981;
        color: white;
    }
    
    .toast-error {
        background: #ef4444;
        color: white;
    }
    
    .toast-warning {
        background: #f59e0b;
        color: white;
    }
    
    .toast-info {
        background: #3b82f6;
        color: white;
    }
    
    .toast-icon {
        font-size: 20px;
        font-weight: bold;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
    }
    
    .toast-message {
        flex: 1;
    }
    
    @media (max-width: 768px) {
        .toast-notification {
            right: 10px;
            left: 10px;
            min-width: auto;
        }
    }
`;
document.head.appendChild(notificationStyle);
