import Konva from "konva";

import { Animation, gifExporter, GIFRecorder, GIFRender } from "../lib/main";

import "./style.css";

// scale animation
const { animate } = new Animation(1);

const gifRender = new GIFRender(
  document.getElementById("img") as HTMLImageElement
);

const stage = new Konva.Stage({
  container: "container",
  width: 500,
  height: 500,
});

const recorder = new GIFRecorder(stage);

const layer = new Konva.Layer();

const group = new Konva.Group({
  x: stage.width() / 2,
  y: stage.height() / 2,
});

const circle = new Konva.Circle({
  radius: 70,
  fill: "red",
  strokeWidth: 4,
});

const text = new Konva.Text({
  text: "Click",
  fontSize: 20,
  fontFamily: "Calibri",
  align: "center",
});
text.offsetX(text.width() / 2);
text.offsetY(text.height() / 2);

group.add(circle);
group.add(text);

const clickHandler = () => {
  animate({
    velocity: -10,
    type: "spring",
    restDelta: 0.0001,
    onUpdate: (scale) => {
      circle.scale({ x: scale, y: scale });
    },
  });
};

const bindClickHandler = () => {
  group.addEventListener("click", clickHandler);
};

const bindHoverEffect = () => {
  group.on("mouseenter", () => {
    recorder.record();
    stage.container().style.cursor = "pointer";
    animate({
      to: 1.2,
      type: "spring",
      onUpdate: (scale) => {
        circle.scale({ x: scale, y: scale });
      },
    });
  });

  group.on("mouseleave", () => {
    stage.container().style.cursor = "default";
    animate({
      to: 1,
      type: "spring",
      onUpdate: (scale) => {
        circle.scale({ x: scale, y: scale });
      },
      onComplete: () => {
        recorder.finish();
        const gif = recorder.data();
        gifExporter(gif);
        gifRender.render(gif);
      },
    });
  });
};

bindHoverEffect();
bindClickHandler();

layer.add(group);
stage.add(layer);
