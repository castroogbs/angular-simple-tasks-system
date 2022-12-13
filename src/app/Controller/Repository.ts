export interface Repository<T>
{
  save(object: T): T;
  getAll(): T[];
  findById(id: string): T;
  update(currentObject: T): void;
  delete(id: string): T;
}
