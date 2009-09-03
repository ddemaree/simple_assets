
var AnchorObserver = {
  enabled:  true,
  interval: 0.1
};

document.observe("anchor:changed", function(e){
	var newAnchor = e.memo.to;
	
	if(e.memo.to.match(/^\/assets/))
		console.log("Loading " + newAnchor);
})

var AssetManager = {
	refresh: function(uri){
		new Ajax.Request(uri, {
			asynchronous: true,
			method: 'get',
			onComplete: function(req, json_obj){
				if(json_obj)
					console.log(json_obj);
			}
		})
	}
};

document.observe("dom:loaded", function() {
  var lastAnchor = "";

	function poll() {
		var anchor = (window.location.hash || "").slice(1);
		if (anchor != lastAnchor) {
			document.fire("anchor:changed", { to: anchor, from: lastAnchor });
			lastAnchor = anchor;
		}
	}

	if (AnchorObserver.enabled)
		setInterval(poll, AnchorObserver.interval * 1000);
});