Bjorn.Router.connect("/assets", function(p){
	template = $('.prototype').get(0).innerHTML;
	console.log(template);
	
	$.get("/assets", {format:"json"}, function(assets, textStatus){
		for(i = 0, l = assets.length; i < l; i++){
			asset = assets[i]
			
			output = template;
			output = output.replace(/ASSET_FILENAME/g, asset.file_name);
			output = output.replace(/ASSET_URL/g, asset.url.medium);
			output = output.replace(/ASSET_ID/g, asset.id);
			
			newNode = $(output);
			$('#assets_grid').append(newNode);
		}
		
	}, "json");
});

Bjorn.Router.connect("/edit_asset/:id", function(p){
	$.get("/assets/"+ p.id, {}, function(asset, textStatus){
		console.log(asset);
	});
})

$(document).ready(function(){
	Bjorn.Router.invoke("/assets");
	new Bjorn.AnchorObserver;
});