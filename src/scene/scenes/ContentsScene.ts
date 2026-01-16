import * as THREE from 'three'
import type { Scene } from './Scene'
import { UIOpaqueBlurButton } from '@ui/base/UIButton'
import { Camera } from '../Camera'
import { ContentStar, type starInfo } from '@objects/contents/ContentStar'
import { EventManager } from '../../event/EventManager'
import { Helper } from '../../core/Helper'
import { SceneObject } from '@objects/SceneObject'
import { BackgroundField } from '@ui/contents/BackgroundField'
import { Language } from '@data/Language'
import type { contentsInfo } from './contents/ContentScene'
import { defaultBaselineStyle, defaultDescriptionStyle, defaultSourceCodeStyle, type TextStyle } from '@ui/styles/TextStyle'

export class ContentsScene implements Scene {

    mother: THREE.Scene
    self: THREE.Object3D = new THREE.Object3D()
    onFinished?: (() => void) | undefined
    onReturned?: (() => void) | undefined
    onProceeded?: ((info?: contentsInfo) => void) | undefined

    private _enabled: boolean = false;
    get enabled(): boolean { return this._enabled; }
    set enabled(value: boolean) {
        this.self.visible = value;
        this._enabled = value;
    }

    private returnButton: UIOpaqueBlurButton
    private finishButton: UIOpaqueBlurButton
    private sun: ContentStar
    private currentStar: ContentStar
    private currentDepth: number = 0
    private backgroundField: BackgroundField

    constructor(scene: THREE.Scene, onReturned: () => void = () => { }, onProceeded: (infos?: contentsInfo) => void = () => { }, onFinished: () => void = () => { }) {

        this.mother = scene;
        this.mother.add(this.self);
        this.onFinished = onFinished;
        this.onReturned = onReturned;
        this.onProceeded = onProceeded;
        this.enabled = false;

        this.backgroundField = new BackgroundField(Camera.size, 37)
        this.backgroundField.position.set(-12, 24, -250)
        this.self.add(this.backgroundField)

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
                    videoUrl: 'resources/video_sh_animation.mov',
                    height: 230,
                },
                {
                    videoUrl: 'resources/video_sh_particle.mov',
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
                    videoUrl: 'resources/video_sh_puzzle.mov',
                    height: 230,
                },
                {
                    videoUrl: 'resources/video_sh_cards.mov',
                    height: 230,
                },
                {
                    videoUrl: 'resources/video_sh_all.mov',
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
                    videoUrl: 'resources/video_cj_prototype.mov',
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
                    videoUrl: 'resources/video_cj_addressable.mov',
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
                    videoUrl: 'resources/video_cj_content.mov',
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
                        text:  'content.unity.soomgo.description.detail.title',
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
                    videoUrl: 'resources/video_sg_all.mov',
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
                    videoUrl: 'resources/video_mn_sample_main.mov',
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
                    videoUrl: 'resources/video_mn_sample_album.mov',
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
                    videoUrl: 'resources/video_mn_sample_binder1.mov',
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
                    videoUrl: 'resources/video_mn_sample_binder2.mov',
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
                    videoUrl: 'resources/video_jp_media.mov',
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
                    height: 500,
                },
                {
                    imageUrl: 'resources/image_jp_media_code2.png',
                    height: 500,
                },
                {
                    imageUrl: 'resources/image_jp_media_code3.png',
                    height: 500,
                },
                {
                    imageUrl: 'resources/image_jp_media_code4.png',
                    height: 500,
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
                    videoUrl: 'resources/video_mn_media_mvplayer.mov',
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
                index: 0,
                depth: 2,
                contents: miniarContents,
            },
        ]

        const graphicsContents: contentsInfo = {
            title: 'content.graphics.metal.title',
            contents: [
                {
                    application: {
                        appIconUrl: 'resources/appIcon_engine.png',
                        appRole: 'content.graphics.metal.role',
                        appAuthor: 'content.graphics.metal.author',
                        gitHubUrl: 'https://github.com/kwanhongpark/Game-Engine',
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
                    height: 500,
                },
                {
                    imageUrl: 'resources/image_code_ge_renderer2.png',
                    height: 500,
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
                    height: 500,
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
                    height: 500,
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
                    videoUrl: 'resources/video_ge_demo.mov',
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

        for (let substar of substars) {
            substar.onClick = () => {
                this.setDepth(1, this.sun.substars[substar.index!])
            }
            for (let subsubstar of substar.substars!) {
                subsubstar.onClick = () => {
                    this.proceed(subsubstar)
                }
            }
        }

        const sun = new ContentStar(info)
        const solarSystem = new SceneObject
        solarSystem.position.set(0, 20, 0)
        this.self.add(solarSystem)
        solarSystem.add(sun)
        this.sun = sun
        this.currentStar = sun

        const returnButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: Language.helper.get('contents.button.back'),
            onClick: () => {
                if (this.currentDepth > 0) {
                    this.setDepth(this.currentDepth - 1, this.currentStar.superstar!)
                } else {
                    this.return()
                }
            }
        })

        this.self.add(returnButton)

        const finishButton = new UIOpaqueBlurButton({
            width: 100,
            height: 40,
            text: Language.helper.get('contents.button.finish'),
            onClick: () => {
                this.finish()
            }
        })

        this.self.add(finishButton)

        this.returnButton = returnButton
        this.finishButton = finishButton

        EventManager.self.addPointerDownListener((event) => {
            this.lastPressedPointer.x = event.clientX
        });

        EventManager.self.addPointerMoveListener((event) => {
            if (!this.enabled) return;
            if (!EventManager.self.pointerPressed) return;
            let star = this.currentStar
            let deltaX = this.lastPressedPointer.x - event.clientX
            let deltaY = event.clientY - this.lastPressedPointer.y

            if (event.clientY < Camera.size.height / 2) {
                deltaX *= -1
            }
            if (event.clientX < Camera.size.width / 2) {
                deltaY *= -1
            }
            const forceX = deltaX + deltaY
            this.lastPressedPointer.x = event.clientX
            this.lastPressedPointer.y = event.clientY
            const depthFactor = (star.info.depth * 0.7 + 1)
            let force = forceX * depthFactor * 0.25
            force = Math.min(Math.max(force, -10), 10);
            star.applyForce(force);
        });

        EventManager.self.addPointerUpListener((event) => {
            if (!this.enabled) return;

        });
    }

    setDepth(depth: number, star: ContentStar) {
        this.currentStar.radius = this.currentStar.info.radius ?? 100
        if (depth > this.currentDepth) {
            star.button.eventEnabled = false
            star.substars.forEach(s => s.button.eventEnabled = true)
            const superstarScaleFactor = 3
            const width = Camera.size.width / 2 + star.info.size * superstarScaleFactor
            const height = Camera.size.height / 2 + star.info.size * superstarScaleFactor
            star.baseAnchor = new THREE.Vector3(width, height)
        } else {
            this.currentStar.substars.forEach(s => s.button.eventEnabled = false)
            this.currentStar.button.eventEnabled = true
        }
        this.currentDepth = depth
        this.currentStar = star

        this.currentStar.applyForce(50);
        this.backgroundField.setDepth(depth);
    }

    private lastPressedPointer = new THREE.Vector3(0, 0, 0)

    run() {
        this.enabled = true
        this.resize()
        if (this.currentDepth === 0) {
            this.backgroundField.run();
        }
        this.sun.applyForce(100);
    }

    refresh(): void {
        // Code to refresh or update the scene
    }

    update(dt: number): void {

        this.backgroundField.update(dt);

        if (!this.enabled) return
        let star = this.currentStar

        let radius = 10
        let pointer = new THREE.Vector3(
            this.lastPressedPointer.x - Camera.size.width / 2,
            -(this.lastPressedPointer.y - Camera.size.height / 2), 0
        )

        let starPos = pointer.clone().normalize().multiplyScalar(radius).add(star.baseAnchor)
        star.position.lerp(starPos, 0.1)

        const superstarScaleFactor = 3
        star.superstar?.position.lerp(star.baseAnchor.clone().multiplyScalar(-1), 0.1)
        star.superstar?.button.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(superstarScaleFactor), 0.2)
        star.button.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2)

        let subsubstars: ContentStar[] = []
        star.substars.forEach(s => {
            s.substars.forEach(ss => {
                subsubstars.push(ss)
            })
        })

        star.substars.forEach(s => {
            s.button.text.scale.lerp(new THREE.Vector3(1, 1, 1), 0.2)
        })
        subsubstars.forEach(ss => {
            ss.button.text.scale.lerp(new THREE.Vector3(0, 0, 0), 0.2)
        })

        let selectedNone = true
        star.substars.forEach((s) => {
            if (s.button.status != 'blur') {
                selectedNone = false
                return
            }
        })
        if (EventManager.self.pointerPressed && selectedNone) {
            let radius = (star.info.radius ?? 100) * 0.75
            if (this.currentDepth === 1) {
                radius = (star.info.radius ?? 100) * 2.2
            }
            star.radius = Helper.lerp(star.radius, radius, 0.2)
            star.scale.lerp(new THREE.Vector3(0.9, 0.9, 0.9).multiplyScalar(star.info.depth * 0.7 + 1), 0.2)
            star.pole = Helper.lerp(star.pole, 90, 0.2)
            for (let substar of star.substars) {
                // substar.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(substar.info.depth * 0.7 + 1), 0.2)
                substar.pole = Helper.lerp(substar.pole, 90, 0.2)
            }
        } else {
            let radius = star.info.radius ?? 100
            if (this.currentDepth === 1) {
                radius = (star.info.radius ?? 100) * 2.5
            }
            star.radius = Helper.lerp(star.radius, radius, 0.2)
            star.pole = Helper.lerp(star.pole, 45, 0.2)
            star.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(star.info.depth * 0.7 + 1), 0.2)
            for (let substar of star.substars) {
                // substar.scale.lerp(new THREE.Vector3(1, 1, 1).multiplyScalar(substar.info.depth * 0.7 + 1), 0.2)    
                substar.pole = Helper.lerp(substar.pole, 45, 0.2)
            }
        }

        star.update(dt)
    }

    resize(): void {
        const margin = 10;
        this.finishButton.position.set(
            Camera.size.width / 2 - this.finishButton.size.width / 2 - margin,
            -Camera.size.height / 2 + this.finishButton.size.height / 2 + margin,
            0
        );
        this.returnButton.position.set(
            -Camera.size.width / 2 + this.returnButton.size.width / 2 + margin,
            -Camera.size.height / 2 + this.returnButton.size.height / 2 + margin,
            0
        );
    }

    return(): void {
        this.enabled = false
        this.onReturned?.()
    }

    proceed(info: starInfo): void {
        this.enabled = false
        this.onProceeded?.(info.contents)
    }

    finish(): void {
        this.enabled = false
        this.onFinished?.()
    }
}