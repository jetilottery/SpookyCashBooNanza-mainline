define(require => {
    const PIXI = require("com/pixijs/pixi");
    const app = require("skbJet/componentManchester/standardIW/app");

    // setText needs the following parameters :
    // spineAnim	:	This is a reference to the spine animation instance that you have created
    // slotName		:	This is the name of the slot where the text needs to be rendered (get this name from the artist that created it)
    // source		:	This is the (container || sprite || text) that is to be used as the source texture
    function setText(spineAnim, slotName, source, flip) {
        let slot = spineAnim.skeleton.slots[spineAnim.skeleton.findSlotIndex(slotName)];
        
        // Create a PIXI render texture that will hold the number
        let renderTexture = PIXI.RenderTexture.create(slot.currentMesh.width, slot.currentMesh.height);

        // Tell PIXI to render the number to the texture
        app.renderer.render(source, renderTexture);

        // Now we need to find the attachment that we want to replace in the spine animation
        let attachment = slot.attachment;

        slot.meshes[slot.attachment.name].visible = true;

        // Replace the placeholder texture with our new render texture
        //slot.currentMesh.width = source.width;
        //slot.currentMesh.height = source.height;
        // slot.currentMesh.y = source.height;
        
        attachment.region.texture = renderTexture;
        // Update the UVs of the new texture
        attachment.updateUVs();

        if (flip) {
            slot.meshes[slot.attachment.name].scale.x = -1;
        }

        // Finally update the spine animation currentMesh with the new texture and tell Spine and PIXI to render it
        slot.currentMesh.texture = renderTexture;
        slot.currentMesh.uvs = new Float32Array(attachment.regionUVs);
        slot.currentMesh.dirty = true;
    }

    function clearMesh(){ //spineAnim, slotName params
        // let slot = spineAnim.skeleton.slots[spineAnim.skeleton.findSlotIndex(slotName)];
        // slot.meshes[slot.attachment.name].visible = false;
    }

    return {
        setText,
        clearMesh
    };
});
