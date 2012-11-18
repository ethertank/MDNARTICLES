"use strict";
(function($) {

	// プラグイン jQuery elastic
	$('#t').css("resize","none"); // js 有効時、即ちプラグイン有効時にのみ通常の手動リサイズ機能をカット
	$('#t').elastic(); // 実行
	$('#t').trigger('update'); // トリガの設定




	// 本体。MDN の新システム Kuma で変更された URL などを修正。
	// 数千ページを移植時に壊したんだから、本来は DB 側で一括修正していただくべき所。
	// しかしどうも大きな問題として捉えてない感じ。
	$("#c").click(function() {
		var t = $("#t")[0], s = t.value;
		
		// URL
		s = s.replace(/href=\"\/*en(-US\/docs)*\//g, 'href="/en-US/docs/');
		s = s.replace(/href=\"\/*Project\:en\//g,'href="/en-US/docs/Project:');
		s = s.replace(/Core_JavaScript_1\.5_/g, 'JavaScript/');    
		s = s.replace(/Special:Tags\?tag=(.*?)&language=en?/g, 'en-US/docs/tag/$1');

		// title
		s = s.replace(/Core JavaScript 1\.5/g, 'JavaScript/');


		// title (-en)
		s = s.replace(/title=\"\/*en(-US)*\/(docs\/)*/g, 'title="');	
		
		
		// 不要になったクラス (eval, deki-transform)
		s = s.replace(/pre class=\"(?:eval|deki-transform)\"/g, 'pre');
		
		// id / name 属性の .C2.A2 を アンダースコアに
		s = s.replace(/((?:(?:id)|(?:name))=\".+?)\.C2\.A0(.+?\")?/g, '$1_$2');	


		// テンプレートの詰め
		s = s.replace(/\{\{ /g, '{{').replace(/ \}\}/g, '}}').replace(/\((("|'){2})*\)\}\}/g, '}}');
		
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
		s = s.replace(/<p>(\{\{\s*((?:(?:(?:MDCProjectPages)|(?:html5article))Toc)|(?:(?:css)|(?:dom)ref)|(?:translationInProgress)|(?:outDated))\s*\}\})<\/p>/gi,'<div>$1</div>');
		
		// 画像パスの修正（要検証） https://bugzilla.mozilla.org/show_bug.cgi?id=795841
		s = s.replace(/fileid=\"(.*)\"\s*src=\"File:en\/Media_Gallery\/(.*\"?)/g, 'src="/files/$1/$2');


		// id / name 先頭及び末尾のアンダースコア（但し __proto__　等の為、２連続のものは除外）
		// s = s.replace(/(?:((?:\s(?:id)|(?:name))=\")(.*)_{1}?(\"))?/g, '$1$2$3');	



		
		s = $.trim(s); // トリミング		
		t.value = s; // 出力
	});




	// Delete ボタン
	$("#d").click(function() {
		$("#t")[0].value = "";
		$("#t").css("height","inherit");
	});

})(jQuery);
/*

# TODO (･ω･｀)
	見出しの中の 不要な nbsp エスケープの置換とトリム

	見出しの id/name 内の".C2.A0"を"_"へ置換

	#Syntax の直後の単独の pre に ".eval" しかない場合、".syntaxbox" に。　.twopartsyntaxbox というクラスの使用条件に合致する場合処理を避けなければならない。

	見出しのキャメライズの統一、空 p に変換されてしまうコード末尾の改行コードを削除
	
	pre の 古いハイライト用のクラス名を新しいのに変えて、その pre 内部の HTML タグを除去
	
	pre 内部の 不要な nbsp を半角スペースに置換
	
	見出しの name と id が異なる場合、name の値に統一し、同一 id を持つ要素が重複して存在する場合、二つ目以降の id に "-2" の様な連番を振った上で内容からの自動変換を防ぐ為に同値の name 属性を設定し重複を回避。…正規表現だけで出来るのか？

*/