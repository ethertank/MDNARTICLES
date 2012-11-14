"use strict";

var b = document.getElementById("b");

b.addEventListener("click", function() {
    var t = document.getElementById("t"), s = t.value;
    
    // URL
    s = s.replace(/href=\"\/*en(-US\/docs)*\//g, 'href="/en-US/docs/');
    s = s.replace(/href=\"\/*Project\:en\//g,'href="/en-US/docs/Project:');
    
    // title
    s = s.replace(/title=\"\/*en(-US)*\/(docs\/)*/g, 'title="');
    
    // title & URL
    s = s.replace(/Core_JavaScript_1\.5_/g, 'JavaScript/');    
    s = s.replace(/Core JavaScript 1\.5/g, 'JavaScript/');

    // 不要になったクラス
    s = s.replace(/pre class=\"eval\"/g, 'pre');
    
    // テンプレートの詰め
    s = s.replace(/\{\{ /g, '{{');
    s = s.replace(/ \}\}/g, '}}');
    s = s.replace(/\(("")*\)\}\}/g, '}}');

    // 空 p
    s = s.replace(/<p>(?:\s|(?:&nbsp;))*<\/p>/g, '');

    // p, dt, dd, li, hn の最後のスペース削除
    s = s.replace(/\s<\/(p|(?:dt)|(?:dd)|(?:li)|(?:h[1-6]))>/g, '</$1>');
    
    // よくある誤字の修正 ( http://jsfiddle.net/ethertank/eK6a2/ )
    s = s.replace(/Mozil*a/g, 'Mozilla');
    s = s.replace(/F(?:(?:ir)|(?:ie)|(?:ier)|(?:ore))(?:(?:g|f)*o*x)/g, 'Firefox');
    
    // 古い言語間リンク用テンプレートのマクロの "<p>{{" と "}}</p>" を "<!--" と "-->" に置換
    s = s.replace(/<(?:p|(?:div))>\s*\{\{(\s*(wiki\.)*languages.*)\}\}\s*<\/(?:p|(?:div))>/g,'<!--$1-->');

    // 不正な出力になる、ブロックテンプレートしか内容を持たない p の div への置換。
    s = s.replace(/<p>(\{\{\s*((?:MDCProjectPagesTOC)|(?:translationInProgress)|(?:outDated))\s*\}\})<\/p>/gi, '<div>$1</div>');
    
    t.value = s;

}, false);