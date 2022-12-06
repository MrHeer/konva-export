export interface IStageExporter<T> {
  (record: T): void;
}

export interface IStageRecorder<T> {
  record(): void;
  finish(): void;
  data(): T;
}

export type DataURL = string;

export type GIF = Array<DataURL>;
