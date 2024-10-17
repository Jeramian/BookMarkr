export const totalBooksCalculator = () => {
    const savedShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    return savedShelf.length;
};