import { defaultBaselineStyle, defaultDescriptionStyle, defaultSourceCodeStyle, type TextStyle } from "@styles/TextStyle";
import type { UIScrollView } from "@ui/components/UIScrollView";
import type { UIObject } from "@ui/base/UIObject";

export type overlayPageInfo = {
    title: string;
    message: string;
    imageUrl?: string;
    videoUrl?: string;
}

export type overlayInfo = {
    title: string;
    message: string;
    index: number;
    pages: overlayPageInfo[];
}

export type starInfo = {
    title: string,
    fontSize?: number,
    size: number,
    depth: number
    index?: number,
    radius?: number,
    buttonImageUrl?: string,
    backgroundImageUrl?: string,
    urlUuid?: string,
    contents?: contentsInfo,
    substars?: starInfo[]
    onClick?: () => void
}

///TODO: Move to data folder
export type textInfo = {
    text: string,
    textStyle?: TextStyle
}

export type buttonInfo = {
    title: string,
    textStyle?: TextStyle,
    onClick: () => void,
}

export type applicationInfo = {
    appIconUrl: string,
    appRole?: string,
    appAuthor?: string,
    appStoreUrl?: string,
    gitHubUrl?: string,
}

export type contentInfo = {
    text?: textInfo,
    button?: buttonInfo,
    imageUrl?: string,
    videoUrl?: string,
    height: number,
    application?: applicationInfo,
    customView?: (scrollView: UIScrollView) => UIObject,
}

export type contentsInfo = {
    title: string,
    contents: contentInfo[],
}

export class Data {

    static getOverlayInfo(sceneIndex: number): overlayInfo {

        const mainOverlayInfo: overlayInfo = {
            title: 'overlay.main.title',
            message: 'overlay.main.message',
            index: 0,
            pages: [
                {
                    title: 'overlay.main.page1.title',
                    message: 'overlay.main.page1.message',
                    videoUrl: 'resources/help_scene1_1.mp4',
                },
                {
                    title: 'overlay.main.page2.title',
                    message: 'overlay.main.page2.message',
                    videoUrl: 'resources/help_scene1_2.mp4',
                },
                {
                    title: 'overlay.main.page3.title',
                    message: 'overlay.main.page3.message',
                    imageUrl: 'resources/help_scene1_3.png',
                }
            ],
        }

        const contentsOverlayInfo: overlayInfo = {
            title: 'overlay.contents.title',
            message: 'overlay.contents.message',
            index: 1,
            pages: [
                {
                    title: 'overlay.contents.page1.title',
                    message: 'overlay.contents.page1.message',
                    videoUrl: 'resources/help_scene2_1.mp4',
                },
                {
                    title: 'overlay.contents.page2.title',
                    message: 'overlay.contents.page2.message',
                    videoUrl: 'resources/help_scene2_2.mp4',
                },
            ],
        }

        const contentOverlayInfo: overlayInfo = {
            title: 'overlay.content.title',
            message: 'overlay.content.message',
            index: 2,
            pages: [
                {
                    title: 'overlay.content.page1.title',
                    message: 'overlay.content.page1.message',
                    videoUrl: 'resources/help_scene3_1.mp4',
                },
                {
                    title: 'overlay.content.page2.title',   
                    message: 'overlay.content.page2.message',
                    videoUrl: 'resources/help_scene3_2.mp4',
                },
                {
                    title: 'overlay.content.page3.title',
                    message: 'overlay.content.page3.message',
                    videoUrl: 'resources/help_scene3_3.mp4',
                },
                {
                    title: 'overlay.content.page4.title',
                    message: 'overlay.content.page4.message',
                    imageUrl: 'resources/help_scene3_4.png',
                }
            ],
        }

        const overlayInfos: overlayInfo[] = [
            mainOverlayInfo,
            contentsOverlayInfo,
            contentOverlayInfo,
        ]

        return overlayInfos[sceneIndex];
    }

    static get starInfo(): starInfo {

        // Unity Stars
        const hangulContents: contentsInfo = {
            title: 'content.unity.smarthangul.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_smart.png',
                        appRole: 'content.unity.smarthangul.role',
                        appAuthor: 'content.unity.smarthangul.author',
                        appStoreUrl: 'https://apps.apple.com/kr/app/%EC%8A%A4%EB%A7%88%ED%8A%B8-%ED%95%9C%EA%B8%80%EC%9D%B4-%ED%81%AC%EB%8A%94-%EB%82%98%EB%AC%B4/id1478712894',
                        gitHubUrl: 'https://github.com/Kwanhong',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 190,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail.subtitle.animation',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_sh_animation.mp4',
                    height: 230,
                },
                {
                    videoUrl: 'resources/video_sh_particle.mp4',
                    height: 180,
                },
                {
                    text: {
                        text: 'content.unity.smarthangul.description.detail.subtitle.video',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_sh_puzzle.mp4',
                    height: 230,
                },
                {
                    videoUrl: 'resources/video_sh_cards.mp4',
                    height: 230,
                },
                {
                    videoUrl: 'resources/video_sh_all.mp4',
                    height: 230,
                },
            ]
        }
        const cjeduContents: contentsInfo = {
            title: 'content.unity.cjedu.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_none.png',
                        appRole: 'content.unity.cjedu.role',
                        appAuthor: 'content.unity.cjedu.author',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.subtitle.prototype',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_cj_prototype.png',
                    height: 150,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.prototype1',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    videoUrl: 'resources/video_cj_prototype.mp4',
                    height: 260,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.prototype2',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.subtitle.addressable',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    videoUrl: 'resources/video_cj_addressable.mp4',
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.addressable',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.subtitle.sqlite',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.sqlite1',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_cj_sqlite.png',
                    height: 283,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.sqlite2',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.subtitle.contents',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    videoUrl: 'resources/video_cj_content.mp4',
                    height: 130,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.contents',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.cjedu.description.detail.disclaimer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
            ]
        }
        const soomgoContents: contentsInfo = {
            title: 'content.unity.soomgo.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_soomgo.png',
                        appRole: 'content.unity.soomgo.role',
                        appAuthor: 'content.unity.soomgo.author',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.subtitle.animation',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    videoUrl: 'resources/video_sg_all.mp4',
                    height: 270,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.subtitle.navmesh',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    imageUrl: 'resources/image_sg_navmesh1.png',
                    height: 170,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.navmesh',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_sg_navmesh2.png',
                    height: 203,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.subtitle.act',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    imageUrl: 'resources/image_sg_code_act.png',
                    height: 344,
                },
                {
                    imageUrl: 'resources/image_sg_code_act2.png',
                    height: 266,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.act',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.subtitle.resources',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    imageUrl: 'resources/image_sg_room.png',
                    height: 285,
                },
                {
                    imageUrl: 'resources/image_sg_gate.png',
                    height: 324,
                },
                {
                    imageUrl: 'resources/image_sg_subway.png',
                    height: 315,
                },
                {
                    imageUrl: 'resources/image_sg_gallery.png',
                    height: 277,
                },
                {
                    imageUrl: 'resources/image_sg_bar.png',
                    height: 281,
                },
                {
                    text: {
                        text: 'content.unity.soomgo.description.detail.resources',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
            ]
        }
        const unitySubstars: starInfo[] = [
            {
                title: 'contents.unity.substar.smarthangul',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
                contents: hangulContents,
            },
            {
                title: 'contents.unity.substar.cheonjaeedu',
                fontSize: 5,
                size: 25,
                index: 1,
                depth: 2,
                contents: cjeduContents,
            },
            {
                title: 'contents.unity.substar.soomgo',
                fontSize: 5,
                size: 25,
                index: 2,
                depth: 2,
                contents: soomgoContents,
            },
        ]

        // iOS Stars
        const jumpiosContents: contentsInfo = {
            title: 'content.ios.jump.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_jump.png',
                        appRole: 'content.ios.jump.role',
                        appAuthor: 'content.ios.jump.author',
                        appStoreUrl: 'https://apps.apple.com/kr/app/jump-ar/id1459279731',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ios.jump.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.jump.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ios.jump.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.jump.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.jump.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.subtitle.prototype',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.prototype',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.subtitle.nativeplugin',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.nativeplugin1',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.nativeplugin2',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_code_ios_plugin1.png',
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.nativeplugin3',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_code_ios_plugin2.png',
                    height: 340,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.subtitle.main',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.main',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_code_ios_main.png',
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.subtitle.mypage',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.mypage1',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_ios_mypage1.png',
                    height: 182,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.mypage2',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_ios_mypage2.png',
                    height: 170,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.mypage3',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_ios_mypage3.png',
                    height: 235,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.mypage4',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_ios_mypage4.png',
                    height: 225,
                },
                {
                    text: {
                        text: 'content.ios.jump.description.detail.disclaimer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 180,
                }
            ]
        }
        const miniiosContents: contentsInfo = {
            title: 'content.ios.mini.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_mini.png',
                        appRole: 'content.ios.mini.role',
                        appAuthor: 'content.ios.mini.author',
                        appStoreUrl: 'https://apps.apple.com/kr/app/minirecord-ar-%ED%95%9C%EA%B8%80-%EB%AA%A8%EB%93%9C-%EC%97%90%EB%9F%AC/id1531355015',
                        gitHubUrl: 'https://github.com/Kwanhong',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ios.mini.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.mini.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ios.mini.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.mini.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.mini.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.subtitle.video',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.video1',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_mn_sample_main.mp4',
                    height: 360,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.video2',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_mn_sample_album.mp4',
                    height: 360,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.video3',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_mn_sample_binder1.mp4',
                    height: 360,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.video4',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_mn_sample_binder2.mp4',
                    height: 360,
                },
                {
                    text: {
                        text: 'content.ios.mini.description.detail.disclaimer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
            ]
        }
        const iosSubstars: starInfo[] = [
            {
                title: 'contents.ios.substar.minirecord',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
                contents: miniiosContents,
            },
            {
                title: 'contents.ios.substar.jump',
                fontSize: 5,
                size: 25,
                index: 1,
                depth: 2,
                contents: jumpiosContents,
            },
        ]

        // Media Stars
        const jumpmediaContents: contentsInfo = {
            title: 'content.media.jump.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_jump.png',
                        appRole: 'content.media.jump.role',
                        appAuthor: 'content.media.jump.author',
                        appStoreUrl: 'https://apps.apple.com/kr/app/jump-ar/id1459279731',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.media.jump.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.media.jump.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.subtitle.feature',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.feature',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.subtitle.workflow',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.workflow',
                        textStyle: { ...defaultSourceCodeStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.subtitle.video',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_jp_media.mp4',
                    height: 260,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.sourcecode',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_media_code1.png',
                    height: 389,
                },
                {
                    imageUrl: 'resources/image_jp_media_code2.png',
                    height: 310,
                },
                {
                    imageUrl: 'resources/image_jp_media_code3.png',
                    height: 360,
                },
                {
                    imageUrl: 'resources/image_jp_media_code4.png',
                    height: 310,
                },
                {
                    text: {
                        text: 'content.media.jump.description.detail.disclaimer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                }
            ]
        }
        const minimediaContents: contentsInfo = {
            title: 'content.media.mini.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_mini.png',
                        appRole: 'content.media.mini.role',
                        appAuthor: 'content.media.mini.author',
                        appStoreUrl: 'https://apps.apple.com/kr/app/minirecord-ar-%ED%95%9C%EA%B8%80-%EB%AA%A8%EB%93%9C-%EC%97%90%EB%9F%AC/id1531355015',
                        gitHubUrl: 'https:github.com/Kwanhong',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.media.mini.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.media.mini.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.mini.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.media.mini.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.mini.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.media.mini.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.mini.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.media.mini.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.mini.description.detail.subtitle.video',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    videoUrl: 'resources/video_mn_media_mvplayer.mp4',
                    height: 360,
                },
                {
                    text: {
                        text: 'content.media.mini.description.detail.video',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.media.mini.description.detail.disclaimer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
            ]
        }
        const mediaSubstars: starInfo[] = [
            {
                title: 'contents.media.substar.minirecord',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
                contents: minimediaContents,
            }, {
                title: 'contents.media.substar.jump',
                fontSize: 5,
                size: 25,
                index: 1,
                depth: 2,
                contents: jumpmediaContents,
            },
        ]

        // Media Stars
        const jumparContents: contentsInfo = {
            title: 'content.ar.jump.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_jump.png',
                        appRole: 'content.ar.jump.role',
                        appAuthor: 'content.ar.jump.author',
                        appStoreUrl: 'https://apps.apple.com/kr/app/jump-ar/id1459279731',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ar.jump.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ar.jump.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ar.jump.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.subtitle.immigration',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.immigration',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.subtitle.arrecording',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.subtitle.sourcecode',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.logic',
                        textStyle: { ...defaultSourceCodeStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.sourcecode1',
                    },
                    height: 300,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_objc1.png',
                    height: 200,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_objc2.png',
                    height: 280,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.sourcecode2',
                    },
                    height: 300,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_objc3.png',
                    height: 380,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.sourcecode3',
                    },
                    height: 300,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_objc4.png',
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.sourcecode4',
                    },
                    height: 300,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_objc5.png',
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.sourcecode5',
                    },
                    height: 300,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_unity1.png',
                    height: 280,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.detail.arrecording.sourcecode6',
                    },
                    height: 300,
                },
                {
                    imageUrl: 'resources/image_jp_code_arr_unity2.png',
                    height: 117,
                },
                {
                    text: {
                        text: 'content.ar.jump.description.disclaimer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                }
            ]
        }
        const miniarContents: contentsInfo = {
            title: 'content.ar.mini.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_mini.png',
                        appRole: 'content.ar.mini.role',
                        appAuthor: 'content.ar.mini.author',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ar.mini.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.ar.mini.description.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.mini.role.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ar.mini.role.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.mini.role.detail.subtitle',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    text: {
                        text: 'content.ar.mini.role.detail.sub',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.mini.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.ar.mini.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.ar.mini.description.detail.subtitle.image',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    imageUrl: 'resources/image_mn_ar.jpeg',
                    height: 300,
                },
            ]
        }
        const arSubstars: starInfo[] = [
            {
                title: 'contents.ar.substar.jump',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
                contents: jumparContents,
            },
            {
                title: 'contents.ar.substar.minirecord',
                fontSize: 5,
                size: 25,
                index: 1,
                depth: 2,
                contents: miniarContents,
            },
        ]

        // Graphics Stars
        const graphicsContents: contentsInfo = {
            title: 'content.graphics.metal.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_engine.png',
                        appRole: 'content.graphics.metal.role',
                        appAuthor: 'content.graphics.metal.author',
                        gitHubUrl: 'https://github.com/kwanhong/Game-Engine',
                    },
                    height: 50,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.sub1',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.sub2',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.sub3',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.sub4',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.sub5',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.title',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 300,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.subtitle.renderer',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    imageUrl: 'resources/image_code_ge_renderer1.png',
                    height: 437,
                },
                {
                    imageUrl: 'resources/image_code_ge_renderer2.png',
                    height: 328,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.renderer',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.subtitle.scene',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    imageUrl: 'resources/image_code_ge_scene.png',
                    height: 347,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.scene',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.subtitle.timing',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 40,
                },
                {
                    imageUrl: 'resources/image_code_ge_timing.png',
                    height: 315,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.timing',
                        textStyle: { ...defaultDescriptionStyle, fontSize: 10 },
                    },
                    height: 200,
                },
                {
                    text: {
                        text: 'content.graphics.metal.description.detail.subtitle.demo',
                        textStyle: { ...defaultBaselineStyle, fontSize: 14 },
                    },
                    height: 200,
                },
                {
                    videoUrl: 'resources/video_ge_demo.mp4',
                    height: 450,
                },
            ]
        }
        const graphicsSubstars: starInfo[] = [
            {
                title: 'contents.graphics.substar.metal',
                fontSize: 5,
                size: 25,
                index: 0,
                depth: 2,
                contents: graphicsContents,
            },
        ]

        // Stars
        const substars: starInfo[] = [
            {
                title: 'contents.substar.unity',
                fontSize: 10,
                size: 70,
                index: 0,
                radius: 38,
                depth: 1,
                substars: unitySubstars
            },
            {
                title: 'contents.substar.ios',
                fontSize: 10,
                size: 70,
                index: 1,
                radius: 38,
                depth: 1,
                substars: iosSubstars
            },
            {
                title: 'contents.substar.media',
                fontSize: 10,
                size: 70,
                index: 2,
                depth: 1,
                radius: 38,
                substars: mediaSubstars
            },
            {
                title: 'contents.substar.ar',
                fontSize: 10,
                size: 70,
                index: 3,
                depth: 1,
                radius: 38,
                substars: arSubstars
            },
            {
                title: 'contents.substar.graphics',
                fontSize: 10,
                size: 70,
                index: 4,
                depth: 1,
                radius: 38,
                substars: graphicsSubstars
            }
        ]
        const info = {
            title: 'contents.title',
            fontSize: 14,
            size: 100,
            radius: 150,
            depth: 0,
            substars: substars
        }

        return info
    }
}