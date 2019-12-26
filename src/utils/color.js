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
