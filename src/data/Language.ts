type LangType = 'en' | 'kr'
type ScriptType =
    'main.headline' |
    'main.description' |
    'main.auther' |
    'main.button.start'

const scripts = {
    en: {
        'main.headline': 'PORTFOL.iO',
        'main.description': 'Welcome to my 3D portfolio built with Three.js and TypeScript.',
        'main.auther': 'Creator: Park Kwan Hong, All Rights Reserved',
        'main.button.start': 'Contents'
    },
    kr: {
        'main.headline': 'PORTFOL.iO',
        'main.description': '이 포트폴리오는 Three.js와 TypeScript로 제작되었습니다.',
        'main.auther': '제작자: 박관홍, 모든 권리 보유',
        'main.button.start': '목차로 이동'
    }
}

type Scripts = Readonly<Record<ScriptType, string>>
type GlobalScripts = Readonly<Record<LangType, Scripts>>

export class Language {

    currentLang: LangType = 'en'
    static helper = new Language()
    list: GlobalScripts

    constructor() {
        this.list = scripts as GlobalScripts
    }
    get(key: ScriptType, lang: LangType = this.currentLang, fallback = 'Matched script could not be located.'): string {
        return this.list[lang][key] ?? fallback
    }
    set(lang: LangType) {
        this.currentLang = lang
    }
}