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
    'content.unity.smarthangul.role' |
    'content.unity.smarthangul.description' |
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
    'content.unity.cjedu.role' |
    'content.unity.cjedu.description' |
    'content.unity.cjedu.description.sub' |
    'content.unity.cjedu.role.detail.title' |
    'content.unity.cjedu.role.detail' |
    'content.unity.cjedu.role.detail.subtitle' |
    'content.unity.cjedu.role.detail.sub' |
    'content.unity.cjedu.description.detail.title' |
    'content.unity.cjedu.description.detail' |
    'content.unity.cjedu.description.detail.subtitle.prototype' |
    'content.unity.cjedu.description.detail.prototype1' |
    'content.unity.cjedu.description.detail.prototype2' |
    'content.unity.cjedu.description.detail.subtitle.addressable' |
    'content.unity.cjedu.description.detail.addressable' |
    'content.unity.cjedu.description.detail.subtitle.sqlite' |
    'content.unity.cjedu.description.detail.sqlite1' |
    'content.unity.cjedu.description.detail.sqlite2' |
    'content.unity.cjedu.description.detail.subtitle.contents' |
    'content.unity.cjedu.description.detail.contents' |
    'content.unity.cjedu.description.detail.disclaimer' |

    'content.unity.soomgo.title' |
    'content.unity.soomgo.author' |
    'content.unity.soomgo.role' |
    'content.unity.soomgo.description' |
    'content.unity.soomgo.description.sub' |
    'content.unity.soomgo.description.detail.title' |
    'content.unity.soomgo.description.detail' |
    'content.unity.soomgo.description.detail.subtitle.animation' |
    'content.unity.soomgo.description.detail.subtitle.navmesh' |
    'content.unity.soomgo.description.detail.navmesh' |
    'content.unity.soomgo.description.detail.subtitle.resources' |
    'content.unity.soomgo.description.detail.resources' |
    'content.unity.soomgo.description.detail.subtitle.act' |
    'content.unity.soomgo.description.detail.act' |

    'content.ios.jump.title' |
    'content.ios.jump.author' |
    'content.ios.jump.description' |
    'content.ios.jump.role' |
    'content.ios.jump.description.sub' |
    'content.ios.jump.role.detail.title' |
    'content.ios.jump.role.detail' |
    'content.ios.jump.role.detail.subtitle' |
    'content.ios.jump.role.detail.sub' |
    'content.ios.jump.description.detail.title' |
    'content.ios.jump.description.detail' |
    'content.ios.jump.description.detail.subtitle.prototype' |
    'content.ios.jump.description.detail.prototype' |
    'content.ios.jump.description.detail.subtitle.nativeplugin' |
    'content.ios.jump.description.detail.nativeplugin1' |
    'content.ios.jump.description.detail.nativeplugin2' |
    'content.ios.jump.description.detail.nativeplugin3' |
    'content.ios.jump.description.detail.subtitle.main' |
    'content.ios.jump.description.detail.main' |
    'content.ios.jump.description.detail.subtitle.mypage' |
    'content.ios.jump.description.detail.mypage1' |
    'content.ios.jump.description.detail.mypage2' |
    'content.ios.jump.description.detail.mypage3' |
    'content.ios.jump.description.detail.mypage4' |
    'content.ios.jump.description.detail.disclaimer' |

    'content.ios.mini.title' |
    'content.ios.mini.author' |
    'content.ios.mini.description' |
    'content.ios.mini.role' |
    'content.ios.mini.description.sub' |
    'content.ios.mini.role.detail.title' |
    'content.ios.mini.role.detail' |
    'content.ios.mini.role.detail.subtitle' |
    'content.ios.mini.role.detail.sub' |
    'content.ios.mini.description.detail.title' |
    'content.ios.mini.description.detail' |
    'content.ios.mini.description.detail.subtitle.video' |
    'content.ios.mini.description.detail.video1' |
    'content.ios.mini.description.detail.video2' |
    'content.ios.mini.description.detail.video3' |
    'content.ios.mini.description.detail.video4' |
    'content.ios.mini.description.detail.disclaimer' |

    'content.ar.jump.title' |
    'content.ar.jump.author' |
    'content.ar.jump.description' |
    'content.ar.jump.role' |
    'content.ar.jump.description.sub' |
    'content.ar.jump.role.detail.title' |
    'content.ar.jump.role.detail' |
    'content.ar.jump.role.detail.subtitle' |
    'content.ar.jump.role.detail.sub' |
    'content.ar.jump.description.detail.title' |
    'content.ar.jump.description.detail' |
    'content.ar.jump.description.detail.subtitle.immigration' |
    'content.ar.jump.description.detail.immigration' |
    'content.ar.jump.description.detail.subtitle.arrecording' |
    'content.ar.jump.description.detail.arrecording' |
    'content.ar.jump.description.detail.subtitle.sourcecode' |
    'content.ar.jump.description.detail.arrecording.logic' |
    'content.ar.jump.description.detail.arrecording.sourcecode1' |
    'content.ar.jump.description.detail.arrecording.sourcecode2' |
    'content.ar.jump.description.detail.arrecording.sourcecode3' |
    'content.ar.jump.description.detail.arrecording.sourcecode4' |
    'content.ar.jump.description.detail.arrecording.sourcecode5' |
    'content.ar.jump.description.detail.arrecording.sourcecode6' |
    'content.ar.jump.description.disclaimer' |

    'content.ar.mini.title' |
    'content.ar.mini.author' |
    'content.ar.mini.description' |
    'content.ar.mini.role' |
    'content.ar.mini.role.detail.title' |
    'content.ar.mini.role.detail' |
    'content.ar.mini.role.detail.subtitle' |
    'content.ar.mini.role.detail.sub' |
    'content.ar.mini.description.detail.title' |
    'content.ar.mini.description.detail' |
    'content.ar.mini.description.detail.subtitle.image' |

    'content.media.jump.title' |
    'content.media.jump.author' |
    'content.media.jump.description' |
    'content.media.jump.role' |
    'content.media.jump.description.sub' |
    'content.media.jump.description.detail.title' |
    'content.media.jump.description.detail' |
    'content.media.jump.description.detail.subtitle.feature' |
    'content.media.jump.description.detail.feature' |
    'content.media.jump.description.detail.subtitle.workflow' |
    'content.media.jump.description.detail.workflow' |
    'content.media.jump.description.detail.subtitle.video' |
    'content.media.jump.description.detail.sourcecode' |
    'content.media.jump.description.detail.disclaimer' |

    'content.media.mini.title' |
    'content.media.mini.author' |
    'content.media.mini.role' |
    'content.media.mini.description' |
    'content.media.mini.description.sub' |
    'content.media.mini.role.detail.title' |
    'content.media.mini.role.detail' |
    'content.media.mini.role.detail.subtitle' |
    'content.media.mini.role.detail.sub' |
    'content.media.mini.description.detail.title' |
    'content.media.mini.description.detail' |
    'content.media.mini.description.detail.subtitle.video' |
    'content.media.mini.description.detail.video' |
    'content.media.mini.description.detail.disclaimer' |

    'content.graphics.metal.title' |
    'content.graphics.metal.author' |
    'content.graphics.metal.description' |
    'content.graphics.metal.role' |
    'content.graphics.metal.description.sub1' |
    'content.graphics.metal.description.sub2' |
    'content.graphics.metal.description.sub3' |
    'content.graphics.metal.description.sub4' |
    'content.graphics.metal.description.sub5' |
    'content.graphics.metal.description.detail.title' |
    'content.graphics.metal.description.detail' |
    'content.graphics.metal.description.detail.subtitle.renderer' |
    'content.graphics.metal.description.detail.renderer' |
    'content.graphics.metal.description.detail.subtitle.scene' |
    'content.graphics.metal.description.detail.scene' |
    'content.graphics.metal.description.detail.subtitle.timing' |
    'content.graphics.metal.description.detail.timing' |
    'content.graphics.metal.description.detail.subtitle.demo' |


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
        // Main Scene
        'main.headline': 'PORTFOL.iO',
        'main.description': '이 포트폴리오는 Three.js와 TypeScript로 제작되었습니다.',
        'main.auther': '제작자: 박관홍, 모든 권리 보유',
        'main.button.start': '목차로 이동',

        // Contents Scene
        'contents.title': 'PORTFOL.iO',
        'contents.description': '인터랙티브 3D 포트폴리오에서 나의 프로젝트와 작품을 탐험해보세요.',
        'contents.button.back': '뒤로가기',
        'contents.button.finish': '끝내기',

        // Substars
        'contents.substar.unity': '유니티',
        'contents.substar.ios': 'iOS',
        'contents.substar.media': '미디어',
        'contents.substar.ar': 'AR',
        'contents.substar.graphics': '그래픽스',

        // Subsubstars
        'contents.unity.substar.smarthangul': '스마트 한글',
        'contents.unity.substar.cheonjaeedu': '에듀',
        'contents.unity.substar.soomgo': '숨고',
        'contents.ios.substar.minirecord': '미니',
        'contents.ios.substar.jump': '점프',
        'contents.media.substar.minirecord': '미니',
        'contents.media.substar.jump': '점프',
        'contents.ar.substar.jump': '점프',
        'contents.ar.substar.minirecord': '미니',
        'contents.graphics.substar.metal': '게임 엔진',

        // Content Scene
        'content.button.back': '뒤로가기',
        'content.loading': '콘텐츠 로딩 중...',

        // Smart Hangul Unity Content
        'content.unity.smarthangul.title': '교원 스마트 한글',
        'content.unity.smarthangul.author': '모프 인터랙티브(주) 교원과 공동 개발 (2019년 1월)',
        'content.unity.smarthangul.role': '역할: 유니티 개발자',
        'content.unity.smarthangul.description': '인터랙티브 게임과 활동을 통해 어린이들에게 한글을 가르치기 위해 설계된 교육용 앱입니다.',
        'content.unity.smarthangul.description.sub': '개발 난이도는 높지 않지만, 아동 교육용 애플리케이션의 특성상 다양한 상호작용과 생동감 있는 화면 구성을 위해 많은 작업량이 요구되었습니다.',

        'content.unity.smarthangul.role.detail.title': '담당 주업무',
        'content.unity.smarthangul.role.detail': ` * 파티클 및 스프라이트 애니메이션 개발
 * Anima2D 스켈레탈 애니메이션 개발
 * 컨텐츠 Dotween 애니메이션 시퀀스 개발
 * 퍼즐유형 컨텐츠 로직 개발
 * 그림 짝 맞추기 유형 컨텐츠 로직 개발
 * 총정리 유형 컨텐츠 로직 개발`,
        'content.unity.smarthangul.role.detail.subtitle': '기타 담당 업무',
        'content.unity.smarthangul.role.detail.sub': ` * 버전 관리 (Git)
 * 빌드 및 배포 관리
 * QA 및 디버깅
 * 클라이언트 커뮤니케이션`,
        'content.unity.smarthangul.description.detail.title': '주요 기술 스택',
        'content.unity.smarthangul.description.detail': ` * Unity 2018 LTS
 * C#
 * Anima2D
 * Dotween
 * Unity Particle System`,
        'content.unity.smarthangul.description.detail.subtitle.animation': '애니메이션',
        'content.unity.smarthangul.description.detail.subtitle.video': '시연 영상',

        // CJ Edu Unity Content
        'content.unity.cjedu.title': '한글 교육 에듀테인먼트 (가제)',
        'content.unity.cjedu.author': '모프 인터랙티브(주) 모 교육기관과 공동 개발 (2019년 9월)',
        'content.unity.cjedu.role': '역할: 유니티 개발자',
        'content.unity.cjedu.description': '어린이들의 학습 경험을 향상시키기 위해 매력적인 콘텐츠와 인터랙티브 기능을 사용하는 에듀테인먼트 애플리케이션입니다.',
        'content.unity.cjedu.description.sub': '사내 디자인팀, 기획팀과 협업하여 각 컨텐츠의 인터랙션의 다양화에 집중한 큰 규모의 프로젝트이지만, 해당 프로젝트는 상용화 단계 이전 에서 개발이 중단되어 프로젝트명 및 협력업체 상호를 공개할 수 없음을 알립니다',

        'content.unity.cjedu.role.detail.title': '담당 주업무',
        'content.unity.cjedu.role.detail': ` * 프로토타입 어플리케이션의 메인화면 패키지 로더 및 Anima2D 오브젝트의 인터랙션 활용을 구현
 * Addressable Asset으로 패키징되어 SQLite로 관리되는 컨텐츠 로더 개발
 * 컨텐츠 개발 기획문서상 난이도를 기반으로 개발팀원들에게 담당역을 지정하였고, 컨텐츠 개발에 직접 참여하였음
 * 컨텐츠 인터랙션 개발에서 PM Assistant직을 겸해 개발팀원 담당업무 내용을 검토하고, 문제 발생 시 도움을 주는 등의 업무를 수행하였음`,
        'content.unity.cjedu.role.detail.subtitle': '기타 담당 업무',
        'content.unity.cjedu.role.detail.sub': ` * 버전 관리 (Git)
 * iOS 빌드 및 배포 관리
 * QA 및 디버깅
 * 클라이언트 커뮤니케이션`,
        'content.unity.cjedu.description.detail.title': '주요 기술 스택',
        'content.unity.cjedu.description.detail': ` * Unity 2019 LTS
 * C#
 * Anima2D
 * Addressable Asset
 * SQLite`,
        'content.unity.cjedu.description.detail.subtitle.prototype': '프로토타입 개발내용',
        'content.unity.cjedu.description.detail.prototype1': '개발 당시 Anima2D로 구현하였으나, 아래의 샘플은 Unity Animation 패키지를 통해 개발되었습니다.',
        'content.unity.cjedu.description.detail.prototype2': '스파인 IK 컨트롤러에 Collider 적용 및 마우스/터치 드래그 입력에 따른 Transform Position 변경 구현 샘플',
        'content.unity.cjedu.description.detail.subtitle.addressable': 'Addressable 활용내용',
        'content.unity.cjedu.description.detail.addressable': '각 컨텐츠의 Prefab 패키징을 Addressable로 비동기 로드하는 로직 구성 및 SQLite 데이터베이스로 관리하는 샘플',
        'content.unity.cjedu.description.detail.subtitle.sqlite': 'SQLite 활용내용',
        'content.unity.cjedu.description.detail.sqlite1': 'SQLite 데이터베이스에 저장된 컨텐츠 메타데이터를 조회하는 샘플',
        'content.unity.cjedu.description.detail.sqlite2': '조회된 메타데이터를 기반으로 Addressable에서 컨텐츠 Prefab을 비동기 로드하는 샘플',
        'content.unity.cjedu.description.detail.subtitle.contents': '시연 영상 및 컨텐츠 샘플',
        'content.unity.cjedu.description.detail.contents': ` * 각 운동량, 각속도 및 각가속도를 사용해 Oscillation 시뮬레이션을 구현
 * 컨텐츠 인터랙션을 통해 Force가 적용되도록 구현
 * 개발 참고서적: Nature of Code (Daniel Shiffman 저) Vector, Force, Oscillation`,
        'content.unity.cjedu.description.detail.disclaimer': `위 개발내용은 실제 프로젝트 개발내용이 아니며, 개발역량의 표현을 위해 리소스 및 소스코드가 재구현되었음을 알립니다\n\n`,

        // Soomgo Unity Content
        'content.unity.soomgo.title': '숨은 고수',
        'content.unity.soomgo.author': '프리랜서 프로젝트 (2021년 12월)',
        'content.unity.soomgo.description': '다양한 클라이언트를 위해 완료된 프리랜서 프로젝트 모음으로, 품질 솔루션을 제공하는 데 있어 다재다능함과 적응력을 보여줍니다.',
        'content.unity.soomgo.role': '역할: iOS 개발 및 배포 고문, 개인 개발 등',
        'content.unity.soomgo.description.sub': '클라이언트의 요청으로 몇 프로젝트의 자세한 내용은 공개할 수 없으며, 공개가 가능한 프로젝트는 다음과 같습니다.',
        'content.unity.soomgo.description.detail.title': '수호의 숲',
        'content.unity.soomgo.description.detail': 'Navmesh를 활용한 3D 어드벤처 게임으로, 플레이어는 다양한 액트에 맞추어 맵을 탐험하고 퀘스트를 수행합니다.',
        'content.unity.soomgo.description.detail.subtitle.animation': '시연 영상',
        'content.unity.soomgo.description.detail.subtitle.navmesh': 'Navmesh 사용 샘플',
        'content.unity.soomgo.description.detail.navmesh': 'Navmesh 에이전트를 사용해 플레이어의 이동을 제약하고, 목적지까지 자동으로 경로를 탐색할 수 있도록 구현한 샘플',
        'content.unity.soomgo.description.detail.subtitle.resources': '사용된 리소스',
        'content.unity.soomgo.description.detail.resources': '해당 프로젝트에서 사용된 3D 모델 및 애니메이션은 Blender를 사용해 직접 제작하였으며, 모든 리소스는 저작권 문제가 없음을 알립니다.',
        'content.unity.soomgo.description.detail.subtitle.act': '액트 로직 샘플',
        'content.unity.soomgo.description.detail.act': '각 액트는 제너릭 클래스로 구현되어 있으며, 각 액트는 에이전트의 대사와 애니메이션을 제어하는 로직을 포함하고 있습니다.',

        // jump iOS Content
        'content.ios.jump.title': '점프 (리뉴얼)',
        'content.ios.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 3월)',
        'content.ios.jump.description': 'iOS 기기에 최적화된 점프 앱의 리뉴얼된 완전 네이티브 버전으로, 원활한 사용자 경험과 향상된 성능을 제공합니다.',
        'content.ios.jump.role': '역할: 리드 iOS 개발자',
        'content.ios.jump.description.sub': '기존의 하이브리드 앱에서 완전 네이티브 앱으로 리뉴얼하는 과정에서 많은 도전과 학습이 있었던 프로젝트였습니다.',
        'content.ios.jump.role.detail.title': '주요 담당 업무',
        'content.ios.jump.role.detail': ` * 기존 하이브리드 앱 분석 및 네이티브 아키텍처 설계
 * iOS 네이티브 UI/UX 개발 및 최적화
 * 네이티브 모듈과 웹뷰 간의 통신 구현
 * 미디어 재생 및 편집 기능 개발
 * 프로젝트 빌드 및 배포 관리`,
        'content.ios.jump.role.detail.subtitle': '기타 담당 업무',
        'content.ios.jump.role.detail.sub': ` * 버전 관리 (Git)
 * QA 및 디버깅
 * 클라이언트 커뮤니케이션`,
        'content.ios.jump.description.detail.title': '주요 기술 스택',
        'content.ios.jump.description.detail': ` * Swift
 * Objective-C
 * WKWebView
 * AVFoundation
 * CoreData`,
        'content.ios.jump.description.detail.subtitle.prototype': '네이티브 리디자인',
        'content.ios.jump.description.detail.prototype': ` * UIViewController를 Content로 하는 UIScrollView 상속 클래스를 생성해 전체 View Layer 중 최상위에 적용
 * MainViewController / OpenGalleryViewController / MyPageViewController를 하위에 두어 스크롤 가능한 View Controller 구현
 * 서버 API를 통해 Node Tree 구조로 전달되는 json 데이터를 파싱하고 Recursion을 통해 NodeTree 구조체에 저장하는 NodeTreeManager 구현
 * 각 ViewController UI 세부 내역을 Node Tree 데이터를 기반으로 생성하는 로직 구현
 * 각 세부 UI를 대응하는 NodeTree 가지를 생성인자로 가지는 UIView Class로 구현
 * UI 이벤트 동작 및 UI Animation 구현`,
        'content.ios.jump.description.detail.subtitle.nativeplugin': '네이티브 플러그인 고도화',
        'content.ios.jump.description.detail.nativeplugin1': ` * 기존 1.0 개발은 유니티 상에서 extern C로 링크된 네이티브 함수를 호출하는 방식이었음
 * 하지만 메인 구동 어플리케이션이 유니티에서 네이티브로 변경됨
 * 네이티브에서의 Unity Send Message를 통한 유니티 함수 호출을 더욱 많이 사용해야 하고, 이어서 유니티 상에서 네이티브 함수 호출은 CallBack의 형태로 주로 이루어짐
 * 따라서 기존 개발 내용과 정확히 반대되는 Unity Native Plugin의 개발을 진행하였음
 * 또한 iOS-Unity Bridger Class는 네이티브 소스코드와의 통일성, 개발 편의성 등을 고려하여 swift-Objective-C 브릿징 헤더를 생성하여 swift로 구현되었음`,
        'content.ios.jump.description.detail.nativeplugin2': '네이티브 환경에서 유니티 호출 및 콜백 액션을 전달하는 UnityiOSPluginWrapper (Swift로 구현됨)',
        'content.ios.jump.description.detail.nativeplugin3': 'UnitySendMessage를 통한 유니티 함수 호출부와, 유니티 상에서 요청작업 완료 시 호출하는 콜백이 구현된 NativePluginiOS (Objective-C++로 구현됨)',
        'content.ios.jump.description.detail.subtitle.main': '메인 화면 개발 내용',
        'content.ios.jump.description.detail.main': ` * Node Tree json 파일을 파싱하고, recursion을 통해 파싱 데이터를 트리 구조의 런타임 데이터에 저장
 * Depth 1 UI 부터 Depth 5 UI 까지 (각 UI는 부모/자식 UI의 레퍼런스를 가짐) 순차적으로 생성
 * 모든 Depth UI는 NodeDepthUI의 인터페이스를 상속받으며, 상세 사용자 인터랙션 내용을 각 클래스에 구현
    * UIScrollView 상속 클래스인 MainScrollView에 Depth 1~5 UI를 자식 뷰로 추가
    * Depth 1 UI: MainView (전체 화면 구성)
    * Depth 2 UI: HeaderView, ContentView, FooterView
    * Depth 3 UI: 각 섹션 뷰 (배너 섹션, 카테고리 섹션, 추천 섹션 등)
    * Depth 4 UI: 각 아이템 뷰 (배너 아이템, 카테고리 아이템, 추천 아이템 등)
    * Depth 5 UI: 세부 컨텐츠 뷰 (이미지, 텍스트, 버튼 등)
 * 각 UI의 사용자 인터랙션 이벤트 처리 및 애니메이션 구현
 * 메인 화면 내 미디어 재생 및 편집 기능 통합`,
        'content.ios.jump.description.detail.subtitle.mypage': '마이페이지 화면 개발 내용',
        'content.ios.jump.description.detail.mypage1': ` * PhotosUI 프레임워크를 사용 
 * PHPicker 로 Jump 앨범 미디어를 불러 와 격자형식 UI 생성 
 * Jump 앱에서 저장 시 생성한 메타데이터를 가진 영상과 사진만 표시`,
        'content.ios.jump.description.detail.mypage2': ` * 서버 API로 내려받은 유튜브 URL을 웹뷰로 표시`,
        'content.ios.jump.description.detail.mypage3': ` * CoreData를 사용해 로컬에 저장된 사용자 설정 데이터를 관리하고, 설정 변경 시 UI에 즉시 반영
 * 서버 API에서 내려받은 투표 현황을 표시
 * 서버 API 호출을 통해 투표 내용 전송
 * 콜백을 통한 득표현황 갱신`,
        'content.ios.jump.description.detail.mypage4': ` * 표시 댓글 인덱스를 파라미터로 가지는 서버 API로 json 형태의 댓글 데이터 수신 
 * 무한스크롤 댓글 페이지 구현
 * 댓글 작성 시 서버 API로 POST 요청 전송`,
        'content.ios.jump.description.detail.disclaimer': `위 개발내용은 실제 프로젝트 개발내용이 아니며, 개발역량의 표현을 위해 리소스 및 소스코드가 재구현되었음을 알립니다\n\n`,

        // Mini iOS Content
        'content.ios.mini.title': '미니 레코드',
        'content.ios.mini.author': '미니레코드 주식회사 (2023년 2월)',
        'content.ios.mini.role': '역할: 리드 개발자, 개발 팀 관리자',
        'content.ios.mini.description': '사용자가 아티스트 아바타를 맞춤화하고 다양한 테마와 스타일을 사용하여 개인화된 사진 앨범을 만들 수 있는 iOS 가상 앨범 앱입니다.',
        'content.ios.mini.description.sub': '백엔드, 유니티, 네이티브 팀을 구축하고 관리하며, iOS 네이티브 어플리케이션의 단독 개발을 담당하였습니다.',
        'content.ios.mini.role.detail.title': '주요 담당 업무',
        'content.ios.mini.role.detail': ` * iOS Native 어플리케이션 단독 개발
 * ARKit 및 ARFoundation을 활용한 AR 기능 개발
    * Unity 3D 오브젝트의 AR 배치 및 상호작용 로직 개발
    * Unity AR 포토카드 커스터마이징 기능 개발
 * 미디어 재생 및 편집 기능 개발
 * 프로젝트 빌드 및 최적화 관리`,
        'content.ios.mini.role.detail.subtitle': '기타 담당 업무',
        'content.ios.mini.role.detail.sub': ` * 백엔드, 유니티, 네이티브 팀 구축 및 개발 통합 관리
 * 버전 관리 (Git)
 * QA 및 디버깅
 * 개발팀 HR 관리 및 면접 진행`,
        'content.ios.mini.description.detail.title': '주요 기술 스택',
        'content.ios.mini.description.detail': ` * Swift
 * Objective-C
 * ARKit
 * Unity AR Foundation
 * WKWebView
 * AVFoundation
 * CoreML
 * CoreData`,
        'content.ios.mini.description.detail.subtitle.video': '시연 영상',
        'content.ios.mini.description.detail.video1': '메인화면 UI/UX 시연 영상',
        'content.ios.mini.description.detail.video2': '앨범 UI/UX 시연 영상',
        'content.ios.mini.description.detail.video3': '포토카드 바인더 생성 시연 영상',
        'content.ios.mini.description.detail.video4': '포토카드 바인더 편집 시연 영상',
        'content.ios.mini.description.detail.disclaimer': `위 개발내용은 실제 프로젝트 개발내용이 아니며, 개발역량의 표현을 위해 리소스 및 소스코드가 재구현되었음을 알립니다\n\n`,

        // Jump AR Content
        'content.ar.jump.title': 'SKT 점프 매시브 AR',
        'content.ar.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 1월)',
        'content.ar.jump.description': '점프 브랜드를 증강 현실 경험과 인터랙티브 콘텐츠를 통해 생생하게 구현하는 증강 현실 애플리케이션입니다.',
        'content.ar.jump.role': '역할: 리드 iOS-유니티 통합 개발자 및 AR 개발자',
        'content.ar.jump.description.sub': '긴 개발기간과 더불어 한 번의 어플리케이션 리디자인 경험, 다양한 신기술 SDK의 활용 등으로 인해 많은 도전과 학습이 있었던 프로젝트였습니다.',
        'content.ar.jump.role.detail.title': '주요 담당 업무',
        'content.ar.jump.role.detail': ` * ARKit 및 Unity AR Foundation을 활용한 AR 기능 개발
 * ARCore SDK와 ARFoundation 통합 및 멀티플랫폼 AR 지원
 * iOS와 Unity 간의 네이티브 통신 구현
 * 3D 오브젝트의 AR 배치 및 상호작용 로직 개발
 * 프로젝트 빌드 및 최적화 관리`,
        'content.ar.jump.role.detail.subtitle': '기타 담당 업무',
        'content.ar.jump.role.detail.sub': ` * 버전 관리 (Git)
 * QA 및 디버깅
 * 클라이언트 커뮤니케이션`,
        'content.ar.jump.description.detail.title': '주요 기술 스택',
        'content.ar.jump.description.detail': ` * Unity 2019 LTS
 * C#
 * ARKit
 * Unity AR Foundation
 * Swift
 * Objective-C`,
        'content.ar.jump.description.detail.subtitle.immigration': 'AR Foundation 이미그레이션',
        'content.ar.jump.description.detail.immigration': '프로젝트 초기에는 ARKit 플러그인을 사용해 AR 기능을 구현하였으나, 이후 AR Foundation으로 이미그레이션하여 멀티플랫폼 지원 및 향후 유지보수를 용이하게 하였습니다.',
        'content.ar.jump.description.detail.subtitle.arrecording': 'AR 녹화 iOS 네이티브-Unity 플러그인 구현',
        'content.ar.jump.description.detail.arrecording': 'AR Core의 자체기능인 AR 녹화 기능이 제공되지 않아, AR 세션의 비디오 녹화 기능을 iOS 네이티브로 구현하고 Unity와 네이티브 간의 통신을 통해 녹화 기능을 통합하였습니다.',
        'content.ar.jump.description.detail.subtitle.sourcecode': '주요 소스코드 설명',
        'content.ar.jump.description.detail.arrecording.logic': `[Unity UI]
   ↓ startRecording()
[Native ARKit Plugin]
   ↓ frame마다 Anchor Transform 수집
   ↓ Unity 좌표계로 변환
   ↓ JSON Serialize
   ↓ Local File 저장
[Unity]
   ↓ JSON Load
   ↓ Frame 단위 재생`,
        'content.ar.jump.description.detail.arrecording.sourcecode1': 'Unity ↔ Objective-C 브리지 (extern 인터페이스)',
        'content.ar.jump.description.detail.arrecording.sourcecode2': 'ARKit 프레임 수집 (핵심 로직)',
        'content.ar.jump.description.detail.arrecording.sourcecode3': '좌표계 변환 (Unity ↔ ARKit)',
        'content.ar.jump.description.detail.arrecording.sourcecode4': 'JSON 직렬화 & 로컬 저장',
        'content.ar.jump.description.detail.arrecording.sourcecode5': 'Unity → Native 인터페이스 구현',
        'content.ar.jump.description.detail.arrecording.sourcecode6': 'Unity 재생 구조',
        'content.ar.jump.description.disclaimer': `위 소스코드는 실제 프로젝트 소스코드가 아니며, 개발역량의 표현을 위해 재구현되었음을 알립니다\n\n`,

        // Minirecord AR Content
        'content.ar.mini.title': '미니 레코드 AR 포토카드',
        'content.ar.mini.author': '미니레코드 주식회사 (2023년 2월)',
        'content.ar.mini.role': '역할: 리드 개발자, 개발 팀 관리자',
        'content.ar.mini.description': '미니 레코드 앱 내의 AR 기능으로, 사용자가 가상 포토카드와 상호작용하고 좋아하는 아티스트와의 참여를 향상시킬 수 있습니다.',
        'content.ar.mini.role.detail.title': '주요 담당 업무',
        'content.ar.mini.role.detail': ` * iOS Native 어플리케이션 단독 개발
 * ARKit 및 ARFoundation을 활용한 AR 기능 개발
 * Unity 3D 오브젝트의 AR 배치 및 상호작용 로직 개발
 * Unity AR 포토카드 커스터마이징 기능 개발
 * 프로젝트 빌드 및 최적화 관리`,
        'content.ar.mini.role.detail.subtitle': '기타 담당 업무',
        'content.ar.mini.role.detail.sub': ` * 백엔드, 유니티, 네이티브 팀 구축 및 개발 통합 관리
 * 버전 관리 (Git)
 * QA 및 디버깅
 * 개발팀 HR 관리 및 면접 진행`,
        'content.ar.mini.description.detail.title': '주요 기술 스택',
        'content.ar.mini.description.detail': ` * Unity 2020 LTS
 * C#
 * ARKit
 * Unity AR Foundation
 * Swift
 * AVFoundation
 * Objective-C`,
        'content.ar.mini.description.detail.subtitle.image': 'AR 포토카드 샘플',
        'content.media.jump.title': '점프 미디어 에디터',
        'content.media.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 3월)',
        'content.media.jump.description': '점프 앱에 통합된 미디어 편집 도구로, 사용자가 손쉽게 멀티미디어 콘텐츠를 만들고 맞춤화할 수 있습니다.',
        'content.media.jump.role': '역할: 리드 iOS 개발자',
        'content.media.jump.description.sub': '점프 iOS 네이티브 리뉴얼 프로젝트의 일환으로 개발된 미디어 에디터 기능은, 사용자 경험 향상과 앱 성능 최적화를 목표로 하였습니다.',
        'content.media.jump.description.detail.title': '주요 기술 스택',
        'content.media.jump.description.detail': ` * Swift
 * AVFoundation
 * CoreGraphics
 * CoreAnimation
 * CoreData`,
        'content.media.jump.description.detail.subtitle.feature': '미디어 에디터 주요 기능',
        'content.media.jump.description.detail.feature': ` * 비디오 트리밍
 * 필터 및 이펙트 적용
 * 텍스트 및 스티커 추가
 * 미디어 미리보기 및 재생
 * 편집된 미디어 저장 및 공유`,
        'content.media.jump.description.detail.subtitle.workflow': '미디어 편집 워크플로우',
        'content.media.jump.description.detail.workflow': ` 1. AR 세션에서 캡처된 미디어 선택
 2. 선택된 미디어를 AVAsset으로 로드
 3. 편집 기능 (트리밍, 필터, 텍스트 등) 적용
 4. 편집된 미디어를 미리보기 및 재생
 5. 최종 편집된 미디어를 로컬에 저장 또는 JUMP Social에 공유`,
        'content.media.jump.description.detail.subtitle.video': `시연 영상`,
        'content.media.jump.description.detail.sourcecode': ` * 필터 적용 기능 - 서버에서 내려받은 ACV 파일을 파싱, CIFilter를 생성해 적용
 * 스티커 적용 기능 (Still Image) - 이미지 데이터로 CIFilter를 생성해 적용
 * 스티커 적용 기능 (GIF Image) - Core Animation을 통해 Composition에 적용
 * 그 외 단순 자르기/음원 추가 기능 - AVAssetTrack을 조작해 Asset에 적용`,
        'content.media.jump.description.detail.disclaimer': `위 개발내용은 실제 프로젝트 개발내용이 아니며, 개발역량의 표현을 위해 리소스 및 소스코드가 재구현되었음을 알립니다\n\n`,

        // Minirecord Media Content
        'content.media.mini.title': '미니 레코드 앨범 플레이어',
        'content.media.mini.author': '미니레코드 주식회사 (2023년 2월)',
        'content.media.mini.role': '역할: 리드 개발자, 개발 팀 관리자',
        'content.media.mini.description': '미니 레코드 앱 내의 미디어 플레이어 기능으로, 사용자가 가상 앨범을 원활하게 재생하고 관리할 수 있습니다.',
        'content.media.mini.description.sub': '백엔드, 유니티, 네이티브 팀을 구축하고 관리하며, iOS 네이티브 어플리케이션의 단독 개발을 담당하였습니다.',
        'content.media.mini.role.detail.title': '주요 담당 업무',
        'content.media.mini.role.detail': ` * iOS Native 어플리케이션 단독 개발
 * AVFoundation을 활용한 미디어 플레이어 기능 개발
 * 앨범 재생 목록 및 사용자 인터페이스 개발
 * 프로젝트 빌드 및 최적화 관리`,
        'content.media.mini.role.detail.subtitle': '기타 담당 업무',
        'content.media.mini.role.detail.sub': ` * 백엔드, 유니티, 네이티브 팀 구축 및 개발 통합 관리
 * 버전 관리 (Git)
 * QA 및 디버깅
 * 개발팀 HR 관리 및 면접 진행`,
        'content.media.mini.description.detail.title': '주요 기술 스택',
        'content.media.mini.description.detail': ` * Swift
 * Objective-C
 * AVFoundation
 * CoreData`,
        'content.media.mini.description.detail.subtitle.video': '시연 영상',
        'content.media.mini.description.detail.video': '뮤직 비디오 플레이어 및 플레이리스트 기능 시연 영상',
        'content.media.mini.description.detail.disclaimer': `위 개발내용은 실제 프로젝트 개발내용이 아니며, 개발역량의 표현을 위해 리소스 및 소스코드가 재구현되었음을 알립니다\n\n`,

        // Metal Graphics Content
        'content.graphics.metal.title': 'Metal 게임 엔진 데모',
        'content.graphics.metal.author': '개인 프로젝트 (진행 중)',
        'content.graphics.metal.description': 'Apple의 Metal 프레임워크를 사용하여 게임 엔진을 개발하는 데 중점을 둔 개인 프로젝트로, 그래픽스 프로그래밍 및 렌더링 기술을 탐구합니다.',
        'content.graphics.metal.role': '역할: 단독 개발자',
        'content.graphics.metal.description.sub1': 'Metal 게임 엔진 데모는 상용 엔진을 사용하는 대신, 그래픽 파이프라인과 실행 구조를 근본부터 이해하기 위해 직접 설계하고 구현한 개인 엔진 프로젝트입니다.',
        'content.graphics.metal.description.sub2': '이 프로젝트에서 엔진은 단순한 렌더러가 아니라, 리소스 관리, 렌더링 흐름, 업데이트 루프, 그리고 플랫폼과의 경계를 포함한 하나의 시스템으로 정의되었습니다.',
        'content.graphics.metal.description.sub3': 'Metal 기반의 저수준 그래픽 API를 사용해 GPU 리소스 생명주기, 커맨드 버퍼 구성, 렌더 패스 분리 등 렌더링 파이프라인 전반을 직접 다루었으며, 이를 상위 레벨에서 제어할 수 있도록 엔진 구조를 설계했습니다.',
        'content.graphics.metal.description.sub4': '또한 씬 관리, 엔티티 업데이트 흐름, 타이밍 시스템 등 게임 실행에 필요한 기본적인 런타임 구조를 포함하여, “화면에 무엇이 그려지는가”뿐 아니라 “엔진이 어떤 순서와 책임으로 동작하는가”를 명확히 하는 데 초점을 맞췄습니다.',
        'content.graphics.metal.description.sub5': '이 데모는 완성된 상용 엔진을 목표로 하기보다는, 그래픽스와 엔진 구조에 대한 이해를 실제 코드와 실행 결과로 검증하기 위한 실험적 구현입니다.',
        'content.graphics.metal.description.detail.title': '주요 기술 스택',
        'content.graphics.metal.description.detail': ` * Swift
 * Metal
 * MetalKit
 * simd`,
        'content.graphics.metal.description.detail.subtitle.renderer': '렌더러 아키텍처',
        'content.graphics.metal.description.detail.renderer': ` * 리소스 관리: 텍스처, 버퍼, 셰이더 등 GPU 리소스의 생성, 캐싱, 해제를 담당하는 리소스 매니저 구현
 * 커맨드 버퍼 구성: 각 프레임마다 렌더링 명령을 기록하고 제출하는 커맨드 버퍼 관리
 * 렌더 패스 분리: 지오메트리 렌더링, 포스트 프로세싱 등 렌더링 단계를 별도의 렌더 패스로 분리하여 처리
 * 셰이더 관리: 셰이더 함수 로드 및 파이프라인 상태 객체 생성 관리`,
        'content.graphics.metal.description.detail.subtitle.scene': '씬 및 엔티티 관리',
        'content.graphics.metal.description.detail.scene': ` * 씬 그래프: 계층적 구조로 씬 내 오브젝트를 관리하고, 변환 행렬 계산 및 업데이트 처리
 * 엔티티 컴포넌트 시스템: 엔티티에 컴포넌트를 부착하여 위치, 렌더링 속성, 물리 속성 등을 관리
 * 업데이트 루프: 매 프레임마다 엔티티 업데이트 및 렌더링 호출 흐름 관리`,
        'content.graphics.metal.description.detail.subtitle.timing': '타이밍 시스템',
        'content.graphics.metal.description.detail.timing': ` * 프레임 타이밍: 각 프레임의 델타 타임 계산 및 시간 기반 애니메이션 지원
 * 고정 업데이트 루프: 물리 시뮬레이션 등 일정한 간격으로 업데이트가 필요한 시스템 지원`,
        'content.graphics.metal.description.detail.subtitle.demo': '데모 시연 영상',

        // Epilogue Scene
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