import { animate as popAnimate, AnimationOptions } from "popmotion";

const noop = () => {};

export class Animation {
  private state?: number;
  private stop = noop;
  constructor(state?: number) {
    this.state = state;
  }

  animate = (options: AnimationOptions<number>) => {
    this.stop = popAnimate({
      ...options,
      from: this.state,
      onPlay: () => {
        // Stop last animation
        this.stop();
        options.onPlay?.();
      },
      onUpdate: (latest: number) => {
        this.state = latest;
        options.onUpdate?.(latest);
      },
    }).stop;
  };
}
