import { paginator } from './paginator';

describe('Paginator', () => {
    const testItems = Array.from({ length: 20 }, (_, i) => i + 1);

    it('should return an empty array when an empty array is provided', () => {
        expect(paginator([])).toEqual([]);
    });

    it('should return the paginated array with default params', () => {
        expect(paginator(testItems)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should return the first page', () => {
        expect(paginator(testItems, 1)).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        ]);
    });

    it('should return the first page with 5 elements', () => {
        expect(paginator(testItems, 1, 5)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should return the second page with 5 elements', () => {
        expect(paginator(testItems, 2, 5)).toEqual([6, 7, 8, 9, 10]);
    });

    it('should return the all elements if pageSize is bigger than array length', () => {
        expect(paginator(testItems, 1, 30)).toEqual(testItems);
    });

    it('should return an empty array if pageSize is bigger than array length and page is not the first one', () => {
        expect(paginator(testItems, 2, 30)).toEqual([]);
    });

    it('should return an empty array if page exceeds array length', () => {
        expect(paginator(testItems, 3, 10)).toEqual([]);
    });

    it('should return an empty array if page equals to 0', () => {
        expect(paginator(testItems, 0, 10)).toEqual([]);
    });

    it('should return an empty array if page is negative', () => {
        expect(paginator(testItems, -1, 10)).toEqual([]);
    });

    it('should return an empty array if page size equals to 0', () => {
        expect(paginator(testItems, 1, 0)).toEqual([]);
    });

    it('should return an empty array if page size is negative', () => {
        expect(paginator(testItems, 1, -1)).toEqual([]);
    });

    it('should return an empty array if both page and page size are zero', () => {
        expect(paginator(testItems, 0, 0)).toEqual([]);
    });

    it('should return an empty array if both page and page size are negative', () => {
        expect(paginator(testItems, -1, -10)).toEqual([]);
    });
});
