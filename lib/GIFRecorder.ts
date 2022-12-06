import Konva from "konva";
import { GIF, IStageRecorder } from "./interfaces";

export class GIFRecorder implements IStageRecorder<GIF> {
  private stage: Konva.Stage;
  private gif: GIF;
  private requestAnimationFrameId: number | null = null;

  constructor(stage: Konva.Stage) {
    this.stage = stage;
    this.gif = [];
  }

  private recording = () => {
    this.gif.push(this.stage.toDataURL());
    this.requestAnimationFrameId = requestAnimationFrame(this.recording);
  };

  private isRecording = () => {
    return this.requestAnimationFrameId !== null;
  };

  record = () => {
    if (this.isRecording()) {
      console.warn("Still recording.");
      return;
    }
    console.log("Recording.");
    this.gif = [];
    this.recording();
  };

  finish = () => {
    if (this.isRecording()) {
      console.log("Finish recording.");
      cancelAnimationFrame(this.requestAnimationFrameId!);
      this.requestAnimationFrameId = null;
    }
  };

  data = () => {
    if (this.isRecording()) {
      throw "Still recording. Please call finish first.";
    }
    return this.gif;
  };
}
