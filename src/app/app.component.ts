import { Component, VERSION, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  name = "Angular " + VERSION.major;

  fromEvent(target: HTMLInputElement, eventName: string) {
    return new Observable(observer => {
      const handler = (e: unknown) => observer.next(e);
      target.addEventListener(eventName, handler);
      return () => {
        target.removeEventListener(eventName, handler);
      };
    });
  }

  ngAfterViewInit() {
    const ESC_KEY = 27;
    const nameInput = document.getElementById("yourname") as HTMLInputElement;
    this.fromEvent(nameInput, "keydown").subscribe((e: KeyboardEvent) => {
      if (e.keyCode === ESC_KEY) {
        nameInput.value = "";
      }
    });
  }
}
