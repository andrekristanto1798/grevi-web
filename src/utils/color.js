/* eslint-disable */
function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function makeColor(colorNum, colors) {
  const color = (colorNum * (300 / colors)) % 360;
  return hslToHex(color, 100, 50);
}

function padZero(str, len = 2) {
  const zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

export function invertColor(hex, bw) {
  let color = hex;
  if (color.indexOf('#') === 0) {
    color = color.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }
  if (color.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  let r = parseInt(color.slice(0, 2), 16);

  let g = parseInt(color.slice(2, 4), 16);

  let b = parseInt(color.slice(4, 6), 16);
  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  }
  // invert color components
  r = (255 - r).toString(16);
  g = (255 - g).toString(16);
  b = (255 - b).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

export const COLORS = {
  blueNormal: '#2185d0',
  blueHighlight: '#0d71bb',
  redNormal: '#db2828',
  grayNormal: '#cacbcd',
};

export const getDefaultColorMap = values => {
  return values.reduce(
    (acc, value, index) => ({
      ...acc,
      [value]: makeColor(index, values.length),
    }),
    {},
  );
};
