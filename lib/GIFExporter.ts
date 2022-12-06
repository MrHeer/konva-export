import { IStageExporter, GIF } from "./interfaces";

export const gifExporter: IStageExporter<GIF> = (gif: GIF) => {
  console.log({ gif });
};
