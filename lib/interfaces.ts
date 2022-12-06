export interface IStageExporter<T> {
  addFrame(): void;
  export(): T;
}

export type DataURL = string;

export type GIF = Array<DataURL>;
