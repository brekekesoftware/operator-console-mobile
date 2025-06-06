'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = _default
var regexp = {
  // summary:
  //		Regular expressions and Builder resources
}
regexp.escapeString = function (/*String*/ str, /*String?*/ except) {
  // summary:
  //		Adds escape sequences for special characters in regular expressions
  // except:
  //		a String with special characters to be left unescaped

  return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function (ch) {
    if (except && except.indexOf(ch) != -1) {
      return ch
    }
    return '\\' + ch
  }) // String
}
function _default(
  /*String*/ name,
  /*String?*/ value,
  /*__cookieProps?*/ props,
) {
  // summary:
  //		Get or set a cookie.
  // description:
  //		If one argument is passed, returns the value of the cookie
  //		For two or more arguments, acts as a setter.
  // name:
  //		Name of the cookie
  // value:
  //		Value for the cookie
  // props:
  //		Properties for the cookie
  // example:
  //		set a cookie with the JSON-serialized contents of an object which
  //		will expire 5 days from now:
  //	|	require(["dojo/cookie", "dojo/json"], function(cookie, json){
  //	|		cookie("configObj", json.stringify(config, {expires: 5 }));
  //	|	});
  //
  // example:
  //		de-serialize a cookie back into a JavaScript object:
  //	|	require(["dojo/cookie", "dojo/json"], function(cookie, json){
  //	|		config = json.parse(cookie("configObj"));
  //	|	});
  //
  // example:
  //		delete a cookie:
  //	|	require(["dojo/cookie"], function(cookie){
  //	|		cookie("configObj", null, {expires: -1});
  //	|	});
  var c = document.cookie,
    ret
  if (arguments.length == 1) {
    var matches = c.match(
      new RegExp('(?:^|; )' + regexp.escapeString(name) + '=([^;]*)'),
    )
    ret = matches ? decodeURIComponent(matches[1]) : undefined
  } else {
    props = props || {}
    // FIXME: expires=0 seems to disappear right away, not on close? (FF3)  Change docs?
    var exp = props.expires
    if (typeof exp == 'number') {
      var d = new Date()
      d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000)
      exp = props.expires = d
    }
    if (exp && exp.toUTCString) {
      props.expires = exp.toUTCString()
    }
    value = encodeURIComponent(value)
    var updatedCookie = name + '=' + value,
      propName
    for (propName in props) {
      updatedCookie += '; ' + propName
      var propValue = props[propName]
      if (propValue !== true) {
        updatedCookie += '=' + propValue
      }
    }
    document.cookie = updatedCookie
  }
  return ret // String|undefined
}
