enum HanziType {
    SIMPLIFIED,
    TRADITIONAL,
    SIMPLIFIED_AND_TRADITIONAL
}

enum PhoneticType {
    PINYIN,
    ZHUYIN
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

class Zhuyin extends Phonetic {
    private pinyin: string;
    private character: string;
    constructor(pinyin: string) {
        super();
        this.pinyin = pinyin;
        this.setCharacter();
    }
    public getPinyin(): string {
        return this.pinyin;
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
const parseTone = (value: string): number => value === ' ' || value === '' ? 5 : parseInt(value);
const toBoolean = (value: number): boolean => value >= 0 ? true : false;

const replaceVowelWithAccentedVowel = (value: string, accentedVowel: Vowel): string => {
    const valueReversed: string = value.split('').reverse().join('');
    const valueWithAccentReversed: string = valueReversed.replace(
        accentedVowel.getVowel(),
        accentedVowel.getVowelWithTone()
    );
    return valueWithAccentReversed.split('').reverse().join('');
};

const createAppropriateVowelWithAccent = (valueArray: Array<string>, toneNumber: number): Vowel => {
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

const replaceNumberWithAccentedVowel = (value: string, toneNumber: number): string => {
    const vowelsImmediatelyBeforeNumber: Array<string> = retrieveVowelsBeforeNumber(value);
    const vowelAccented: Vowel = createAppropriateVowelWithAccent(vowelsImmediatelyBeforeNumber, toneNumber);
    return replaceVowelWithAccentedVowel(value, vowelAccented);
};

/**
 * Sets the tone for a syllable even if a light tone syllable is right up against another valid toned syllable.
 * 
 * @param phonic Zhuyin The new zhuyin character converted from pinyin. 
 * @param letters string The remaining pinyin letters after the zhuyin has been created.
 * @param tone number The extracted tone number that should only be applied to the last zhuyin.
 */
const setToneWithPossibleMalformedPinyinHandling = (phonic: Zhuyin, letters: string, tone: number): void => {
    if (letters === '') {
        phonic.setTone(tone);
    } else {
        phonic.setTone(5);
    }
};

const replaceNumberedRomanLettersWithZhuyin = (letters: string, tone: number): string => {
    let returnValue: string = '';
    const maxIterations = 25;
    let iterationCounter = 1;
    while (letters !== '' && iterationCounter < maxIterations) {
        for (let i = letters.length; i > -1; i--) {
            const phonic = new Zhuyin(letters.substring(0, i).toLowerCase());
            if (phonic.getCharacter() !== undefined) {
                letters = letters.substring(phonic.getPinyin().length);
                setToneWithPossibleMalformedPinyinHandling(phonic, letters, tone);
                returnValue += phonic.getCharacterWithTone();
                break;
            }
        }
        iterationCounter++;
    }
    return returnValue;
};

const convertNumberedPinyinTo = (phoneticType: PhoneticType, value: string): string => {
    let convertedValue: string = '';
    const minimumOneLetterCaseInsensitive: RegExp = new RegExp(/([a-zA-Z]{1,})/);
    const numbersOneThroughFiveOrSpaceIndicatingLightTone: RegExp = new RegExp(/([1-5]|\s*)/);
    const zeroOrOneSpaceCharacterNonToneRelated: RegExp = new RegExp(/(\s*)/);
    const finalRegEx: RegExp = new RegExp(
        minimumOneLetterCaseInsensitive.source +
        numbersOneThroughFiveOrSpaceIndicatingLightTone.source +
        zeroOrOneSpaceCharacterNonToneRelated.source
    );
    let results: RegExpExecArray;
    while ((results = finalRegEx.exec(value)) !== null) {
        value = value.substring(results.index + results[0].length);
        const originalText: string = results[0];
        const romanLetters: string = results[1];
        const tone: number = parseTone(results[2]);
        const spaceCharacter: string = results[3];
        let phonic: Zhuyin | string;
        if (phoneticType === PhoneticType.ZHUYIN) {
            phonic = replaceNumberedRomanLettersWithZhuyin(romanLetters, tone);
        }
        if (phoneticType === PhoneticType.PINYIN) {
            phonic = replaceNumberWithAccentedVowel(romanLetters, tone);
        }
        convertedValue += phonic + spaceCharacter;
    }
    return convertedValue;
};

const processNumberedPinyin = (phoneticType: PhoneticType, value: string): string => {
    return convertNumberedPinyinTo(phoneticType, value);
};

const hanziToPhoneticCharacters = (phoneticType: PhoneticType, value: string): string => {
    let result: string = '';
    value = value.trim();
    value = value.replace(/['.!?]/g, '');
    if (isPinyin(value)) {
        result = processNumberedPinyin(phoneticType, value);
    }
    return result;
};

const conditionallyRenderColourSchemes = (questionType: string): void => {
    let body: HTMLElement = document.body;
    let card: HTMLElement = document.getElementsByClassName('chinese-card').item(0) as HTMLElement;
    let cardType: HTMLElement = document.getElementsByClassName('chinese-card-type').item(0) as HTMLElement;
    let cardContent: HTMLElement = document.getElementsByClassName('chinese-card-content').item(0) as HTMLElement;

	switch (questionType) {

		case 'traditional':
			var darkest = '#264653';
			var darker = '#2A9D8F';
			var neutral = '#E76F51';
			var brighter = '#F4A261';
			var brightest = '#E9C46A';

            body.style.backgroundColor = darker;

            card.style.color = darkest;
            card.style.backgroundColor = brightest;
            card.style.boxShadow = '0px 0px 30px ' + darkest;

            cardType.style.color = brightest;
            cardType.style.backgroundColor = neutral;

            cardContent.style.textShadow = '2px 2px ' + brighter;

            break;

		case 'tones':
            var darkest = '#073B4C';
            var darkestRBG = 'rgb(7, 59, 76, 0.2)';
			var darker = '#118AB2';
			var neutral = '#EF476F';
			var brighter = '#06D6A0';
			var brightest = '#FFD166';
			var brightestRBG = 'rgb(255, 209, 102, 0.5)';

            body.style.backgroundColor = darker;

            card.style.color = darkest;
            card.style.backgroundColor = brighter;
            card.style.boxShadow = '0px 0px 30px ' + darkest;

            cardType.style.color = brightest;
            cardType.style.backgroundColor = neutral;

            cardContent.style.textShadow = '2px 2px ' + darkestRBG;

            break;
        
        case 'writing':
            var darkest = '#3A0CA3';
            var darkestRBG = 'rgb(58, 12, 163, 0.3)';
            var darker = '#7209B7';
            var neutral = '#4361EE';
            var brighter = '#4CC9F0';
            var brightest = '#F72585';

            body.style.backgroundColor = darker;

            card.style.color = brighter;
            card.style.backgroundColor = brightest;
            card.style.boxShadow = '0px 0px 30px ' + darkest;

            cardType.style.color = brighter;
            cardType.style.backgroundColor = neutral;

            cardContent.style.textShadow = '2px 2px ' + darkestRBG;

            break;
        case 'recognition':
            var darkest = '#1D3557';
            var darkestRGB = 'rgb(29, 53, 87, 0.3)'
            var darker = '#E63946';
            var neutral = '#457B9D';
            var brighter = '#A8DADC';
            var brightest = '#F1FAEE';

            body.style.backgroundColor = neutral;

            card.style.color = brighter;
            card.style.backgroundColor = darker;
            card.style.boxShadow = '0px 0px 30px ' + darkest;

            cardType.style.color = darkest;
            cardType.style.backgroundColor = brighter;

            cardContent.style.textShadow = '2px 2px ' + darkestRGB;

            break;
        case 'meaning':
            var darkest = '#555B6E';
            var darker = '#89B0AE';
            var neutral = '#FFD6BA';
            var brighter = '#BEE3DB';
            var brightest = '#FAF9F9';
            var brightestRGB = 'rgb(250, 249, 249, 0.5)';

            body.style.backgroundColor = darker;

            card.style.color = darkest;
            card.style.backgroundColor = neutral;
            card.style.boxShadow = '0px 0px 30px ' + darkest;

            cardType.style.color = brightest;
            cardType.style.backgroundColor = darkest;

            cardContent.style.textShadow = '2px 2px ' + brightestRGB

            break;
	}
};

declare var HanziWriter: any;
const createStrokeOrderCharacter = () => {
    let delayBetweenAnimations: number = 500;
    let charactersValue: string = document.getElementById('character-value').innerHTML;
    let characters: Array<string> = charactersValue.split('');
    let drawingArea: HTMLElement = document.getElementById('stroke-order');
    let strokeOrderCharacters: Array<any> = [];

    for (var i = 0; i < characters.length; i++) {
        let idName = 'character-' + i;
        let node = document.createElement('div');
        node.id = idName;
        drawingArea.appendChild(node);

        let strokeOrderCharacter = HanziWriter.create(
            idName,
            characters[i], {
                strokeColor: '#000000',
                width: 50,
                height: 50, 
                padding: 1,
                delayBetweenStrokes: 500,
            }
        );
        strokeOrderCharacters.push(strokeOrderCharacter);
    }

    const animateFirstCharacterOnly = () => {
        for (var i = 0; i < 1; i++) {
            let currentCharacter: any = strokeOrderCharacters[i];
            let nextCharacter: any = strokeOrderCharacters[i + 1];
    
            currentCharacter.animateCharacter({
                onComplete: function() {
                    if (nextCharacter !== undefined) {
                        setTimeout(function() {
                            nextCharacter.animateCharacter();
                        }, delayBetweenAnimations);
                    }
                }
            });
        }
    };

    setTimeout(() => {
        animateFirstCharacterOnly()
    }, delayBetweenAnimations + delayBetweenAnimations);
};

const loadHanziWriter = () => {
    let script: HTMLScriptElement = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/hanzi-writer@2.2/dist/hanzi-writer.min.js');
    script.addEventListener('load', () => {
        createStrokeOrderCharacter();
    });
    document.body.appendChild(script);
};


// exports for unit tests
export default {
    hanziToPhoneticCharacters,
    containsNumerics,
    isPinyin,
    parseTone,
    processNumberedPinyin,
    convertNumberedPinyinTo,
    replaceNumberedRomanLettersWithZhuyin,
    setToneWithPossibleMalformedPinyinHandling,
    Zhuyin,
    PhoneticType
};