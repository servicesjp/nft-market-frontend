export class ListResult<T> {
    public items: T[] = [];
    public count: number = 0;
    public offset: number = 0;
    public limit: number = 100;
  
    constructor(items: T[] = [], count: number = 0, offset: number = 0, limit: number = 100) {
      this.items = items;
      this.count = count;
      this.offset = offset;
      this.limit = limit;
    }
  }