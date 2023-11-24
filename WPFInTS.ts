import { Func, func } from "edge-js";
import path from "path";

interface IWindow {
  /**
   * Title of the main window
   */
  title?: string;
  /**
   * Width of the main window
   */
  width?: number;
  /**
   * Height of the main window
   */
  height?: number;
  /**
   * Background color of the main window
   */
  backgroundColor?: string;
  /**
   * Foreground color of the main window
   */
  foregroundColor?: string;
}

interface ITextBlock {
  /**
   * Text to display in the TextBlock
   */
  text: string;
  /**
   * Vertical position of the TextBlock
   */
  verticalAlignment?: "top" | "bottom" | "center" | "stretch";
  /**
   * Horizontal position of the TextBlock
   */
  horizontalAlignment?: "left" | "right" | "center" | "stretch";
}

interface IButton {
  /**
   * The text displayed on the button
   */
  text: string;
  /**
   * @ignore The function to execute when the button is pressed
   */
  onClick?: () => void;
  /**
   * Vertical position of the button
   */
  verticalAlignment?: "top" | "bottom" | "center" | "stretch";
  /**
   * Horizontal position of the button
   */
  horizontalAlignment?: "left" | "right" | "center" | "stretch";
  /**
   * Background color of the button
   */
  backgroundColor?: string;
  /**
   * Foreground color of the button
   */
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

  /**
   * Set the main window
   * @param window Main window properties
   */
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

  /**
   * Add TextBlocks to the main window
   * @param textBlock TextBlock properties
   */
  addTextBlock(textBlock: ITextBlock) {
    const wpfTextBlock: ITextBlock = {
      text: textBlock.text,
      verticalAlignment: textBlock.verticalAlignment || "center",
      horizontalAlignment: textBlock.horizontalAlignment || "center",
    };

    this.textBlocks.push(wpfTextBlock);
  }

  /**
   * Add Buttons to the main window
   * @param button Button properties
   */
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

  /**
   * Display the GUI app
   */
  render() {
    this.wpfApp(this, (error, result) => {
      if (error) throw error;
      console.log("WPF window displayed successfully");
    });
  }
}

export { MyWpfApp };
