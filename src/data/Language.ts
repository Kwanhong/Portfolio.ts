type LangType = 'en' | 'kr'
type ScriptType =
    'use.string.key' |
    'main.headline' |
    'main.description' |
    'main.auther' |
    'main.button.start' |

    'contents.title' |
    'contents.description' |
    'contents.button.back' |
    'contents.button.finish' |

    'contents.substar.unity' |
    'contents.substar.ios' |
    'contents.substar.media' |
    'contents.substar.ar' |
    'contents.substar.graphics' |

    'contents.unity.substar.smarthangul' |
    'contents.unity.substar.cheonjaeedu' |
    'contents.unity.substar.soomgo' |
    'contents.ios.substar.minirecord' |
    'contents.ios.substar.jump' |
    'contents.media.substar.minirecord' |
    'contents.media.substar.jump' |
    'contents.ar.substar.jump' |
    'contents.ar.substar.minirecord' |
    'contents.graphics.substar.metal' |

    'content.button.back' |
    'content.loading' |

    'content.unity.smarthangul.title' |
    'content.unity.smarthangul.author' |
    'content.unity.smarthangul.description' |
    'content.unity.smarthangul.role' |
    'content.unity.smarthangul.description.sub' |
    'content.unity.smarthangul.role.detail.title' |
    'content.unity.smarthangul.role.detail' |
    'content.unity.smarthangul.role.detail.subtitle' |
    'content.unity.smarthangul.role.detail.sub' |
    'content.unity.smarthangul.description.detail.title' |
    'content.unity.smarthangul.description.detail' |
    'content.unity.smarthangul.description.detail.subtitle.animation' |
    'content.unity.smarthangul.description.detail.subtitle.video' |

    'content.unity.cjedu.title' |
    'content.unity.cjedu.author' |
    'content.unity.cjedu.description' |
    'content.unity.cjedu.role' |

    'content.unity.soomgo.title' |
    'content.unity.soomgo.author' |
    'content.unity.soomgo.description' |
    'content.unity.soomgo.role' |

    'content.ios.jump.title' |
    'content.ios.jump.author' |
    'content.ios.jump.description' |
    'content.ios.jump.role' |

    'content.ios.mini.title' |
    'content.ios.mini.author' |
    'content.ios.mini.description' |
    'content.ios.mini.role' |

    'content.ar.jump.title' |
    'content.ar.jump.author' |
    'content.ar.jump.description' |
    'content.ar.jump.role' |

    'content.ar.mini.title' |
    'content.ar.mini.author' |
    'content.ar.mini.description' |
    'content.ar.mini.role' |

    'content.media.jump.title' |
    'content.media.jump.author' |
    'content.media.jump.description' |
    'content.media.jump.role' |

    'content.media.mini.title' |
    'content.media.mini.author' |
    'content.media.mini.description' |
    'content.media.mini.role' |

    'content.graphics.metal.title' |
    'content.graphics.metal.author' |
    'content.graphics.metal.description' |
    'content.graphics.metal.role' |

    'epilogue.message'

const scripts = {
    en: {
        // Main Scene
        'main.headline': 'PORTFOL.iO',
        'main.description': 'Welcome to my 3D portfolio built with Three.js and TypeScript.',
        'main.auther': 'Creator: Park Kwan Hong, All Rights Reserved',
        'main.button.start': 'Contents',

        // Contents Scene
        'contents.title': 'PORTFOL.iO',
        'contents.description': 'Explore my projects and works in this interactive 3D portfolio.',
        'contents.button.back': 'RETURN',
        'contents.button.finish': 'FINISH',

        // Substars
        'contents.substar.unity': 'Unity',
        'contents.substar.ios': 'iOS',
        'contents.substar.media': 'Media',
        'contents.substar.ar': 'AR',
        'contents.substar.graphics': 'Graphics',
        // Subsubstars
        'contents.unity.substar.smarthangul': 'Smart Hangul',
        'contents.unity.substar.cheonjaeedu': 'CJ Edu',
        'contents.unity.substar.soomgo': 'Soomgo',
        'contents.ios.substar.minirecord': 'Mini',
        'contents.ios.substar.jump': 'JUMP',
        'contents.media.substar.minirecord': 'Mini',
        'contents.media.substar.jump': 'JUMP',
        'contents.ar.substar.jump': 'JUMP',
        'contents.ar.substar.minirecord': 'Mini',
        'contents.graphics.substar.metal': 'Game Engine',

        // Content Scene
        'content.button.back': 'BACK',
        'content.loading': 'Loading content...',

        // Smart Hangul Unity Content
        'content.unity.smarthangul.title': 'Kyowon Smart Hangul',
        'content.unity.smarthangul.author': 'Morph Interactive Inc. corporated with Kyowon (Jan, 2019)',
        'content.unity.smarthangul.description': 'An educational app designed to teach children the Korean alphabet through interactive games and activities.',
        'content.unity.smarthangul.role': 'Role: Unity developer',
        'content.unity.smarthangul.description.sub': 'Although the development difficulty is not high, due to the nature of the application for child education, a high workload was required for various interactions and lively screen composition.',

        // CJ Edu Unity Content
        'content.unity.cjedu.title': 'Cheonjae Education Edutainment',
        'content.unity.cjedu.author': 'Morph Interactive Inc. corporated with Cheonjae Edu (Sept, 2019)',
        'content.unity.cjedu.description': 'An edutainment application aimed at enhancing learning experiences for children using engaging content and interactive features.',
        'content.unity.cjedu.role': 'Role: Unity developer',

        // Soomgo Unity Content
        'content.unity.soomgo.title': 'Soomgo Experience',
        'content.unity.soomgo.author': 'Freelance Project (Dec, 2021)',
        'content.unity.soomgo.description': 'A collection of freelance projects completed for various clients, showcasing versatility and adaptability in delivering quality solutions.',

        // jump iOS Content
        'content.ios.jump.title': 'JUMP (Renewed)',
        'content.ios.jump.author': 'Morph Interactive Inc. corporated with SK Telecom (Mar, 2020)',
        'content.ios.jump.description': 'A renewd, full-native version of the JUMP app, optimized for iOS devices to provide a seamless user experience and enhanced performance.',
        'content.ios.jump.role': 'Role: Lead iOS developer',

        // Mini iOS Content
        'content.ios.mini.title': 'Mini Record',
        'content.ios.mini.author': 'Minirecord Inc. (Feb, 2023)',
        'content.ios.mini.description': 'An iOS virtual album app that enables users to customize artist avatars and create personalized photo albums using various themes and styles through AR photocards.',
        'content.ios.mini.role': 'Role: Lead developer, manager of development team',

        // Jump AR Content
        'content.ar.jump.title': 'SKT JUMP Massive AR',
        'content.ar.jump.author': 'Morph Interactive Inc. corporated with SK Telecom (Jan, 2020)',
        'content.ar.jump.description': 'An augmented reality application that brings the JUMP brand to life through immersive AR experiences and interactive content.',
        'content.ar.jump.role': 'Role: Lead iOS-Unity intergrator and AR developer',

        // Minirecord AR Content
        'content.ar.mini.title': 'Mini Record AR Photocard',
        'content.ar.mini.author': 'Minirecord Inc. (Feb, 2023)',
        'content.ar.mini.description': 'An AR feature within the Mini Record app that allows users to interact with virtual photocards and experience enhanced engagement with their favorite artists.',
        'content.ar.mini.role': 'Role: Lead developer, manager of development team',

        // Jump Media Content
        'content.media.jump.title': 'JUMP Media editor',
        'content.media.jump.author': 'Morph Interactive Inc. corporated with SK Telecom (Mar, 2020)',
        'content.media.jump.description': 'A media editing tool integrated within the JUMP app, enabling users to create and customize multimedia content with ease.',
        'content.media.jump.role': 'Role: Lead iOS developer',

        // Minirecord Media Content
        'content.media.mini.title': 'Mini Record Album Player',
        'content.media.mini.author': 'Minirecord Inc. (Feb, 2023)',
        'content.media.mini.description': 'A media player feature within the Mini Record app that allows users to play and manage their virtual albums seamlessly.',
        'content.media.mini.role': 'Role: Lead developer, manager of development team',

        //Metal Graphics Content
        'content.graphics.metal.title': 'Metal Game Engine Demo',
        'content.graphics.metal.author': 'Personal Project (Ongoing)',
        'content.graphics.metal.description': 'A personal project focused on developing a game engine using Apple\'s Metal framework to explore graphics programming and rendering techniques.',
        'content.graphics.metal.role': 'Role: Sole developer',

        // Epilogue Scene
        'epilogue.message': 'Thank you for visiting my portfolio! Feel free to reach out for collaborations or inquiries.'
    },
    kr: {
        'main.headline': 'PORTFOL.iO',
        'main.description': '이 포트폴리오는 Three.js와 TypeScript로 제작되었습니다.',
        'main.auther': '제작자: 박관홍, 모든 권리 보유',
        'main.button.start': '목차로 이동',

        'contents.title': 'PORTFOL.iO',
        'contents.description': '인터랙티브 3D 포트폴리오에서 나의 프로젝트와 작품을 탐험해보세요.',
        'contents.button.back': '뒤로가기',
        'contents.button.finish': '끝내기',

        'contents.substar.unity': '유니티',
        'contents.substar.ios': 'iOS',
        'contents.substar.media': '미디어',
        'contents.substar.ar': 'AR',
        'contents.substar.graphics': '그래픽스',

        'contents.unity.substar.smarthangul': '스마트 한글',
        'contents.unity.substar.cheonjaeedu': '천재교육',
        'contents.unity.substar.soomgo': '숨고',
        'contents.ios.substar.minirecord': '미니',
        'contents.ios.substar.jump': '점프',
        'contents.media.substar.minirecord': '미니',
        'contents.media.substar.jump': '점프',
        'contents.ar.substar.jump': '점프',
        'contents.ar.substar.minirecord': '미니',
        'contents.graphics.substar.metal': '게임 엔진',

        'content.button.back': '뒤로가기',
        'content.loading': '콘텐츠 로딩 중...',

        'content.unity.smarthangul.title': '교원 스마트 한글',
        'content.unity.smarthangul.author': '모프 인터랙티브(주) 교원과 공동 개발 (2019년 1월)',
        'content.unity.smarthangul.role': '역할: 유니티 개발자',
        'content.unity.smarthangul.description': '인터랙티브 게임과 활동을 통해 어린이들에게 한글을 가르치기 위해 설계된 교육용 앱입니다.',
        'content.unity.smarthangul.description.sub': '개발 난이도는 높지 않지만, 아동 교육용 애플리케이션의 특성상 다양한 상호작용과 생동감 있는 화면 구성을 위해 많은 작업량이 요구되었습니다.',
        
        'content.unity.smarthangul.role.detail.title': '담당 주업무',
        'content.unity.smarthangul.role.detail': 
` * 파티클 및 스프라이트 애니메이션 개발
 * Anima2D 스켈레탈 애니메이션 개발
 * 컨텐츠 Dotween 애니메이션 시퀀스 개발
 * 퍼즐유형 컨텐츠 로직 개발
 * 그림 짝 맞추기 유형 컨텐츠 로직 개발
 * 총정리 유형 컨텐츠 로직 개발`,
        'content.unity.smarthangul.role.detail.subtitle': '기타 담당 업무',
        'content.unity.smarthangul.role.detail.sub': 
` * 버전 관리 (Git)
 * 빌드 및 배포 관리
 * QA 및 디버깅
 * 클라이언트 커뮤니케이션`,
        'content.unity.smarthangul.description.detail.title': '주요 기술 스택',
        'content.unity.smarthangul.description.detail': 
` * Unity 2018 LTS
 * C#
 * Anima2D
 * Dotween
 * Unity Particle System`,
        'content.unity.smarthangul.description.detail.subtitle.animation': '애니메이션',
        'content.unity.smarthangul.description.detail.subtitle.video': '시연 영상',

        'content.unity.cjedu.title': '천재교육 에듀테인먼트',
        'content.unity.cjedu.author': '모프 인터랙티브(주) 천재교육과 공동 개발 (2019년 9월)',
        'content.unity.cjedu.description': '어린이들의 학습 경험을 향상시키기 위해 매력적인 콘텐츠와 인터랙티브 기능을 사용하는 에듀테인먼트 애플리케이션입니다.',
        'content.unity.cjedu.role': '역할: 유니티 개발자',

        'content.unity.soomgo.title': '숨고 체험',
        'content.unity.soomgo.author': '프리랜서 프로젝트 (2021년 12월)',
        'content.unity.soomgo.description': '다양한 클라이언트를 위해 완료된 프리랜서 프로젝트 모음으로, 품질 솔루션을 제공하는 데 있어 다재다능함과 적응력을 보여줍니다.',
        'content.unity.soomgo.role': '역할: 유니티 개발자',

        'content.ios.jump.title': '점프 (리뉴얼)',
        'content.ios.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 3월)',
        'content.ios.jump.description': 'iOS 기기에 최적화된 점프 앱의 리뉴얼된 완전 네이티브 버전으로, 원활한 사용자 경험과 향상된 성능을 제공합니다.',
        'content.ios.jump.role': '역할: 수석 iOS 개발자',

        'content.ios.mini.title': '미니 레코드',
        'content.ios.mini.author': '미니레코드 주식회사 (2023년 2월)',
        'content.ios.mini.description': '사용자가 아티스트 아바타를 맞춤화하고 다양한 테마와 스타일을 사용하여 개인화된 사진 앨범을 만들 수 있는 iOS 가상 앨범 앱입니다.',
        'content.ios.mini.role': '역할: 수석 개발자, 개발 팀 관리자',

        'content.ar.jump.title': 'SKT 점프 매시브 AR',
        'content.ar.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 1월)',
        'content.ar.jump.description': '점프 브랜드를 증강 현실 경험과 인터랙티브 콘텐츠를 통해 생생하게 구현하는 증강 현실 애플리케이션입니다.',
        'content.ar.jump.role': '역할: 수석 iOS-유니티 통합 개발자 및 AR 개발자',

        'content.ar.mini.title': '미니 레코드 AR 포토카드',
        'content.ar.mini.author': '미니레코드 주식회사 (2023년 2월)',
        'content.ar.mini.description': '미니 레코드 앱 내의 AR 기능으로, 사용자가 가상 포토카드와 상호작용하고 좋아하는 아티스트와의 참여를 향상시킬 수 있습니다.',
        'content.ar.mini.role': '역할: 수석 개발자, 개발 팀 관리자',

        'content.media.jump.title': '점프 미디어 에디터',
        'content.media.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 3월)',
        'content.media.jump.description': '점프 앱에 통합된 미디어 편집 도구로, 사용자가 손쉽게 멀티미디어 콘텐츠를 만들고 맞춤화할 수 있습니다.',
        'content.media.jump.role': '역할: 수석 iOS 개발자',

        'content.media.mini.title': '미니 레코드 앨범 플레이어',
        'content.media.mini.author': '미니레코드 주식회사 (2023년 2월)',
        'content.media.mini.description': '미니 레코드 앱 내의 미디어 플레이어 기능으로, 사용자가 가상 앨범을 원활하게 재생하고 관리할 수 있습니다.',
        'content.media.mini.role': '역할: 수석 개발자, 개발 팀 관리자',

        'content.graphics.metal.title': 'Metal 게임 엔진 데모',
        'content.graphics.metal.author': '개인 프로젝트 (진행 중)',
        'content.graphics.metal.description': 'Apple의 Metal 프레임워크를 사용하여 게임 엔진을 개발하는 데 중점을 둔 개인 프로젝트로, 그래픽스 프로그래밍 및 렌더링 기술을 탐구합니다.',
        'content.graphics.metal.role': '역할: 단독 개발자',

        'epilogue.message': '포트폴리오를 방문해 주셔서 감사합니다! 협업이나 문의 사항이 있으면 언제든지 연락해 주세요.'
    }
}

type Scripts = Readonly<Record<ScriptType, string>>
type GlobalScripts = Readonly<Record<LangType, Scripts>>

export class Language {

    currentLang: LangType = 'kr'
    static helper = new Language()
    list: GlobalScripts

    constructor() {
        this.list = scripts as GlobalScripts
    }
    get(key: ScriptType = 'use.string.key', keyStr?: string, lang: LangType = this.currentLang, fallback = 'Matched script could not be located.'): string {
        if (keyStr) {
            key = keyStr as ScriptType
        }
        return this.list[lang][key] ?? fallback
    }
    set(lang: LangType) {
        this.currentLang = lang
    }
}