export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: string): Promise<T>;
  create(...args: any[]): Promise<unknown>;
  update(...args: any[]): Promise<T> | T;
  delete(...args: any[]): Promise<T>;
}
