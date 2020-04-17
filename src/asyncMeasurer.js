import ReactDOM from "react-dom";

const containerStyle = {
  display: "inline-block",
  position: "absolute",
  visibility: "hidden",
  zIndex: -1
};

/**
 * Creates the hidden div appended to the document body
 */
export const createMeasureLayer = debug => {
  const container = document.createElement("div");
  container.setAttribute("id", "measure-layer");
  if (!debug) {
    container.style = containerStyle;
  }
  document.body.appendChild(container);
  return container;
};

/**
 * Destroy the measuring layer.
 * Should be called when the dynamic list is unmounted.
 */
export const destroyMeasureLayer = () => {
  const container = document.querySelector("#measure-layer");
  if (container) {
    container.parentNode.removeChild(container);
  }
};

/**
 * Measure an element by temporary rendering it.
 */
const measureElement = (element, debug) => {
  const container =
    document.querySelector("#measure-layer") || createMeasureLayer(debug);

  // Renders the React element into the hidden div
  ReactDOM.render(element, container);

  // Gets the element size
  const child = container.querySelector("#item-container");
  const height = child.offsetHeight;
  const width = child.offsetWidth;

  // Removes the element from the document
  if (!debug) {
    ReactDOM.unmountComponentAtNode(container);
  }

  return { height, width };
};

export default measureElement;
