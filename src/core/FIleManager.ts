import { FBXLoader, GLTFLoader, type GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from 'three';

export class FileManager {
    static fbxLoader = new FBXLoader();
    static glbLoader = new GLTFLoader();
    static textureLoader = new THREE.TextureLoader();

    static loadTexture(path: string, progress?: (event: ProgressEvent<EventTarget>) => void): Promise<THREE.Texture<HTMLImageElement>> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(path, (texture)=>{
                resolve(texture)
            }, progress, (error)=>{
                reject(error)
            })
        })
    }

    static loadFBX(path: string): Promise<THREE.Group> {
        return new Promise((resolve, reject) => {
            this.fbxLoader.load(path,
                (object) => {
                    resolve(object);
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    }

    static loadGLB(path: string): Promise<GLTF> {
                return new Promise((resolve, reject) => {
            this.glbLoader.load(path,
                (data) => {
                    resolve(data);
                },
                undefined,
                (error) => {
                    reject(error);
                }
            );
        });
    }
}   