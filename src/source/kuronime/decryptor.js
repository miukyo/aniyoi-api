var Chara = [
  "",
  "split",
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/",
  "slice",
  "indexOf",
  "",
  "",
  ".",
  "pow",
  "reduce",
  "reverse",
  "0",
];
function charDec(d,e,f) {
  var g = Chara[2][Chara[1]](Chara[0]);
  var h = g[Chara[3]](0, e);
  var i = g[Chara[3]](0, f);
  var j = d[Chara[1]](Chara[0])
    [Chara[10]]()
    [Chara[9]](function (a, b, c) {
      if (h[Chara[4]](b) !== -1)
        return (a += h[Chara[4]](b) * Math[Chara[8]](e, c));
    }, 0);
  var k = Chara[0];
  while (j > 0) {
    k = i[j % f] + k;
    j = (j - (j % f)) / f;
  }
  return k || Chara[11];
}

export default function decy(h, u, n, t, e, r) {
  r = "";
  for (var i = 0, len = h.length; i < len; i++) {
    var s = "";
    while (h[i] !== n[e]) {
      s += h[i];
      i++;
    }
    for (var j = 0; j < n.length; j++) s = s.replace(new RegExp(n[j], "g"), j);
    r += String.fromCharCode(charDec(s, e, 10) - t);
  }
  return decodeURIComponent(escape(r));
}
