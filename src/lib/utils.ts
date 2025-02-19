import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function slugify(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function formatPrice(price: number) {
    return `£${price.toFixed(2)}`;
}

export function toTitleCase(str: string) {
    return str.toLowerCase().split(' ').map((word: string) => {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

export function toKebabCase(str: string): string {
    return str
        .trim() // Remove any leading or trailing whitespace
        .toLowerCase() // Convert the string to lowercase
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with a dash
        .replace(/^-+|-+$/g, ''); // Remove leading or trailing dashes
}

export function isNullOrWhiteSpace(input: string | null | undefined): boolean {
    return input == undefined || input == null || input.trim().length === 0;
}

export function isEmailValid(email: string | null | undefined): boolean {
    if (isNullOrWhiteSpace(email)) {
        return false;
    }

    const validEmailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!email) return false;

    const emailParts = email.split('@');

    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const domain = emailParts[1];

    if (account.length > 64) return false;
    else if (domain.length > 255) return false;

    const domainParts = domain.split('.');

    if (domainParts.some((part) => part.length > 63)) return false;

    return validEmailRegex.test(email);
};