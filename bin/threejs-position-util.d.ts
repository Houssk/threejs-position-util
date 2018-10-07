import { Vector3, Mesh, Camera, Geometry } from "three";
/**
 * Created by makinomasato on 2016/05/21.
 */
export declare class PositionUtil {
    /**
     * メッシュからのワールドポジション取得メソッド
     * @param mesh
     * @returns {Vector3}
     */
    static getWorldPosition(mesh: Mesh): Vector3;
    /**
     * メッシュからのlocalポジション取得メソッド
     * @param mesh
     * @returns {Vector3}
     */
    static getLocalPosition(mesh: Mesh): Vector3;
    /**
     * ジオメトリからのlocalポジション取得メソッド
     * @param {Geometry} geo
     * @returns {Vector3}
     */
    static getLocalPositionFromGeometry(geo: Geometry): Vector3;
    /**
     * グローバル座標から2Dスクリーン座標を取得するメソッド
     * @param vec
     * @param camera
     * @param canvasW
     * @param canvasH
     * @returns {Vector3}
     */
    static get2DPosition(vec: Vector3, camera: Camera, canvasW: number, canvasH: number): Vector3;
    /**
     * メッシュから2Dスクリーン座標を取得するメソッド
     * @param mesh
     * @param camera
     * @param canvasW
     * @param canvasH
     * @returns {Vector3}
     */
    static get2DPositionWithMesh(mesh: Mesh, camera: Camera, canvasW: number, canvasH: number): Vector3;
    /**
     * 直交座標から三次元極座標の半径を取得する
     * @param vec
     * @returns {number}
     */
    static getROfGlobe(vec: Vector3): number;
    /**
     * 直交座標から極座標へ変換する
     * @param vector3
     * @returns {Polar}
     */
    static vector3ToPolar(vector3: Vector3): Polar;
    /**
     * 極座標から直交座標へ変換する
     * @param polar
     * @returns {Vector3}
     */
    static polarToVector3(polar: Polar): Vector3;
    /**
     * 読み込み直後のメッシュの原点をずらす。
     * ObjLoaderなどで読み込んだ直後のMeshは、全てGeometryの原点が(0,0,0)になっているため回転や拡大が意図通りに動かない
     * 中心点を任意の場所にずらすことで操作が容易になる。
     *
     * @param mesh
     * @param pos meshの中心点になる座標
     */
    static shiftMesh(mesh: Mesh, pos: Vector3): void;
}
/**
 * 地球の緯度経度ベース極座標オブジェクト
 */
export declare class Polar {
    longitude: number;
    latitude: number;
    static readonly PI_2: number;
    /**
     * コンストラクタ
     * @param lng 経度　単位ラジアン　180度 = Math.PI
     * @param lat 緯度　単位ラジアン
     */
    constructor(lng?: number, lat?: number);
    /**
     * 値の正規化を行う
     * 回転数のデータは失われる。
     */
    normalize(): void;
    clone(): Polar;
}
//# sourceMappingURL=threejs-position-util.d.ts.map