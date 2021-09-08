/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: v1.0.1
 * GitHub: https://github.com/hustcc/canvas-nest.js
 **/


// 动态离子背景
// 匿名函数防止命名冲突的问题
function dynamicalLizi() {
  function n(n, e, t) {
    return n.getAttribute(e) || t;
  }
  function e(n) {
    return document.getElementsByTagName(n);
  }
  function t() {
    let t = e("script"),
      o = t.length,
      i = t[o - 1];
    return {
      l: o,
      z: n(i, "zIndex", -9999),
      o: n(i, "opacity", 1),
      c: n(i, "color", "138,43,226"),
      n: n(i, "count",234),
    };
  }
  function o() {
    (a = m.width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth),
      (c = m.height =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight);
  }
  function i() {
    r.clearRect(0, 0, a, c);
    let n, e, t, o, m, l;
    s.forEach(function (i, x) {
      for (
        i.x += i.xa,
          i.y += i.ya,
          i.xa *= i.x > a || i.x < 0 ? -1 : 1,
          i.ya *= i.y > c || i.y < 0 ? -1 : 1,
          r.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
          e = x + 1;
        e < u.length;
        e++
      )
        (n = u[e]),
          null !== n.x &&
            null !== n.y &&
            ((o = i.x - n.x),
            (m = i.y - n.y),
            (l = o * o + m * m),
            l < n.max &&
              (n === y &&
                l >= n.max / 2 &&
                ((i.x -= 0.03 * o), (i.y -= 0.03 * m)),
              (t = (n.max - l) / n.max),
              r.beginPath(),
              (r.lineWidth = t / 2),
              (r.strokeStyle = "rgba(" + d.c + "," + (t + 0.2) + ")"),
              r.moveTo(i.x, i.y),
              r.lineTo(n.x, n.y),
              r.stroke()));
    }),
      x(i);
  }
  let a,
    c,
    u,
    m = document.createElement("canvas"),
    d = t(),
    l = "c_n" + d.l,  
    r = m.getContext("2d"),
    x =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (n) {
        window.setTimeout(n, 1e3 / 45);
      },
    w = Math.random,
    y = {
      x: null,
      y: null,
      max: 2e4,
    };
  (m.id = l),
    (m.style.cssText =
      "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o),
    e("body")[0].appendChild(m),
    o(),
    (window.onresize = o),
    (window.onmousemove = function (n) {
      (n = n || window.event), (y.x = n.clientX), (y.y = n.clientY);
    }),
    (window.onmouseout = function () {
      (y.x = null), (y.y = null);
    });
  for (var s = [], f = 0; d.n > f; f++) {
    let h = w() * a,
      g = w() * c,
      v = 2 * w() - 1,
      p = 2 * w() - 1;
    s.push({
      x: h,
      y: g,
      xa: v,
      ya: p,
      max: 6e3,
    });
  }
  (u = s.concat([y])),
    setTimeout(function () {
      i();
    }, 1000);
}

document.addEventListener("touchmove", function (e) {
  e.preventDefault();
});

//   var c = document.getElementsByTagName('canvas')[0],
let c = document.getElementById("anomalyBg"),
  x = c.getContext("2d"),
  pr = window.devicePixelRatio || 1, //返回当前显示设备的物理像素分辨率与CSS像素分辨率之比
  f = 180,
  w,
  h,
  q,
  r = 0,
  u = Math.PI * 2,
  v = Math.cos,
  z = Math.random;

x.scale(pr, pr); // 是 Canvas 2D API 根据 x 水平方向和 y 垂直方向，为canvas 单位添加缩放变换的方法。
x.globalAlpha = 0.5; //设置图形和图片透明度的属性

c.style.cssText =
  "position:fixed;top:0;left:0;pointer-events:none;z-index:-999999"; //设置为固定定位

//document.body.appendChild(c); //添加到body中



window.onload = function () {

  // 动态离子渲染
  dynamicalLizi();
};

// window.onresize = function(){
//   console.log("屏幕")
//    // 动态离子渲染
//    //dynamicalLizi();
//    // 不规则图像渲染
//    i();
// }

// let flag = true;
// window.addEventListener(
//   "resize",
//   () => {
//     if(flag){
//       flag = !flag;
//       setTimeout(() => {
//         i();
//         flag = !flag;
//       }, 1500);
//     }
//   },
//   false
// );
