define("ace/ext/spellcheck",["require","exports","module","ace/lib/event","ace/editor","ace/config"],function(e,t){"use strict";var n=e("../lib/event");t.contextMenuHandler=function(e){var t=e.target,i=t.textInput.getElement();if(t.selection.isEmpty()){var o=t.getCursorPosition(),s=t.session.getWordRange(o.row,o.column),r=t.session.getTextRange(s);if(t.session.tokenRe.lastIndex=0,t.session.tokenRe.test(r)){var c="\x01\x01",l=r+" "+c;i.value=l,i.setSelectionRange(r.length,r.length+1),i.setSelectionRange(0,0),i.setSelectionRange(0,r.length);var u=!1;n.addListener(i,"keydown",function e(){n.removeListener(i,"keydown",e),u=!0}),t.textInput.setInputHandler(function(e){if(e==l)return"";if(0===e.lastIndexOf(l,0))return e.slice(l.length);if(e.substr(i.selectionEnd)==l)return e.slice(0,-l.length);if(e.slice(-2)==c){var n=e.slice(0,-2);if(" "==n.slice(-1))return u?n.substring(0,i.selectionEnd):(n=n.slice(0,-1),t.session.replace(s,n),"")}return e})}}};var i=e("../editor").Editor;e("../config").defineOptions(i.prototype,"editor",{spellcheck:{set:function(e){this.textInput.getElement().spellcheck=!!e,e?this.on("nativecontextmenu",t.contextMenuHandler):this.removeListener("nativecontextmenu",t.contextMenuHandler)},value:!0}})}),function(){window.require(["ace/ext/spellcheck"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();