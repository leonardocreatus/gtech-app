import sizeOf from "image-size";
//import sharp from "sharp";
import { Buffer } from "buffer";

class Resize {
  static async process(buffer) {
    let img = Buffer.from(buffer, "base64");
    let info = sizeOf(img);

    console.log(info);

    let width =
      info.orientation == 1 || !info.orientation ? info.width : info.height;
    let height =
      info.orientation == 1 || !info.orientation ? info.height : info.width;

    console.log("width", width);
    console.log("height", height);

    const perc = 960 / height;

    let data; /*= await sharp(img)
      .rotate()
      .resize(width * perc, 960)
      .toBuffer();*/

    info = sizeOf(data);
    width = info.width;
    height = info.height;

    console.log("width", width);
    console.log("height", height);

    return data;
  }
}

export { Resize };
