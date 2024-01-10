import { Vector2 } from "./Vector2";

export class Sprite {
  constructor({
    resource,   // image to draw
    frameSize,  // size of crop of image
    hFrames,    // how the sprite is arranged horizontally
    vFrames,    // how the sprite is arranged vertically 
    frame,      // which frame we want to show
    scale,      // how large to draw the image
    position,   // where to draw from top left corner
  }) {
    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16,16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0,0);
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v=0; v<this.vFrames; v++) {
      for (let h=0; h<this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(h * this.frameSize.x, v * this.frameSize.y)
        )
        frameCount++;
      }
    }
  }

  drawImage(ctx, x, y) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Find the correct sprite sheet frame to use
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY,
      frameSizeX, // How much to crop from sprite sheet, x & y
      frameSizeY,
      x,          // Where to place on canvas, x & y
      y,
      frameSizeX * this.scale, // Scale in x & y directions
      frameSizeY * this.scale,
    );

    
  }
}