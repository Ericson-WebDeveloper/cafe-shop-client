

export const convertNumberPHP = (data: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(data);
}