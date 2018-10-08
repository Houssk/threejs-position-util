import { PositionUtil } from "../src/threejs-position-util";
import * as THREE from "three";

import Spherical = THREE.Spherical;
import Vector3 = THREE.Vector3;
import Scene = THREE.Scene;
import Mesh = THREE.Mesh;
import { Geometry } from "three";
import { Camera } from "three";

describe("座標ユーティリティ", () => {
  // シーンを作成
  const scene = new Scene();
  const W = 1920;
  const H = 1080;
  const camera = new THREE.PerspectiveCamera(45, W / H, 1, 10000);
  camera.position.set(0, 0, 1000);
  scene.add(camera);

  test("ジオメトリ中心のワールド座標取得", () => {
    const geo = new THREE.SphereGeometry(10);
    const mesh = new Mesh(geo);
    PositionUtil.shiftMesh(mesh, new Vector3(-10, -10, -10));
    mesh.position.set(10, 10, 10);
    const container = new THREE.Object3D();
    container.position.set(10, 10, 10);
    container.add(mesh);
    scene.add(container);

    const vec = PositionUtil.getGeometryCenterInWorld(mesh);
    expect(vec).toEqual(new Vector3(30, 30, 30));
  });

  test("ジオメトリ中心の取得", () => {
    const geo = new THREE.SphereGeometry(10);
    const mesh = new Mesh(geo);
    PositionUtil.shiftMesh(mesh, new Vector3(-10, -10, -10));
    mesh.position.set(10, 10, 10);
    const container = new THREE.Object3D();
    container.position.set(10, 10, 10);
    container.add(mesh);
    scene.add(container);

    const vec = PositionUtil.getGeometryCenterInLocal(mesh);

    //親Object3Dの移動やmeshの移動は無視して、ジオメトリの中心位置だけを取得する。
    expect(vec).toEqual(new Vector3(10, 10, 10));
  });

  test("スクリーン座標の取得", () => {
    const geo = new THREE.SphereGeometry(10);

    const addMesh = (
      geo: Geometry,
      scene: Scene,
      camera: Camera,
      pos: Vector3
    ) => {
      const mesh = new THREE.Mesh(geo);
      mesh.position.set(pos.x, pos.y, pos.z);
      scene.add(mesh);
      return PositionUtil.get2DPositionWithMesh(mesh, camera, W, H);
    };

    const vec0 = addMesh(geo, scene, camera, new Vector3(0, 0, 0));
    const vec1 = addMesh(geo, scene, camera, new Vector3(-200, 200, 0));
    const vec2 = addMesh(geo, scene, camera, new Vector3(350, -150, 0));
    const vec3 = addMesh(geo, scene, camera, new Vector3(350, -150, -600));

    expect(vec0).toEqual(new Vector3(W / 2, H / 2, 0));

    expect(vec1.x).toBeCloseTo(699.2649352637056);
    expect(vec1.y).toBeCloseTo(279.26493526370575);

    expect(vec2.x).toBeCloseTo(1416.286363288515);
    expect(vec2.y).toBeCloseTo(735.5512985522207);

    expect(vec3.x).toBeCloseTo(1245.1789770553219);
    expect(vec3.y).toBeCloseTo(662.2195615951379);
  });
});

/*
describe("極座標クラス", () => {
  const R = 10;
  const PI_H = Math.PI / 2;

  test("新規オブジェクト", () => {
    const poler = new Polar(0, PI_H);
    expect(poler.longitude).toEqual(0);
    expect(poler.latitude).toEqual(PI_H);
    expect(Polar.polarToVector3(poler)).toEqual({ x: 0, y: 1, z: 0 });
  });

  test("Sphericalとの包括的比較", () => {
    for (let lng = -PI_H; lng < Math.PI * 2 - PI_H; lng += 0.0174 * 10) {
      for (let lat = -PI_H; lat < Math.PI * 2 - PI_H; lat += 0.0174 * 10) {
        const polar = new Polar(lng, lat);
        const spherical: Spherical = new Spherical(R, PI_H - lat, lng);
        const shpericalVec: Vector3 = new Vector3().setFromSpherical(spherical);
        const polarVec: Vector3 = Polar.polarToVector3(polar).multiplyScalar(R);
        expect(shpericalVec.x).toBeCloseTo(polarVec.x);
        expect(shpericalVec.y).toBeCloseTo(polarVec.y);
        expect(shpericalVec.z).toBeCloseTo(polarVec.z);
      }
    }
  });
});
*/