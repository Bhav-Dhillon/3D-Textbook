import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three'
import TranslateRotate from './animations/TranslateRotate';
import { AppData, LoadedPage, Page } from '../types/types';


export async function Init( data: AppData ) {
    const allMeshesOfApp: any = await ExtractAllMeshesOfApp();
    const allVoicesOfApp: any = await LoadAllVoicesOfApp(); 

    const loadedPages = data.pages.map( ( oldPage: any, i: number ): LoadedPage[] => {
        const cameraAnimationData = oldPage.camera.CreateAnimationDataFromPositionsRotations();
        return {
            ...oldPage, 
            camera: {
                ...oldPage.camera, 
                _animation_data: cameraAnimationData, // needed for initial position assignment
                _animation_clips: cameraAnimationData.map( ( AnimationData:[][], i: number ) => {
                    return [ TranslateRotate( { duration: 3, initial_position: AnimationData[ 0 ], final_position: AnimationData[ 1 ], initial_angle: AnimationData[ 2 ], final_angle: AnimationData[ 3 ],axis: 'x', }) ];
                }),
            },

            // add meshes and positions to each model
            models: oldPage.models.map( ( model: any, j: number ) => {
                return {
                    ...model, 
                    loadedMeshes: allMeshesOfApp[ i ][ j ],
                    _positions: CameraPositionToModelPosition( oldPage.camera.positions[ j+1 ], oldPage.camera.rotations[ j+1 ], 'x' )

                };
            }),

            _loaded_voices: allVoicesOfApp[ i ]
        };
    });

    return loadedPages;

    // Re-factor / move all of these functions to keep in line with SRP ?
    function CameraPositionToModelPosition( cameraPosition: number[], cameraRotation: number[], rotationAxis: string ) {

        let rotationAngle = cameraRotation[ 0 ];

        // If you rotate the camera on X axis you need to position the model on the Y axis.
        if( rotationAxis === 'x' ) {
            const x = cameraPosition[ 0 ];
            const y = ( cameraPosition[ 1 ] + rotationAngle );
            const z = cameraPosition[ 2 ] - 1;
            return [ x, y, z ];
        }

        // If you rotate the camera on Y axis you need to position the model on the X axis.
        if( rotationAxis === 'y' ) {
            const x = ( cameraPosition[ 0 ] + rotationAngle );
            const y = cameraPosition[ 1 ];
            const z = cameraPosition[ 2 ];
            return [ x, y, z ];
        }

        // If you rotate the camera on Z axis you don't need to do anything to the model.
        if( rotationAxis === 'z' ) {
            const x = cameraPosition[ 0 ];
            const y = cameraPosition[ 1 ];
            const z = ( cameraPosition[ 2 ] - 1 );
            return [ x, y, z ];
        } 
        
        else {
            const x = cameraPosition[ 0 ];
            const y = cameraPosition[ 1 ];
            const z = ( cameraPosition[ 2 ] - 1 );
            return [ x, y, z ];
        }
    };

    function LoadVoice( path: string ) {            
        return new Promise( ( resolve, reject ) => {
            const listener = new THREE.AudioListener();
            const AudioObject = new THREE.Audio( listener );
            const loader = new THREE.AudioLoader();
            loader.load( 
                path,

                // onLoad
                ( buffer: AudioBuffer ) => {
                    // Set the audio object's buffer to the loaded object
                    AudioObject.setBuffer( buffer );
                    AudioObject.setLoop( false );
                    AudioObject.setVolume( 0.5 );
                    AudioObject.play();
                    resolve( AudioObject )
                },
        
                // onProgress 
                ( xhr ) => {
                    // console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
        
                // onError
                ( err ) => {
                    console.log( 'An error happened', err );
                }
            );
        })
    };
    
    function LoadModel( path: any ) {
        return new Promise( (resolve, reject) => {
            const loader = new GLTFLoader();
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath( 'https://www.gstatic.com/draco/v1/decoders/' );
            loader.setDRACOLoader( dracoLoader );
            loader.load(
                path,
                (gltf: any) => {
                    resolve( gltf );
                    console.log('glTF loaded');
                },
                (xhr: any) => {
                    // console.log((xhr.loaded / xhr.total) + 'loaded');
                },
                (error: any) => {
                    console.error(error);
                    reject(error);
                }
            );
        });
    };

    async function LoadAllVoicesOfApp() {
        /* const allVoicesOfApp: any = [][] // [ [ voice0, voice1, voice2 ], [ voice0, voice1, voice2 ], etc... ]
                                                            ^ voices[] of page0          ^ voices[] of page1      */
        const allVoicesOfApp = data.pages.map( async ( page: any ) => {

            let pageVoices = []; // [ voice0, voice1, voice2 ]

            for ( let i = 0; i < page.voices.length; i++ ) {
                pageVoices[ i ] = LoadVoice( page.voices[ i ] );
                // console.log(`LoadAllVoicesOfApp() voice${i} loaded`);
            };

            return Promise.all( pageVoices );
        });

        return Promise.all( allVoicesOfApp ); 
    };
    
    async function LoadAllModelsOfApp() {
        // const allModelsOfApp: any = [] // [ [ model0, model1, model2 ], [ model0, model1, model2 ], [ model0, model1, model2  ] ]
        //                                             ^ models[] of page0           ^models[] of page1           ^models[] of page2
    
        const all_pages_models = data.pages.map(async (page: any) => {
            const page_models: any = []; // [ model0, model1, model2 ]
            for ( let i = 0; i < page.models.length; i++ ) {
                page_models[i] = LoadModel(page.models[i].path);
                // console.log(`model loaded`);
            };
            return Promise.all(page_models);
        });

        return Promise.all(all_pages_models); 
    };

    async function ExtractAllMeshesOfApp() {
        const allModelsOfApp = await LoadAllModelsOfApp();
        // console.log(allModelsOfApp); // [ [gltf0, gltf1], [gltf0], [gltf0], [gltf0] ]
    
        const allMeshesOfApp = allModelsOfApp.map( (arrayOfGltfs: any) => {
            return arrayOfGltfs.map( ( gltf: any ) => {
                return gltf.scene.children.filter( ( child: any ) => child.isMesh || child.isGroup && child.__removed === undefined )
            });
        }) // [ [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ], [ [Mesh], [Mesh], [Mesh] ] ]
    
        return allMeshesOfApp; 
    };
};