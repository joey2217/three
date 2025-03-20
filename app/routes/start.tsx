import { useEffect, useRef } from 'react'
import type { Route } from './+types/start'
import * as THREE from 'three'
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Start - Three.js Demo' },
    { name: 'description', content: 'Three.js Examples' },
  ]
}

function render(element: HTMLElement) {
  const { clientHeight: height, clientWidth: width } = element
  // 创建3D场景对象Scene
  const scene = new THREE.Scene()
  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100)
  //创建一个材质对象Material
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //设置材质颜色
    transparent: true, //开启透明
    opacity: 0.5, //设置透明度
  })

  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material) //网格模型对象Mesh
  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 10, 0)
  scene.add(mesh)

  // 实例化一个透视投影相机对象
  // width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
  // 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

  //相机在Three.js三维坐标系中的位置
  // 根据需要设置相机位置具体值
  camera.position.set(200, 200, 200)
  //相机观察目标指向Threejs 3D空间中某个位置
  // camera.lookAt(0, 0, 0); //坐标原点
  // camera.lookAt(0, 10, 0);  //y轴上位置10
  camera.lookAt(mesh.position) //指向mesh对应的位置

  // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(150)
  scene.add(axesHelper)

  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height) //设置three.js渲染区域的尺寸(像素px)
  renderer.render(scene, camera) //执行渲染操作
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement)
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera) //执行渲染操作
    // 浏览器控制台查看相机位置变化
    //  console.log('camera.position',camera.position);
  }) //监听鼠标、键盘事件

  element.appendChild(renderer.domElement)
}

export default function Start() {
  const containerRef = useRef<HTMLDivElement>(null!)
  useEffect(() => {
    render(containerRef.current)
  }, [])
  return <div ref={containerRef} className="three-container"></div>
}
