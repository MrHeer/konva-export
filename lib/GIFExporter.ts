import Konva from "konva";
import { IStageExporter, GIF } from "./interfaces";

export class GIFExporter implements IStageExporter<GIF> {
  private stage: Konva.Stage;
  private gif: GIF;

  constructor(stage: Konva.Stage) {
    this.stage = stage;
    this.gif = [];
  }

  addFrame(): void {
    this.gif.push(this.stage.toDataURL());
  }

  export(): Array<string> {
    return this.gif;
  }
}
