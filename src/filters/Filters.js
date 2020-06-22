import { fabric } from "fabric";
export const filterOptions = [
  {
    id: 1,
    name: "Grayscale",
    function: new fabric.Image.filters.Grayscale(),
  },
  { id: 2, name: "Vintage", function: new fabric.Image.filters.Vintage() },
  { id: 3, name: "Sepia", function: new fabric.Image.filters.Sepia() },
];

export const sliders = [
  {
    id: 1,
    name: "Brightness",
    control: "brightness",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
    value: 0,
  },
  {
    id: 2,
    name: "Contrast",
    control: "contrast",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
    value: 0,
  },
  {
    id: 3,
    name: "Blur",
    control: "blur",
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 0,
    value: 0,
  },
  {
    id: 4,
    name: "Saturation",
    control: "saturation",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
    value: 0,
  },
  {
    id: 5,
    name: "Pixelate",
    control: "blocksize",
    min: 2,
    max: 20,
    step: 1,
    defaultValue: 2,
    value: 2,
  },
];
