import Konva from "konva";
import { animate } from "popmotion";

import { GIFExporter, GIFRender } from "../lib/main";

import "./style.css";

const gifRender = new GIFRender(
  document.getElementById("img") as HTMLImageElement
);

const stage = new Konva.Stage({
  container: "container",
  width: 500,
  height: 500,
});

const layer = new Konva.Layer();

const group = new Konva.Group({
  x: stage.width() / 2,
  y: stage.height() / 2,
});

group.on("mouseenter", () => {
  stage.container().style.cursor = "pointer";
});

group.on("mouseleave", () => {
  stage.container().style.cursor = "default";
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

group.addEventListener("click", () => {
  const exporter = new GIFExporter(stage);
  animate({
    from: 1,
    velocity: -10,
    type: "spring",
    restDelta: 0.0001,
    onUpdate: (scale) => {
      scale = scale;
      circle.scale({ x: scale, y: scale });
      exporter.addFrame();
    },
    onComplete: () => {
      const gif = exporter.export();
      gifRender.render(gif);
    },
  });
});

layer.add(group);

stage.add(layer);

layer.draw();
