export type ID = string | number;

export default class GenericApi<T, CreateDto = Partial<T> , UpdateDto= Partial<T>> { 
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAll(): Promise<T[]> {
      const res= await fetch(this.baseUrl);
      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return (await res.json()) as Promise<T[]>;
    }

    async getById(id: ID): Promise<T> {
      const res= await fetch(`${this.baseUrl}/${id}`);
      if(!res.ok){
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      return (await res.json()) as Promise<T>;
    }

    async create(data: CreateDto): Promise<T>{
        const res= await fetch(this.baseUrl,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(data),
        })

        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json() as Promise<T>;
    }

    async update(id:ID,data: UpdateDto): Promise<T>{
        const res= await fetch(`${this.baseUrl}/${id}`,{
            method:'PUT',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(data),
        })

        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return await res.json() as Promise<T>;
    }

    async delete(id:ID): Promise<void>{
        const res= await fetch(`${this.baseUrl}/${id}`,{
            method:'DELETE',
        });

        if(!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return;
    }
}