# EXPERIMENTAL

WPF app using typescript

## TODO:

+ Fix buttons
+ Allow order to be decided on the js/ts side
+ Add other elements and properties

### Example:
```ts
import { MyWpfApp } from "./WPFInTS";

const app = new MyWpfApp();

app.setWindow({
  title: "Swyft's WPF",
  width: 300,
  height: 200,
  backgroundColor: "#3e3e3e",
  foregroundColor: "#fff",
});

app.addTextBlock({
  text: "Centered content!",
  verticalAlignment: "center",
  horizontalAlignment: "center",
});

app.addTextBlock({
  text: "Left content!",
  verticalAlignment: "center",
  horizontalAlignment: "left",
});

app.addTextBlock({
  text: "Right content!",
  verticalAlignment: "center",
  horizontalAlignment: "right",
});

app.addButton({
  text: "Button",
  verticalAlignment: "center",
  horizontalAlignment: "center",
  backgroundColor: "#1877F2",
  foregroundColor: "#fff",
  onClick: () => {
    console.log("Hello there!");
  },
});

app.render();
```