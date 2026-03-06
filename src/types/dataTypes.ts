export type DataType = 'ai' | 'software' | 'privateSector';

export interface BaseItem {
  id: number;        
  type: DataType;
  data: unknown;    
}