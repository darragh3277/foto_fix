export const filters = [
  {
    id: 1,
    name: "Grayscale",
    functionName: "Grayscale",
    enabled: false,
  },
  {
    id: 2,
    name: "Vintage",
    functionName: "Vintage",
    enabled: false,
  },
  {
    id: 3,
    name: "Sepia",
    functionName: "Sepia",
    enabled: false,
  },
  {
    id: 4,
    name: "Polaroid",
    functionName: "Polaroid",
    enabled: false,
  },
  {
    id: 5,
    name: "Black & White",
    functionName: "BlackWhite",
    enabled: false,
  },
  {
    id: 6,
    name: "Kodachrome",
    functionName: "Kodachrome",
    enabled: false,
  },
];

export const sliders = [
  {
    id: 1,
    name: "Brightness",
    functionName: "Brightness",
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
    functionName: "Contrast",
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
    functionName: "Blur",
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
    functionName: "Saturation",
    control: "saturation",
    min: -1,
    max: 1,
    step: 0.1,
    defaultValue: 0,
    value: 0,
  },
  {
    id: 5,
    name: "Hue",
    functionName: "HueRotation",
    control: "rotation",
    min: -2,
    max: 2,
    step: 0.2,
    defaultValue: 0,
    value: 0,
  },
];
