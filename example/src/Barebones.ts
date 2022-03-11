import {
  Panel,
  Group,
  vlayout,
  layoutConfig,
  Gravity,
  navbar,
  stack,
  VLayout,
  loge,
} from "doric";
import { dangleView, DangleWebGLRenderingContext, vsync } from "dangle";
import * as spine from "doric-spine";

class App implements spine.SpineCanvasApp {
  constructor() {
    //@ts-ignore
    this.skeleton = null;
    //@ts-ignore
    this.animationState = null;
  }

  loadAssets(canvas: spine.SpineCanvas) {
    // Load the skeleton file.
    canvas.assetManager.loadBinary("spine/assets/webgl/spineboy-pro.skel");
    // Load the atlas and its pages.
    canvas.assetManager.loadTextureAtlas(
      "spine/assets/webgl/spineboy-pma.atlas"
    );
  }

  initialize(canvas: spine.SpineCanvas) {
    try {
      let assetManager = canvas.assetManager;

      // Create the texture atlas.
      var atlas = assetManager.require("spine/assets/webgl/spineboy-pma.atlas");

      // Create a AtlasAttachmentLoader that resolves region, mesh, boundingbox and path attachments
      var atlasLoader = new spine.AtlasAttachmentLoader(atlas);

      // Create a SkeletonBinary instance for parsing the .skel file.
      var skeletonBinary = new spine.SkeletonBinary(atlasLoader);

      // Set the scale to apply during parsing, parse the file, and create a new skeleton.
      skeletonBinary.scale = 0.5;
      var skeletonData = skeletonBinary.readSkeletonData(
        assetManager.require("spine/assets/webgl/spineboy-pro.skel")
      );
      //@ts-ignore
      this.skeleton = new spine.Skeleton(skeletonData);

      // Create an AnimationState, and set the "run" animation in looping mode.
      var animationStateData = new spine.AnimationStateData(skeletonData);
      //@ts-ignore
      this.animationState = new spine.AnimationState(animationStateData);
      //@ts-ignore
      this.animationState.setAnimation(0, "run", true);
    } catch (error) {
      loge(error);
    }
  }

  update(canvas: spine.SpineCanvas, delta: number) {
    // Update the animation state using the delta time.
    //@ts-ignore
    this.animationState.update(delta);
    //@ts-ignore
    // Apply the animation state to the skeleton.
    this.animationState.apply(this.skeleton);
    //@ts-ignore
    // Let the skeleton update the transforms of its bones.
    this.skeleton.updateWorldTransform();
  }

  render(canvas: spine.SpineCanvas) {
    let renderer = canvas.renderer;
    // Resize the viewport to the full canvas.
    renderer.resize(spine.ResizeMode.Expand);

    // Clear the canvas with a light gray color.
    canvas.clear(0.2, 0.2, 0.2, 1);

    // Begin rendering.
    renderer.begin();
    // Draw the skeleton
    //@ts-ignore
    renderer.drawSkeleton(this.skeleton, true);
    // Complete rendering.
    renderer.end();
  }
}

@Entry
export class Barebones extends Panel {
  private container?: VLayout;

  onShow() {
    navbar(this.context).setTitle("Barebones");
  }
  build(rootView: Group) {
    const self = this;
    this.container = vlayout([
      stack(
        [
          dangleView({
            onReady: (glContext: DangleWebGLRenderingContext) => {
              const canvas = {
                width: glContext.drawingBufferWidth,
                height: glContext.drawingBufferHeight,
                style: {},
                addEventListener: (() => {}) as any,
                removeEventListener: (() => {}) as any,
                clientWidth: glContext.drawingBufferHeight,
                clientHeight: glContext.drawingBufferHeight,
                getContext: (() => {
                  return gl;
                }) as any,
              } as HTMLCanvasElement;

              const window = {
                devicePixelRatio: 1,
              } as Window;

              var gl = glContext as WebGLRenderingContext;
              //#region code to impl

              new spine.SpineCanvas(
                self.context,
                canvas,
                {
                  app: new App(),
                },
                window
              );

              //#endregion
            },
          }).apply({
            layoutConfig: layoutConfig().just(),
            width: Environment.screenWidth - 4,
            height: Environment.screenWidth - 4,
          }),
        ],
        {
          layoutConfig: layoutConfig().just(),
          width: Environment.screenWidth - 4,
          height: Environment.screenWidth - 4,
        }
      ),
    ])
      .apply({
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      })
      .in(rootView);
  }
}
