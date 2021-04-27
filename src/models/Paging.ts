export interface Paging <T>{
    page: number;
    pageSize: number;
    rows: T[];
    total: number;
    totalPages: number;
}