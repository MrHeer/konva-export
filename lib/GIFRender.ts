import { GIF } from "./interfaces";

export class GIFRender {
  private imgElement: HTMLImageElement;
  private requestAnimationFrameId: number | null = null;

  constructor(imgElement: HTMLImageElement) {
    this.imgElement = imgElement;
  }

  render(gif: GIF) {
    this.dispose();

    let index = 0;
    const step = () => {
      this.imgElement.src = gif[index];
      index = index + 1;
      if (index === gif.length) {
        index = 0;
      }
      this.requestAnimationFrameId = requestAnimationFrame(step);
    };

    this.requestAnimationFrameId = requestAnimationFrame(step);
  }

  dispose() {
    if (this.requestAnimationFrameId !== null) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      this.requestAnimationFrameId = null;
    }
  }
}
