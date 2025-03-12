define(function(require) {
    const PIXI = require("com/pixijs/pixi");
   
    class FittedTextExt extends PIXI.Text {
        constructor(text, style) {
            super(text, style);

            if(typeof style === "object") {
                this._baseFontSize = style.fontSize;
                this._baseLineHeight = style.lineHeight;
            }
            this._baseString = text;
            if(style && style.maxWidth) {
                this._maxWidth = style.maxWidth;
            }
            if(style && style.maxHeight) {
                this._maxHeight = style.maxHeight;
            }
            this.text = text;
        }

        get text() {
            return this._text;
        }

        set text(text) {
            super.text = text;
            this._baseString = text;
        }

        get style() {
            return this._style;
        }

        set style(style) {
            super.style = style;

            if(typeof style === "object") {
                this._baseFontSize = style.fontSize;
                this._baseLineHeight = style.lineHeight;
                if(style.maxWidth) {
                    this.maxWidth = style.maxWidth;
                }
                if(style.maxHeight) {
                    this.maxHeight = style.maxHeight;
                }
            }
        }
        
        get maxHeight() {
            this.updateText(true);

            return this._maxHeight;
        }

        set maxHeight(maxHeight) {
            if(this._maxHeight !== maxHeight) {
                this._maxHeight = maxHeight;
                this.dirty = true;
            }    
        }

        get maxWidth() {
            this.updateText(true);

            return this._maxWidth;
        }

        set maxWidth(maxWidth) {
            if(this._maxWidth !== maxWidth) {
                this._maxWidth = maxWidth;
                this.dirty = true;
            }         
        }

        get icons() {
            return this._icons.slice();
        }

        updateText(respectDirty) {
            this._extDirty = this.dirty; //need to know this value after updateTexture call

            // check if style has changed..
            if (this.localStyleID !== this._style.styleID) {
                this._extDirty = true;
            }

            if (!this._extDirty && respectDirty) {
                return;
            }
            super.updateText(respectDirty);
            this.fitWidthAndHeight();
        }

        fitWidthAndHeight() {
            let vis = this.visible;
            this.visible = false;

            if(this._extDirty && (this._maxWidth || this._maxHeight)) {
                //reset text size to initial values
                this.style.fontSize = this._baseFontSize;
                this.style.lineHeight = this._baseLineHeight;

                //shrink until below maxHeight
                let metrics;
                metrics = PIXI.TextMetrics.measureText(this.text, this.style, this.style.wordWrap);
                let heightRatio = metrics.lineHeight / (metrics.fontProperties.ascent + metrics.fontProperties.descent);
                while(metrics.height > this._maxHeight || metrics.width > this._maxWidth) {
                    //shrink font by 5% each time
                    this.style.fontSize -= Math.ceil(this.style.fontSize * 0.05);
                    metrics = PIXI.TextMetrics.measureText(this.text, this.style, this.style.wordWrap);
                    this.style.lineHeight = (metrics.fontProperties.ascent + metrics.fontProperties.descent) * heightRatio;
                    metrics = PIXI.TextMetrics.measureText(this.text, this.style, this.style.wordWrap);
                }
                this._extDirty = false;
            }
            this.visible = vis;
        }

        //Creates icons for text in the text object as required
        insertIcons() {
            if(this._baseString) {
                this.text = this._baseString;
            }
            if(this._icons && this._icons.length) {
                this._icons.forEach(icon => {
                    icon[0].parent && icon[0].parent.removeChild(icon[0]);
                });
            }
            this._icons = [];

            let iconWithData;
            while((iconWithData = this.createTextIconWithData()).length) {
                this._icons.push(iconWithData);
            }

            this.updateText(true);
            let metrics = PIXI.TextMetrics.measureText(this.text, this.style, this.style.wordWrap);
            if(this._icons.length) {
                this._icons.forEach((iconData, i) => {
                    let startPosition = (i === 0) ? 0 : this._icons[i - 1][1] + 1; //previous icon position
                    this.repositionIcon(metrics, ...iconData, startPosition);
                    this.addChild(iconData[0]);
                });
            }
        }

        //Create an icon sprite and measure its line position in the measured text
        //We need to manipulate this._text directly to avoid a loop
        createTextIconWithData() {
            const nextIconIndex = this._text.indexOf("{") + 1;
            const nextIconEndIndex = this._text.indexOf("}");
            if(nextIconEndIndex > nextIconIndex && nextIconIndex > -1) {
                let iconName = this._text.slice(nextIconIndex, nextIconEndIndex);
                let icon = PIXI.Sprite.fromFrame(iconName);
                let metrics = PIXI.TextMetrics.measureText(" ", this.style, false);
                let padding = "";
                if((icon.texture.height * 1.05) > metrics.height) {
                    icon.scale.set(metrics.height / (icon.texture.height * 1.05));
                }
                let i;
                for(i = 0; i < icon.width / metrics.width; i++) {
                    padding += " ";
                }

                icon.anchor.set(0.5);
                this._text = this._text.replace("{" + iconName + "}", padding);
                return [icon, nextIconIndex];
            }
            return [];
        }

        //Position icon using line height and width of text preceding it on the line
        repositionIcon(metrics, icon, position, startPosition) {
            //find icon position in text metrics
            let lineStart = 0;
            let lineIndex;
            for(lineIndex = 0; lineIndex < metrics.lines.length; lineIndex++) {
                let lineText = metrics.lines[lineIndex];
                lineStart = this.text.indexOf(metrics.lines[lineIndex], lineStart);
                if(lineStart <= position && lineStart + lineText.length > position && lineStart + lineText.length > startPosition) {
                    break;
                }
            }

            let linePos = position - lineStart;
            if((icon.texture.height * 1.05) > metrics.lineHeight) {
                icon.scale.set(metrics.lineHeight / (icon.texture.height * 1.05));
            }
            let prefix = metrics.lines[lineIndex].slice(0, linePos);
            icon.x = -metrics.lineWidths[lineIndex]/2 + PIXI.TextMetrics.measureText(prefix, metrics.style, false).width;
            icon.y = -metrics.height/2 + (metrics.lineHeight * lineIndex) + metrics.lineHeight/2;
        }
    }
    
    return FittedTextExt;
});