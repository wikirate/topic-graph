define("ace/keyboard/vscode",["require","exports","module","ace/keyboard/hash_handler","ace/config"],function(e,n){"use strict";var a=e("../keyboard/hash_handler").HashHandler,o=e("../config");n.handler=new a,n.handler.$id="ace/keyboard/vscode",n.handler.addCommands([{name:"toggleWordWrap",exec:function(e){var n=e.session.getUseWrapMode();e.session.setUseWrapMode(!n)},readOnly:!0},{name:"navigateToLastEditLocation",exec:function(e){var n=e.session.getUndoManager().$lastDelta,a="remove"==n.action?n.start:n.end;e.moveCursorTo(a.row,a.column),e.clearSelection()}},{name:"replaceAll",exec:function(e){e.searchBox?!0===e.searchBox.active&&!0===e.searchBox.replaceOption.checked&&e.searchBox.replaceAll():o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!0)})}},{name:"replaceOne",exec:function(e){e.searchBox?!0===e.searchBox.active&&!0===e.searchBox.replaceOption.checked&&e.searchBox.replace():o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!0)})}},{name:"selectAllMatches",exec:function(e){e.searchBox?!0===e.searchBox.active&&e.searchBox.findAll():o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!1)})}},{name:"toggleFindCaseSensitive",exec:function(e){o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!1);var a=e.searchBox;a.caseSensitiveOption.checked=!a.caseSensitiveOption.checked,a.$syncOptions()})}},{name:"toggleFindInSelection",exec:function(e){o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!1);var a=e.searchBox;a.searchOption.checked=!a.searchRange,a.setSearchRange(a.searchOption.checked&&a.editor.getSelectionRange()),a.$syncOptions()})}},{name:"toggleFindRegex",exec:function(e){o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!1);var a=e.searchBox;a.regExpOption.checked=!a.regExpOption.checked,a.$syncOptions()})}},{name:"toggleFindWholeWord",exec:function(e){o.loadModule("ace/ext/searchbox",function(n){n.Search(e,!1);var a=e.searchBox;a.wholeWordOption.checked=!a.wholeWordOption.checked,a.$syncOptions()})}},{name:"removeSecondaryCursors",exec:function(e){var n=e.selection.ranges;n&&n.length>1?e.selection.toSingleRange(n[n.length-1]):e.selection.clearSelection()}}]),[{bindKey:{mac:"Ctrl-G",win:"Ctrl-G"},name:"gotoline"},{bindKey:{mac:"Command-Shift-L|Command-F2",win:"Ctrl-Shift-L|Ctrl-F2"},name:"findAll"},{bindKey:{mac:"Shift-F8|Shift-Option-F8",win:"Shift-F8|Shift-Alt-F8"},name:"goToPreviousError"},{bindKey:{mac:"F8|Option-F8",win:"F8|Alt-F8"},name:"goToNextError"},{bindKey:{mac:"Command-Shift-P|F1",win:"Ctrl-Shift-P|F1"},name:"openCommandPallete"},{bindKey:{mac:"Command-K|Command-S",win:"Ctrl-K|Ctrl-S"},name:"showKeyboardShortcuts"},{bindKey:{mac:"Shift-Option-Up",win:"Alt-Shift-Up"},name:"copylinesup"},{bindKey:{mac:"Shift-Option-Down",win:"Alt-Shift-Down"},name:"copylinesdown"},{bindKey:{mac:"Command-Shift-K",win:"Ctrl-Shift-K"},name:"removeline"},{bindKey:{mac:"Command-Enter",win:"Ctrl-Enter"},name:"addLineAfter"},{bindKey:{mac:"Command-Shift-Enter",win:"Ctrl-Shift-Enter"},name:"addLineBefore"},{bindKey:{mac:"Command-Shift-\\",win:"Ctrl-Shift-\\"},name:"jumptomatching"},{bindKey:{mac:"Command-]",win:"Ctrl-]"},name:"blockindent"},{bindKey:{mac:"Command-[",win:"Ctrl-["},name:"blockoutdent"},{bindKey:{mac:"Ctrl-PageDown",win:"Alt-PageDown"},name:"pagedown"},{bindKey:{mac:"Ctrl-PageUp",win:"Alt-PageUp"},name:"pageup"},{bindKey:{mac:"Shift-Option-A",win:"Shift-Alt-A"},name:"toggleBlockComment"},{bindKey:{mac:"Option-Z",win:"Alt-Z"},name:"toggleWordWrap"},{bindKey:{mac:"Command-G",win:"F3|Ctrl-K Ctrl-D"},name:"findnext"},{bindKey:{mac:"Command-Shift-G",win:"Shift-F3"},name:"findprevious"},{bindKey:{mac:"Option-Enter",win:"Alt-Enter"},name:"selectAllMatches"},{bindKey:{mac:"Command-D",win:"Ctrl-D"},name:"selectMoreAfter"},{bindKey:{mac:"Command-K Command-D",win:"Ctrl-K Ctrl-D"},name:"selectOrFindNext"},{bindKey:{mac:"Shift-Option-I",win:"Shift-Alt-I"},name:"splitSelectionIntoLines"},{bindKey:{mac:"Command-K M",win:"Ctrl-K M"},name:"modeSelect"},{bindKey:{mac:"Command-Option-[",win:"Ctrl-Shift-["},name:"toggleFoldWidget"},{bindKey:{mac:"Command-Option-]",win:"Ctrl-Shift-]"},name:"toggleFoldWidget"},{bindKey:{mac:"Command-K Command-0",win:"Ctrl-K Ctrl-0"},name:"foldall"},{bindKey:{mac:"Command-K Command-J",win:"Ctrl-K Ctrl-J"},name:"unfoldall"},{bindKey:{mac:"Command-K Command-1",win:"Ctrl-K Ctrl-1"},name:"foldOther"},{bindKey:{mac:"Command-K Command-Q",win:"Ctrl-K Ctrl-Q"},name:"navigateToLastEditLocation"},{bindKey:{mac:"Command-K Command-R|Command-K Command-S",win:"Ctrl-K Ctrl-R|Ctrl-K Ctrl-S"},name:"showKeyboardShortcuts"},{bindKey:{mac:"Command-K Command-X",win:"Ctrl-K Ctrl-X"},name:"trimTrailingSpace"},{bindKey:{mac:"Shift-Down|Command-Shift-Down",win:"Shift-Down|Ctrl-Shift-Down"},name:"selectdown"},{bindKey:{mac:"Shift-Up|Command-Shift-Up",win:"Shift-Up|Ctrl-Shift-Up"},name:"selectup"},{bindKey:{mac:"Command-Alt-Enter",win:"Ctrl-Alt-Enter"},name:"replaceAll"},{bindKey:{mac:"Command-Shift-1",win:"Ctrl-Shift-1"},name:"replaceOne"},{bindKey:{mac:"Option-C",win:"Alt-C"},name:"toggleFindCaseSensitive"},{bindKey:{mac:"Option-L",win:"Alt-L"},name:"toggleFindInSelection"},{bindKey:{mac:"Option-R",win:"Alt-R"},name:"toggleFindRegex"},{bindKey:{mac:"Option-W",win:"Alt-W"},name:"toggleFindWholeWord"},{bindKey:{mac:"Command-L",win:"Ctrl-L"},name:"expandtoline"},{bindKey:{mac:"Shift-Esc",win:"Shift-Esc"},name:"removeSecondaryCursors"}].forEach(function(e){var a=n.handler.commands[e.name];a&&(a.bindKey=e.bindKey),n.handler.bindKey(e.bindKey,a||e.name)})}),function(){window.require(["ace/keyboard/vscode"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();