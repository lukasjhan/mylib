import { Observer } from "../interface/observer";

export class ConsoleLoggor implements Observer<string> {
  public update(log: string) {
    console.log(log);
  }
}
