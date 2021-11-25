/*
  Warna Suhu versi Javascript.

  DOKUMEN ASLI:
    Colour Rendering of Spectra (https://www.fourmilab.ch/documents/specrend/)
    by John Walker (https://www.fourmilab.ch/)

  LISENSI: 
    Publik Domain. (Sama seperti dokumen aslinya).

  TUJUAN:
    blok program ini hanya fokus membentuk warna (RGB)
    dari suhu (Kelvin) yang diberikan.

  CATATAN:
  - ada beberapa perbedaan terkait nama variabel dan
    bentuk argument fungsi. nama fungsi disamakan
    agar bisa mencocokkan terhadap dokumentasi asli program.
  - tidak semua fungsi ditulis, hanya mengambil seperlunya
*/

const Illuminant = {
  C   : {x: 0.3101,     y: 0.3162},      // For NTSC television
  D65 : {x: 0.3127,     y: 0.3291},      // For EBU and SMPTE
  E   : {x: 0.33333333, y: 0.33333333},  // CIE equal-energy illuminant
}

const Gamma = {
  REC709: 0  // Rec. 709
}

const ColourSystem = {
  NTSC   : { name: "NTSC",            red: {x: 0.67,   y: 0.33   }, green: {x: 0.21,   y: 0.71   }, blue: {x : 0.14,   y: 0.08   }, white: Illuminant.C,    gamma: Gamma.REC709 },
  EBU    : { name: "EBU (PAL/SECAM)", red: {x: 0.64,   y: 0.33   }, green: {x: 0.29,   y: 0.60   }, blue: {x : 0.15,   y: 0.06   }, white: Illuminant.D65,  gamma: Gamma.REC709 },
  SMPTE  : { name: "SMPTE",           red: {x: 0.630,  y: 0.340  }, green: {x: 0.310,  y: 0.595  }, blue: {x : 0.155,  y: 0.070  }, white: Illuminant.D65,  gamma: Gamma.REC709 },
  HDTV   : { name: "HDTV",            red: {x: 0.670,  y: 0.330  }, green: {x: 0.210,  y: 0.710  }, blue: {x : 0.150,  y: 0.060  }, white: Illuminant.D65,  gamma: Gamma.REC709 },
  CIE    : { name: "CIE",             red: {x: 0.7355, y: 0.2645 }, green: {x: 0.2658, y: 0.7243 }, blue: {x : 0.1669, y: 0.0085 }, white: Illuminant.E,    gamma: Gamma.REC709 },
  Rec709 : { name: "CIE REC 709",     red: {x: 0.64,   y: 0.33   }, green: {x: 0.30,   y: 0.60   }, blue: {x : 0.15,   y: 0.06   }, white: Illuminant.D65,  gamma: Gamma.REC709 },
}

const CIE_COLOUR_MATCH = [
  [0.0014,0.0000,0.0065], [0.0022,0.0001,0.0105], [0.0042,0.0001,0.0201],
  [0.0076,0.0002,0.0362], [0.0143,0.0004,0.0679], [0.0232,0.0006,0.1102],
  [0.0435,0.0012,0.2074], [0.0776,0.0022,0.3713], [0.1344,0.0040,0.6456],
  [0.2148,0.0073,1.0391], [0.2839,0.0116,1.3856], [0.3285,0.0168,1.6230],
  [0.3483,0.0230,1.7471], [0.3481,0.0298,1.7826], [0.3362,0.0380,1.7721],
  [0.3187,0.0480,1.7441], [0.2908,0.0600,1.6692], [0.2511,0.0739,1.5281],
  [0.1954,0.0910,1.2876], [0.1421,0.1126,1.0419], [0.0956,0.1390,0.8130],
  [0.0580,0.1693,0.6162], [0.0320,0.2080,0.4652], [0.0147,0.2586,0.3533],
  [0.0049,0.3230,0.2720], [0.0024,0.4073,0.2123], [0.0093,0.5030,0.1582],
  [0.0291,0.6082,0.1117], [0.0633,0.7100,0.0782], [0.1096,0.7932,0.0573],
  [0.1655,0.8620,0.0422], [0.2257,0.9149,0.0298], [0.2904,0.9540,0.0203],
  [0.3597,0.9803,0.0134], [0.4334,0.9950,0.0087], [0.5121,1.0000,0.0057],
  [0.5945,0.9950,0.0039], [0.6784,0.9786,0.0027], [0.7621,0.9520,0.0021],
  [0.8425,0.9154,0.0018], [0.9163,0.8700,0.0017], [0.9786,0.8163,0.0014],
  [1.0263,0.7570,0.0011], [1.0567,0.6949,0.0010], [1.0622,0.6310,0.0008],
  [1.0456,0.5668,0.0006], [1.0026,0.5030,0.0003], [0.9384,0.4412,0.0002],
  [0.8544,0.3810,0.0002], [0.7514,0.3210,0.0001], [0.6424,0.2650,0.0000],
  [0.5419,0.2170,0.0000], [0.4479,0.1750,0.0000], [0.3608,0.1382,0.0000],
  [0.2835,0.1070,0.0000], [0.2187,0.0816,0.0000], [0.1649,0.0610,0.0000],
  [0.1212,0.0446,0.0000], [0.0874,0.0320,0.0000], [0.0636,0.0232,0.0000],
  [0.0468,0.0170,0.0000], [0.0329,0.0119,0.0000], [0.0227,0.0082,0.0000],
  [0.0158,0.0057,0.0000], [0.0114,0.0041,0.0000], [0.0081,0.0029,0.0000],
  [0.0058,0.0021,0.0000], [0.0041,0.0015,0.0000], [0.0029,0.0010,0.0000],
  [0.0020,0.0007,0.0000], [0.0014,0.0005,0.0000], [0.0010,0.0004,0.0000],
  [0.0007,0.0002,0.0000], [0.0005,0.0002,0.0000], [0.0003,0.0001,0.0000],
  [0.0002,0.0001,0.0000], [0.0002,0.0001,0.0000], [0.0001,0.0000,0.0000],
  [0.0001,0.0000,0.0000], [0.0001,0.0000,0.0000], [0.0000,0.0000,0.0000],
]

function spectrum_to_xyz(bbSpectrumCb) {
  var lambda,
    X = 0, Y = 0, Z = 0

  for (var i = 0, lambda = 380; lambda < 780.1; i++, lambda += 5) {
    var Me = bbSpectrumCb(lambda)
    X += Me * CIE_COLOUR_MATCH[i][0]
    Y += Me * CIE_COLOUR_MATCH[i][1]
    Z += Me * CIE_COLOUR_MATCH[i][2]
  }

  var XYZ = X + Y + Z

  return {
    x: X / XYZ,
    y: Y / XYZ,
    z: Z / XYZ,
  }
}

function xyz_to_rgb(colourSystem, coordinate) {
  var xr, yr, zr, xg, yg, zg, xb, yb, zb
  var xw, yw, zw
  var rx, ry, rz, gx, gy, gz, bx, by, bz
  var rw, gw, bw

  xr = colourSystem.red.x;    yr = colourSystem.red.y;    zr = 1 - (xr + yr)
  xg = colourSystem.green.x;  yg = colourSystem.green.y;  zg = 1 - (xg + yg)
  xb = colourSystem.blue.x;   yb = colourSystem.blue.y;   zb = 1 - (xb + yb)

  xw = colourSystem.white.x;  yw = colourSystem.white.y;  zw = 1 - (xw + yw)

  // xyz -> rgb matrix, before scaling to white.
  rx = yg * zb - yb * zg;  ry = xb * zg - xg * zb;  rz = xg * yb - xb * yg
  gx = yb * zr - yr * zb;  gy = xr * zb - xb * zr;  gz = xb * yr - xr * yb
  bx = yr * zg - yg * zr;  by = xg * zr - xr * zg;  bz = xr * yg - xg * yr

  // White scaling factors.
  //   Dividing by yw scales the white luminance to unity, as conventional.
  rw = (rx * xw + ry * yw + rz * zw) / yw
  gw = (gx * xw + gy * yw + gz * zw) / yw
  bw = (bx * xw + by * yw + bz * zw) / yw

  // xyz -> rgb matrix, correctly scaled to white.
  rx = rx / rw;  ry = ry / rw;  rz = rz / rw
  gx = gx / gw;  gy = gy / gw;  gz = gz / gw
  bx = bx / bw;  by = by / bw;  bz = bz / bw

  // rgb of the desired point
  return {
    r: rx * coordinate.x + ry * coordinate.y + rz * coordinate.z,
    g: gx * coordinate.x + gy * coordinate.y + gz * coordinate.z,
    b: bx * coordinate.x + by * coordinate.y + bz * coordinate.z,
  }
}

function constrain_rgb(colour) {
  var c = { ...colour }

  // Amount of white needed is w = - min(0, *r, *g, *b)
  var w = Math.min(0, colour.r, colour.g, colour.b) * -1

  // TRUE when colour modified to fit RGB gamut
  // FALSE when colour within RGB gamut
  var approximation = ( w > 0 )

  // Add just enough white to make r, g, b all positive.
  if (approximation) {
    c.r += w
    c.g += w
    c.b += w
  }

  return {
    colour: c,
    approximation,
  }
}

function norm_rgb(colour) {
  var c = { ...colour }
  var greatest = Math.max(colour.r, colour.g, colour.b)

  if (greatest > 0) {
    c.r /= greatest
    c.g /= greatest
    c.b /= greatest
  }

  return c
}

function gamma_correct(colourSystem, c) {
  var gamma = colourSystem.gamma

  if (gamma == Gamma.REC709) {
    var cc = 0.018

    if (c < cc) {
      // Rec. 709 gamma correction.
      c *= ((1.099 * Math.pow(cc, 0.45)) - 0.099) / cc
    } else {
      c = (1.099 * Math.pow(c, 0.45)) - 0.099
    }
  } else {
    // Nonlinear colour = (Linear colour)^(1/gamma)
    c = Math.pow(c, 1.0 / gamma)
  }
}

function gamma_correct_rgb(colourSystem, colour) {
  return {
    r: gamma_correct(colourSystem, colour.r),
    g: gamma_correct(colourSystem, colour.g),
    b: gamma_correct(colourSystem, colour.b),
  }
}

function bb_spectrum(bbTemp) {
  return function (wavelength) {
    var wlm = wavelength * 1e-9 // Wavelength in meters

    return (
      (3.74183e-16 * Math.pow(wlm, -5.0)) /
      (Math.exp(1.4388e-2 / (wlm * bbTemp)) - 1.0)
    )
  }
}

/*  Built-in test program which displays the x, y, and Z and RGB
    values for black body spectra from 1000 to 10000 degrees kelvin.
    When run, this program should produce the following output:

    Temperature       x      y      z       R     G     B
    -----------    ------ ------ ------   ----- ----- -----
        1000 K      0.6528 0.3444 0.0028   1.000 0.007 0.000 (Approximation)
        1500 K      0.5857 0.3931 0.0212   1.000 0.126 0.000 (Approximation)
        2000 K      0.5267 0.4133 0.0600   1.000 0.234 0.010
        2500 K      0.4770 0.4137 0.1093   1.000 0.349 0.067
        3000 K      0.4369 0.4041 0.1590   1.000 0.454 0.151
        3500 K      0.4053 0.3907 0.2040   1.000 0.549 0.254
        4000 K      0.3805 0.3768 0.2428   1.000 0.635 0.370
        4500 K      0.3608 0.3636 0.2756   1.000 0.710 0.493
        5000 K      0.3451 0.3516 0.3032   1.000 0.778 0.620
        5500 K      0.3325 0.3411 0.3265   1.000 0.837 0.746
        6000 K      0.3221 0.3318 0.3461   1.000 0.890 0.869
        6500 K      0.3135 0.3237 0.3628   1.000 0.937 0.988
        7000 K      0.3064 0.3166 0.3770   0.907 0.888 1.000
        7500 K      0.3004 0.3103 0.3893   0.827 0.839 1.000
        8000 K      0.2952 0.3048 0.4000   0.762 0.800 1.000
        8500 K      0.2908 0.3000 0.4093   0.711 0.766 1.000
        9000 K      0.2869 0.2956 0.4174   0.668 0.738 1.000
        9500 K      0.2836 0.2918 0.4246   0.632 0.714 1.000
       10000 K      0.2807 0.2884 0.4310   0.602 0.693 1.000
*/

function main() {
  var colourSystem = ColourSystem.SMPTE

  console.log("Temperature       x      y      z       R     G     B\n")
  console.log("-----------    ------ ------ ------   ----- ----- -----\n")

  for (var t = 1000; t <= 10000; t += 500) {
    var coord = spectrum_to_xyz(bb_spectrum(t))
    var rgb = xyz_to_rgb(colourSystem, coord)
    var crgb = constrain_rgb(rgb)
    var finalrgb = norm_rgb(crgb.colour)

    var text = "  "
    text += t.toString().padStart(5, " ") + " K"
    text += "      "
    text += coord.x.toFixed(4) + " " + coord.y.toFixed(4) + " " + coord.z.toFixed(4)
    text += "   "
    text += finalrgb.r.toFixed(3) + " " + finalrgb.g.toFixed(3) + " " + finalrgb.b.toFixed(3)
    text += crgb.approximation ? " (Approximation)" : ""
    
    console.log(text)
  }
}

function generateColorTemp(bbTemp, colourSystem) {
  // default value of colourSystem
  colourSystem = !!colourSystem ? colourSystem : ColourSystem.SMPTE

  var coordinate = spectrum_to_xyz(bb_spectrum(bbTemp))
  var rgb = xyz_to_rgb(colourSystem, coordinate)
  var crgb = constrain_rgb(rgb)
  var finalrgb = norm_rgb(crgb.colour)
  return {
    ...finalrgb,
    approximation: crgb.approximation
  }
}
