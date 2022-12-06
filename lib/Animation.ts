import {
  animate as popAnimate,
  AnimationOptions,
  SpringOptions,
} from "popmotion";

const noop = () => {};

export class Animation {
  private state: number;
  private velocity: number;
  private stop = noop;
  constructor(state?: number, velocity?: number) {
    this.state = state ?? 0;
    this.velocity = velocity ?? 0;
  }

  animate = (options: AnimationOptions<number>) => {
    this.stop = popAnimate({
      ...options,
      from: this.state,
      velocity: Object.hasOwn(options, "velocity")
        ? (options as SpringOptions).velocity
        : this.velocity,
      onPlay: () => {
        // Stop last animation
        this.stop();
        options.onPlay?.();
      },
      onUpdate: (latest: number) => {
        this.velocity = latest - this.state;
        this.state = latest;
        options.onUpdate?.(latest);
      },
    }).stop;
  };
}
