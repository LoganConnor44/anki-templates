function readHanziTypePref(langCode) {
	var defaultValue = langCode == 'yue' ? 'trad' : 'simp_trad';
	return readPref(langCode, 'hanzi_type', defaultValue);
}

function readPhoneticTypePref(langCode) {
	var defaultValue = langCode == 'yue' ? 'zhuyin_marked' : 'pinyin_marked';
	return readPref(langCode, 'phonetic_type', defaultValue);
}

function readColoringStrategyPref(langCode) {
	return readPref(langCode, 'coloring_strategy', 'hanzi');
}

function readPref(langCode, prefNameWithoutLangCode, defaultValue) {
    var prefix = '.' + langCode + '_' + prefNameWithoutLangCode + '.';
    console.log('prefix: ' + prefix);
	for (var i = 0; i < document.styleSheets.length; i++) {
        var ss = document.styleSheets[i];
        console.log('ss: ' + ss);
		if (!ss) {
			continue;
		}
		try {
            var classes = ss.rules || ss.cssRules;
            console.log('classes: ' + classes)
			if (!classes) {
				continue;
			}
			for (var x = 0; x < classes.length; x++) {
                var cls = classes[x];
                console.log('cls: ' + JSON.stringify(cls));
				if (cls && cls.selectorText && cls.selectorText.indexOf(prefix) == 0) {
					var result = cls.selectorText.substr(prefix.length);
                    console.log(prefNameWithoutLangCode + "=" + result);
                    console.log('result: ' + result)
					return result;
				}
			}
		} catch (err) {
			console.log("caught: " + err.name + ": " + err.message);
			continue;
		}
	}
	return defaultValue;
}

function toHanzi(langCode, trad, simp, hideTones) {
	trad = normalizeHanzi(trad);
	simp = normalizeHanzi(simp);
	if (!trad && !simp) {
		return null;
	}
	var hanziType = readHanziTypePref(langCode);
	var coloringStrategy = readColoringStrategyPref(langCode);
	var coloringEnabled = !hideTones && coloringStrategy == 'hanzi';
	var preferTrad = hanziType.indexOf('trad') == 0; // startsWith() doesn't work :(
	var primaryHanzi = preferTrad ? trad : simp;
	var secondaryHanzi = preferTrad ? simp : trad;
	var showBoth = hanziType.indexOf('_') >= 0;
	var result;
	if (!primaryHanzi) {
		result = '[' + secondaryHanzi + ']';
	}
	else if (!secondaryHanzi || !showBoth || primaryHanzi.replace(/<.+?>/g,'') == secondaryHanzi.replace(/<.+?>/g,'')) {
		result = primaryHanzi;
	}
	else {
		var spanPatt = /(<span class="?(?:[a-z]{3}_)?tone\d"?>)(.+?)(<\/span>)/;
		var remainingPrimary = primaryHanzi;
		var remainingSecondary = secondaryHanzi;
		var maskedSecondary = '';
		while (remainingPrimary != '' && remainingSecondary != '') {
			var primaryMatch = spanPatt.exec(remainingPrimary);
			if (!primaryMatch) {
				break;
			}
			var secondaryMatch = spanPatt.exec(remainingSecondary);
			if (!secondaryMatch) {
				break;
			}
			maskedSecondary += remainingSecondary.substring(0, secondaryMatch.index);
			if (primaryMatch[2] == secondaryMatch[2]) { // sufficient to ignore spans when comparing
				maskedSecondary += secondaryMatch[1] + '-' + secondaryMatch[3];
			}
			else {
				maskedSecondary += secondaryMatch[0];
			}
			remainingPrimary = remainingPrimary.substr(primaryMatch.index + primaryMatch[0].length)
			remainingSecondary = remainingSecondary.substr(secondaryMatch.index + secondaryMatch[0].length)
		}
		maskedSecondary += remainingSecondary;
		if (primaryHanzi == maskedSecondary || maskedSecondary == '') {
			result = primaryHanzi;
		}
		else {
			result = primaryHanzi + ' [' + maskedSecondary + ']';
		}
	}
	if (!coloringEnabled) {
		return result.replace(/<span class="?(?:[a-z]{3}_)?tone\d"?>(.+?)<\/span>/g, '$1');
	}
	return result;
}

function normalizeHanzi(hanzi) {
	if (!hanzi) {
		return '';
	}
	if (hanzi.charAt(0) == '[' && hanzi.charAt(hanzi.length - 1) == ']') {
		return '';
	}
	return decodeURIComponent(hanzi);
}

function toPhonetic(langCode, pinyinNumbered, hideTones) {
	if (!pinyinNumbered) {
		return '';
	}
    pinyinNumbered = decodeURIComponent(pinyinNumbered);
    //supported language codes are 'cmn' (simplified) | 'yue' (tradition)
    var supportedLangCode = langCode;
	var phoneticType = readPhoneticTypePref(supportedLangCode);
	var coloringEnabled = readColoringStrategyPref(supportedLangCode) == 'phonetic';
	if (phoneticType == 'none') {
		return '<div class=play_button><div class=play_icon></div></div>';
	}
	var isZhuyin = phoneticType.indexOf('zhuyin') >= 0;
	var toneStyle; // 0=numbers, 1=marks, other=hidden
	if (hideTones) {
		toneStyle = -1;
	}
	else {
		toneStyle = phoneticType.indexOf('marked') >= 0 ? 1 : 0;
	}
	var showColoring = toneStyle >= 0 && coloringEnabled;
	var remainingText = pinyinNumbered;
	var result = '';
	var patt = /([a-z]{1,6})([1-5])/i;
	var match;
	while (match = patt.exec(remainingText)) {
		var tonelessSyllable = match[1];
		var toneNum = match[2];
		var newSyllable = isZhuyin ? toZhuyinSyllable(tonelessSyllable, toneNum, toneStyle) : toPinyinSyllable(tonelessSyllable, toneNum, toneStyle);
		result += remainingText.substring(0, match.index);
		if (!newSyllable) {
			result += match[1] + match[2];
		}
		else {
			if (showColoring) {
				result += '<span class=' + supportedLangCode + '_tone' + match[2] + '>' + newSyllable + '</span>';
			}
			else {
				result += newSyllable;
			}
		}
		remainingText = remainingText.substr(match.index + match[0].length);
	}
	return result + remainingText;
}

function toPinyinSyllable(tonelessSyllable, toneNum, toneStyle) {
	switch (toneStyle) {
	case 0:
		return tonelessSyllable + toneNum;
	case 1:
		return toMarkedPinyinSyllable(tonelessSyllable, toneNum);
	default:
		return tonelessSyllable;
	}
}

var toneCharMap = {};
toneCharMap['a']='āáǎà';
toneCharMap['e']='ēéěè';
toneCharMap['i']='īíǐì';
toneCharMap['o']='ōóǒò';
toneCharMap['u']='ūúǔù';
toneCharMap['ü']='ǖǘǚǜ';
toneCharMap['m']=' ḿ  ';
toneCharMap['n']=' ńňǹ';

function toMarkedPinyinSyllable(tonelessPinyin, toneNum) {
	if (toneNum < 1 || toneNum > 5 || tonelessPinyin.length < 1) {
		return tonelessPinyin + toneNum; // not real pinyin
	}
	tonelessPinyin = tonelessPinyin.replace('v', 'ü');
	if (toneNum == 5) {
		return tonelessPinyin;
	}
	var charToReplace;
	var vowels = tonelessPinyin.replace(/[^aeiouü]/g, '');
	switch (vowels.length) {
		case 0:
			charToReplace = tonelessPinyin.charAt(0);
			break;
		case 1:
			charToReplace = vowels.charAt(0);
			break;
		default:
			if (vowels.indexOf("a") >= 0) {
				charToReplace = 'a';
			}
			else if (vowels.indexOf("e") >= 0) {
				charToReplace = 'e';
			}
			else if (vowels.indexOf("ou") >= 0) {
				charToReplace = 'o';
			}
			else {
				charToReplace = vowels.charAt(1);
			}
	}
	var tonesStr = toneCharMap[charToReplace];
	var replacementChar = tonesStr == null ? null : tonesStr.charAt(toneNum - 1);
	if (replacementChar == null || replacementChar == ' ') {
		return tonelessPinyin + toneNum;
	}
	else {
		return tonelessPinyin.replace(charToReplace, replacementChar);
	}
}

var zhuyinTonemarks = [ "", "ˊ", "ˇ", "ˋ", "˙" ]; // index 0 is tone 1 etc
var p2z = {};
p2z['a']='ㄚ';p2z['ai']='ㄞ';p2z['an']='ㄢ';p2z['ang']='ㄤ';p2z['ao']='ㄠ';p2z['ba']='ㄅㄚ';p2z['bai']='ㄅㄞ';p2z['ban']='ㄅㄢ';p2z['bang']='ㄅㄤ';p2z['bao']='ㄅㄠ';p2z['bei']='ㄅㄟ';p2z['ben']='ㄅㄣ';p2z['beng']='ㄅㄥ';p2z['bi']='ㄅㄧ';p2z['bian']='ㄅㄧㄢ';p2z['biao']='ㄅㄧㄠ';p2z['bie']='ㄅㄧㄝ';p2z['bin']='ㄅㄧㄣ';p2z['bing']='ㄅㄧㄥ';p2z['bo']='ㄅㄛ';p2z['bu']='ㄅㄨ';p2z['ca']='ㄘㄚ';p2z['cai']='ㄘㄞ';p2z['can']='ㄘㄢ';p2z['cang']='ㄘㄤ';p2z['cao']='ㄘㄠ';p2z['ce']='ㄘㄜ';p2z['cei']='ㄘㄟ';p2z['cen']='ㄘㄣ';p2z['ceng']='ㄘㄥ';p2z['cha']='ㄔㄚ';p2z['chai']='ㄔㄞ';p2z['chan']='ㄔㄢ';p2z['chang']='ㄔㄤ';p2z['chao']='ㄔㄠ';p2z['che']='ㄔㄜ';p2z['chen']='ㄔㄣ';p2z['cheng']='ㄔㄥ';p2z['chi']='ㄔ';p2z['chong']='ㄔㄨㄥ';p2z['chou']='ㄔㄡ';p2z['chu']='ㄔㄨ';p2z['chua']='ㄔㄨㄚ';p2z['chuai']='ㄔㄨㄞ';p2z['chuan']='ㄔㄨㄢ';p2z['chuang']='ㄔㄨㄤ';p2z['chui']='ㄔㄨㄟ';p2z['chun']='ㄔㄨㄣ';p2z['chuo']='ㄔㄨㄛ';p2z['ci']='ㄘ';p2z['cong']='ㄘㄨㄥ';p2z['cou']='ㄔㄡ';p2z['cu']='ㄘㄨ';p2z['cuan']='ㄘㄨㄢ';p2z['cui']='ㄘㄨㄟ';p2z['cun']='ㄘㄨㄣ';p2z['cuo']='ㄘㄨㄛ';p2z['da']='ㄉㄚ';p2z['dai']='ㄉㄞ';p2z['dan']='ㄉㄢ';p2z['dang']='ㄉㄤ';p2z['dao']='ㄉㄠ';p2z['de']='ㄉㄜ';p2z['dei']='ㄉㄟ';p2z['den']='ㄉㄣ';p2z['deng']='ㄉㄥ';p2z['di']='ㄉㄧ';p2z['dia']='ㄉㄧㄚ';p2z['dian']='ㄉㄧㄢ';p2z['diao']='ㄉㄧㄠ';p2z['die']='ㄉㄧㄝ';p2z['ding']='ㄉㄧㄥ';p2z['diu']='ㄉㄧㄡ';p2z['dong']='ㄉㄨㄥ';p2z['dou']='ㄉㄡ';p2z['du']='ㄉㄨ';p2z['duan']='ㄉㄨㄢ';p2z['dui']='ㄉㄨㄟ';p2z['dun']='ㄉㄨㄣ';p2z['duo']='ㄉㄨㄛ';p2z['e']='ㄜ';p2z['ei']='ㄟ';p2z['en']='ㄣ';p2z['eng']='ㄥ';p2z['er']='ㄦ';p2z['fa']='ㄈㄚ';p2z['fan']='ㄈㄢ';p2z['fang']='ㄈㄤ';p2z['fei']='ㄈㄟ';p2z['fen']='ㄈㄣ';p2z['feng']='ㄈㄥ';p2z['fo']='ㄈㄛ';p2z['fou']='ㄈㄡ';p2z['fu']='ㄈㄨ';p2z['ga']='ㄍㄚ';p2z['gai']='ㄍㄞ';p2z['gan']='ㄍㄢ';p2z['gang']='ㄍㄤ';p2z['gao']='ㄍㄠ';p2z['ge']='ㄍㄜ';p2z['gei']='ㄍㄟ';p2z['gen']='ㄍㄣ';p2z['geng']='ㄍㄥ';p2z['gong']='ㄍㄨㄥ';p2z['gou']='ㄍㄡ';p2z['gu']='ㄍㄨ';p2z['gua']='ㄍㄨㄚ';p2z['guai']='ㄍㄨㄞ';p2z['guan']='ㄍㄨㄢ';p2z['guang']='ㄍㄨㄤ';p2z['gui']='ㄍㄨㄟ';p2z['gun']='ㄍㄨㄣ';p2z['guo']='ㄍㄨㄛ';p2z['ha']='ㄏㄚ';p2z['hai']='ㄏㄞ';p2z['han']='ㄏㄢ';p2z['hang']='ㄏㄤ';p2z['hao']='ㄏㄠ';p2z['he']='ㄏㄜ';p2z['hei']='ㄏㄟ';p2z['hen']='ㄏㄣ';p2z['heng']='ㄏㄥ';p2z['hong']='ㄏㄨㄥ';p2z['hou']='ㄏㄡ';p2z['hu']='ㄏㄨ';p2z['hua']='ㄏㄨㄚ';p2z['huai']='ㄏㄨㄞ';p2z['huan']='ㄏㄨㄢ';p2z['huang']='ㄏㄨㄤ';p2z['hui']='ㄏㄨㄟ';p2z['hun']='ㄏㄨㄣ';p2z['huo']='ㄏㄨㄛ';p2z['ji']='ㄐㄧ';p2z['jia']='ㄐㄧㄚ';p2z['jian']='ㄐㄧㄢ';p2z['jiang']='ㄐㄧㄤ';p2z['jiao']='ㄐㄧㄠ';p2z['jie']='ㄐㄧㄝ';p2z['jin']='ㄐㄧㄣ';p2z['jing']='ㄐㄧㄥ';p2z['jiong']='ㄐㄩㄥ';p2z['jiu']='ㄐㄧㄡ';p2z['ju']='ㄐㄩ';p2z['juan']='ㄐㄩㄢ';p2z['jue']='ㄐㄩㄝ';p2z['jun']='ㄐㄩㄣ';p2z['ka']='ㄎㄚ';p2z['kai']='ㄎㄞ';p2z['kan']='ㄎㄢ';p2z['kang']='ㄎㄤ';p2z['kao']='ㄎㄠ';p2z['ke']='ㄎㄜ';p2z['kei']='ㄎㄟ';p2z['ken']='ㄎㄣ';p2z['keng']='ㄎㄥ';p2z['kong']='ㄎㄨㄥ';p2z['kou']='ㄎㄡ';p2z['ku']='ㄎㄨ';p2z['kua']='ㄎㄨㄚ';p2z['kuai']='ㄎㄨㄞ';p2z['kuan']='ㄎㄨㄢ';p2z['kuang']='ㄎㄨㄤ';p2z['kui']='ㄎㄨㄟ';p2z['kun']='ㄎㄨㄣ';p2z['kuo']='ㄎㄨㄛ';p2z['la']='ㄌㄚ';p2z['lai']='ㄌㄞ';p2z['lan']='ㄌㄢ';p2z['lang']='ㄌㄤ';p2z['lao']='ㄌㄠ';p2z['le']='ㄌㄜ';p2z['lei']='ㄌㄟ';p2z['leng']='ㄌㄥ';p2z['li']='ㄌㄧ';p2z['lia']='ㄌㄧㄚ';p2z['lian']='ㄌㄧㄢ';p2z['liang']='ㄌㄧㄤ';p2z['liao']='ㄌㄧㄠ';p2z['lie']='ㄌㄧㄝ';p2z['lin']='ㄌㄧㄣ';p2z['ling']='ㄌㄧㄥ';p2z['liu']='ㄌㄧㄡ';p2z['lo']='ㄌㄛ';p2z['long']='ㄌㄨㄥ';p2z['lou']='ㄌㄡ';p2z['lu']='ㄌㄨ';p2z['luan']='ㄌㄨㄢ';p2z['lun']='ㄌㄨㄣ';p2z['luo']='ㄌㄨㄛ';p2z['lv']='ㄌㄩ';p2z['lve']='ㄌㄩㄝ';p2z['ma']='ㄇㄚ';p2z['mai']='ㄇㄞ';p2z['man']='ㄇㄢ';p2z['mang']='ㄇㄤ';p2z['mao']='ㄇㄠ';p2z['me']='ㄇㄜ';p2z['mei']='ㄇㄟ';p2z['men']='ㄇㄣ';p2z['meng']='ㄇㄥ';p2z['mi']='ㄇㄧ';p2z['mian']='ㄇㄧㄢ';p2z['miao']='ㄇㄧㄠ';p2z['mie']='ㄇㄧㄝ';p2z['min']='ㄇㄧㄣ';p2z['ming']='ㄇㄧㄥ';p2z['miu']='ㄇㄧㄡ';p2z['mo']='ㄇㄛ';p2z['mou']='ㄇㄡ';p2z['mu']='ㄇㄨ';p2z['na']='ㄋㄚ';p2z['nai']='ㄋㄞ';p2z['nan']='ㄋㄢ';p2z['nang']='ㄋㄤ';p2z['nao']='ㄋㄠ';p2z['ne']='ㄋㄜ';p2z['nei']='ㄋㄟ';p2z['nen']='ㄋㄣ';p2z['neng']='ㄋㄥ';p2z['ni']='ㄋㄧ';p2z['nian']='ㄋㄧㄢ';p2z['niang']='ㄋㄧㄤ';p2z['niao']='ㄋㄧㄠ';p2z['nie']='ㄋㄧㄝ';p2z['nin']='ㄋㄧㄣ';p2z['ning']='ㄋㄧㄥ';p2z['niu']='ㄋㄧㄡ';p2z['nong']='ㄋㄨㄥ';p2z['nou']='ㄋㄨㄡ';p2z['nu']='ㄋㄨ';p2z['nuan']='ㄋㄨㄢ';p2z['nuo']='ㄋㄨㄛ';p2z['nv']='ㄋㄩ';p2z['nve']='ㄋㄩㄝ';p2z['o']='ㄛ';p2z['ou']='ㄡ';p2z['pa']='ㄆㄚ';p2z['pai']='ㄆㄞ';p2z['pan']='ㄆㄢ';p2z['pang']='ㄆㄤ';p2z['pao']='ㄆㄠ';p2z['pei']='ㄆㄟ';p2z['pen']='ㄆㄣ';p2z['peng']='ㄆㄥ';p2z['pi']='ㄆㄧ';p2z['pian']='ㄆㄧㄢ';p2z['piao']='ㄆㄧㄠ';p2z['pie']='ㄆㄧㄝ';p2z['pin']='ㄆㄧㄣ';p2z['ping']='ㄆㄧㄥ';p2z['po']='ㄆㄛ';p2z['pou']='ㄆㄡ';p2z['pu']='ㄆㄨ';p2z['qi']='ㄑㄧ';p2z['qia']='ㄑㄧㄚ';p2z['qian']='ㄑㄧㄢ';p2z['qiang']='ㄑㄧㄤ';p2z['qiao']='ㄑㄧㄠ';p2z['qie']='ㄑㄧㄝ';p2z['qin']='ㄑㄧㄣ';p2z['qing']='ㄑㄧㄥ';p2z['qiong']='ㄑㄩㄥ';p2z['qiu']='ㄑㄧㄡ';p2z['qu']='ㄑㄩ';p2z['quan']='ㄑㄩㄢ';p2z['que']='ㄑㄩㄝ';p2z['qun']='ㄑㄩㄣ';p2z['r']='ㄦ';p2z['ran']='ㄖㄢ';p2z['rang']='ㄖㄤ';p2z['rao']='ㄖㄠ';p2z['re']='ㄖㄜ';p2z['ren']='ㄖㄣ';p2z['reng']='ㄖㄥ';p2z['ri']='ㄖ';p2z['rong']='ㄖㄨㄥ';p2z['rou']='ㄖㄡ';p2z['ru']='ㄖㄨ';p2z['ruan']='ㄖㄨㄢ';p2z['rui']='ㄖㄨㄟ';p2z['run']='ㄖㄨㄣ';p2z['ruo']='ㄖㄨㄛ';p2z['sa']='ㄙㄚ';p2z['sai']='ㄙㄞ';p2z['san']='ㄙㄢ';p2z['sang']='ㄙㄤ';p2z['sao']='ㄙㄠ';p2z['se']='ㄙㄜ';p2z['sen']='ㄙㄣ';p2z['seng']='ㄙㄥ';p2z['sha']='ㄕㄚ';p2z['shai']='ㄕㄞ';p2z['shan']='ㄕㄢ';p2z['shang']='ㄕㄤ';p2z['shao']='ㄕㄠ';p2z['she']='ㄕㄜ';p2z['shei']='ㄕㄟ';p2z['shen']='ㄕㄣ';p2z['sheng']='ㄕㄥ';p2z['shi']='ㄕ';p2z['shou']='ㄕㄡ';p2z['shu']='ㄕㄨ';p2z['shua']='ㄕㄨㄚ';p2z['shuai']='ㄕㄨㄞ';p2z['shuan']='ㄕㄨㄢ';p2z['shuang']='ㄕㄨㄤ';p2z['shui']='ㄕㄨㄟ';p2z['shun']='ㄕㄨㄣ';p2z['shuo']='ㄕㄨㄛ';p2z['si']='ㄙ';p2z['song']='ㄙㄨㄥ';p2z['sou']='ㄙㄡ';p2z['su']='ㄙㄨ';p2z['suan']='ㄙㄨㄢ';p2z['sui']='ㄙㄨㄟ';p2z['sun']='ㄙㄨㄣ';p2z['suo']='ㄙㄨㄛ';p2z['ta']='ㄊㄚ';p2z['tai']='ㄊㄞ';p2z['tan']='ㄊㄢ';p2z['tang']='ㄊㄤ';p2z['tao']='ㄊㄠ';p2z['te']='ㄊㄜ';p2z['tei']='ㄊㄟ';p2z['teng']='ㄊㄥ';p2z['ti']='ㄊㄧ';p2z['tian']='ㄊㄧㄢ';p2z['tiao']='ㄊㄧㄠ';p2z['tie']='ㄊㄧㄝ';p2z['ting']='ㄊㄧㄥ';p2z['tong']='ㄊㄨㄥ';p2z['tou']='ㄊㄡ';p2z['tu']='ㄊㄨ';p2z['tuan']='ㄊㄨㄢ';p2z['tui']='ㄊㄨㄟ';p2z['tun']='ㄊㄨㄣ';p2z['tuo']='ㄊㄨㄛ';p2z['wa']='ㄨㄚ';p2z['wai']='ㄨㄞ';p2z['wan']='ㄨㄢ';p2z['wang']='ㄨㄤ';p2z['wei']='ㄨㄟ';p2z['wen']='ㄨㄣ';p2z['weng']='ㄨㄥ';p2z['wo']='ㄨㄛ';p2z['wu']='ㄨ';p2z['xi']='ㄒㄧ';p2z['xia']='ㄒㄧㄚ';p2z['xian']='ㄒㄧㄢ';p2z['xiang']='ㄒㄧㄤ';p2z['xiao']='ㄒㄧㄠ';p2z['xie']='ㄒㄧㄝ';p2z['xin']='ㄒㄧㄣ';p2z['xing']='ㄒㄧㄥ';p2z['xiong']='ㄒㄩㄥ';p2z['xiu']='ㄒㄧㄡ';p2z['xu']='ㄒㄩ';p2z['xuan']='ㄒㄩㄢ';p2z['xue']='ㄒㄩㄝ';p2z['xun']='ㄒㄩㄣ';p2z['ya']='ㄧㄚ';p2z['yan']='ㄧㄢ';p2z['yang']='ㄧㄤ';p2z['yao']='ㄧㄠ';p2z['ye']='ㄧㄝ';p2z['yi']='ㄧ';p2z['yin']='ㄧㄣ';p2z['ying']='ㄧㄥ';p2z['yo']='ㄧㄛ';p2z['yong']='ㄩㄥ';p2z['you']='ㄧㄡ';p2z['yu']='ㄩ';p2z['yuan']='ㄩㄢ';p2z['yue']='ㄩㄝ';p2z['yun']='ㄩㄣ';p2z['za']='ㄗㄚ';p2z['zai']='ㄗㄞ';p2z['zan']='ㄗㄢ';p2z['zang']='ㄗㄤ';p2z['zao']='ㄗㄠ';p2z['ze']='ㄗㄜ';p2z['zei']='ㄗㄟ';p2z['zen']='ㄗㄣ';p2z['zeng']='ㄗㄥ';p2z['zha']='ㄓㄚ';p2z['zhai']='ㄓㄞ';p2z['zhan']='ㄓㄢ';p2z['zhang']='ㄓㄤ';p2z['zhao']='ㄓㄠ';p2z['zhe']='ㄓㄜ';p2z['zhei']='ㄓㄟ';p2z['zhen']='ㄓㄣ';p2z['zheng']='ㄓㄥ';p2z['zhi']='ㄓ';p2z['zhong']='ㄓㄨㄥ';p2z['zhou']='ㄓㄡ';p2z['zhu']='ㄓㄨ';p2z['zhua']='ㄓㄨㄚ';p2z['zhuai']='ㄓㄨㄞ';p2z['zhuan']='ㄓㄨㄢ';p2z['zhuang']='ㄓㄨㄤ';p2z['zhui']='ㄓㄨㄟ';p2z['zhun']='ㄓㄨㄣ';p2z['zhuo']='ㄓㄨㄛ';p2z['zi']='ㄗ';p2z['zong']='ㄗㄨㄥ';p2z['zou']='ㄗㄡ';p2z['zu']='ㄗㄨ';p2z['zuan']='ㄗㄨㄢ';p2z['zui']='ㄗㄨㄟ';p2z['zun']='ㄗㄨㄣ';p2z['zuo']='ㄗㄨㄛ';

function toZhuyinSyllable(tonelessPinyin, toneNum, toneStyle) {
	var tonelessZhuyin = p2z[tonelessPinyin];
	if (!tonelessZhuyin || toneNum < 1 || toneNum > 5) {
		return null;
	}
	switch (toneStyle) {
	case 0:
		return tonelessZhuyin + toneNum;
	case 1:
		return tonelessZhuyin + zhuyinTonemarks[toneNum - 1];
	default:
		return tonelessZhuyin;
	}
}

function toMeaning(langCode, rawMeaning, hideTones) {
	var patt = /<span class=chinese_word>(.*?)\|(.*?)\|(.*?)<\/span>/i;
	var result = '';
	var remainingText = rawMeaning;
	var match;
	while (match = patt.exec(remainingText)) {
		var trad = decodeURIComponent(match[1]);
		var simp = decodeURIComponent(match[2]);
		var rawPhonetic = decodeURIComponent(match[3]);
		result += remainingText.substring(0, match.index);
		result += toHanzi(langCode, trad, simp, true);
		var phonetic = toPhonetic(langCode, rawPhonetic, hideTones);
		if (phonetic) {
			result += ' (' + phonetic + ')';
		}
		remainingText = remainingText.substr(match.index + match[0].length);
	};
	result += remainingText;
	result = result.replace(/<.+?>/g, '');
	result = decodeURIComponent(result);
	return result;
}

const showPinyin = className => document.getElementsByClassName(className)[0].style.visibility = 'visible';

document.getElementsByClassName('hanzi')[0].innerHTML=toHanzi('cmn', '{{Traditional}}', '{{Simplified}}', false);
document.getElementsByClassName('phonetic')[0].innerHTML=toPhonetic('cmn', '{{Pinyin}}', false);
document.getElementsByClassName('meaning')[0].innerHTML=toMeaning('cmn', '{{Meaning}}', false);












