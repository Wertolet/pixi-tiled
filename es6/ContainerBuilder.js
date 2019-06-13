import { TiledContainer } from './TiledContainer';
import { Config } from './Config';
import { Sprite, Rectangle, Texture, Graphics } from "pixi.js";
import * as Primitives from "./TiledPrimitives";
import * as Utils from "./Utils";
export function ApplyMeta(meta, target) {
    target.name = meta.name;
    target.tiledId = meta.id;
    target.width = meta.width || target.width;
    target.height = meta.height || target.height;
    target.rotation = ((meta.rotation || 0) * Math.PI) / 180.0;
    if (meta.x)
        target.x = meta.x;
    if (meta.y)
        target.y = meta.y;
    target.visible = meta.visible == undefined ? true : meta.visible;
    target.types = meta.type ? meta.type.split(":") : [];
    const type = Utils.Objectype(meta);
    target.primitive = Primitives.BuildPrimitive(meta);
    if (meta.properties) {
        target.alpha = meta.properties.opacity || 1;
        Object.assign(target, meta.properties);
    }
    if (Config.debugContainers) {
        setTimeout(() => {
            const rect = new Graphics();
            rect.lineStyle(2, 0xff0000, 0.7)
                .drawRect(target.x, target.y, meta.width, meta.height)
                .endFill();
            if (target instanceof PIXI.Sprite) {
                rect.y -= target.height;
            }
            target.parent.addChild(rect);
        }, 30);
    }
}
export function Build(meta) {
    const types = meta.type ? meta.type.split(":") : [];
    let container = undefined;
    if (types.indexOf("mask") > -1) {
        container = new Sprite(Texture.WHITE);
    }
    else {
        container = new TiledContainer();
    }
    if (meta.gid) {
        if (container instanceof Sprite) {
            container.anchor = Config.defSpriteAnchor;
        }
        else {
            container.pivot = Config.defSpriteAnchor;
            container.hitArea = new Rectangle(0, 0, meta.width, meta.height);
        }
    }
    ApplyMeta(meta, container);
    return container;
}