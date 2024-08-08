



export class ApiResponse<T> {
    
    constructor(
      public page: number,
      public per_page: number,
      public total: number,
      public total_pages: number,
      public data: T[]
    ) {}
  }
  
