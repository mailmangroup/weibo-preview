/*
 * Weibo Preview
 * Author: Fergus Jordan
 * Version: 1.0.21
 *
 * Real-time preview of content on Sina Weibo's iOS app
 */
(function ( root, factory ) {

	// AMD
	if ( typeof define === 'function' && define.amd ) define( [], factory );

	// COMMONJS
	else if ( typeof exports === 'object' ) module.exports = factory();

	// BROWSER GLOBAL
	else root.Preview = factory();

}(this, function () {
	'use strict';

	var emoji = [{"id":"[K016]","sweibo":["[微笑]","[呵呵]","[带感]","[bm喜悦]"],"url":"//s3.amazonaws.com/kawo-emoji/K016.png","icon":"2","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K017]","sweibo":["[嘻嘻]","[得意地笑]","[bm兴奋]"],"url":"//s3.amazonaws.com/kawo-emoji/K017.png","icon":"3","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K018]","sweibo":["[哈哈]","[笑哈哈]","[bm高兴]"],"url":"//s3.amazonaws.com/kawo-emoji/K018.png","icon":"4","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K027]","sweibo":["[爱你]","[好爱哦]","[飞个吻]","[bm花痴]"],"url":"//s3.amazonaws.com/kawo-emoji/K027.png","icon":"5","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K022]","sweibo":["[挖鼻]","[挖鼻屎]","[抠鼻屎]","[bm挖鼻孔]"],"url":"//s3.amazonaws.com/kawo-emoji/K022.png","icon":"6","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K023]","sweibo":["[吃惊]","[震惊]","[吓到了]","[bm吃惊]","[bm震惊]"],"url":"//s3.amazonaws.com/kawo-emoji/K023.png","icon":"7","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K056]","sweibo":["[晕]","[kxl晕]","[ala晕]"],"url":"//s3.amazonaws.com/kawo-emoji/K056.png","icon":"8","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K028]","sweibo":["[泪]","[泪流满面]","[bm流泪]","[bm哭泣]"],"url":"//s3.amazonaws.com/kawo-emoji/K028.png","icon":"9","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K044]","sweibo":["[馋嘴]","[吃货]","[bm馋]","[bm流口水]"],"url":"//s3.amazonaws.com/kawo-emoji/K044.png","icon":"10","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K058]","sweibo":["[抓狂]","[躁狂症]","[bm抓狂]"],"url":"//s3.amazonaws.com/kawo-emoji/K058.png","icon":"11","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K054]","sweibo":["[哼]","[lb哼]","[ala哼]"],"url":"//s3.amazonaws.com/kawo-emoji/K054.png","icon":"12","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K020]","sweibo":["[可爱]","[噢耶]","[bm干笑]"],"url":"//s3.amazonaws.com/kawo-emoji/K020.png","icon":"13","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K041]","sweibo":["[怒]","[不想上班]","[bm大叫]"],"url":"//s3.amazonaws.com/kawo-emoji/K041.png","icon":"14","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K047]","sweibo":["[汗]","[巨汗]","[ali睡]"],"url":"//s3.amazonaws.com/kawo-emoji/K047.png","icon":"15","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K024]","sweibo":["[害羞]","[不好意思]","[bm卖萌]"],"url":"//s3.amazonaws.com/kawo-emoji/K024.png","icon":"16","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"sweibo":["[困]"],"icon":"17","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K050]","sweibo":["[钱]","[金元宝]","[ali撒钱]"],"url":"//s3.amazonaws.com/kawo-emoji/K050.png","icon":"18","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K029]","sweibo":["[偷笑]","[偷乐]","[bm暗爽]"],"url":"//s3.amazonaws.com/kawo-emoji/K029.png","icon":"19","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"sweibo":["[笑cry]"],"icon":"20","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"sweibo":["[doge]"],"icon":"21","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"sweibo":["[喵喵]"],"icon":"22","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"name":"cool","id":"[K052]","sweibo":["[酷]","[杰克逊]","[c帅]"],"url":"//s3.amazonaws.com/kawo-emoji/K052.png","icon":"23","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K036]","sweibo":["[衰]","[悲催]","[bm悲催]"],"url":"//s3.amazonaws.com/kawo-emoji/K036.png","icon":"24","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K025]","sweibo":["[闭嘴]"],"url":"//s3.amazonaws.com/kawo-emoji/K025.png","icon":"25","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K026]","sweibo":["[鄙视]","[c冷眼]","[bm吐槽]"],"url":"//s3.amazonaws.com/kawo-emoji/K026.png","icon":"26","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K053]","sweibo":["[色]","[花心]","[好喜欢]","[七夕]","[bobo抛媚眼]"],"url":"//s3.amazonaws.com/kawo-emoji/K053.png","icon":"27","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K055]","sweibo":["[鼓掌]","[拍手]","[din拍手]"],"url":"//s3.amazonaws.com/kawo-emoji/K055.png","icon":"28","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite1.png"},{"id":"[K057]","sweibo":["[悲伤]","[没人疼]","[bm哭诉]"],"url":"//s3.amazonaws.com/kawo-emoji/K057.png","icon":"1","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K046]","sweibo":["[思考]","[懒得理你]","[ali翻白眼]","[bm踱步]"],"url":"//s3.amazonaws.com/kawo-emoji/K046.png","icon":"2","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K031]","sweibo":["[生病]","[非常汗]","[ali喷嚏]"],"url":"//s3.amazonaws.com/kawo-emoji/K031.png","icon":"3","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K030]","sweibo":["[亲亲]","[亲一口]","[bm亲吻]"],"url":"//s3.amazonaws.com/kawo-emoji/K030.png","icon":"4","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"sweibo":["[怒骂]"],"icon":"5","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K032]","sweibo":["[太开心]","[噢耶]","[转发]","[bm大笑]"],"url":"//s3.amazonaws.com/kawo-emoji/K032.png","icon":"6","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"sweibo":["[白眼]"],"icon":"7","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K033]","sweibo":["[右哼哼]"],"url":"//s3.amazonaws.com/kawo-emoji/K033.png","icon":"8","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K034]","sweibo":["[左哼哼]"],"url":"//s3.amazonaws.com/kawo-emoji/K034.png","icon":"9","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K035]","sweibo":["[嘘]","[ali嘘嘘嘘]","[嘘嘘]"],"url":"//s3.amazonaws.com/kawo-emoji/K035.png","icon":"10","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K037]","sweibo":["[委屈]","[xkl委屈]","[酷库熊委屈]"],"url":"//s3.amazonaws.com/kawo-emoji/K037.png","icon":"11","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"sweibo":["[吐]"],"icon":"12","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K021]","sweibo":["[可怜]","[求关注]","[好喜欢]","[bm可爱]"],"url":"//s3.amazonaws.com/kawo-emoji/K021.png","icon":"13","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K049]","sweibo":["[睡]","[睡觉]","[xb睡觉]","[toto睡觉]"],"url":"//s3.amazonaws.com/kawo-emoji/K049.png","icon":"14","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K019]","sweibo":["[挤眼]","[羞嗒嗒]","[bm调皮]"],"url":"//s3.amazonaws.com/kawo-emoji/K019.png","icon":"15","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K051]","sweibo":["[失望]","[ali抱枕]","[ala泪汪汪]"],"url":"//s3.amazonaws.com/kawo-emoji/K051.png","icon":"16","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K062]","sweibo":["[顶]","[好棒]","[bm顶]"],"url":"//s3.amazonaws.com/kawo-emoji/K062.png","icon":"17","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K043]","sweibo":["[疑问]","[想一想]","[bm思考]"],"url":"//s3.amazonaws.com/kawo-emoji/K043.png","icon":"18","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K063]","sweibo":["[感冒]","[ali喷嚏]","[bm流鼻涕]"],"url":"//s3.amazonaws.com/kawo-emoji/K063.png","icon":"20","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K045]","sweibo":["[拜拜]","[ali88]","[xb挥手]"],"url":"//s3.amazonaws.com/kawo-emoji/K045.png","icon":"21","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K059]","sweibo":["[黑线]","[非常汗]","[bm孤独]"],"url":"//s3.amazonaws.com/kawo-emoji/K059.png","icon":"22","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K060]","sweibo":["[阴险]","[大南瓜]","[bm坏笑]"],"url":"//s3.amazonaws.com/kawo-emoji/K060.png","icon":"23","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"sweibo":["[互粉]"],"icon":"24","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K067]","sweibo":["[心]","[j微博益起来]","[nono微博益起来]"],"url":"//s3.amazonaws.com/kawo-emoji/K067.png","icon":"25","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K068]","sweibo":["[伤心]","[爱]"],"url":"//s3.amazonaws.com/kawo-emoji/K068.png","icon":"26","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K015]","sweibo":["[猪头]"],"url":"//s3.amazonaws.com/kawo-emoji/K015.png","icon":"27","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K014]","sweibo":["[熊猫]","[萌翻]","[nono害羞]"],"url":"//s3.amazonaws.com/kawo-emoji/K014.png","icon":"28","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite2.png"},{"id":"[K013]","sweibo":["[兔子]","[lt耳朵]","[冒个泡]"],"url":"//s3.amazonaws.com/kawo-emoji/K013.png","icon":"1","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[握手]"],"icon":"2","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[作揖]"],"icon":"3","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K085]","sweibo":["[good]","[赞]","[赞啊]","[bm赞]"],"url":"//s3.amazonaws.com/kawo-emoji/K085.png","icon":"4","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K084]","sweibo":["[耶]","[酷库熊胜利]","[ala耶]"],"url":"//s3.amazonaws.com/kawo-emoji/K084.png","icon":"5","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[good]"],"icon":"6","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K088]","sweibo":["[弱]"],"url":"//s3.amazonaws.com/kawo-emoji/K088.png","icon":"7","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K086]","sweibo":["[NO]","[不要]","[bobo不要啊]","[bm反对]"],"url":"//s3.amazonaws.com/kawo-emoji/K086.png","icon":"8","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K083]","sweibo":["[ok]","[lb嗯]","[bm好吧]"],"url":"//s3.amazonaws.com/kawo-emoji/K083.png","icon":"9","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[haha]"],"icon":"10","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[来]"],"icon":"11","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[威武]"],"icon":"12","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K079]","sweibo":["[鲜花]","[玫瑰]","[xb小花]"],"url":"//s3.amazonaws.com/kawo-emoji/K079.png","icon":"13","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K071]","sweibo":["[钟]","[km闹钟]"],"url":"//s3.amazonaws.com/kawo-emoji/K071.png","icon":"14","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K003]","sweibo":["[浮云]","[lt浮云]","[哎呦熊浮云]"],"url":"//s3.amazonaws.com/kawo-emoji/K003.png","icon":"15","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K081]","sweibo":["[飞机]"],"url":"//s3.amazonaws.com/kawo-emoji/K081.png","icon":"16","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K075]","sweibo":["[月亮]","[gbz晚安了]","[哎呦熊晚安]"],"url":"//s3.amazonaws.com/kawo-emoji/K075.png","icon":"17","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K074]","sweibo":["[太阳]"],"url":"//s3.amazonaws.com/kawo-emoji/K074.png","icon":"18","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[微风]"],"icon":"19","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[下雨]"],"icon":"20","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K001]","sweibo":["[给力]","[推荐]","[din赞好]"],"url":"//s3.amazonaws.com/kawo-emoji/K001.png","icon":"21","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K004]","sweibo":["[神马]"],"url":"//s3.amazonaws.com/kawo-emoji/K004.png","icon":"22","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K006]","sweibo":["[围观]","[群体围观]","[采访]","[moc围观]"],"url":"//s3.amazonaws.com/kawo-emoji/K006.png","icon":"23","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K072]","sweibo":["[话筒]","[采访]","[发表言论]","[xb唱歌]"],"url":"//s3.amazonaws.com/kawo-emoji/K072.png","icon":"24","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[奥特曼]"],"icon":"25","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[草泥马]"],"icon":"26","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[萌]"],"icon":"27","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"id":"[K005]","sweibo":["[囧]","[好囧]","[xkl囧]"],"url":"//s3.amazonaws.com/kawo-emoji/K005.png","icon":"28","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite3.png"},{"sweibo":["[织]"],"icon":"1","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"id":"[K077]","sweibo":["[礼物]","[发礼物]","[ali送礼物]"],"url":"//s3.amazonaws.com/kawo-emoji/K077.png","icon":"2","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[喜]"],"icon":"3","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[围脖]"],"icon":"4","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[音乐]"],"icon":"5","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[绿丝带]"],"icon":"6","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"id":"[K069]","sweibo":["[蛋糕]","[微博三岁啦]","[bm蛋糕]"],"url":"//s3.amazonaws.com/kawo-emoji/K069.png","icon":"7","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[蜡烛]"],"icon":"8","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"id":"[K076]","sweibo":["[干杯]"],"url":"//s3.amazonaws.com/kawo-emoji/K076.png","icon":"9","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[男孩儿]"],"icon":"10","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[女孩儿]"],"icon":"11","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[肥皂]"],"icon":"12","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"id":"[K082]","sweibo":["[照相机]","[moc拍照]","[拍照]"],"url":"//s3.amazonaws.com/kawo-emoji/K082.png","icon":"13","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[浪]"],"icon":"14","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"sweibo":["[沙尘暴]"],"icon":"15","sprite":"//mailmangroup.github.io/weibo-preview/images/emoji-sprite4.png"},{"id":"[K073]","sweibo":["[咖啡]","[咖啡咖啡]"],"url":"//s3.amazonaws.com/kawo-emoji/K073.png"},{"id":"[K007]","sweibo":["[足球]"],"url":"//s3.amazonaws.com/kawo-emoji/K007.png"},{"id":"[K011]","sweibo":["[lt最右]","[最右]","[lxhx右边]"],"url":"//s3.amazonaws.com/kawo-emoji/K011.png"},{"id":"[K080]","sweibo":["[汽车]"],"url":"//s3.amazonaws.com/kawo-emoji/K080.png"},{"id":"[K040]","sweibo":["[抱抱]","[拍手]","[ali抱一抱]"],"url":"//s3.amazonaws.com/kawo-emoji/K040.png"},{"id":"[K039]","sweibo":["[哈欠]","[打哈欠]","[困死了]","[酷库熊哈欠]"],"url":"//s3.amazonaws.com/kawo-emoji/K039.png"},{"id":"[K042]","sweibo":["[愤怒]","[崩溃]","[bm暴怒]","[bm大叫]"],"url":"//s3.amazonaws.com/kawo-emoji/K042.png"},{"id":"[K066]","sweibo":["[书呆子]","[xb看书]","[xb眼镜]"],"url":"//s3.amazonaws.com/kawo-emoji/K066.png"}];

	// DECLARE ACCEPTED CONTAINER SIZES
	var sizes = {
		iphone4: {
			height: '480px',
			width: '320px'
		},
		iphone5: {
			height: '568px',
			width: '320px'
		},
		iphone6: {
			height: '667px',
			width: '375px'
		},
		iphone6plus: {
			height: '736px',
			width: '414px'
		}
	};

	// EXTEND JAVASCRIPT OBJECT
	function extend ( defaults, options ) {

	    var extended = {};
	    var prop;

	    for (prop in defaults) {
	        if (Object.prototype.hasOwnProperty.call(defaults, prop)) extended[prop] = defaults[prop];
	    }

	    for (prop in options) {
	        if (Object.prototype.hasOwnProperty.call(options, prop)) extended[prop] = options[prop];
	    }

	    return extended;

	};

	// CONVERT STRING TO LOWERCASE AND STRIP SPACES TO ENSURE INPUT MATCHES ACCEPTED SIZES
	function normalizeString ( string ) {

		var normalized = string.toLowerCase().replace(/ /g,'');

		return normalized;

	};

	// IF LENGTH OF INPUT IS 0 > REVERT TO DEFAULT
	function testDefaults ( defaultValue, inputValue ) {

		if ( inputValue != null ) inputValue = inputValue.length === 0 ? defaultValue : inputValue;
			else if ( inputValue === null ) inputValue = defaultValue;

		return inputValue;

	}

	// PARSE STRING: IF LINK OR HASHTAG > WRAP IN <A> TAG / IF VIDEO LINK > RETURN VIDEO TRUE
	// ===============================================================================
	function parseString ( string ) {

		// DO WE HAVE A STRING
		if ( string ) {

			string = string.replace( /(http|https):\/\/(\w+:{0,1}\w*@)?(\S[^\s<]+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi, function(url, http, displayUrl) {

				// URL LONGER THAN 10 CHARS › OK
				if ( url.length > 10 ) {

					if ( !displayUrl ) var displayUrl = url;

					// HTTP MISSING › ADD IT TO HREF
					if ( !http ) url = 'http://' + url;

					// HAS HTTP › REMOVE IT FOR DISPLAY
					else var displayUrl = '网页链接'; // TODO: IF VIDEO > SET DISPLAY URL TO VIDEO TITLE

					// REMOVE PERIOD AND SEMI-COLON FROM END OF URL
					var last = url.substr(-1),
						end = '';
					if ( last == '.' || last == ';' ) {
						url = url.substr(0, -1);
						end = last;
					}

					// TODO: BUILD THIS OUT MORE TO STORE URL TO BE FETCHED FURTHER DOWN

					var link = '<a href="' + url + '" title="' + url + '"' + ' class="link preview-link"' + ' target="_blank">' + displayUrl + '</a>' + end;

					// IF URL IS A VIDEO > ADD PREVIEW-VLINK CLASS TO RETURN LINK
					// TODO: IF URL CONTAINS SINA > ADD CLASSNAME TO VIDEO TO STYLE DIFFERENTLY
					// RETURN HTML ELEMENT
					if ( url.match( /(http|https):\/\/(\w+:{0,1}\w*@)?((youku|pptv|sohu|tudou)+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi ) ) return '<a href="' + url + '" title="' + url + '"' + ' class="link preview-vlink preview-link" target="_blank">' + displayUrl + '</a>' + end;
					else return link;

				// URL TOO SHORT › DO NOTHING
				} else return url;

			});

			// PARSE A TEXT STRING AND CONVERT EMOJI SHORTCODES TO IMG TAGS
			string = string.replace( /\[(\S+?)\]/gi, function( matches ) {

				// LOOP THROUGH EMOJIS
				for ( var i = 0; i < emoji.length; i++ ) {

					// IF EMOJI HAS SWEIBO SHORTCODES › CHECK SWEIBO SHORTCODES
					if ( emoji[ i ].sweibo && emoji[ i ].sweibo.length > 0 ) {

						// LOOP THROUGH SWEIBO SHORTCODES TO FIND MATCH
						for ( var x = 0; x < emoji[ i ].sweibo.length; x++ ) {

							// IF REGEX MATCHES WEIBO SHORTCODE › RETURN BACKGROUND IMAGE ICON
							if ( matches === emoji[ i ].sweibo[ x ] )
								return '<i class="wp-emoji wp-emoji-' + emoji[ i ].icon + '" style="background-image:url(' + emoji[ i ].sprite + ');background-position:50% ' + ( -20 * ( emoji[ i ].icon - 1 ) ) + 'px;">' + matches + '</i>';

						}

					}

					// IF MATCHES KAWO SHORTCODE › RETURN IMG
					if ( emoji[ i ].id && matches === emoji[ i ].id ) {

						// IF THE EMOJI HAS AN ICON AND SPRITE PROPERTY › DISPLAY AS WEIBO EMOJI
						if ( emoji[ i ].icon && emoji[ i ].sprite )
							return '<i class="wp-emoji wp-emoji-' + emoji[ i ].icon + '" style="background-image:url(' + emoji[ i ].sprite + ');background-position:50% ' + ( -20 * ( emoji[ i ].icon - 1 ) ) + 'px;">' + matches + '</i>';

						// ELSE IF EMOJI URL IS SET › FALL BACK TO KAWO EMOJI
						else if ( emoji[ i ].url ) return '<img src="' + emoji[ i ].url + '" class="wp-emoji">';

					}

				}

				return matches;

			});

			// PARSE A TEXT STRING AND CONVERT WEIBO MENTIONS '@' TO LINKS
			string = string.replace( /@([^#\s<;\/\\():]+)/gi, function( matches, tag ) {

				return '<a href="http://weibo.com/n/' + tag + '" class="link" target="_blank">@' + tag + '</a>';

			});

			// PARSE A TEXT STRING AND CONVERT WEIBO #HASHTAGS# TO LINKS
			return string.replace( /#([^]+?)#/gi, function( matches, tag ) {

				return '<a href="http://huati.weibo.com/k/' + tag + '" class="link" target="_blank">#' + tag + '#</a>';

			});

		}

	};


	// PREVIEW CLASS CONSTRUCTOR
	// ===============================================================================
	function Preview ( options ) {

		// ENSURE THAT THE CLASS IS CALLED WITH THE `new` CONSTRUCTOR
		if ( !( this instanceof Preview ) ) {
			throw new TypeError( 'Preview constructor cannot be called as a function.' );
		}

		// NEW PREVIEW OBJECT
		var options = extend({
			container: 'iphone4'
		}, options);

		// BUILD CONTAINER ELEMENT
		// ===========================================================================
		this.create( 'el', 'div', 'preview-container' );

		// IF CONTAINER IS AN OBJECT > OBJECT VALUES MUST BE HEIGHT AND WIDTH
		// ===========================================================================
		if ( typeof options.container === 'object' && options.container.width && options.container.height ) {

			if ( typeof options.container.width === 'number' && typeof options.container.height === 'number' ) {

				options.container.width = options.container.width + 'px';
				options.container.height = options.container.height + 'px';

			}

			this.el.style.width = options.container.width;
			this.el.style.height = options.container.height;

		}

		// IF CONTAINER IS AN STRING > SET HEIGHT AND WIDTH ACCORDING TO WHITELIST SIZES
		// ===========================================================================
		else if ( typeof options.container == 'string' ) {

			for ( var prop in sizes ) {

				if ( sizes.hasOwnProperty( prop ) && prop == normalizeString( options.container ) ) {

					this.el.style.width = sizes[ prop ].width;
					this.el.style.height = sizes[ prop ].height;

				}

			}

		} else throw new TypeError( 'Container object contains invalid values' );

	};

	// BUILD PREVIEW PROTOTYPE
	// ===============================================================================
	Preview.prototype = {

		// SET PROTOTYPE CONSTRUCTOR AS PREVIEW
		constructor: Preview,

		// CREATE ELEMENT
		create: function ( name, element, className, target ) {

			this[ name ] = document.createElement( element );
			if ( className ) this[ name ].className = className;
			if ( target ) target.appendChild( this[ name ] );

		},

		// GENERATE THE CONTENT OF THE PREVIEW
		// ============================================================================
		generate: function ( content ) {


			// SET CONTENT
			// =========================================================================

			// IF CONTENT IS STRING > SET AS POST TEXT ON OBJECT
			if ( typeof( content ) == 'string' ) content = { postText: content };

			// SET DEFAULT VALUES
			var defaults = {
				postText: '微博正文。。。',
				accountName: '账户名称',
				accountImage: null,
				postTime: '刚刚',
				postSource: '微博 weibo.com'
			}


			// IF NO PREVIOUS VALUES ARE SET > SET DEFAULTS > OVERRIDE WITH USER SET VALUES
			if ( !this.previous ){

				var post = extend({
						postText: defaults.postText,
						accountName: defaults.accountName,
						accountImage: defaults.accountImage,
						postTime: defaults.postTime,
						postSource: defaults.postSource,
						postImages: [],
						originalPost: null,
						verified: false,
						featuredHashtag: false
					}, content );

			} else {

				// IF PREVIOUS VALUES ARE SET > EXTEND TO POST
				var post = extend( this.previous, content );

				// IF VALUE OF INPUT IS 0 > REVERT VALUE TO DEFAULT
				post.postText = testDefaults( defaults.postText, post.postText );
				post.accountName = testDefaults( defaults.accountName, post.accountName );
				post.accountImage = testDefaults( defaults.accountImage, post.accountImage );
				post.postTime = testDefaults( defaults.postTime, post.postTime );
				post.postSource = testDefaults( defaults.postSource, post.postSource );

				if ( !content.originalPost ) post.originalPost = null;

			}

			// IF POST WRAPPER DOESNT EXIST > CREATE POST WRAPPER
			// =========================================================================
			if ( !this.postWrapper ) {

				this.create( 'postWrapper', 'div', 'post-wrapper' );

				// APPEND HEADER TO POST WRAPPER
				this.create( 'postHeader', 'div', 'post-header', this.postWrapper );

				// IF VERIFIED IS TRUE > SET CLASSNAME OF HEADER TO BE VERIFIED
				if ( post.verified === true ) this.postHeader.className += ' verified';

				// APPEND SECTION TO POST WRAPPER
				this.create( 'postBody', 'div', 'post-body', this.postWrapper );

				// APPEND POST WRAPPER TO PREVIEW CONTAINER
				this.el.appendChild( this.postWrapper );

			}

			// APPEND ENGAGEMENT SECTION TO POST WRAPPER
			// =========================================================================
			if ( !this.postEngagementEl ) {

				this.create( 'postEngagementEl', 'div', 'post-engagement', this.postWrapper );

				// CREATE POST FORWARDS
				this.create( 'postForwardsEl', 'div', 'post-forwards', this.postEngagementEl );
				this.create( 'postForwards', 'span', null, this.postForwardsEl );
				this.postForwards.innerHTML = '转发';

				// CREATE POST COMMENTS
				this.create( 'postCommentsEl', 'div', 'post-comments', this.postEngagementEl );
				this.create( 'postComments', 'span', null, this.postCommentsEl );
				this.postComments.innerHTML = '评论';

				// CREATE POST LIKES
				this.create( 'postLikesEl', 'div', 'post-likes', this.postEngagementEl );
				this.create( 'postLikes', 'span', null, this.postLikesEl );
				this.postLikes.innerHTML = '赞';

			}

			// CREATE ACCOUNT IMAGE
			// =========================================================================
			if ( !this.accountImageEl )
				this.create( 'accountImageEl', 'div', 'account-image', this.postHeader );

			// IF ACCOUNT IMAGE IS DEFINED > SET AS BACKGROUND IMAGE OF IMAGE WRAPPER
			if ( post.accountImage && ( !this.previous || post.accountImage != this.previous.accountImage ) )
				this.accountImageEl.style.backgroundImage = 'url(' + post.accountImage + ')';

			// CREATE ACCOUNT INFO
			// =========================================================================
			// IF ACCOUNT INFO ELEMENT DOESNT EXIST > CREATE AND APPEND TO HEADER
			if ( !this.accountInfoEl )
				this.create( 'accountInfoEl', 'div', 'account-info', this.postHeader );

			// CREATE ACCOUNT NAME
			// =========================================================================

			// IF ACCOUNT NAME ELEMENT DOESNT EXIST > CREATE AND APPEND TO ACCOUNT INFO ELEMENT
			if ( !this.accountNameEl )
				this.create( 'accountNameEl', 'span', 'account-name', this.accountInfoEl );

			// SET VALUE OF ACCOUNT NAME ELEMENT
			if ( post.accountName && ( !this.previous || post.accountName != this.previous.accountName ) )
				this.accountNameEl.innerHTML = post.accountName;

			// CREATE POST META DATA
			// =========================================================================

			// IF POST META DATA ELEMENT DOESNT EXIST > CREATE AND APPEND TO ACCOUNT INFO ELEMENT
			if ( !this.postMetaDataEl )
				this.create( 'postMetaDataEl', 'div', 'post-meta', this.accountInfoEl );

			// IF POST TIME ELEMENT DOESNT EXIST > CREATE AND APPEND TO POST META DATA ELEMENT
			if ( !this.postTimeEl )
				this.create( 'postTimeEl', 'span', null, this.postMetaDataEl );

			// SET VALUE OF POST TIME ELEMENT
			if ( post.postTime && this.postTimeEl ) {

				// FORMAT POST TIME
				if ( !isNaN( parseInt( post.postTime ) ) ) {

					var date = new Date( parseInt( post.postTime ) ),
						minutes = date.getMinutes(),
						hours = date.getHours(),
						day = date.getDate(),
						month = date.getMonth() + 1;

					// FORMAT 1 DIGIT NUMBERS
					if ( minutes <= 9 ) minutes = '0' + minutes;
					if ( hours == 0 ) hours = '00';

					// CHECK IF DATE IS EQUAL TO TODAY
					if ( date.setHours( 0, 0, 0, 0 ) == new Date().setHours( 0, 0, 0, 0 ) ) post.postTime = '今天 ' + hours + ':' + minutes;
						else post.postTime = month + '月' + day + '日 ' + hours + ':' + minutes;

				} else post.postTime = '刚刚';


				// SET POST TIME TO INNER HTML OF POST TIME ELEMENT
				if ( !this.previous || post.postTime != this.previous.postTime ) this.postTimeEl.innerHTML = post.postTime;

			}

			// IF POST SOURCE ELEMENT DOESNT EXIST > CREATE AND APPEND TO POST META DATA ELEMENT
			if ( !this.postSourceEl ) this.create( 'postSourceEl', 'span', null, this.postMetaDataEl );

			// SET VALUE OF POST SOURCE ELEMENT
			if ( post.postSource && ( !this.previous || post.postSource != this.previous.postSource ) )
				this.postSourceEl.innerHTML = '来自 ' + post.postSource;

			// CREATE POST CONTENT
			// =========================================================================

			// POST TEXT EXISTS
			if ( !this.postTextEl )
				this.create( 'postTextEl', 'p', null, this.postBody );

			// SET VALUE OF POST TEXT ELEMENT
			if ( post.postText && ( !this.previous || parseString( post.postText ) != parseString( this.previous.postText ) ) )
				this.postTextEl.innerHTML = parseString( post.postText );

			// IF VALUE PROVIDED WAS ONLY WHITESPACE › REVERT TO DEFAULT
			if ( post.postText.trim().length == 0 )
				this.postTextEl.innerHTML = defaults.postText;

			// IF POST IMAGE LENGTH IS GREATER THAN 0 AND NOT A REPOST › SET IMAGES TO POST BODY
			// =========================================================================
			if ( post.postImages.length > 0 && !post.originalPost && ( !this.mediaLinkEl || !this.mediaLinkEl.parentNode ) )
				this.setImages( post.postImages, this.postBody );

			// ELSE IF THERE ARE NO IMAGES IN CALL AND IMAGE LIST EXISTS OR THERES A REPOST > REMOVE IMAGE LIST
			else if ( this.postImageListEl && this.postImageListEl.parentNode && ( post.postImages.length == 0 || post.originalPost ) )
				this.postImageListEl.parentNode.removeChild( this.postImageListEl );

			// IF NO REPOSTED CONTENT AND M › SET MEDIA CONTENT TO POST BODY
			if ( !post.originalPost && ( !this.postImageListEl || this.postImageListEl.parentNode != this.postBody ) )
					this.setMedia( post, this.postBody, this.postTextEl );

			// CREATE REPOST
			// =========================================================================
			if ( post.originalPost ) {

				var repost = post.originalPost;

				// CREATE REPOST ELEMENT
				if ( !this.repostEl ) {
					this.repostEl = document.createElement( 'div' );
					this.repostEl.className = 'reposted-content';
				}

				// APPEND REPOST ELEMENT
				if ( this.repostEl && !this.repostEl.parentNode )
					this.postWrapper.insertBefore( this.repostEl, this.postEngagementEl );

				// POST TEXT EXISTS
				if ( !this.repostedTextEl )
					this.create( 'repostedTextEl', 'p', null, this.repostEl );

				// IF NO ACCOUNT NAME › SET DEFAULT ACCOUNT NAME
				if ( !repost.accountName )
					repost.accountName = '账户名称';

				// SET REPOST ACCOUNT NAME TO VARIABLE WITH HREF
				var accountNameLink = '<a target="_blank" href="http://weibo.com/n/' + repost.accountName + '">' + repost.accountName + '</a>';

				// SET VALUE OF POST TEXT ELEMENT
				if ( repost.postText )
					this.repostedTextEl.innerHTML = accountNameLink + ':' + parseString( repost.postText );

				// IF POST IMAGE LENGTH IS GREATER THAN 0 AND NOT A REPOST › SET IMAGES TO POST BODY
				// =========================================================================
				if ( repost.postImages && repost.postImages.length > 0 )
					this.setImages( repost.postImages, this.repostEl );

				// ELSE IF THERE ARE NO IMAGES IN CALL AND IMAGE LIST EXISTS > REMOVE IMAGE LIST
				else if ( repost.postImages && repost.postImages.length == 0 && this.postImageListEl && this.postImageListEl.parentNode )
					this.postImageListEl.parentNode.removeChild( this.postImageListEl );

				if ( !this.postImageListEl || this.postImageListEl.parentNode != this.postBody )
					this.setMedia( post, this.repostEl, this.repostedTextEl );

			} else if ( !post.originalPost && this.previous && this.previous.originalPost ) {
				this.repostEl.parentNode.removeChild( this.repostEl );
				console.log( 'remove' )
			}


			// SET CURRENT OPTIONS AS PREVIOUS TO COMPARE WITH NEXT TIME GENERATE IS RUN
			this.previous = post;

		},

		setMedia: function ( options, targetParent, textElement ) {

			// CREATE VIDEO PREVIEW
			// ========================================================================
			var videoPreviewLink = textElement.innerHTML.match( /<a[^>]*?.(class=[‘|"][a-zA-Z ^"’]*preview-vlink).*?">((?:.(?!\<\/a\>))*.)<\/a>/i );
			if ( videoPreviewLink ) {

				var videoUrl = videoPreviewLink[ 0 ];
				videoUrl = videoUrl.match( /<a\s+(?:[^>]*?\s+)?href="([^"]*)"/i )[ 1 ];

			}

			// IF VIDEO LINK ELEMENT DOESNT EXIST AND THERE ARE NO IMAGES IN POST > CREATE VIDEO LINK ELEMENT AND APPEND TO POST BODY
			if ( ( videoUrl || options.featuredHashtag ) && !this.mediaLinkEl && ( !this.postImageListEl || this.postImageListEl.parentNode != this.postBody ) ) {

				this.mediaLinkEl = document.createElement( 'a' );
				this.mediaLinkEl.setAttribute( 'target', '_blank' );

			}

			// IF VIDEO URL IS SET › ADD HREF TO
			if ( videoUrl && this.mediaLinkEl )
				this.mediaLinkEl.setAttribute( 'href', videoUrl );

			// IF FEATURE HASHTAG IS SET › SET THE URL ACCORDING TO THE HASHTAG
			if ( !videoUrl && options.featuredHashtag && options.featuredHashtag.hashtag ) {

				this.mediaLinkEl.setAttribute( 'href', 'http://huati.weibo.com/k/' + options.featuredHashtag.hashtag );
				this.mediaLinkEl.classList.add( 'featured-hashtag' );

			}

			// IF MEDIA LINK ELEMENT EXISTS AND ISNT APPENDED TO POST BODY > APPEND TO POST BODY
			if ( this.mediaLinkEl && !this.mediaLinkEl.parentNode )
				targetParent.appendChild( this.mediaLinkEl );

			// IF › POST TEXT DOESNT HAVE VIDEO <A> AND VIDEO LINK ELEMENT EXISTS > REMOVE THE VIDEO LINK ELEMENT
			if ( ( !videoUrl && !options.featuredHashtag && this.mediaLinkEl && this.mediaLinkEl.parentNode == targetParent ) || this.mediaLinkEl && ( options.originalPost && options.originalPost.postImages )  ) {

				this.postTextEl.className = '';
				targetParent.removeChild( this.mediaLinkEl );

			}

			// IF VIDEO URL IS STORED AND VIDEO LINK ELEMENT EXISTS > UPDATE VIDEO LINK ELEMENT HREF AND SET CLASSNAME OF POSTTEXT <P> TO HIDE VIDEO URL
			if ( videoUrl && this.mediaLinkEl && this.mediaLinkEl.parentNode ) {

				this.mediaLinkEl.setAttribute( 'href', videoUrl );
				textElement.className = 'vpreview';

			} else textElement.className = '';

			// IF VIDEO PREVIEW ELEMENT DOESNT EXIST > CREATE VIDEO PREVIEW ELEMENT
			if ( !this.mediaPreviewEl && this.mediaLinkEl ) this.create( 'mediaPreviewEl', 'div', 'media-preview', this.mediaLinkEl );

			// IF VIDEO IMAGE ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO PREVIEW EL
			if ( !this.mediaImageEl && this.mediaPreviewEl ) this.create( 'mediaImageEl', 'div', 'media-preview-image', this.mediaPreviewEl );

			// IF VIDEO IMAGE ELEMENT EXISTS AND DOESNT HAVE CLASSNAME OF MATCHED VIDEO > SET CLASSNAME ACCORDING TO MATCHED VIDEO
			if ( this.mediaImageEl ) {

				var videoClass = this.mediaImageEl.className,
					exp = /(\w+:{0,1}\w*@)?((youku|pptv|sohu|tudou)+)/gi;

				if ( videoClass && videoUrl && videoClass.indexOf( videoUrl.match( exp ) ) == -1 )
					this.mediaImageEl.className = 'media-preview-image ' + videoUrl.match( exp );

				else if ( !videoUrl && options.featuredHashtag && options.featuredHashtag.hashtagImage )
					this.mediaImageEl.style.backgroundImage = 'url(\'' + options.featuredHashtag.hashtagImage + '\')';

				else if ( videoUrl ) this.mediaImageEl.style.backgroundImage = '';

			}

			// IF VIDEO META DATA ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO PREVIEW ELEMENT
			if ( !this.mediaMetaData && this.mediaPreviewEl ) this.create( 'mediaMetaData', 'div', 'media-meta', this.mediaPreviewEl );

			// IF VIDEO TITLE ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO META DATA EL
			if ( !this.mediaTitle && this.mediaMetaData ) this.create( 'mediaTitle', 'p', null, this.mediaMetaData );

			// SET TEXT CONTENT OF MEDIA TITLE
			if ( videoUrl && this.mediaTitle ) this.mediaTitle.innerHTML = 'Video Title';
				else if ( options.featuredHashtag.hashtag ) this.mediaTitle.innerHTML = '#' + options.featuredHashtag.hashtag + '#';

			// IF VIDEO DESCRIPTION ELEMENT DOESNT EXIST > CREATE AND APPEND TO VIDEO META DATA EL
			if ( !this.mediaDescription && this.mediaMetaData ) this.create( 'mediaDescription', 'span', null, this.mediaMetaData );

			// SET TEXT CONTENT OF MEDIA DESCRIPTION
			if ( videoUrl && this.mediaDescription ) this.mediaDescription.innerHTML = 'Lorem ipsum dolor sit amet sit galor.';
				else if ( options.featuredHashtag.hashtagDescription ) this.mediaDescription.innerHTML = options.featuredHashtag.hashtagDescription;

			return this;

		},

		setImages: function( imageArray, targetParent ) {

			// IF NO CONTAINER ELEMENT › CREATE THE ELEMENT
			if ( !this.postImageListEl )
				this.create( 'postImageListEl', 'div' );

			// IF TARGET PARENT › APPEND TO TARGET PARENT
			if ( targetParent )
				targetParent.appendChild( this.postImageListEl );

			else if ( this.postImageListEl.parentNode )
				this.postImageListEl.parentNode.removeChild( this.postImageListEl );

			// SET IMAGE ARRAY CLASSNAME FOR LAYOUT
			this.postImageListEl.className = 'post-images image-layout-' + imageArray.length;

			// LOOP THROUGH 9 IMAGES
			for ( var i = 0; i < 9; i++ ) {

				// CREATE THE IMAGE ELEMENTS
				if ( !this[ 'imageEl' + ( i + 1 ) ] )
					this.create( 'imageEl' + ( i + 1 ), 'div', 'post-image post-image-' + ( i + 1 ) );

				// SET IMAGE ELEMENT TO VARIABLE
				var imageElement = this[ 'imageEl' + ( i + 1 ) ];

				if ( i < imageArray.length ) {

					// SET BACKGROUND IMAGE OF IMAGEELEMENT
					imageElement.style.backgroundImage = 'url(\'' + imageArray[ i ] + '\')';

					// IF IMAGE ELEMENT DOESNT HAVE A PARENT › APPEND THE ELEMENT
					if ( !imageElement.parentNode )
						this.postImageListEl.appendChild( imageElement );

				} else if ( i >= imageArray.length ) {

					// IF IMAGE ELEMENT HAS PARENTNODE AND IS GREATER THAN LENGTH › REMOVE FROM PARENT
					if ( imageElement.parentNode )
						imageElement.parentNode.removeChild( imageElement );

				}

			}

			return this;

		}

	};

	return Preview;

}));