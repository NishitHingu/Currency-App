import { useLayoutEffect, useState } from "react";

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
        let height = window.innerHeight - 150; // removing the height taken by navbar, padding etc 
        let width = window.innerWidth;
        if (width > 1000) {
            width -= 500;
        } else if (width > 800) {
            width -= 200;
        } else if (width > 600) {
            width -= 120;
        } else if (width > 400) {
            width -= 100;
        } else {
            width -= 40;
        }
        setSize([width, height]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}
