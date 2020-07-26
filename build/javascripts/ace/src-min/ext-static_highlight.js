define("ace/ext/static_highlight",["require","exports","module","ace/edit_session","ace/layer/text","ace/config","ace/lib/dom","ace/lib/lang"],function(e,t,n){"use strict";function i(e){this.type=e,this.style={},this.textContent=""}var o=e("../edit_session").EditSession,r=e("../layer/text").Text,s=".ace_static_highlight {font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'Droid Sans Mono', monospace;font-size: 12px;white-space: pre-wrap}.ace_static_highlight .ace_gutter {width: 2em;text-align: right;padding: 0 3px 0 0;margin-right: 3px;contain: none;}.ace_static_highlight.ace_show_gutter .ace_line {padding-left: 2.6em;}.ace_static_highlight .ace_line { position: relative; }.ace_static_highlight .ace_gutter-cell {-moz-user-select: -moz-none;-khtml-user-select: none;-webkit-user-select: none;user-select: none;top: 0;bottom: 0;left: 0;position: absolute;}.ace_static_highlight .ace_gutter-cell:before {content: counter(ace_line, decimal);counter-increment: ace_line;}.ace_static_highlight {counter-reset: ace_line;}",a=e("../config"),c=e("../lib/dom"),l=e("../lib/lang").escapeHTML;i.prototype.cloneNode=function(){return this},i.prototype.appendChild=function(e){this.textContent+=e.toString()},i.prototype.toString=function(){var e=[];if("fragment"!=this.type){e.push("<",this.type),this.className&&e.push(" class='",this.className,"'");var t=[];for(var n in this.style)t.push(n,":",this.style[n]);t.length&&e.push(" style='",t.join(""),"'"),e.push(">")}return this.textContent&&e.push(this.textContent),"fragment"!=this.type&&e.push("</",this.type,">"),e.join("")};var h={createTextNode:function(e){return l(e)},createElement:function(e){return new i(e)},createFragment:function(){return new i("fragment")}},u=function(){this.config={},this.dom=h};u.prototype=r.prototype;var g=function(e,t,n){var i=e.className.match(/lang-(\w+)/),o=t.mode||i&&"ace/mode/"+i[1];if(!o)return!1;var r=t.theme||"ace/theme/textmate",s="",a=[];if(e.firstElementChild)for(var l=0,h=0;h<e.childNodes.length;h++){var u=e.childNodes[h];3==u.nodeType?(l+=u.data.length,s+=u.data):a.push(l,u)}else s=e.textContent,t.trim&&(s=s.trim());g.render(s,o,r,t.firstLineNumber,!t.showGutter,function(t){c.importCssString(t.css,"ace_highlight"),e.innerHTML=t.html;for(var i=e.firstChild.firstChild,o=0;o<a.length;o+=2){var r=t.session.doc.indexToPosition(a[o]),s=a[o+1],l=i.children[r.row];l&&l.appendChild(s)}n&&n()})};g.render=function(e,t,n,i,r,s){function c(){var o=g.renderSync(e,t,n,i,r);return s?s(o):o}var l=1,h=o.prototype.$modes;"string"==typeof n&&(l++,a.loadModule(["theme",n],function(e){n=e,--l||c()}));var u;return t&&"object"==typeof t&&!t.getTokenizer&&(u=t,t=u.path),"string"==typeof t&&(l++,a.loadModule(["mode",t],function(e){h[t]&&!u||(h[t]=new e.Mode(u)),t=h[t],--l||c()})),--l||c()},g.renderSync=function(e,t,n,i,r){i=parseInt(i||1,10);var a=new o("");a.setUseWorker(!1),a.setMode(t);var c=new u;c.setSession(a),Object.keys(c.$tabStrings).forEach(function(e){if("string"==typeof c.$tabStrings[e]){var t=h.createFragment();t.textContent=c.$tabStrings[e],c.$tabStrings[e]=t}}),a.setValue(e);var l=a.getLength(),g=h.createElement("div");g.className=n.cssClass;var p=h.createElement("div");p.className="ace_static_highlight"+(r?"":" ace_show_gutter"),p.style["counter-reset"]="ace_line "+(i-1);for(var d=0;d<l;d++){var f=h.createElement("div");if(f.className="ace_line",!r){var m=h.createElement("span");m.className="ace_gutter ace_gutter-cell",m.textContent="",f.appendChild(m)}c.$renderLine(f,d,!1),f.textContent+="\n",p.appendChild(f)}return g.appendChild(p),{css:s+n.cssText,html:g.toString(),session:a}},n.exports=g,n.exports.highlight=g}),function(){window.require(["ace/ext/static_highlight"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();