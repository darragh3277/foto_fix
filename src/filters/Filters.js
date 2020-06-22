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
