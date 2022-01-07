import axios from "axios";
import { readFileSync } from "fs";
import { Resize } from "./resize.js";
/*
 */
export default class asd {
  /*  #url;
  constructor(url) {
    this.#url = url;
  }

  async send({ path, camera, gate }) {
    let buffer = readFileSync(path, { encoding: "base64" });
    buffer = await Resize.process(buffer);
    buffer = buffer.toString("base64");

    await axios.post(`${this.#url}/img`, {
      camera,
      gate,
      buffer
    });
  }*/
}

// /Users/leonardobarbosa/Downloads/IMG_4662.JPG
// /Users/leonardobarbosa/Google Drive/Creatus/Projetos/Gtech/Integração Wegate/Code/gtech-emulator-client/images/plate.jpeg
