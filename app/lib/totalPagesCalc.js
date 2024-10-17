export const totalPagesCalculator = () => {
    const savedShelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    return savedShelf.reduce((total, book) => {
        return total + (book.volumeInfo.pageCount || 0);
    }, 0);
}