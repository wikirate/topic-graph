define("ace/ext/linking",["require","exports","module","ace/editor","ace/config"],function(e,o){function i(e){var i=e.editor;if(e.getAccelKey()){var i=e.editor,n=e.getDocumentPosition(),t=i.session,r=t.getTokenAt(n.row,n.column);o.previousLinkingHover&&o.previousLinkingHover!=r&&i._emit("linkHoverOut"),i._emit("linkHover",{position:n,token:r}),o.previousLinkingHover=r}else o.previousLinkingHover&&(i._emit("linkHoverOut"),o.previousLinkingHover=!1)}function n(e){var o=e.getAccelKey();if(0==e.getButton()&&o){var i=e.editor,n=e.getDocumentPosition(),t=i.session,r=t.getTokenAt(n.row,n.column);i._emit("linkClick",{position:n,token:r})}}var t=e("../editor").Editor;e("../config").defineOptions(t.prototype,"editor",{enableLinking:{set:function(e){e?(this.on("click",n),this.on("mousemove",i)):(this.off("click",n),this.off("mousemove",i))},value:!1}}),o.previousLinkingHover=!1}),function(){window.require(["ace/ext/linking"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();