export function rgbToHex(r_:number, g_:number, b_:number, a_:number) {
  let r:string = r_.toString(16);
  let g = g_.toString(16);
  let b = b_.toString(16);
  let a = Math.round(a_ * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;

  return "#" + r + g + b + a;  
}