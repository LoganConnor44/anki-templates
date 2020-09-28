enum HanziType {
    SIMPLIFIED,
    TRADITIONAL,
    SIMPLIFIED_AND_TRADITIONAL
}

enum Tone {
    FIRST,
    SECOND,
    THIRD,
    FORTH,
    NEUTRAL
}

abstract class Phonetic {
    protected tone: Tone;
    public setTone(number: number): void {
        switch(number) {
            case 1:  {
                this.tone = Tone.FIRST;
                break;
            }
            case 2:  {
                this.tone = Tone.SECOND;
                break;
            }
            case 3:  {
                this.tone = Tone.THIRD
                break;
            }
            case 4:  {
                this.tone = Tone.FORTH;
                break;
            }
            default: {
                this.tone = Tone.NEUTRAL;
                break;
            }
        }
    }
}

class Vowel extends Phonetic {
    private letter: string;
    public constructor(letter: string) {
        super();
        this.letter = letter;
    }
    public getVowel(): string {
        return this.letter;
    }
    public getVowelWithTone(): string {
        switch (this.letter) {
            case 'a': {
                switch (this.tone) {
                    case Tone.FIRST : {
                        return 'ā';
                    }
                    case Tone.SECOND : {
                        return 'á';
                    }
                    case Tone.THIRD : {
                        return 'ǎ';
                    }
                    case Tone.FORTH : {
                        return 'à';
                    }
                    case Tone.NEUTRAL : {
                        return this.letter;
                    }
                }
            }
            case 'e': {
                switch (this.tone) {
                    case Tone.FIRST : {
                        return 'ē';
                    }
                    case Tone.SECOND : {
                        return 'é';
                    }
                    case Tone.THIRD : {
                        return 'ě';
                    }
                    case Tone.FORTH : {
                        return 'è';
                    }
                    case Tone.NEUTRAL : {
                        return this.letter;
                    }
                }
            }
            case 'i': {
                switch (this.tone) {
                    case Tone.FIRST : {
                        return 'ī';
                    }
                    case Tone.SECOND : {
                        return 'í';
                    }
                    case Tone.THIRD : {
                        return 'ǐ';
                    }
                    case Tone.FORTH : {
                        return 'ì';
                    }
                    case Tone.NEUTRAL : {
                        return this.letter;
                    }
                }
            }
            case 'o': {
                switch (this.tone) {
                    case Tone.FIRST : {
                        return 'ō';
                    }
                    case Tone.SECOND : {
                        return 'ó';
                    }
                    case Tone.THIRD : {
                        return 'ǒ';
                    }
                    case Tone.FORTH : {
                        return 'ò';
                    }
                    case Tone.NEUTRAL : {
                        return this.letter;
                    }
                }
            }
            case 'u': {
                switch (this.tone) {
                    case Tone.FIRST : {
                        return 'ū';
                    }
                    case Tone.SECOND : {
                        return 'ú';
                    }
                    case Tone.THIRD : {
                        return 'ǔ';
                    }
                    case Tone.FORTH : {
                        return 'ù';
                    }
                    case Tone.NEUTRAL : {
                        return this.letter;
                    }
                }
            }
        }
    }
}

class Zhuyin extends Phonetic{
    private pinyin: string;
    private character: string;
    constructor(pinyin: string) {
        super();
        this.pinyin = pinyin;
        this.setCharacter();
    }
    public getCharacter(): string {
        return this.character;
    }
    public getCharacterWithTone(): string {
        switch (this.tone) {
            case Tone.SECOND : {
                return this.character += 'ˊ';
            }
            case Tone.THIRD : {
                return this.character += 'ˇ';
            }
            case Tone.FORTH : {
                return this.character += 'ˋ';
            }
            case Tone.NEUTRAL : {
                return this.character += '˙';
            }
            case Tone.FIRST :
            default : {
                return this.character;
            }
        }
    }
    private setCharacter(): void {
        interface ZhinyinCharacterMap {
            [key: string]: string
        };
        const zhuyinMap: ZhinyinCharacterMap = {
            a : 'ㄚ',
            ai : 'ㄞ',
            an : 'ㄢ',
            ang : 'ㄤ',
            ao : 'ㄠ',
            ba : 'ㄅㄚ',
            bai : 'ㄅㄞ',
            ban : 'ㄅㄢ',
            bang : 'ㄅㄤ',
            bao : 'ㄅㄠ',
            bei : 'ㄅㄟ',
            ben : 'ㄅㄣ',
            beng : 'ㄅㄥ',
            bi : 'ㄅㄧ',
            bian : 'ㄅㄧㄢ',
            biao : 'ㄅㄧㄠ',
            bie : 'ㄅㄧㄝ',
            bin : 'ㄅㄧㄣ',
            bing : 'ㄅㄧㄥ',
            bo : 'ㄅㄛ',
            bu : 'ㄅㄨ',
            ca : 'ㄘㄚ',
            cai : 'ㄘㄞ',
            can : 'ㄘㄢ',
            cang : 'ㄘㄤ',
            cao : 'ㄘㄠ',
            ce : 'ㄘㄜ',
            cei : 'ㄘㄟ',
            cen : 'ㄘㄣ',
            ceng : 'ㄘㄥ',
            cha : 'ㄔㄚ',
            chai : 'ㄔㄞ',
            chan : 'ㄔㄢ',
            chang : 'ㄔㄤ',
            chao : 'ㄔㄠ',
            che : 'ㄔㄜ',
            chen : 'ㄔㄣ',
            cheng : 'ㄔㄥ',
            chi : 'ㄔ',
            chong : 'ㄔㄨㄥ',
            chou : 'ㄔㄡ',
            chu : 'ㄔㄨ',
            chua : 'ㄔㄨㄚ',
            chuai : 'ㄔㄨㄞ',
            chuan : 'ㄔㄨㄢ',
            chuang : 'ㄔㄨㄤ',
            chui : 'ㄔㄨㄟ',
            chun : 'ㄔㄨㄣ',
            chuo : 'ㄔㄨㄛ',
            ci : 'ㄘ',
            cong : 'ㄘㄨㄥ',
            cou : 'ㄔㄡ',
            cu : 'ㄘㄨ',
            cuan : 'ㄘㄨㄢ',
            cui : 'ㄘㄨㄟ',
            cun : 'ㄘㄨㄣ',
            cuo : 'ㄘㄨㄛ',
            da : 'ㄉㄚ',
            dai : 'ㄉㄞ',
            dan : 'ㄉㄢ',
            dang : 'ㄉㄤ',
            dao : 'ㄉㄠ',
            de : 'ㄉㄜ',
            dei : 'ㄉㄟ',
            den : 'ㄉㄣ',
            deng : 'ㄉㄥ',
            di : 'ㄉㄧ',
            dia : 'ㄉㄧㄚ',
            dian : 'ㄉㄧㄢ',
            diao : 'ㄉㄧㄠ',
            die : 'ㄉㄧㄝ',
            ding : 'ㄉㄧㄥ',
            diu : 'ㄉㄧㄡ',
            dong : 'ㄉㄨㄥ',
            dou : 'ㄉㄡ',
            du : 'ㄉㄨ',
            duan : 'ㄉㄨㄢ',
            dui : 'ㄉㄨㄟ',
            dun : 'ㄉㄨㄣ',
            duo : 'ㄉㄨㄛ',
            e : 'ㄜ',
            ei : 'ㄟ',
            en : 'ㄣ',
            eng : 'ㄥ',
            er : 'ㄦ',
            fa : 'ㄈㄚ',
            fan : 'ㄈㄢ',
            fang : 'ㄈㄤ',
            fei : 'ㄈㄟ',
            fen : 'ㄈㄣ',
            feng : 'ㄈㄥ',
            fo : 'ㄈㄛ',
            fou : 'ㄈㄡ',
            fu : 'ㄈㄨ',
            ga : 'ㄍㄚ',
            gai : 'ㄍㄞ',
            gan : 'ㄍㄢ',
            gang : 'ㄍㄤ',
            gao : 'ㄍㄠ',
            ge : 'ㄍㄜ',
            gei : 'ㄍㄟ',
            gen : 'ㄍㄣ',
            geng : 'ㄍㄥ',
            gong : 'ㄍㄨㄥ',
            gou : 'ㄍㄡ',
            gu : 'ㄍㄨ',
            gua : 'ㄍㄨㄚ',
            guai : 'ㄍㄨㄞ',
            guan : 'ㄍㄨㄢ',
            guang : 'ㄍㄨㄤ',
            gui : 'ㄍㄨㄟ',
            gun : 'ㄍㄨㄣ',
            guo : 'ㄍㄨㄛ',
            ha : 'ㄏㄚ',
            hai : 'ㄏㄞ',
            han : 'ㄏㄢ',
            hang : 'ㄏㄤ',
            hao : 'ㄏㄠ',
            he : 'ㄏㄜ',
            hei : 'ㄏㄟ',
            hen : 'ㄏㄣ',
            heng : 'ㄏㄥ',
            hong : 'ㄏㄨㄥ',
            hou : 'ㄏㄡ',
            hu : 'ㄏㄨ',
            hua : 'ㄏㄨㄚ',
            huai : 'ㄏㄨㄞ',
            huan : 'ㄏㄨㄢ',
            huang : 'ㄏㄨㄤ',
            hui : 'ㄏㄨㄟ',
            hun : 'ㄏㄨㄣ',
            huo : 'ㄏㄨㄛ',
            ji : 'ㄐㄧ',
            jia : 'ㄐㄧㄚ',
            jian : 'ㄐㄧㄢ',
            jiang : 'ㄐㄧㄤ',
            jiao : 'ㄐㄧㄠ',
            jie : 'ㄐㄧㄝ',
            jin : 'ㄐㄧㄣ',
            jing : 'ㄐㄧㄥ',
            jiong : 'ㄐㄩㄥ',
            jiu : 'ㄐㄧㄡ',
            ju : 'ㄐㄩ',
            juan : 'ㄐㄩㄢ',
            jue : 'ㄐㄩㄝ',
            jun : 'ㄐㄩㄣ',
            ka : 'ㄎㄚ',
            kai : 'ㄎㄞ',
            kan : 'ㄎㄢ',
            kang : 'ㄎㄤ',
            kao : 'ㄎㄠ',
            ke : 'ㄎㄜ',
            kei : 'ㄎㄟ',
            ken : 'ㄎㄣ',
            keng : 'ㄎㄥ',
            kong : 'ㄎㄨㄥ',
            kou : 'ㄎㄡ',
            ku : 'ㄎㄨ',
            kua : 'ㄎㄨㄚ',
            kuai : 'ㄎㄨㄞ',
            kuan : 'ㄎㄨㄢ',
            kuang : 'ㄎㄨㄤ',
            kui : 'ㄎㄨㄟ',
            kun : 'ㄎㄨㄣ',
            kuo : 'ㄎㄨㄛ',
            la : 'ㄌㄚ',
            lai : 'ㄌㄞ',
            lan : 'ㄌㄢ',
            lang : 'ㄌㄤ',
            lao : 'ㄌㄠ',
            le : 'ㄌㄜ',
            lei : 'ㄌㄟ',
            leng : 'ㄌㄥ',
            li : 'ㄌㄧ',
            lia : 'ㄌㄧㄚ',
            lian : 'ㄌㄧㄢ',
            liang : 'ㄌㄧㄤ',
            liao : 'ㄌㄧㄠ',
            lie : 'ㄌㄧㄝ',
            lin : 'ㄌㄧㄣ',
            ling : 'ㄌㄧㄥ',
            liu : 'ㄌㄧㄡ',
            lo : 'ㄌㄛ',
            long : 'ㄌㄨㄥ',
            lou : 'ㄌㄡ',
            lu : 'ㄌㄨ',
            luan : 'ㄌㄨㄢ',
            lun : 'ㄌㄨㄣ',
            luo : 'ㄌㄨㄛ',
            lv : 'ㄌㄩ',
            lve : 'ㄌㄩㄝ',
            ma : 'ㄇㄚ',
            mai : 'ㄇㄞ',
            man : 'ㄇㄢ',
            mang : 'ㄇㄤ',
            mao : 'ㄇㄠ',
            me : 'ㄇㄜ',
            mei : 'ㄇㄟ',
            men : 'ㄇㄣ',
            meng : 'ㄇㄥ',
            mi : 'ㄇㄧ',
            mian : 'ㄇㄧㄢ',
            miao : 'ㄇㄧㄠ',
            mie : 'ㄇㄧㄝ',
            min : 'ㄇㄧㄣ',
            ming : 'ㄇㄧㄥ',
            miu : 'ㄇㄧㄡ',
            mo : 'ㄇㄛ',
            mou : 'ㄇㄡ',
            mu : 'ㄇㄨ',
            na : 'ㄋㄚ',
            nai : 'ㄋㄞ',
            nan : 'ㄋㄢ',
            nang : 'ㄋㄤ',
            nao : 'ㄋㄠ',
            ne : 'ㄋㄜ',
            nei : 'ㄋㄟ',
            nen : 'ㄋㄣ',
            neng : 'ㄋㄥ',
            ni : 'ㄋㄧ',
            nian : 'ㄋㄧㄢ',
            niang : 'ㄋㄧㄤ',
            niao : 'ㄋㄧㄠ',
            nie : 'ㄋㄧㄝ',
            nin : 'ㄋㄧㄣ',
            ning : 'ㄋㄧㄥ',
            niu : 'ㄋㄧㄡ',
            nong : 'ㄋㄨㄥ',
            nou : 'ㄋㄨㄡ',
            nu : 'ㄋㄨ',
            nuan : 'ㄋㄨㄢ',
            nuo : 'ㄋㄨㄛ',
            nv : 'ㄋㄩ',
            nve : 'ㄋㄩㄝ',
            o : 'ㄛ',
            ou : 'ㄡ',
            pa : 'ㄆㄚ',
            pai : 'ㄆㄞ',
            pan : 'ㄆㄢ',
            pang : 'ㄆㄤ',
            pao : 'ㄆㄠ',
            pei : 'ㄆㄟ',
            pen : 'ㄆㄣ',
            peng : 'ㄆㄥ',
            pi : 'ㄆㄧ',
            pian : 'ㄆㄧㄢ',
            piao : 'ㄆㄧㄠ',
            pie : 'ㄆㄧㄝ',
            pin : 'ㄆㄧㄣ',
            ping : 'ㄆㄧㄥ',
            po : 'ㄆㄛ',
            pou : 'ㄆㄡ',
            pu : 'ㄆㄨ',
            qi : 'ㄑㄧ',
            qia : 'ㄑㄧㄚ',
            qian : 'ㄑㄧㄢ',
            qiang : 'ㄑㄧㄤ',
            qiao : 'ㄑㄧㄠ',
            qie : 'ㄑㄧㄝ',
            qin : 'ㄑㄧㄣ',
            qing : 'ㄑㄧㄥ',
            qiong : 'ㄑㄩㄥ',
            qiu : 'ㄑㄧㄡ',
            qu : 'ㄑㄩ',
            quan : 'ㄑㄩㄢ',
            que : 'ㄑㄩㄝ',
            qun : 'ㄑㄩㄣ',
            r : 'ㄦ',
            ran : 'ㄖㄢ',
            rang : 'ㄖㄤ',
            rao : 'ㄖㄠ',
            re : 'ㄖㄜ',
            ren : 'ㄖㄣ',
            reng : 'ㄖㄥ',
            ri : 'ㄖ',
            rong : 'ㄖㄨㄥ',
            rou : 'ㄖㄡ',
            ru : 'ㄖㄨ',
            ruan : 'ㄖㄨㄢ',
            rui : 'ㄖㄨㄟ',
            run : 'ㄖㄨㄣ',
            ruo : 'ㄖㄨㄛ',
            sa : 'ㄙㄚ',
            sai : 'ㄙㄞ',
            san : 'ㄙㄢ',
            sang : 'ㄙㄤ',
            sao : 'ㄙㄠ',
            se : 'ㄙㄜ',
            sen : 'ㄙㄣ',
            seng : 'ㄙㄥ',
            sha : 'ㄕㄚ',
            shai : 'ㄕㄞ',
            shan : 'ㄕㄢ',
            shang : 'ㄕㄤ',
            shao : 'ㄕㄠ',
            she : 'ㄕㄜ',
            shei : 'ㄕㄟ',
            shen : 'ㄕㄣ',
            sheng : 'ㄕㄥ',
            shi : 'ㄕ',
            shou : 'ㄕㄡ',
            shu : 'ㄕㄨ',
            shua : 'ㄕㄨㄚ',
            shuai : 'ㄕㄨㄞ',
            shuan : 'ㄕㄨㄢ',
            shuang : 'ㄕㄨㄤ',
            shui : 'ㄕㄨㄟ',
            shun : 'ㄕㄨㄣ',
            shuo : 'ㄕㄨㄛ',
            si : 'ㄙ',
            song : 'ㄙㄨㄥ',
            sou : 'ㄙㄡ',
            su : 'ㄙㄨ',
            suan : 'ㄙㄨㄢ',
            sui : 'ㄙㄨㄟ',
            sun : 'ㄙㄨㄣ',
            suo : 'ㄙㄨㄛ',
            ta : 'ㄊㄚ',
            tai : 'ㄊㄞ',
            tan : 'ㄊㄢ',
            tang : 'ㄊㄤ',
            tao : 'ㄊㄠ',
            te : 'ㄊㄜ',
            tei : 'ㄊㄟ',
            teng : 'ㄊㄥ',
            ti : 'ㄊㄧ',
            tian : 'ㄊㄧㄢ',
            tiao : 'ㄊㄧㄠ',
            tie : 'ㄊㄧㄝ',
            ting : 'ㄊㄧㄥ',
            tong : 'ㄊㄨㄥ',
            tou : 'ㄊㄡ',
            tu : 'ㄊㄨ',
            tuan : 'ㄊㄨㄢ',
            tui : 'ㄊㄨㄟ',
            tun : 'ㄊㄨㄣ',
            tuo : 'ㄊㄨㄛ',
            wa : 'ㄨㄚ',
            wai : 'ㄨㄞ',
            wan : 'ㄨㄢ',
            wang : 'ㄨㄤ',
            wei : 'ㄨㄟ',
            wen : 'ㄨㄣ',
            weng : 'ㄨㄥ',
            wo : 'ㄨㄛ',
            wu : 'ㄨ',
            xi : 'ㄒㄧ',
            xia : 'ㄒㄧㄚ',
            xian : 'ㄒㄧㄢ',
            xiang : 'ㄒㄧㄤ',
            xiao : 'ㄒㄧㄠ',
            xie : 'ㄒㄧㄝ',
            xin : 'ㄒㄧㄣ',
            xing : 'ㄒㄧㄥ',
            xiong : 'ㄒㄩㄥ',
            xiu : 'ㄒㄧㄡ',
            xu : 'ㄒㄩ',
            xuan : 'ㄒㄩㄢ',
            xue : 'ㄒㄩㄝ',
            xun : 'ㄒㄩㄣ',
            ya : 'ㄧㄚ',
            yan : 'ㄧㄢ',
            yang : 'ㄧㄤ',
            yao : 'ㄧㄠ',
            ye : 'ㄧㄝ',
            yi : 'ㄧ',
            yin : 'ㄧㄣ',
            ying : 'ㄧㄥ',
            yo : 'ㄧㄛ',
            yong : 'ㄩㄥ',
            you : 'ㄧㄡ',
            yu : 'ㄩ',
            yuan : 'ㄩㄢ',
            yue : 'ㄩㄝ',
            yun : 'ㄩㄣ',
            za : 'ㄗㄚ',
            zai : 'ㄗㄞ',
            zan : 'ㄗㄢ',
            zang : 'ㄗㄤ',
            zao : 'ㄗㄠ',
            ze : 'ㄗㄜ',
            zei : 'ㄗㄟ',
            zen : 'ㄗㄣ',
            zeng : 'ㄗㄥ',
            zha : 'ㄓㄚ',
            zhai : 'ㄓㄞ',
            zhan : 'ㄓㄢ',
            zhang : 'ㄓㄤ',
            zhao : 'ㄓㄠ',
            zhe : 'ㄓㄜ',
            zhei : 'ㄓㄟ',
            zhen : 'ㄓㄣ',
            zheng : 'ㄓㄥ',
            zhi : 'ㄓ',
            zhong : 'ㄓㄨㄥ',
            zhou : 'ㄓㄡ',
            zhu : 'ㄓㄨ',
            zhua : 'ㄓㄨㄚ',
            zhuai : 'ㄓㄨㄞ',
            zhuan : 'ㄓㄨㄢ',
            zhuang : 'ㄓㄨㄤ',
            zhui : 'ㄓㄨㄟ',
            zhun : 'ㄓㄨㄣ',
            zhuo : 'ㄓㄨㄛ',
            zi : 'ㄗ',
            zong : 'ㄗㄨㄥ',
            zou : 'ㄗㄡ',
            zu : 'ㄗㄨ',
            zuan : 'ㄗㄨㄢ',
            zui : 'ㄗㄨㄟ',
            zun : 'ㄗㄨㄣ',
            zuo : 'ㄗㄨㄛ',
        };
        this.character = zhuyinMap[this.pinyin];
    }
}



const isPinyin = (value: string): boolean => toBoolean(value.search(/^[a-zA-Z0-9\s]*$/));
const containsNumerics = (value: string): boolean => toBoolean(value.search(/\d/));
const toBoolean = (value: number): boolean => value >= 0 ? true : false;

const processPinyin = (value: string): string => {
    value = value.trim();
    return convertNumberedPinyinToAccented(value);
};

const retrieveVowelsBeforeNumber = (value: string): Array<string> => {
    const vowelPattern = /([a|e|i|o|u])/i;
    const regEx = new RegExp(vowelPattern);
    const valueArrayReversed = value.split('').reverse();
    let vowelsPresent: Array<string> = new Array<string>();
    let initialConsonantsPassed: boolean = false;
    valueArrayReversed.forEach(x => {
        if (vowelsPresent.length > 0) {
            initialConsonantsPassed = true;
        }
        if (regEx.test(x) || !initialConsonantsPassed) {
            vowelsPresent.push(x);
        }
    });
    return vowelsPresent.reverse();
};

const createAppropriateVowelWitchAccent = (valueArray: Array<string>, toneNumber: number): Vowel => {
    let vowels: Vowel[] = new Array<Vowel>();
    vowels[0] = new Vowel('a');
    vowels[1] = new Vowel('e');
    vowels[2] = new Vowel('i');
    vowels[3] = new Vowel('o');
    vowels[4] = new Vowel('u');
    
    let vowelToBeAccented: string = '';
    vowels.forEach(vowel => {
        valueArray.forEach((x: string) => {
            if (x === vowel.getVowel() && vowelToBeAccented === '') {
                vowelToBeAccented = vowel.getVowel();
            }
        });
    });
    const accentedVowel = new Vowel(vowelToBeAccented);
    accentedVowel.setTone(toneNumber);
    return accentedVowel;
};

const replaceVowelWithAccentedVowel = (value: string, accentedVowel: Vowel): string => {
    const valueReversed: string = value.split('').reverse().join('');
    const valueWithAccentReversed: string = valueReversed.replace(
        accentedVowel.getVowel(),
        accentedVowel.getVowelWithTone()
    );
    return valueWithAccentReversed.split('').reverse().join('');
};

const replaceNumberWithAccentedVowel = (value: string, toneNumber: number): string => {
    const vowelsImmediatelyBeforeNumber: Array<string> = retrieveVowelsBeforeNumber(value);
    const vowelAccented: Vowel = createAppropriateVowelWitchAccent(vowelsImmediatelyBeforeNumber, toneNumber);
    return replaceVowelWithAccentedVowel(value, vowelAccented);
};

const convertNumberedPinyinToAccented = (value: string): string => {
    let convertedValue: string = '';
    const minimumOneOrMaxSixLettersCaseInsensitive: RegExp = new RegExp(/([a-zA-Z]{1,6})/);
    const numbersOneThroughFive: RegExp = new RegExp(/([1-5])/);
    const zeroOrOneSpaceCharacter: RegExp = new RegExp(/(\s*)/);
    const finalRegEx: RegExp = new RegExp(
        minimumOneOrMaxSixLettersCaseInsensitive.source +
        numbersOneThroughFive.source +
        zeroOrOneSpaceCharacter.source
    );
    let results: RegExpExecArray;
    while ((results = finalRegEx.exec(value)) !== null) {
        value = value.substr(results.index + results[0].length);
        const originalText: string = results[0];
        const romanLetters: string = results[1];
        const tone: number = parseInt(results[2]);
        const spaceCharacter: string = results[3];
        const accentedSyllable: string = replaceNumberWithAccentedVowel(romanLetters, tone);
        convertedValue += accentedSyllable + spaceCharacter;
    }
    return convertedValue;
};

const hanziToPhoneticCharacters = (value: string): string => {
    let result: string = '';
    if (isPinyin(value) && containsNumerics(value)) {
        result = processPinyin(value);
    } else {

    }
    return result;
};

// exports for unit tests
export default {
    hanziToPhoneticCharacters,
    processPinyin
};