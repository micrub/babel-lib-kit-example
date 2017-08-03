var Core = window.babelKit.default;
var dbg = window.babelKit.default.Utils.dbg("client.js");
var debug = window.babelKit.default.Utils.debug;
dbg("from body");
var req = window.babelKit.default.Async.request;
var url = "http://localhost.com:8080/favicon.ico";
var resp = req(url);
resp.then(function(response) {
  dbg("got response");
});
dbg(Core.Utils.djb2(url));
