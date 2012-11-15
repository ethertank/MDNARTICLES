"use strict";

(function() {
	var _t = "[\x09-\x0D\x20\xA0\x85\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+",
	    _l = new RegExp("^" + _t),
	    _r = new RegExp(_t + "$"),
	    SP = String.prototype;
	SP.trimLeft = function() { return this.replace(_l, ""); };
	SP.trimRight = function() { return this.replace(_r, ""); };
	SP.trim = function() { return this.trimLeft().trimRight(); };
})();

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
	s = s.replace(/\((("|'){2})*\)\}\}/g, '}}');
	
	// 空 p
	s = s.replace(/<p>(?:\s|(?:&nbsp;))*<\/p>/g, '');
	
	// p, dt, dd, li, hn の最後のスペース削除
	s = s.replace(/\s<\/(p|(?:dt)|(?:dd)|(?:li)|(?:h[1-6]))>/g, '</$1>');
	
	// よくある誤字の修正 ( http://jsfiddle.net/ethertank/eK6a2/ )
	s = s.replace(/Mozil*a/g, 'Mozilla');
	s = s.replace(/F(?:(?:ir)|(?:ie)|(?:ier)|(?:ore))(?:(?:g|f)*o*x)/g, 'Firefox');
	
	// <span class="comment">xxx</span> を <!-- xxx --> に置換
	s = s.replace(/<span class="comment">(.*)<\/span>/g, '<!-- $1 -->');
	
	// 古い言語間リンク用テンプレートのマクロの "<p>{{" と "}}</p>" を "<!--" と "-->" に置換
	s = s.replace(/<(?:p|(?:div))>\s*\{\{(\s*(wiki\.)*languages.*)\}\}\s*<\/(?:p|(?:div))>/g,'<!--$1-->');
	
	// 不正な出力になる、ブロックテンプレートしか内容を持たない p の div への置換。
	s = s.replace(/<p>(\{\{\s*((?:(?:MDCProjectPages)|(?:html5article)Toc)|((?:css)|(?:dom)ref)|(?:translationInProgress)|(?:outDated))\s*\}\})<\/p>/gi,'<div>$1</div>');
	
	// <img alt="Firefox on Linux" fileid="617" src="File:en/Media_Gallery/A.png" />
	// <img alt="Firefox on Linux" src="/files/617/A.png" />

	s = s.replace(/fileid=\"(.*)\"\s*src=\"File:en\/Media_Gallery\/(.*)\"?/g, 'src="/files/$1/$2"');


	// トリミング
	s = s.trim();
	
    
    t.value = s;
	
}, false);


/*

# TODO (･ω･｀)

	見出しの中の 不要な nbsp エスケープの置換とトリム

	見出しの id/name 内の".C2.A0"を"_"へ置換

	#Syntax の直後の単独の pre に ".eval" しかない場合、".syntaxbox" に。
	.twopartsyntaxbox というクラスの使用条件に合致する場合処理を避けなければならない。

	見出しのキャメライズの統一、空 p に変換されてしまうコード末尾の改行コードを削除

	pre の 古いハイライト用のクラス名を新しいのに変えて、その pre 内部の HTML タグを除去

	pre 内部の 不要な nbsp を半角スペースに置換

	見出しの name と id が異なる場合、name の値に統一し、同一 id を持つ要素が重複して存在する場合、
	二つ目以降の id に "-2" の様な連番を振った上で内容からの自動変換を防ぐ為に同値の name 属性を設定し重複を回避。
	…正規表現だけで出来るのか？
*/