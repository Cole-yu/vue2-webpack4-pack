var whenReady = (function() {
	var funcs = [];
	var ready = false;

	function handler(e) {
		if (ready) {
			return
		}
		if (e.type === "onreadystatechange" && document.readyState !== "complete") {
			return
		}
		for (var i = 0; i < funcs.length; i++) {
			funcs[i].call(document)
		}
		ready = true;
		funcs = null
	}
	if (document.addEventListener) {
		document.addEventListener("DOMContentLoaded", handler, false);
		document.addEventListener("readystatechange", handler, false);
		window.addEventListener("load", handler, false)
	} else {
		if (document.attachEvent) {
			document.attachEvent("onreadystatechange", handler);
			window.attachEvent("onload", handler)
		}
	}
	return function whenReady(fn) {
		if (ready) {
			fn.call(document)
		} else {
			funcs.push(fn)
		}
	}
})();

function setResize() {
	var doc = document,
		win = window;
	var docEl = doc.documentElement,
		con = doc.getElementById("container"),
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			var clientWidth = con.clientWidth;
			if (!clientWidth) {
				return
      }
      var value = Math.min(100 * (clientWidth / 750), 100);
      docEl.style.fontSize = value + "px";
			window.fontSize = value;
			document.body.style.visibility = "visible";
		};
	if (!doc.addEventListener) {
		return
	}
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false)
}
whenReady(setResize);