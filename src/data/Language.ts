type LangType = 'en' | 'kr'
type ScriptType =
       'use.string.key' |

       'main.headline' |
       'main.description' |
       'main.author' |
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
              'main.description': 'focused on real-time graphics and interactive systems engineering.',
              'main.author': 'Created by Park Kwanhong',
              'main.button.start': 'View Projects',

              // Contents Scene
              'contents.title': 'PORTFOL.iO',
              'contents.description': 'A curated selection of projects spanning platforms, engines, augmented reality, and media systems.',
              'contents.button.back': 'Back',
              'contents.button.finish': 'Exit',

              // Substars
              'contents.substar.unity': 'Game',
              'contents.substar.ios': 'Native',
              'contents.substar.media': 'Media',
              'contents.substar.ar': 'AR',
              'contents.substar.graphics': 'Graphics',

              // Subsubstars
              'contents.unity.substar.smarthangul': 'Smart\nHangul',
              'contents.unity.substar.cheonjaeedu': 'Edu\nGame',
              'contents.unity.substar.soomgo': 'Soomgo\nGame',
              'contents.ios.substar.minirecord': 'Mini\nRecord',
              'contents.ios.substar.jump': 'Jump AR',
              'contents.media.substar.minirecord': 'Mini\nRecord',
              'contents.media.substar.jump': 'Jump AR',
              'contents.ar.substar.jump': 'Jump AR',
              'contents.ar.substar.minirecord': 'Mini\nRecord',
              'contents.graphics.substar.metal': 'Metal\nEngine',

              // Content Scene
              'content.button.back': 'Back',
              'content.loading': 'Loading content...',

              // Smart Hangul Unity Content
              'content.unity.smarthangul.title': 'Smart Hangul\n(Kyowon)',
              'content.unity.smarthangul.author': 'Morph Interactive × Kyowon (Jan 2019)',
              'content.unity.smarthangul.role': 'Role: Unity Client Engineer',

              'content.unity.smarthangul.description': 'An interactive Korean language learning application designed to maximize engagement through real-time gameplay and responsive visual systems for early learners.',

              'content.unity.smarthangul.description.sub': 'Due to the nature of early childhood education, the system required highly intuitive interaction, immediate feedback, and rich visual responses. A core challenge was architecting and stabilizing multiple mini-game and animation systems within a unified runtime environment.',

              'content.unity.smarthangul.role.detail.title': 'Key Responsibilities',
              'content.unity.smarthangul.role.detail': ` * Designed and implemented a real-time visual feedback system using particles and sprite animations to reinforce learning responses
 * Built a 2D skeletal animation pipeline using Anima2D for character-driven interactions
 * Structured animation sequencing across UI, characters, and effects using DOTween
 * Architected a shared gameplay logic framework for multiple puzzle-based mini-games
 * Developed interaction systems for image-matching learning content
 * Designed integrated progression logic for cumulative learning review modules`,

              'content.unity.smarthangul.role.detail.subtitle': 'Additional Contributions',
              'content.unity.smarthangul.role.detail.sub': ` * Operated a Git-based branching strategy for team collaboration
 * Managed build and deployment pipelines across multiple device environments
 * Led bug triage and stabilization based on QA feedback
 * Served as the primary technical liaison between planning, design, and client teams`,

              'content.unity.smarthangul.description.detail.title': 'Core Technology Stack',
              'content.unity.smarthangul.description.detail': ` * Unity 2018 LTS (Client Framework)
 * C# (Gameplay Logic & Architecture)
 * Anima2D (2D Skeletal Animation)
 * DOTween (UI & Gameplay Animation System)
 * Unity Particle System (Real-Time Visual Feedback)`,

              'content.unity.smarthangul.description.detail.subtitle.animation': 'Animation System Architecture',
              'content.unity.smarthangul.description.detail.subtitle.video': 'Demo Video',

              // CJ Edu Unity Content
              'content.unity.cjedu.title': 'Korean Language\nEdutainment Platform\n(Confidential)',
              'content.unity.cjedu.author': 'Morph Interactive × Partner Educational Institution\n(Sep 2019)',
              'content.unity.cjedu.role': 'Role: Unity Client Engineer · Assistant Technical Lead',

              'content.unity.cjedu.description': 'A large-scale interactive edutainment platform architected to flexibly expand and operate extensive Korean language learning content.',

              'content.unity.cjedu.description.sub': 'This project involved large-scale collaboration across design, planning, and engineering teams. A primary technical challenge was architecting a platform capable of efficiently managing, distributing, and scaling a large volume of learning content. Due to project confidentiality, specific partner details are withheld.',

              'content.unity.cjedu.role.detail.title': 'Key Responsibilities',
              'content.unity.cjedu.role.detail': ` * Designed and implemented the main scene package-loading architecture from the prototype phase
 * Architected a dynamic content delivery system using Addressable Assets integrated with SQLite-based metadata
 * Defined technical guidelines and distributed development tasks based on content difficulty specifications
 * Acted as PM Assistant across interaction development, reviewing technical issues and providing engineering support to team members`,

              'content.unity.cjedu.role.detail.subtitle': 'Additional Contributions',
              'content.unity.cjedu.role.detail.sub': ` * Operated a Git-based branching strategy for multi-team collaboration
 * Managed iOS build and deployment pipelines
 * Led quality stabilization cycles based on QA feedback
 * Served as a technical communication bridge between planning, design, and client teams`,

              'content.unity.cjedu.description.detail.title': 'Core Technology Stack',
              'content.unity.cjedu.description.detail': ` * Unity 2019 LTS (Client Framework)
 * C# (Platform Architecture & Gameplay Logic)
 * Anima2D (2D Skeletal Animation System)
 * Addressable Assets (Dynamic Content Delivery)
 * SQLite (Content Metadata Management)`,

              'content.unity.cjedu.description.detail.subtitle.prototype': 'Prototype Implementation',
              'content.unity.cjedu.description.detail.prototype1': 'While the production system was built using Anima2D, this portfolio sample was reconstructed using Unity Animation packages for demonstration purposes.',
              'content.unity.cjedu.description.detail.prototype2': 'A sample implementation combining IK controllers with colliders to enable real-time character deformation driven by mouse and touch input.',

              'content.unity.cjedu.description.detail.subtitle.addressable': 'Addressable Asset Architecture',
              'content.unity.cjedu.description.detail.addressable': 'Each content prefab was packaged via Addressable Assets for asynchronous loading, dynamically assembled at runtime through integration with SQLite metadata.',

              'content.unity.cjedu.description.detail.subtitle.sqlite': 'SQLite-Based Content Management',
              'content.unity.cjedu.description.detail.sqlite1': 'A sample demonstrating the construction of learning content lists by querying metadata stored in SQLite.',
              'content.unity.cjedu.description.detail.sqlite2': 'An implementation linking queried metadata to asynchronous prefab loading through the Addressable system.',

              'content.unity.cjedu.description.detail.subtitle.contents': 'Interactive Content Simulation Samples',
              'content.unity.cjedu.description.detail.contents': ` * Implemented physics-based oscillation simulations using angular momentum, angular velocity, and angular acceleration
 * Designed a force-driven interaction system responding dynamically to user input
 * Reference Theory: Nature of Code (Daniel Shiffman) — Vectors, Forces, Oscillation`,

              'content.unity.cjedu.description.detail.disclaimer': 'Due to security restrictions, some portfolio implementations were reconstructed using equivalent structures rather than original project resources.\n\n',

              // Freelance Unity Content
              'content.unity.soomgo.title': 'Freelance\nUnity Engineering\nProjects',
              'content.unity.soomgo.author': 'Independent Freelance Projects (Dec 2021)',

              'content.unity.soomgo.description': 'A collection of short-term freelance Unity projects focused on rapidly designing and delivering production-ready solutions under tight constraints and shifting requirements.',

              'content.unity.soomgo.role': 'Role: Freelance Unity Engineer · iOS Build & Deployment Consultant',

              'content.unity.soomgo.description.sub': 'Due to client contracts and NDAs, some projects remain confidential. Only representative cases approved for public disclosure are presented here.',

              'content.unity.soomgo.description.detail.title': 'Guardian of the Forest',
              'content.unity.soomgo.description.detail': 'A 3D adventure game structured around act-based progression, featuring a NavMesh-driven movement system to manage exploration flow and quest sequencing.',

              'content.unity.soomgo.description.detail.subtitle.animation': 'Demo Video',

              'content.unity.soomgo.description.detail.subtitle.navmesh': 'NavMesh System Sample',
              'content.unity.soomgo.description.detail.navmesh': 'A player navigation system using NavMesh Agents to constrain walkable areas and automatically compute optimal paths to destinations.',

              'content.unity.soomgo.description.detail.subtitle.resources': 'Asset Pipeline',
              'content.unity.soomgo.description.detail.resources': 'All 3D models and animations were produced in Blender, establishing a fully independent asset pipeline without reliance on third-party licensed resources.',

              'content.unity.soomgo.description.detail.subtitle.act': 'Act-Based Gameplay Architecture',
              'content.unity.soomgo.description.detail.act': 'Each act was implemented using a generic class-based architecture, enabling modular control over agent dialogue, animation states, and progression flow.',

              // jump iOS Content
              'content.ios.jump.title': 'Jump\n(Native App Re-Architecture)',

              'content.ios.jump.author': 'Joint Development by\nMorph Interactive × SK Telecom (2020.03)',

              'content.ios.jump.description':
                     'An iOS renewal project that migrated a large-scale commercial AR platform from a hybrid architecture to a fully native architecture to resolve performance limitations and long-term scalability issues.',

              'content.ios.jump.role': 'Role: Lead iOS Engineer',

              'content.ios.jump.description.sub':
                     'To ensure service stability and long-term scalability, I led the technical transition to a native-centric architecture and restructured the overall application architecture.',

              'content.ios.jump.role.detail.title': 'Key Responsibilities',

              'content.ios.jump.role.detail': ` * Led the analysis of the existing hybrid architecture and the redesign of a native-centric application architecture
 * Designed and optimized the iOS native UI system for high-traffic production environments
 * Integrated a multi-runtime architecture across Native, Web, and Unity layers
 * Migrated and stabilized the media playback and editing pipeline to a native implementation
 * Established the project-wide build, deployment, and release management process`,

              'content.ios.jump.role.detail.subtitle': 'Additional Contributions',

              'content.ios.jump.role.detail.sub': ` * Operated a Git-based collaborative branching strategy
 * Led large-scale feature release QA and stabilization efforts
 * Coordinated technical discussions and architectural alignment with SK Telecom engineers`,

              'content.ios.jump.description.detail.title': 'Core Technology Stack',

              'content.ios.jump.description.detail': ` * Swift (Primary Application Layer)
 * Objective-C / Objective-C++ (Legacy & Native Bridge Layer)
 * WKWebView (Hybrid Compatibility Layer)
 * AVFoundation (Media Playback & Editing)
 * CoreData (Local Persistence)`,

              'content.ios.jump.description.detail.subtitle.prototype': 'Native UI Re-Architecture',

              'content.ios.jump.description.detail.prototype': ` * Designed a hierarchical scroll container system based on UIViewController to support server-driven UI composition
 * Unified Main, Gallery, and MyPage ViewControllers under a single scroll-based architecture
 * Designed NodeTreeManager to recursively parse Node Tree JSON into a runtime UI tree structure
 * Implemented a server-driven UI rendering architecture based on dynamic Node Tree data
 * Designed modular UIView components that receive corresponding NodeTree objects as input
 * Integrated UI event handling and animation systems across the dynamic UI framework`,

              'content.ios.jump.description.detail.subtitle.nativeplugin': 'Unity–Native Plugin Architecture Rebuild',

              'content.ios.jump.description.detail.nativeplugin1': ` * As the application architecture shifted, Unity was moved from the primary runtime to a secondary runtime
 * Redesigned the communication model from a Native → Unity structure to a Unity → Native–centric architecture
 * Established an asynchronous messaging architecture based on UnitySendMessage
 * Designed a dedicated bridge layer to clearly separate bidirectional call flows`,

              'content.ios.jump.description.detail.nativeplugin2':
                     'Designed a Swift-based UnityiOSPluginWrapper to unify the interface layer between Native and Unity.',

              'content.ios.jump.description.detail.nativeplugin3':
                     'Implemented an Objective-C++–based NativePluginiOS module to reliably manage UnitySendMessage calls and callback flows.',

              'content.ios.jump.description.detail.subtitle.main': 'Main Screen Architecture',

              'content.ios.jump.description.detail.main': ` * Recursively parsed Node Tree JSON into a runtime hierarchical UI structure
 * Designed and dynamically generated a multi-level UI system with Depth 1–5 hierarchy
 * Enforced a unified interface by requiring all UI components to conform to the NodeDepthUI protocol
 * Composed multi-depth UI layers hierarchically within a unified MainScrollView

    * Depth 1: MainView (Overall Layout)
    * Depth 2: Header / Content / Footer
    * Depth 3: Section-Level Views (Banners, Categories, Recommendations, etc.)
    * Depth 4: Item-Level Views
    * Depth 5: Detailed Content Components

 * Enabled rapid adaptation to product changes through a fully data-driven UI rendering architecture
 * Integrated media playback and editing features directly into the main screen flow`,

              'content.ios.jump.description.detail.subtitle.mypage': 'MyPage & Social Features',

              'content.ios.jump.description.detail.mypage1': ` * Integrated PHPicker using the PhotosUI framework
 * Implemented a grid-based media gallery UI with filtering based on Jump album metadata`,

              'content.ios.jump.description.detail.mypage2':
                     'Unified playback of externally hosted video URLs delivered via server APIs using a WebView-based player.',

              'content.ios.jump.description.detail.mypage3': ` * Designed a CoreData-based local caching architecture for user settings
 * Applied real-time UI updates upon configuration changes
 * Integrated server-side voting APIs with live result updates`,

              'content.ios.jump.description.detail.mypage4': ` * Integrated index-based pagination APIs for comments
 * Implemented an infinite scrolling comment system
 * Handled real-time comment creation and live updates`,

              'content.ios.jump.description.detail.disclaimer':
                     'The code presented on this page is a reconstructed sample based on the original project architecture for demonstration purposes.\n\n',

              // Mini iOS Content
              'content.ios.mini.title': 'MiniRecord (iOS Platform Lead)',

              'content.ios.mini.author': 'MiniRecord Inc. (2023.02)',

              'content.ios.mini.role': 'Role: Lead Engineer & Engineering Manager',

              'content.ios.mini.description':
                     'A large-scale iOS service that integrates AR, media, and customization features into an artist IP–based digital album platform.',

              'content.ios.mini.description.sub':
                     'While leading iOS native development as the sole platform owner, I built and organized the Backend, Unity, and Native teams, designing both the technical architecture and the development organization from the ground up.',

              'content.ios.mini.role.detail.title': 'Key Responsibilities',

              'content.ios.mini.role.detail': ` * Designed the iOS native application architecture and led end-to-end platform development as the sole iOS owner
 * Designed and implemented the AR-based digital photocard system
    * Architected real-world placement of Unity 3D objects using ARKit and AR Foundation
    * Implemented AR interaction systems for artist avatar and photocard customization
 * Built a large-scale media streaming, playback, and editing pipeline
 * Established performance optimization standards and release quality management processes`,

              'content.ios.mini.role.detail.subtitle': 'Leadership & Organization',

              'content.ios.mini.role.detail.sub': ` * Built Backend, Unity, and iOS Native teams and established cross-functional development processes
 * Led multi-platform architecture design and company-wide technical decision-making
 * Established a Git-based collaborative development workflow
 * Defined QA pipelines and managed release stabilization cycles
 * Designed the engineering hiring process and led technical interviews`,

              'content.ios.mini.description.detail.title': 'Core Technology Stack',

              'content.ios.mini.description.detail': ` * Swift (Primary Application Layer)
 * Objective-C (Legacy & Native Bridge)
 * ARKit (iOS Native AR System)
 * Unity AR Foundation (Cross-Platform AR Runtime)
 * WKWebView (Hybrid Content Layer)
 * AVFoundation (Media Playback & Editing)
 * CoreML (Image & Media Processing)
 * CoreData (Local Persistence)`,

              'content.ios.mini.description.detail.subtitle.video': 'Product Demos',

              'content.ios.mini.description.detail.video1': 'Main screen UI/UX architecture demo',

              'content.ios.mini.description.detail.video2': 'Digital album UI/UX demo',

              'content.ios.mini.description.detail.video3': 'Photocard binder creation workflow demo',

              'content.ios.mini.description.detail.video4': 'Photocard binder editing interaction demo',

              'content.ios.mini.description.detail.disclaimer':
                     'The code presented on this page is a reconstructed sample based on the original project architecture for demonstration purposes.\n\n',

              // Jump AR Content
              'content.ar.jump.title': 'SKT Jump Massive AR',

              'content.ar.jump.author': 'Co-developed by\nMorph Interactive × SK Telecom (2020.01)',

              'content.ar.jump.role': 'Role: Lead iOS Engineer',

              'content.ar.jump.description':
                     'An iOS–Unity integrated AR platform designed to reliably operate large-scale AR content, focusing on real-time AR session processing and a cross-platform runtime architecture.',

              'content.ar.jump.description.sub':
                     'Over long-term development, a major redesign, and the adoption of a new AR SDK, this project underwent multiple architectural redesigns and technology stack transitions to ensure long-term scalability and stability.',

              'content.ar.jump.role.detail.title': 'Key Responsibilities',

              'content.ar.jump.role.detail': ` * Developed AR features using ARKit and Unity AR Foundation
 * Integrated ARCore SDK with AR Foundation and designed a multi-platform AR support architecture
 * Designed and implemented the native bridge architecture between iOS and Unity
 * Built AR object placement and interaction systems for 3D content
 * Managed project build pipelines and performance optimization`,

              'content.ar.jump.role.detail.subtitle': 'Additional Contributions',

              'content.ar.jump.role.detail.sub': ` * Version control and release management (Git)
 * QA coordination and advanced debugging
 * Technical communication with client stakeholders`,

              'content.ar.jump.description.detail.title': 'Core Technology Stack',

              'content.ar.jump.description.detail': ` * Unity 2019 LTS
 * C#
 * ARKit
 * Unity AR Foundation
 * Swift
 * Objective-C`,

              'content.ar.jump.description.detail.subtitle.immigration': 'Migration to AR Foundation',

              'content.ar.jump.description.detail.immigration':
                     'The project initially implemented AR features using a direct ARKit plugin architecture, and was later migrated to AR Foundation to secure multi-platform scalability and long-term maintainability.',

              'content.ar.jump.description.detail.subtitle.arrecording': 'AR Recording Native–Unity Plugin System',

              'content.ar.jump.description.detail.arrecording':
                     'To address the absence of session recording in ARCore environments, I designed and implemented a custom AR recording system that directly captures and serializes AR frames on iOS and connects them to a Unity-based playback pipeline.',

              'content.ar.jump.description.detail.subtitle.sourcecode': 'Core Source Architecture',

              'content.ar.jump.description.detail.arrecording.logic': `[Unity UI]
   ↓ startRecording()
[Native ARKit Plugin]
   ↓ Collect anchor transforms per frame
   ↓ Convert to Unity coordinate system
   ↓ JSON serialization
   ↓ Save to local storage
[Unity]
   ↓ Load JSON
   ↓ Frame-by-frame playback`,

              'content.ar.jump.description.detail.arrecording.sourcecode1': 'Unity ↔ Objective-C bridge (extern interface)',

              'content.ar.jump.description.detail.arrecording.sourcecode2': 'ARKit frame capture (core logic)',

              'content.ar.jump.description.detail.arrecording.sourcecode3': 'Coordinate system conversion (Unity ↔ ARKit)',

              'content.ar.jump.description.detail.arrecording.sourcecode4': 'JSON serialization and local persistence',

              'content.ar.jump.description.detail.arrecording.sourcecode5': 'Unity → Native interface implementation',

              'content.ar.jump.description.detail.arrecording.sourcecode6': 'Unity playback pipeline architecture',

              'content.ar.jump.description.disclaimer':
                     'The source code shown above is a reimplementation for demonstration purposes and does not contain the original project code.\n\n',

              // Minirecord AR Content
              'content.ar.mini.title': 'MiniRecord AR Photocard',

              'content.ar.mini.author': 'MiniRecord Inc. (2023.02)',

              'content.ar.mini.role': 'Role: Lead Engineer & Engineering Manager',

              'content.ar.mini.description':
                     'An AR module integrated into the MiniRecord app that allows users to interact with virtual photocards, designed as a core product feature rather than a standalone technical demo.',

              'content.ar.mini.role.detail.title': 'Key Responsibilities',

              'content.ar.mini.role.detail': ` * Led end-to-end iOS native application development
 * Developed AR features using ARKit and Unity AR Foundation
 * Implemented real-world placement and interaction logic for Unity 3D objects
 * Built AR photocard customization and interaction systems
 * Managed build pipelines and performance optimization`,

              'content.ar.mini.role.detail.subtitle': 'Additional Contributions',

              'content.ar.mini.role.detail.sub': ` * Built and led backend, Unity, and native engineering teams
 * Managed integrated cross-team development workflows
 * Version control strategy and release coordination (Git)
 * QA leadership and advanced debugging
 * Designed hiring processes and led technical interviews`,

              'content.ar.mini.description.detail.title': 'Core Technology Stack',

              'content.ar.mini.description.detail': ` * Unity 2020 LTS
 * C#
 * ARKit
 * Unity AR Foundation
 * Swift
 * AVFoundation
 * Objective-C`,

              'content.ar.mini.description.detail.subtitle.image': 'AR Photocard Samples',

              // Jump Media Editor Content
              'content.media.jump.title': 'Jump Media Editor',

              'content.media.jump.author': 'Morph Interactive × SK Telecom (2020.03)',

              'content.media.jump.role': 'Role: Lead iOS Engineer',

              'content.media.jump.description':
                     'An in-app media editing module built for the Jump platform, focused on constructing a high-performance native media processing pipeline on iOS.',

              'content.media.jump.description.sub':
                     'Developed as part of the Jump iOS native re-architecture, the media editor was designed to significantly improve user experience while meeting strict performance and stability requirements.',

              'content.media.jump.description.detail.title': 'Core Technology Stack',

              'content.media.jump.description.detail': ` * Swift
 * AVFoundation
 * CoreGraphics
 * CoreAnimation
 * CoreData`,

              'content.media.jump.description.detail.subtitle.feature': 'Key Editor Features',

              'content.media.jump.description.detail.feature': ` * Video trimming
 * Filter and effect processing
 * Text and sticker overlays
 * Real-time media preview and playback
 * Exporting and sharing edited media`,

              'content.media.jump.description.detail.subtitle.workflow': 'Media Editing Workflow',

              'content.media.jump.description.detail.workflow': ` 1. Select media captured from an AR session
 2. Load selected media as AVAsset
 3. Apply editing operations (trimming, filters, text, stickers)
 4. Preview and playback the edited media
 5. Export the final result locally or share to Jump Social`,

              'content.media.jump.description.detail.subtitle.video': 'Demo Video',

              'content.media.jump.description.detail.sourcecode': ` * Filter pipeline — parsing server-delivered ACV files and generating CIFilter chains
 * Sticker rendering (still images) — applying image-based CIFilters
 * Sticker rendering (GIF) — compositing animated layers using Core Animation
 * Trimming and audio insertion — manipulating AVAssetTrack within the composition pipeline`,

              'content.media.jump.description.detail.disclaimer':
                     `The implementations shown here are reconstructed samples based on the original project architecture, as proprietary source code cannot be disclosed.\n\n`,

              // Minirecord Media Content
              'content.media.mini.title': 'MiniRecord Album Playback System',

              'content.media.mini.author': 'MiniRecord Inc. (2023.02)',

              'content.media.mini.role': 'Role: Lead Engineer & Engineering Manager',

              'content.media.mini.description':
                     'A core iOS-native media playback system that powers the primary consumption experience of the MiniRecord platform. Designed to deliver stable, high-quality media playback in a rapidly scaling service environment, this album player was built alongside the technical architecture and engineering organization.',

              'content.media.mini.description.sub':
                     'By establishing backend, Unity, and native iOS teams and defining cross-platform development processes, I designed and operated a collaborative architecture centered around the iOS media system.',

              'content.media.mini.role.detail.title': 'Key Responsibilities',

              'content.media.mini.role.detail': ` * Defined the technical direction and architecture of the iOS-native media playback system
 * Built a custom AVFoundation-based player pipeline and standardized code quality practices
 * Designed playback state management for large-scale album and playlist structures
 * Defined cross-platform media data flow for backend, Unity, and native clients
 * Acted as technical owner balancing delivery timelines, technical debt, and performance issues`,

              'content.media.mini.role.detail.subtitle': 'Additional Contributions',

              'content.media.mini.role.detail.sub': ` * Built and led backend, Unity, and native iOS teams with integrated development workflows
 * Version control strategy and Git-based collaboration management
 * QA coordination and production stabilization
 * Engineering hiring process design and technical interviews`,

              'content.media.mini.description.detail.title': 'Core Technology Stack',

              'content.media.mini.description.detail': ` * Swift
 * Objective-C
 * AVFoundation
 * CoreData`,

              'content.media.mini.description.detail.subtitle.video': 'Demo Video',

              'content.media.mini.description.detail.video':
                     'Demonstration of the music video player and playlist system',

              'content.media.mini.description.detail.disclaimer':
                     `The implementations shown here are reconstructed samples based on the original project architecture, as proprietary source code cannot be disclosed.\n\n`,

              // Metal Graphics Content
              'content.graphics.metal.title': 'Metal Game Engine Demo',
              'content.graphics.metal.author': 'Personal Project (In Progress)',
              'content.graphics.metal.role': 'Role: Engine Architect & Sole Developer',

              'content.graphics.metal.description':
                     'This is a personal research project in which I designed and implemented a game engine architecture directly on top of Apple Metal, a low-level graphics API. The project focuses on reconstructing the rendering pipeline and runtime structure from an engine-level perspective.',

              'content.graphics.metal.description.sub1':
                     'Rather than relying on a commercial engine, I built the core engine layers from the ground up in order to gain a fundamental understanding of graphics pipelines and runtime execution models.',

              'content.graphics.metal.description.sub2':
                     'In this project, the engine is defined not as a simple renderer, but as a complete runtime system encompassing resource management, rendering flow, update loops, and platform abstraction.',

              'content.graphics.metal.description.sub3':
                     'By leveraging Metal’s low-level graphics API, I directly control the entire rendering pipeline, including GPU resource lifecycles, command buffer construction, and render pass separation, and designed an engine architecture that can operate these systems reliably at higher abstraction layers.',

              'content.graphics.metal.description.sub4':
                     'In addition to rendering, the engine includes core runtime structures required for game execution, such as scene management, entity update flows, and timing systems, with an emphasis on defining not only “what is rendered,” but also “how the engine operates and in what order.”',

              'content.graphics.metal.description.sub5':
                     'Rather than aiming to build a production-ready commercial engine, this demo serves as a research-oriented implementation to validate my understanding of graphics programming and engine architecture through real code and executable results.',

              'content.graphics.metal.description.detail.title': 'Core Technology Stack',
              'content.graphics.metal.description.detail': ` * Swift
 * Metal
 * MetalKit
 * simd`,

              'content.graphics.metal.description.detail.subtitle.renderer': 'Renderer Architecture',
              'content.graphics.metal.description.detail.renderer': ` * Resource Management: Designed a resource manager responsible for the creation, caching, and lifetime control of GPU resources such as textures, buffers, and shaders
 * Command Buffer Construction: Implemented a per-frame pipeline for recording and submitting rendering commands
 * Render Pass Separation: Structured rendering stages such as geometry and post-processing into independent render passes
 * Shader Management: Designed a system for loading shader functions and managing pipeline state objects`,

              'content.graphics.metal.description.detail.subtitle.scene': 'Scene and Entity Management',
              'content.graphics.metal.description.detail.scene': ` * Scene Graph: Implemented a hierarchical object management system with transform propagation
 * Entity Component System: Separated rendering, transform, and logic responsibilities through component-based entity design
 * Update Loop: Controlled per-frame entity updates and rendering invocation flow`,

              'content.graphics.metal.description.detail.subtitle.timing': 'Timing System',
              'content.graphics.metal.description.detail.timing': ` * Frame Timing: Implemented a delta-time-based time synchronization system
 * Fixed Update Loop: Designed a fixed-timestep processing structure for physics and simulation layers`,

              'content.graphics.metal.description.detail.subtitle.demo': 'Demo Video',

              // Epilogue Scene
              'epilogue.message': 'Thank you for visiting my portfolio! Feel free to reach out for collaborations or inquiries.'
       },
       kr: {
              // Main Scene
              'main.headline': 'PORTFOL.iO',
              'main.description': '실시간 그래픽과 인터랙션 시스템을 중심으로 한 개인 포트폴리오입니다.',
              'main.author': 'Created by Park Kwanhong',
              'main.button.start': '프로젝트 보기',

              // Contents Scene
              'contents.title': 'PORTFOL.iO',
              'contents.description': '플랫폼, 엔진, 증강현실, 미디어 시스템을 아우르는 작업 모음입니다.',
              'contents.button.back': '뒤로가기',
              'contents.button.finish': '끝내기',

              // Substars
              'contents.substar.unity': '게임',
              'contents.substar.ios': '네이티브',
              'contents.substar.media': '미디어',
              'contents.substar.ar': '증강현실',
              'contents.substar.graphics': '엔진',

              // Subsubstars
              'contents.unity.substar.smarthangul': '교원 한글',
              'contents.unity.substar.cheonjaeedu': '에듀 게임',
              'contents.unity.substar.soomgo': '숨고 게임',
              'contents.ios.substar.minirecord': '미니레코드',
              'contents.ios.substar.jump': '점프 AR',
              'contents.media.substar.minirecord': '미니레코드',
              'contents.media.substar.jump': '점프 AR',
              'contents.ar.substar.jump': '점프 AR',
              'contents.ar.substar.minirecord': '미니레코드',
              'contents.graphics.substar.metal': '게임 엔진',

              // Content Scene
              'content.button.back': '뒤로가기',
              'content.loading': '콘텐츠 로딩 중...',

              // Smart Hangul Unity Content
              'content.unity.smarthangul.title': '교원 스마트 한글',
              'content.unity.smarthangul.author': '모프 인터랙티브(주) × 교원 공동 개발 (2019.01)',
              'content.unity.smarthangul.role': 'Role: Unity Client Developer',
              'content.unity.smarthangul.description': '유아 학습자의 몰입도를 극대화하기 위해 다양한 인터랙티브 게임 구조로 설계된 한글 교육용 애플리케이션입니다.',
              'content.unity.smarthangul.description.sub': '아동 교육 도메인의 특성상 직관적인 조작, 빠른 피드백, 풍부한 시각적 반응이 필수였으며, 다수의 미니게임과 애니메이션 시스템을 안정적으로 통합하는 것이 핵심 과제였습니다.',
              'content.unity.smarthangul.role.detail.title': 'Key Responsibilities',
              'content.unity.smarthangul.role.detail': ` * 학습 피드백 강화를 위한 파티클 및 스프라이트 애니메이션 시스템 구현
 * Anima2D 기반 캐릭터 스켈레탈 애니메이션 파이프라인 구축
 * Dotween을 활용한 UI · 캐릭터 · 이펙트 애니메이션 시퀀스 구조화
 * 퍼즐형 미니게임 공통 로직 아키텍처 설계 및 구현
 * 그림 매칭형 컨텐츠 인터랙션 시스템 개발
 * 학습 진도 통합형 ‘총정리’ 컨텐츠 로직 설계`,
              'content.unity.smarthangul.role.detail.subtitle': 'Additional Contributions',
              'content.unity.smarthangul.role.detail.sub': ` * Git 기반 협업 브랜치 전략 운영
 * 다중 디바이스 환경 대응 빌드 · 배포 파이프라인 관리
 * QA 피드백 기반 버그 트래킹 및 안정화 작업 주도
 * 기획 · 디자인 · 클라이언트 간 기술 커뮤니케이션 담당`,
              'content.unity.smarthangul.description.detail.title': 'Core Technology Stack',
              'content.unity.smarthangul.description.detail': ` * Unity 2018 LTS (Client Framework)
 * C# (Gameplay Logic & Architecture)
 * Anima2D (2D Skeletal Animation)
 * Dotween (UI/Gameplay Animation System)
 * Unity Particle System (Visual Feedback Effects)`,
              'content.unity.smarthangul.description.detail.subtitle.animation': '애니메이션 시스템',
              'content.unity.smarthangul.description.detail.subtitle.video': '시연 영상',

              // CJ Edu Unity Content
              'content.unity.cjedu.title': '한글 교육 에듀테인먼트 플랫폼 (Confidential)',
              'content.unity.cjedu.author': '모프 인터랙티브(주) × 교육기관 공동 개발 (2019.09)',
              'content.unity.cjedu.role': 'Role: Unity Client Developer / Technical Lead Assistant',
              'content.unity.cjedu.description': '대규모 한글 학습 콘텐츠를 유연하게 확장·운영하기 위해 설계된 인터랙티브 에듀테인먼트 플랫폼입니다.',
              'content.unity.cjedu.description.sub': '디자인·기획·개발 조직이 대규모로 협업한 프로젝트로, 다수의 학습 콘텐츠를 효율적으로 관리·배포하기 위한 플랫폼 구조 설계가 핵심 과제였습니다. 프로젝트 특성상 상세 명칭과 협력 기관은 비공개 처리합니다.',
              'content.unity.cjedu.role.detail.title': 'Key Responsibilities',
              'content.unity.cjedu.role.detail': ` * 프로토타입 단계부터 메인 화면 패키지 로딩 아키텍처 설계 및 구현
 * Addressable Asset 기반 콘텐츠 패키징 및 SQLite 연동 동적 콘텐츠 로딩 시스템 구축
 * 기획 문서 난이도 기준에 따른 콘텐츠 개발 업무 분배 및 기술 가이드 제공
 * 콘텐츠 인터랙션 개발 전반에서 PM Assistant 역할 수행, 기술 이슈 리뷰 및 팀원 기술 지원`,
              'content.unity.cjedu.role.detail.subtitle': 'Additional Contributions',
              'content.unity.cjedu.role.detail.sub': ` * Git 기반 협업 브랜치 전략 운영
 * iOS 빌드 및 배포 파이프라인 관리
 * QA 피드백 기반 품질 안정화 사이클 운영
 * 기획·디자인·클라이언트 간 기술 커뮤니케이션 담당`,
              'content.unity.cjedu.description.detail.title': 'Core Technology Stack',
              'content.unity.cjedu.description.detail': ` * Unity 2019 LTS (Client Framework)
 * C# (Platform Architecture & Gameplay Logic)
 * Anima2D (2D Skeletal Animation System)
 * Addressable Asset (Dynamic Content Delivery)
 * SQLite (Content Metadata Management)`,
              'content.unity.cjedu.description.detail.subtitle.prototype': '프로토타입 개발내용',
              'content.unity.cjedu.description.detail.prototype1': '실제 프로젝트에서는 Anima2D 기반으로 구현하였으며, 본 포트폴리오 샘플은 Unity Animation 패키지로 재구성되었습니다.',
              'content.unity.cjedu.description.detail.prototype2': 'IK 컨트롤러에 Collider를 결합하여 마우스·터치 드래그 입력에 따른 실시간 캐릭터 변형 인터랙션을 구현한 샘플입니다.',
              'content.unity.cjedu.description.detail.subtitle.addressable': 'Addressable 활용내용',
              'content.unity.cjedu.description.detail.addressable': '각 콘텐츠 Prefab을 Addressable 기반으로 패키징하여 비동기 로드하고, SQLite 메타데이터와 연동해 동적으로 콘텐츠를 구성하는 구조를 구현했습니다.',
              'content.unity.cjedu.description.detail.subtitle.sqlite': 'SQLite 활용내용',
              'content.unity.cjedu.description.detail.sqlite1': 'SQLite에 저장된 콘텐츠 메타데이터를 조회하여 학습 콘텐츠 목록을 구성하는 샘플입니다.',
              'content.unity.cjedu.description.detail.sqlite2': '조회된 메타데이터를 기반으로 Addressable 시스템에서 콘텐츠 Prefab을 비동기 로드하는 구조를 구현했습니다.',
              'content.unity.cjedu.description.detail.subtitle.contents': '시연 영상 및 컨텐츠 샘플',
              'content.unity.cjedu.description.detail.contents': ` * 각운동량, 각속도, 각가속도를 활용한 물리 기반 Oscillation 시뮬레이션 구현
 * 사용자 인터랙션에 따라 Force가 적용되는 물리 반응형 콘텐츠 시스템 설계
 * 참고 이론: Nature of Code (Daniel Shiffman) Vector · Force · Oscillation`,
              'content.unity.cjedu.description.detail.disclaimer': `본 포트폴리오의 일부 구현 예시는 보안상 실제 프로젝트 리소스를 사용할 수 없어 동일한 구조로 재구성한 샘플입니다.\n\n`,

              // Soomgo Unity Content
              'content.unity.soomgo.title': 'Soomgo Freelance Projects',
              'content.unity.soomgo.author': '프리랜서 Unity 프로젝트 (2021.12)',
              'content.unity.soomgo.description': '다양한 요구사항과 제한 조건 속에서 Unity 기반 솔루션을 단기간에 설계·구현한 프리랜서 프로젝트 경험입니다.',
              'content.unity.soomgo.role': 'Role: Unity Client Developer / iOS Build & Deployment Consultant',
              'content.unity.soomgo.description.sub': '클라이언트 요청 및 계약 조건에 따라 일부 프로젝트는 비공개 처리되었으며, 공개 가능한 대표 사례만을 정리했습니다.',
              'content.unity.soomgo.description.detail.title': '수호의 숲',
              'content.unity.soomgo.description.detail': 'NavMesh 기반 이동 시스템을 중심으로 설계된 3D 어드벤처 게임으로, 액트 단위의 구조를 통해 탐험과 퀘스트 흐름을 관리합니다.',
              'content.unity.soomgo.description.detail.subtitle.animation': '시연 영상',
              'content.unity.soomgo.description.detail.subtitle.navmesh': 'Navmesh 사용 샘플',
              'content.unity.soomgo.description.detail.navmesh': 'NavMesh Agent를 활용해 이동 가능 영역을 제어하고, 목적지까지의 경로 탐색을 자동화한 플레이어 이동 시스템 구현 샘플입니다.',
              'content.unity.soomgo.description.detail.subtitle.resources': '사용된 리소스',
              'content.unity.soomgo.description.detail.resources': '프로젝트에 사용된 3D 모델 및 애니메이션은 Blender를 사용해 직접 제작했으며, 외부 라이선스에 의존하지 않는 독립적인 리소스 파이프라인을 구성했습니다.',
              'content.unity.soomgo.description.detail.subtitle.act': '액트 로직 샘플',
              'content.unity.soomgo.description.detail.act': '각 액트는 제네릭 기반 클래스로 설계되어 있으며, 액트 단위로 에이전트의 대사, 애니메이션, 진행 흐름을 제어하도록 구성했습니다.',

              // jump iOS Content
              'content.ios.jump.title': 'Jump (Native App Re-Architecture)',
              'content.ios.jump.author': '모프 인터랙티브(주) × SK텔레콤 공동 개발 (2020.03)',
              'content.ios.jump.description': '대규모 상용 AR 플랫폼 서비스의 성능 한계와 확장성 문제를 해결하기 위해, 기존 하이브리드 구조를 완전 네이티브 아키텍처로 전환한 iOS 리뉴얼 프로젝트입니다.',
              'content.ios.jump.role': 'Role: Lead iOS Engineer',
              'content.ios.jump.description.sub': '서비스 안정성과 장기 확장성을 확보하기 위해 전체 앱 구조를 재설계하고, 네이티브 중심의 아키텍처 전환을 기술적으로 주도했습니다.',
              'content.ios.jump.role.detail.title': 'Key Responsibilities',
              'content.ios.jump.role.detail': ` * 기존 하이브리드 앱 구조 분석 및 네이티브 중심 아키텍처 재설계 주도
 * 대규모 트래픽 환경을 고려한 iOS 네이티브 UI 시스템 설계 및 성능 최적화
 * 네이티브–웹–Unity 간 멀티 런타임 구조 통합
 * 미디어 재생·편집 파이프라인의 네이티브 전환 및 안정화
 * 전체 프로젝트 빌드·배포 체계 수립 및 릴리즈 관리`,
              'content.ios.jump.role.detail.subtitle': 'Additional Contributions',
              'content.ios.jump.role.detail.sub': ` * Git 기반 협업 브랜치 전략 운영
 * 대규모 기능 릴리즈 QA 대응 및 안정화 작업 총괄
 * SK텔레콤 기술 담당자와의 기술 커뮤니케이션 및 구조 협의`,
              'content.ios.jump.description.detail.title': 'Core Technology Stack',
              'content.ios.jump.description.detail': ` * Swift (Primary Application Layer)
 * Objective-C / Objective-C++ (Legacy & Native Bridge Layer)
 * WKWebView (Hybrid Compatibility Layer)
 * AVFoundation (Media Playback & Editing)
 * CoreData (Local Persistence)`,
              'content.ios.jump.description.detail.subtitle.prototype': 'Native UI Re-Architecture',
              'content.ios.jump.description.detail.prototype': ` * 서버 주도 UI 구성을 위해 UIViewController 기반 계층형 스크롤 컨테이너 시스템 설계
 * Main / Gallery / MyPage ViewController를 단일 스크롤 구조로 통합 관리
 * 서버 API로 전달되는 Node Tree JSON 구조를 재귀 파싱하여 런타임 UI 트리로 변환하는 NodeTreeManager 설계
 * Node Tree 데이터를 기반으로 동적 UI를 생성하는 서버 드리븐 UI 렌더링 구조 구현
 * 각 UI 컴포넌트를 대응 NodeTree를 인자로 받는 모듈형 UIView 구조로 설계
 * UI 이벤트 처리 및 애니메이션 시스템 통합 구현`,
              'content.ios.jump.description.detail.subtitle.nativeplugin': 'Unity–Native Plugin Architecture Rebuild',
              'content.ios.jump.description.detail.nativeplugin1': ` * 앱 구조 전환으로 Unity가 메인 런타임에서 서브 런타임으로 변경됨
 * 이에 따라 기존 Native → Unity 호출 구조를 Unity → Native 중심 구조로 전면 재설계
 * UnitySendMessage 기반 비동기 메시징 아키텍처 정립
 * 양방향 호출 구조를 안정적으로 분리하기 위해 브리지 계층 설계`,
              'content.ios.jump.description.detail.nativeplugin2': 'Swift 기반 UnityiOSPluginWrapper를 설계하여 네이티브–Unity 간 인터페이스 계층을 일원화',
              'content.ios.jump.description.detail.nativeplugin3': 'Objective-C++ 기반 NativePluginiOS 모듈을 구현하여 UnitySendMessage 호출 및 콜백 흐름을 안정적으로 관리',
              'content.ios.jump.description.detail.subtitle.main': 'Main Screen Architecture',
              'content.ios.jump.description.detail.main': ` * Node Tree JSON 데이터를 재귀 파싱하여 런타임 트리 구조로 변환
 * Depth 1~5 계층형 UI 시스템 설계 및 동적 생성
 * 모든 UI는 NodeDepthUI 프로토콜을 상속하여 공통 인터페이스 유지
 * MainScrollView 상에서 다중 Depth UI를 계층적으로 구성

    * Depth 1: MainView (전체 레이아웃)
    * Depth 2: Header / Content / Footer
    * Depth 3: 섹션 단위 뷰 (배너, 카테고리, 추천 등)
    * Depth 4: 아이템 단위 뷰
    * Depth 5: 세부 컨텐츠 컴포넌트

 * 서버 데이터 기반 UI 렌더링 구조를 통해 기획 변경에 유연하게 대응
 * 메인 화면 내 미디어 재생·편집 기능 통합`,
              'content.ios.jump.description.detail.subtitle.mypage': 'MyPage & Social Features',
              'content.ios.jump.description.detail.mypage1': ` * PhotosUI 프레임워크 기반 PHPicker 연동
 * Jump 앨범 메타데이터 기반 미디어 필터링 및 격자형 갤러리 UI 구현`,
              'content.ios.jump.description.detail.mypage2': '서버 API로 전달된 외부 영상 URL을 WebView 기반으로 통합 재생',
              'content.ios.jump.description.detail.mypage3': ` * CoreData 기반 사용자 설정 로컬 캐싱 구조 설계
 * 설정 변경 시 실시간 UI 반영
 * 서버 투표 API 연동 및 실시간 결과 갱신`,
              'content.ios.jump.description.detail.mypage4': ` * 댓글 인덱스 기반 페이지네이션 API 연동
 * 무한 스크롤 댓글 시스템 구현
 * 댓글 작성 및 실시간 갱신 처리`,
              'content.ios.jump.description.detail.disclaimer': '본 페이지의 코드는 실제 프로젝트 구조를 기반으로 역량 표현을 위해 재구성된 샘플입니다.\n\n',

              // Mini iOS Content
              'content.ios.mini.title': 'MiniRecord\n(iOS Platform Lead)',
              'content.ios.mini.author': '미니레코드 주식회사 (2023.02)',
              'content.ios.mini.role': 'Role: Lead Engineer & Engineering Manager',
              'content.ios.mini.description': '아티스트 IP 기반 디지털 앨범 플랫폼으로, AR·미디어·커스터마이징 기능을 통합한 대규모 iOS 서비스입니다.',
              'content.ios.mini.description.sub': 'iOS 네이티브 개발을 단독으로 총괄하는 동시에, 백엔드·Unity·네이티브 조직을 구축하여 기술 아키텍처와 개발 프로세스를 함께 설계했습니다.',
              'content.ios.mini.role.detail.title': 'Key Responsibilities',
              'content.ios.mini.role.detail': ` * iOS 네이티브 애플리케이션 아키텍처 설계 및 단독 개발 총괄
 * AR 기반 디지털 포토카드 시스템 설계 및 구현
    * ARKit · ARFoundation 기반 Unity 3D 오브젝트 실공간 배치 구조 설계
    * 아티스트 아바타·포토카드 커스터마이징 AR 인터랙션 시스템 구현
 * 대규모 미디어 컨텐츠 스트리밍·재생·편집 파이프라인 구축
 * 앱 성능 최적화 및 릴리즈 품질 관리 체계 수립`,
              'content.ios.mini.role.detail.subtitle': 'Leadership & Organization',
              'content.ios.mini.role.detail.sub': ` * 백엔드 · Unity · iOS 네이티브 조직 구성 및 개발 프로세스 수립
 * 멀티플랫폼 아키텍처 설계 및 기술 의사결정 총괄
 * Git 기반 협업 워크플로우 구축
 * QA 파이프라인 정립 및 릴리즈 안정화 관리
 * 개발팀 채용 프로세스 설계 및 기술 면접 주도`,
              'content.ios.mini.description.detail.title': 'Core Technology Stack',
              'content.ios.mini.description.detail': ` * Swift (Primary Application Layer)
 * Objective-C (Legacy & Native Bridge)
 * ARKit (iOS Native AR System)
 * Unity AR Foundation (Cross-Platform AR Runtime)
 * WKWebView (Hybrid Content Layer)
 * AVFoundation (Media Playback & Editing)
 * CoreML (Image & Media Processing)
 * CoreData (Local Persistence)`,
              'content.ios.mini.description.detail.subtitle.video': 'Product Demos',
              'content.ios.mini.description.detail.video1': '메인 화면 UI/UX 구조 시연',
              'content.ios.mini.description.detail.video2': '디지털 앨범 UI/UX 시연',
              'content.ios.mini.description.detail.video3': '포토카드 바인더 생성 워크플로우 시연',
              'content.ios.mini.description.detail.video4': '포토카드 바인더 편집 인터랙션 시연',
              'content.ios.mini.description.detail.disclaimer': '본 페이지의 코드는 실제 프로젝트 구조를 기반으로 역량 표현을 위해 재구성된 샘플입니다.\n\n',

              // Jump AR Content
              'content.ar.jump.title': 'SKT 점프 매시브 AR',
              'content.ar.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 1월)',
              'content.ar.jump.role': 'Role: Lead iOS Engineer',
              'content.ar.jump.description': '대규모 AR 콘텐츠를 안정적으로 운영하기 위한 iOS–Unity 통합 AR 플랫폼으로, 실시간 AR 세션 처리와 크로스 플랫폼 구조를 중심으로 설계된 프로젝트입니다.',
              'content.ar.jump.description.sub': '장기간 개발과 한 차례의 대규모 리디자인, 신규 AR SDK 도입을 거치며 아키텍처 재설계와 기술 스택 전환을 수행한 프로젝트입니다.',
              'content.ar.jump.role.detail.title': 'Key Responsibilities',
              'content.ar.jump.role.detail': ` * ARKit 및 Unity AR Foundation을 활용한 AR 기능 개발
 * ARCore SDK와 AR Foundation 통합 및 멀티플랫폼 AR 지원 구조 설계
 * iOS–Unity 간 네이티브 브리지 아키텍처 설계 및 구현
 * 3D 오브젝트의 AR 배치 및 상호작용 시스템 개발
 * 프로젝트 빌드 및 최적화 관리`,
              'content.ar.jump.role.detail.subtitle': 'Additional Contributions',
              'content.ar.jump.role.detail.sub': ` * 버전 관리 (Git)
 * QA 및 디버깅
 * 클라이언트 커뮤니케이션`,
              'content.ar.jump.description.detail.title': 'Core Technology Stack',
              'content.ar.jump.description.detail': ` * Unity 2019 LTS
 * C#
 * ARKit
 * Unity AR Foundation
 * Swift
 * Objective-C`,
              'content.ar.jump.description.detail.subtitle.immigration': 'AR Foundation 이미그레이션',
              'content.ar.jump.description.detail.immigration': '프로젝트 초기에는 ARKit 플러그인 기반 구조로 AR 기능을 구현하였으나, 이후 AR Foundation으로 마이그레이션하여 멀티플랫폼 확장성과 장기 유지보수성을 확보하였습니다.',
              'content.ar.jump.description.detail.subtitle.arrecording': 'AR 녹화 iOS 네이티브–Unity 플러그인 구현',
              'content.ar.jump.description.detail.arrecording': 'ARCore 환경에서 세션 녹화 기능이 부재한 문제를 해결하기 위해, iOS 네이티브에서 AR 프레임을 직접 수집·직렬화하고 Unity 재생 파이프라인과 연동하는 커스텀 AR 레코딩 시스템을 설계·구현하였습니다.',
              'content.ar.jump.description.detail.subtitle.sourcecode': '주요 소스코드 구조',
              'content.ar.jump.description.detail.arrecording.logic': `[Unity UI]
   ↓ startRecording()
[Native ARKit Plugin]
   ↓ Frame 단위 Anchor Transform 수집
   ↓ Unity 좌표계 변환
   ↓ JSON 직렬화
   ↓ Local File 저장
[Unity]
   ↓ JSON Load
   ↓ Frame 단위 재생`,
              'content.ar.jump.description.detail.arrecording.sourcecode1': 'Unity ↔ Objective-C 브리지 (extern 인터페이스)',
              'content.ar.jump.description.detail.arrecording.sourcecode2': 'ARKit 프레임 수집 (핵심 로직)',
              'content.ar.jump.description.detail.arrecording.sourcecode3': '좌표계 변환 (Unity ↔ ARKit)',
              'content.ar.jump.description.detail.arrecording.sourcecode4': 'JSON 직렬화 & 로컬 저장',
              'content.ar.jump.description.detail.arrecording.sourcecode5': 'Unity → Native 인터페이스 구현',
              'content.ar.jump.description.detail.arrecording.sourcecode6': 'Unity 재생 파이프라인 구조',
              'content.ar.jump.description.disclaimer': `위 소스코드는 실제 프로젝트 소스코드가 아니며, 개발역량의 표현을 위해 재구현되었음을 알립니다\n\n`,

              // Minirecord AR Content
              'content.ar.mini.title': '미니 레코드 AR 포토카드',
              'content.ar.mini.author': '미니레코드 주식회사 (2023년 2월)',
              'content.ar.mini.role': 'Role: Lead Engineer & Engineering Manager',
              'content.ar.mini.description': '미니 레코드 앱에 통합된 AR 기능으로, 사용자가 가상 포토카드와 상호작용할 수 있도록 구현한 증강 현실 모듈입니다.',
              'content.ar.mini.role.detail.title': 'Key Responsibilities',
              'content.ar.mini.role.detail': ` * iOS Native 어플리케이션 단독 개발
 * ARKit 및 Unity AR Foundation을 활용한 AR 기능 개발
 * Unity 3D 오브젝트의 AR 배치 및 상호작용 로직 개발
 * Unity AR 포토카드 커스터마이징 기능 개발
 * 프로젝트 빌드 및 최적화 관리`,
              'content.ar.mini.role.detail.subtitle': 'Additional Contributions',
              'content.ar.mini.role.detail.sub': ` * 백엔드, 유니티, 네이티브 팀 구축 및 개발 통합 관리
 * 버전 관리 (Git)
 * QA 및 디버깅
 * 개발팀 HR 관리 및 면접 진행`,
              'content.ar.mini.description.detail.title': 'Core Technology Stack',
              'content.ar.mini.description.detail': ` * Unity 2020 LTS
 * C#
 * ARKit
 * Unity AR Foundation
 * Swift
 * AVFoundation
 * Objective-C`,
              'content.ar.mini.description.detail.subtitle.image': 'AR 포토카드 샘플',

              // Jump Media Editor Content
              'content.media.jump.title': '점프 미디어 에디터',
              'content.media.jump.author': '모프 인터랙티브(주) SK텔레콤과 공동 개발 (2020년 3월)',
              'content.media.jump.role': 'Role: Lead iOS Engineer',
              'content.media.jump.description': '점프 앱에 통합된 미디어 편집 모듈로, iOS 네이티브 기반의 고성능 미디어 편집 파이프라인을 구축한 프로젝트입니다.',
              'content.media.jump.description.sub': '점프 iOS 네이티브 리뉴얼 프로젝트의 일환으로 개발된 미디어 에디터 기능은, 사용자 경험 향상과 앱 성능 최적화를 목표로 하였습니다.',
              'content.media.jump.description.detail.title': 'Core Technology Stack',
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
              'content.media.jump.description.detail.subtitle.video': '시연 영상',
              'content.media.jump.description.detail.sourcecode': ` * 필터 적용 기능 - 서버에서 내려받은 ACV 파일을 파싱, CIFilter를 생성해 적용
 * 스티커 적용 기능 (Still Image) - 이미지 데이터로 CIFilter를 생성해 적용
 * 스티커 적용 기능 (GIF Image) - Core Animation을 통해 Composition에 적용
 * 그 외 단순 자르기/음원 추가 기능 - AVAssetTrack을 조작해 Asset에 적용`,
              'content.media.jump.description.detail.disclaimer': `위 개발내용은 실제 프로젝트 개발내용이 아니며, 개발역량의 표현을 위해 리소스 및 소스코드가 재구현되었음을 알립니다\n\n`,

              // Minirecord Media Content
              'content.media.mini.title': '미니 레코드 앨범 플레이어',
              'content.media.mini.author': '미니레코드 주식회사 (2023년 2월)',
              'content.media.mini.role': 'Role: Lead Engineer & Engineering Manager',
              'content.media.mini.description': '미니 레코드 서비스의 핵심 소비 경험을 담당하는 iOS 네이티브 미디어 재생 시스템으로, 빠르게 성장하는 서비스 환경에서 안정적인 미디어 경험을 제공하기 위해 기술 구조와 개발 조직을 함께 설계한 앨범 플레이어입니다.',
              'content.media.mini.description.sub': '백엔드·유니티·네이티브 팀을 구성하고 개발 프로세스를 정립하여, iOS 미디어 시스템을 중심으로 멀티 플랫폼 협업 구조를 설계·운영하였습니다.',
              'content.media.mini.role.detail.title': 'Key Responsibilities',
              'content.media.mini.role.detail': ` * iOS 네이티브 미디어 재생 아키텍처 설계 및 기술 방향성 수립
 * AVFoundation 기반 커스텀 플레이어 파이프라인 구축 및 코드 품질 표준화
 * 대규모 앨범·플레이리스트 구조를 고려한 재생 상태 관리 시스템 설계
 * 멀티 플랫폼 연동을 위한 미디어 데이터 흐름 구조 정의
 * 개발 일정·기술 부채·성능 이슈를 조율하는 기술 책임자 역할 수행`,
              'content.media.mini.role.detail.subtitle': 'Additional Contributions',
              'content.media.mini.role.detail.sub': ` * 백엔드, 유니티, 네이티브 팀 구축 및 개발 통합 관리
 * 버전 관리 (Git)
 * QA 및 디버깅
 * 개발팀 HR 관리 및 면접 진행`,
              'content.media.mini.description.detail.title': 'Core Technology Stack',
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
              'content.graphics.metal.role': 'Role: Engine Architect & Sole Developer',
              'content.graphics.metal.description': 'Apple Metal 기반의 저수준 그래픽 API 위에서 게임 엔진 아키텍처를 직접 설계·구현한 개인 연구 프로젝트로, 렌더링 파이프라인과 런타임 구조를 엔진 관점에서 재구성하는 데 초점을 맞추었습니다.',
              'content.graphics.metal.description.sub1': '상용 엔진을 사용하는 대신, 그래픽 파이프라인과 실행 구조를 근본부터 이해하기 위해 엔진의 핵심 계층을 직접 설계·구현한 개인 엔진 프로젝트입니다.',
              'content.graphics.metal.description.sub2': '본 프로젝트에서 엔진은 단순한 렌더러가 아닌, 리소스 관리·렌더링 흐름·업데이트 루프·플랫폼 추상화를 포함하는 하나의 런타임 시스템으로 정의되었습니다.',
              'content.graphics.metal.description.sub3': 'Metal 기반 저수준 그래픽 API를 활용해 GPU 리소스 생명주기, 커맨드 버퍼 구성, 렌더 패스 분리 등 렌더링 파이프라인 전반을 직접 제어하고, 이를 상위 계층에서 안정적으로 운용할 수 있는 엔진 구조를 설계하였습니다.',
              'content.graphics.metal.description.sub4': '또한 씬 관리, 엔티티 업데이트 흐름, 타이밍 시스템 등 게임 실행에 필요한 런타임 구조를 포함하여, “무엇이 그려지는가”뿐 아니라 “엔진이 어떤 책임과 순서로 동작하는가”를 명확히 정의하는 데 초점을 맞췄습니다.',
              'content.graphics.metal.description.sub5': '본 데모는 상용 엔진 완성을 목표로 하기보다, 그래픽스 및 엔진 구조에 대한 이해를 실제 코드와 실행 결과로 검증하기 위한 연구 성격의 구현입니다.',
              'content.graphics.metal.description.detail.title': 'Core Technology Stack',
              'content.graphics.metal.description.detail': ` * Swift
 * Metal
 * MetalKit
 * simd`,
              'content.graphics.metal.description.detail.subtitle.renderer': '렌더러 아키텍처',
              'content.graphics.metal.description.detail.renderer': ` * 리소스 관리: 텍스처·버퍼·셰이더 등 GPU 리소스의 생성·캐싱·해제를 담당하는 리소스 매니저 설계
 * 커맨드 버퍼 구성: 프레임 단위 렌더링 명령 기록 및 제출 파이프라인 구현
 * 렌더 패스 분리: 지오메트리, 포스트 프로세싱 등 렌더링 단계를 독립적인 렌더 패스로 분리
 * 셰이더 관리: 셰이더 함수 로드 및 파이프라인 상태 객체 생성·관리 구조 설계`,
              'content.graphics.metal.description.detail.subtitle.scene': '씬 및 엔티티 관리',
              'content.graphics.metal.description.detail.scene': ` * 씬 그래프: 계층적 구조 기반 오브젝트 관리 및 변환 행렬 전파 시스템 구현
 * 엔티티 컴포넌트 시스템: 엔티티에 컴포넌트를 부착해 렌더링·트랜스폼·로직 속성을 분리 관리
 * 업데이트 루프: 프레임 단위 엔티티 업데이트와 렌더 호출 흐름 제어`,
              'content.graphics.metal.description.detail.subtitle.timing': '타이밍 시스템',
              'content.graphics.metal.description.detail.timing': ` * 프레임 타이밍: 델타 타임 기반 시간 동기화 시스템 구현
 * 고정 업데이트 루프: 물리 및 시뮬레이션 계층을 위한 고정 타임스텝 처리 구조 설계`,
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