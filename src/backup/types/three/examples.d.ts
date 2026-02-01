declare module "three/examples/jsm/loaders/OBJLoader" {
  import { Loader, Group } from "three";
  export class OBJLoader extends Loader {
    constructor();
    load(
      url: string,
      onLoad: (obj: Group) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
    parse(text: string): Group;
  }
}
