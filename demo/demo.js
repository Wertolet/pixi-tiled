import * as TiledOG from "./../es6/index.js";
import * as PIXI from "pixi.js";

function init() {

	console.log("init")

    var app = new PIXI.Application( {
		width: 720, height : 1280 
	});
    document.body.appendChild(app.view);
   
    //load map with dependencies
    app.loader.add("map", "./../maps/ui-map.json")
            .add("atlas", "./../maps/ui-atlas.json")
            .load(loaded);

    function loaded() {
        
        //stage generate automatiсaly, all sprites lo
        const map = app.loader.resources["map"].data;
        const atlas = app.loader.resources["atlas"].spritesheet;
        const create = TiledOG.CreateStage(atlas, map);
		
		const scale = app.renderer.screen.width / 1080;
		
		create.scale.set(scale);
		app.stage.addChild(create);
		
        app.ticker.add(gameLoop);
    }

    function gameLoop(dt) {

    }
}


document.addEventListener("DOMContentLoaded",   () => init());