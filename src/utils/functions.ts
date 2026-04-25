export const convertFirstLetterToUpperCase = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validEmailPatternRx = /\S+@\S+\.\S+/;;