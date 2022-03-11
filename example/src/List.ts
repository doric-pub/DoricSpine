import {
  Group,
  Panel,
  gravity,
  Color,
  LayoutSpec,
  vlayout,
  scroller,
  layoutConfig,
  navigator,
} from "doric";
import { title, label, colors } from "./utils";
import { Example } from "./Example";
import { Barebones } from "./Barebones";

@Entry
class List extends Panel {
  build(rootView: Group): void {
    scroller(
      vlayout(
        [
          title("Doric Spine"),
          label("Example").apply({
            width: 200,
            height: 50,
            backgroundColor: colors[0],
            textSize: 30,
            textColor: Color.WHITE,
            layoutConfig: layoutConfig().just(),
            onClick: () => {
              navigator(this.context).push(Example);
            },
          }),
          label("Barebones").apply({
            width: 200,
            height: 50,
            backgroundColor: colors[0],
            textSize: 30,
            textColor: Color.WHITE,
            layoutConfig: layoutConfig().just(),
            onClick: () => {
              navigator(this.context).push(Barebones);
            },
          }),
        ],
        {
          layoutConfig: layoutConfig().most().configHeight(LayoutSpec.FIT),
          gravity: gravity().center(),
          space: 10,
        }
      ),
      {
        layoutConfig: layoutConfig().most(),
        backgroundColor: Color.BLUE,
      }
    ).in(rootView);
  }
}
