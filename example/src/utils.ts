import { Color, text, layoutConfig, LayoutSpec, gravity } from "doric";

export const colors = [
  "#70a1ff",
  "#7bed9f",
  "#ff6b81",
  "#a4b0be",
  "#f0932b",
  "#eb4d4b",
  "#6ab04c",
  "#e056fd",
  "#686de0",
  "#30336b",
].map((e) => Color.parse(e));

export function label(str: string) {
  return text({
    text: str,
    textSize: 16,
  });
}

export function title(str: string) {
  return text({
    text: str,
    layoutConfig: layoutConfig().configWidth(LayoutSpec.MOST),
    textSize: 30,
    textColor: Color.WHITE,
    backgroundColor: colors[1],
    textAlignment: gravity().center(),
    height: 50,
  });
}
