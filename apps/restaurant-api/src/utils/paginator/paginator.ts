export function paginator<T>(
    items: Array<T>,
    page: number = 1,
    pageSize: number = 10,
) {
    if (page <= 0 || pageSize <= 0) {
        return [];
    }

    return items.slice((page - 1) * pageSize, page * pageSize);
}
