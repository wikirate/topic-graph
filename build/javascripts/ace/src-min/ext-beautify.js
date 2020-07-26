define("ace/ext/beautify",["require","exports","module","ace/token_iterator"],function(e,t){"use strict";function r(e,t){return e.type.lastIndexOf(t+".xml")>-1}var a=e("../token_iterator").TokenIterator;t.singletonTags=["area","base","br","col","command","embed","hr","html","img","input","keygen","link","meta","param","source","track","wbr"],t.blockTags=["article","aside","blockquote","body","div","dl","fieldset","footer","form","head","header","html","nav","ol","p","script","section","style","table","tbody","tfoot","thead","ul"],t.beautify=function(e){for(var o,s,n,i=new a(e,0,0),c=i.getCurrentToken(),u=e.getTabString(),l=t.singletonTags,m=t.blockTags,p=!1,f=!1,h=!1,d="",y="",b="",g=0,$=0,k=0,w=0,x=0,v=0,T=0,R=0,O=0,q=!1,C=!1,I=!1,_=!1,j={0:0},B=[],F=function(){o&&o.value&&"string.regexp"!==o.type&&(o.value=o.value.replace(/^\s*/,""))},S=function(){d=d.replace(/ +$/,"")},K=function(){d=d.trimRight(),p=!1};null!==c;){if(R=i.getCurrentTokenRow(),i.$rowTokens,o=i.stepForward(),void 0!==c){if(y=c.value,x=0,I="style"===b||"ace/mode/css"===e.$modeId,r(c,"tag-open")?(C=!0,o&&(_=-1!==m.indexOf(o.value)),"</"===y&&(_&&!p&&O<1&&O++,I&&(O=1),x=1,_=!1)):r(c,"tag-close")?C=!1:r(c,"comment.start")?_=!0:r(c,"comment.end")&&(_=!1),!C&&!O&&"paren.rparen"===c.type&&"}"===c.value.substr(0,1)&&O++,R!==s&&(O=R,s&&(O-=s)),O){for(K();O>0;O--)d+="\n";p=!0,!r(c,"comment")&&!c.type.match(/^(comment|string)$/)&&(y=y.trimLeft())}if(y){if("keyword"===c.type&&y.match(/^(if|else|elseif|for|foreach|while|switch)$/)?(B[g]=y,F(),h=!0,y.match(/^(else|elseif)$/)&&d.match(/\}[\s]*$/)&&(K(),f=!0)):"paren.lparen"===c.type?(F(),"{"===y.substr(-1)&&(h=!0,q=!1,C||(O=1)),"{"===y.substr(0,1)&&(f=!0,"["!==d.substr(-1)&&"["===d.trimRight().substr(-1)?(K(),f=!1):")"===d.trimRight().substr(-1)?K():S())):"paren.rparen"===c.type?(x=1,"}"===y.substr(0,1)&&("case"===B[g-1]&&x++,"{"===d.trimRight().substr(-1)?K():(f=!0,I&&(O+=2))),"]"===y.substr(0,1)&&"}"!==d.substr(-1)&&"}"===d.trimRight().substr(-1)&&(f=!1,w++,K()),")"===y.substr(0,1)&&"("!==d.substr(-1)&&"("===d.trimRight().substr(-1)&&(f=!1,w++,K()),S()):"keyword.operator"!==c.type&&"keyword"!==c.type||!y.match(/^(=|==|===|!=|!==|&&|\|\||and|or|xor|\+=|.=|>|>=|<|<=|=>)$/)?"punctuation.operator"===c.type&&";"===y?(K(),F(),h=!0,I&&O++):"punctuation.operator"===c.type&&y.match(/^(:|,)$/)?(K(),F(),y.match(/^(,)$/)&&T>0&&0===v?O++:(h=!0,p=!1)):"support.php_tag"!==c.type||"?>"!==y||p?r(c,"attribute-name")&&d.substr(-1).match(/^\s$/)?f=!0:r(c,"attribute-equals")?(S(),F()):r(c,"tag-close")&&(S(),"/>"===y&&(f=!0)):(K(),f=!0):(K(),F(),f=!0,h=!0),p&&(!c.type.match(/^(comment)$/)||y.substr(0,1).match(/^[\/#]$/))&&(!c.type.match(/^(string)$/)||y.substr(0,1).match(/^['"]$/))){if(w=k,g>$)for(w++,n=g;n>$;n--)j[n]=w;else g<$&&(w=j[g]);for($=g,k=w,x&&(w-=x),q&&!v&&(w++,q=!1),n=0;n<w;n++)d+=u}if("keyword"===c.type&&y.match(/^(case|default)$/)&&(B[g]=y,g++),"keyword"===c.type&&y.match(/^(break)$/)&&B[g-1]&&B[g-1].match(/^(case|default)$/)&&g--,"paren.lparen"===c.type&&(v+=(y.match(/\(/g)||[]).length,T+=(y.match(/\{/g)||[]).length,g+=y.length),"keyword"===c.type&&y.match(/^(if|else|elseif|for|while)$/)?(q=!0,v=0):!v&&y.trim()&&"comment"!==c.type&&(q=!1),"paren.rparen"===c.type)for(v-=(y.match(/\)/g)||[]).length,T-=(y.match(/\}/g)||[]).length,n=0;n<y.length;n++)g--,"}"===y.substr(n,1)&&"case"===B[g]&&g--;"text"==c.type&&(y=y.replace(/\s+$/," ")),f&&!p&&(S(),"\n"!==d.substr(-1)&&(d+=" ")),d+=y,h&&(d+=" "),p=!1,f=!1,h=!1,(r(c,"tag-close")&&(_||-1!==m.indexOf(b))||r(c,"doctype")&&">"===y)&&(O=_&&o&&"</"===o.value?-1:1),r(c,"tag-open")&&"</"===y?g--:r(c,"tag-open")&&"<"===y&&-1===l.indexOf(o.value)?g++:r(c,"tag-name")?b=y:r(c,"tag-close")&&"/>"===y&&-1===l.indexOf(b)&&g--,s=R}}c=o}d=d.trim(),e.doc.setValue(d)},t.commands=[{name:"beautify",description:"Format selection (Beautify)",exec:function(e){t.beautify(e.session)},bindKey:"Ctrl-Shift-B"}]}),function(){window.require(["ace/ext/beautify"],function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)})}();