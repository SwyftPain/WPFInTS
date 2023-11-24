import { Func, func } from "edge-js";
import path from "path";

interface IWindow {
  title?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  foregroundColor?: string;
}

interface ITextBlock {
  text: string;
  verticalAlignment?: "top" | "bottom" | "center" | "stretch";
  horizontalAlignment?: "left" | "right" | "center" | "stretch";
}

interface IButton {
  text: string;
  onClick?: () => void;
  verticalAlignment?: "top" | "bottom" | "center" | "stretch";
  horizontalAlignment?: "left" | "right" | "center" | "stretch";
  backgroundColor?: string;
  foregroundColor?: string;
}

class MyWpfApp {
  title!: string;
  width!: number;
  height!: number;
  backgroundColor?: string;
  foregroundColor?: string;
  textBlocks: ITextBlock[] = [];
  buttons: IButton[] = [];
  wpfApp: Func<unknown, unknown>;

  constructor() {
    this.wpfApp = func(path.join(__dirname, "myClass.cs"));
  }

  setWindow(window: IWindow) {
    this.title = window.title ? window.title : "WPF from Node.js";
    this.width = window.width ? window.width : 300;
    this.height = window.height ? window.height : 200;
    this.backgroundColor = window.backgroundColor
      ? window.backgroundColor
      : "#FFFFFF";
    this.foregroundColor = window.foregroundColor
      ? window.foregroundColor
      : "#000000";
  }

  addTextBlock(textBlock: ITextBlock) {
    const wpfTextBlock: ITextBlock = {
      text: textBlock.text,
      verticalAlignment: textBlock.verticalAlignment || "center",
      horizontalAlignment: textBlock.horizontalAlignment || "center",
    };

    this.textBlocks.push(wpfTextBlock);
  }

  addButton(button: IButton) {
    const defaultBackgroundColor = "#FFFFFF"; // Default background color (white)
    const defaultForegroundColor = "#000000"; // Default foreground color (black)

    const wpfButton: IButton = {
      text: button.text,
      onClick: button.onClick,
      verticalAlignment: button.verticalAlignment || "center",
      horizontalAlignment: button.horizontalAlignment || "center",
      backgroundColor: button.backgroundColor || defaultBackgroundColor,
      foregroundColor: button.foregroundColor || defaultForegroundColor,
    };

    this.buttons.push(wpfButton);
  }

  render() {
    this.wpfApp(this, (error, result) => {
      if (error) throw error;
      console.log("WPF window displayed successfully");
    });
  }
}

export { MyWpfApp };
