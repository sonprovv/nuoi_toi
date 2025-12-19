// Validation utilities
// These are client-side helpers matching the server-side validation

export function sanitizeInput(input: string): string {
    if (typeof input !== 'string') {
        return '';
    }

    return input
        .replace(/[<>]/g, '') // Remove < and >
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim()
        .substring(0, 1000); // Limit length
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function formatCurrency(amount: number, locale: string = 'vi-VN'): string {
    return amount.toLocaleString(locale);
}

export function formatDate(date: Date | string, locale: string = 'vi-VN'): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString(locale);
}
