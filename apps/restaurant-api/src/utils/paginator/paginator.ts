export function paginator<T>(
    items: Array<T>,
    page: number = 1,
    pageSize: number = 10,
) {
    return items.slice((page - 1) * pageSize, page * pageSize);
}
