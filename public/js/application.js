AssetManager = {
	createElement:function(asset){
		var wrapper = $('<div class="asset">\n\t<div class="liner">\n\t\t<div class="img"></div>\n\t\t<div class="actions"></div>\n\t</div>\n</div>');
		
		try {
			wrapper.get(0).setAttribute("id", "asset_" + asset.id);
			wrapper.data("asset", asset);
		}
		catch(err){
			console.log(err);
		}
		
		wrapper.data("asset", asset);
		
		var img = new Image();
		img.src = asset.url.medium;
		$('.img', wrapper).html(img);
		$('.img img', wrapper).wrap("<a href='#/edit_asset/"+asset.id+"'></a>");
		
		return wrapper;
	}
}

Bjorn.Router.connect("/assets", function(p){
	$.get("/assets", {format:"json"}, function(assets, textStatus){
		for(i = 0, l = assets.length; i < l; i++){
			var asset = assets[i]
			var newAsset = AssetManager.createElement(asset);
			$('#assets_grid').append(newAsset);
		}
	}, "json");
});

Bjorn.Router.connect("/edit_asset/:id", function(p){
	var assetObj = $('#asset_' + p.id).data("asset");
	var editor = $('.asset-editor');
	
	$('input#asset_file_name', editor).val(assetObj.file_name);
	
	var img = new Image();
	img.src = assetObj.url.medium;
	
	$('.preview', editor).html("").append(img);
	editor.show("slow");
});

$(document).ready(function(){
	Bjorn.Router.invoke("/assets");
	new Bjorn.AnchorObserver;
});