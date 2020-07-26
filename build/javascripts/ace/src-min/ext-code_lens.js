define("ace/ext/code_lens",["require","exports","module","ace/line_widgets","ace/lib/event","ace/lib/lang","ace/lib/dom","ace/editor","ace/config"],function(e,n){"use strict";function o(e){var n=e.$textLayer,o=n.$lenses;o&&o.forEach(function(e){e.remove()}),n.$lenses=null}function t(e,n){if(e&n.CHANGE_LINES||e&n.CHANGE_FULL||e&n.CHANGE_SCROLL||e&n.CHANGE_TEXT){var t=n.session,r=n.session.lineWidgets,i=n.$textLayer,s=i.$lenses;if(!r)return void(s&&o(n));var a=n.$textLayer.$lines.cells,d=n.layerConfig,c=n.$padding;s||(s=i.$lenses=[]);for(var u=0,f=0;f<a.length;f++){var g=a[f].row,v=r[g],L=v&&v.lenses;if(L&&L.length){var p=s[u];p||(p=s[u]=l.buildDom(["div",{"class":"ace_codeLens"}],n.container)),p.style.height=d.lineHeight+"px",u++;for(var h=0;h<L.length;h++){var m=p.childNodes[2*h];m||(0!=h&&p.appendChild(l.createTextNode("\xa0|\xa0")),m=l.buildDom(["a"],p)),m.textContent=L[h].title,m.lensCommand=L[h]}for(;p.childNodes.length>2*h-1;)p.lastChild.remove();var $=n.$cursorLayer.getPixelPosition({row:g,column:0},!0).top-d.lineHeight*v.rowsAbove-d.offset;p.style.top=$+"px";var C=n.gutterWidth,w=t.getLine(g).search(/\S|$/);-1==w&&(w=0),C+=w*d.characterWidth,C-=n.scrollLeft,p.style.paddingLeft=c+C+"px"}}for(;u<s.length;)s.pop().remove()}}function r(e){if(e.lineWidgets){var n=e.widgetManager;e.lineWidgets.forEach(function(e){e&&e.lenses&&n.removeLineWidget(e)})}}function i(e){e.codeLensProviders=[],e.renderer.on("afterRender",t),e.$codeLensClickHandler||(e.$codeLensClickHandler=function(n){var o=n.target.lensCommand;o&&e.execCommand(o.id,o.arguments)},d.addListener(e.container,"click",e.$codeLensClickHandler,e)),e.$updateLenses=function(){function o(){var o=t.selection.cursor,r=t.documentToScreenRow(o);n.setLenses(t,i);var s=t.$undoManager&&t.$undoManager.$lastDelta;if(!(s&&"remove"==s.action&&s.lines.length>1)){var a=t.documentToScreenRow(o),d=e.renderer.layerConfig.lineHeight,c=t.getScrollTop()+(a-r)*d;t.setScrollTop(c)}}var t=e.session;if(t){t.widgetManager||(t.widgetManager=new a(t),t.widgetManager.attach(e));var r=e.codeLensProviders.length,i=[];e.codeLensProviders.forEach(function(e){e.provideCodeLenses(t,function(e,n){e||(n.forEach(function(e){i.push(e)}),0==--r&&o())})})}};var o=c.delayedCall(e.$updateLenses);e.$updateLensesOnInput=function(){o.delay(250)},e.on("input",e.$updateLensesOnInput)}function s(e){e.off("input",e.$updateLensesOnInput),e.renderer.off("afterRender",t),e.$codeLensClickHandler&&e.container.removeEventListener("click",e.$codeLensClickHandler)}var a=e("../line_widgets").LineWidgets,d=e("../lib/event"),c=e("../lib/lang"),l=e("../lib/dom");n.setLenses=function(e,n){var o=Number.MAX_VALUE;r(e),n&&n.forEach(function(n){var t=n.start.row,r=n.start.column,i=e.lineWidgets&&e.lineWidgets[t];i&&i.lenses||(i=e.widgetManager.$registerLineWidget({rowCount:1,rowsAbove:1,row:t,column:r,lenses:[]})),i.lenses.push(n.command),t<o&&(o=t)}),e._emit("changeFold",{data:{start:{row:o}}})},n.registerCodeLensProvider=function(e,n){e.setOption("enableCodeLens",!0),e.codeLensProviders.push(n),e.$updateLensesOnInput()},n.clear=function(e){n.setLenses(e,null)};var u=e("../editor").Editor;e("../config").defineOptions(u.prototype,"editor",{enableCodeLens:{set:function(e){e?i(this):s(this)}}}),l.importCssString(".ace_codeLens {    position: absolute;    color: #aaa;    font-size: 88%;    background: inherit;    width: 100%;    display: flex;    align-items: flex-end;    pointer-events: none;}.ace_codeLens > a {    cursor: pointer;    pointer-events: auto;}.ace_codeLens > a:hover {    color: #0000ff;    text-decoration: underline;}.ace_dark > .ace_codeLens > a:hover {    color: #4e94ce;}","")}),function(){window.require(["ace/ext/code_lens"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();