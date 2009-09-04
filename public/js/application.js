
var AnchorObserver = {
  enabled:  true,
  interval: 0.1
};

document.observe("anchor:changed", function(e){
	var newAnchor = e.memo.to;
	
	if(e.memo.to.match(/^\/assets/)) {
		console.log("Loading " + newAnchor);
		AssetManager.refresh(newAnchor);
	}
		
})

var AssetManager = {
	template: new Template("<div class='asset' id='asset_#{id}'><div class='liner'> \n\t<div class='img'><img src='#{url.small}'></div> \n\t<div class='actions'>BLAH</div> \n</div></div>"),
	insert: function(asset){
		html = this.template.evaluate(asset);
		$('assets_grid').insert(html);
	},
	resizeGrid: function(){
		console.log("Need to implement")
	},
	refresh: function(uri){
		new Ajax.Request(uri, {
			asynchronous: true,
			method: 'get',
			evalJSON: true,
			onSuccess: function(req, json_obj){
				$('assets_grid').update('');
				assets = req.responseJSON;				
				assets.each(function(asset){
					this.insert(asset);
				}.bind(AssetManager))
			},
			onFailure: function(req){
				alert("FAIL")
			}
		})
	}
};

Event.observe(window, "resize", function(event) {
  document.fire("viewport:resized");
});

document.observe("viewport:resized", AssetManager.resizeGrid.bind(AssetManager));

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
	
	AssetManager.resizeGrid();
});