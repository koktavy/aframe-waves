// This A-Frame component creates a grid of objects in a scene.
AFRAME.registerComponent('grid', {
  schema: {
    sizeX: {type: 'number', default: 10},
    sizeY: {type: 'number', default: 10},
    verticesX: {type: 'number', default: 10},
    verticesY: {type: 'number', default: 10}
  },

  init: function () {
    // const array = []
    let dummy = new THREE.Object3D();
    let mat4 = new THREE.Matrix4();
    let nx = 0;
    let ny = 0;
    this.verticesX = this.data.verticesX;
    this.verticesY = this.data.verticesY;
    this.count = this.verticesX * this.verticesY;

    // Load the texture, then create the grid
    // TODO: abstract
    const loader = new THREE.TextureLoader()
    loader.load('lady_les.jpg', (texture) => {
      // create x * y plane instances for each vertex
      let geometry = new THREE.PlaneGeometry(0.5, 0.5)
      let material = new THREE.MeshStandardMaterial({ map: texture })
      let instMesh = new THREE.InstancedMesh(geometry, material, this.count);
      instMesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
      this.el.setObject3D('mesh', instMesh)

      for (let x = 0; x < this.verticesX; x++) {
        // array.push([]) // x-axis array
        for (let y = 0; y < this.verticesY; y++) {
          dummy.position.set(
            (x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2,
            (y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2,
            0
          )
          dummy.updateMatrix();
          instMesh.setMatrixAt( x + y * this.verticesX, dummy.matrix );

          // Clone the texture to ensure a new offset, while only using one texture in memory
          const newTexture = texture.clone()
          // Set the specific region of the texture to be displayed for each box
          const material = new THREE.MeshStandardMaterial({ map: newTexture })
          material.map.offset.set(x * (1 / this.verticesX), y * (1 / this.verticesY))
          material.map.repeat.set(1 / this.verticesX, 1 / this.verticesY)
          console.log(dummy)
          // dummy.material = material.clone()
          // dummy.getObject3D('mesh').material = material.clone()

          
          // const offsetX = x / this.verticesX;
          // const offsetY = y / this.verticesY;
          // const repeatX = 1 / this.verticesX;
          // const repeatY = 1 / this.verticesY;
      
          // offsets.setXY(instanceIndex, offsetX, offsetY);
          // repeats.setXY(instanceIndex, repeatX, repeatY);




          // Create Perlin noise using the normalized x and y values to be between -1 and 1
          // nx = (x / this.verticesX) * 2 - 1
          // ny = (y / this.verticesY) * 2 - 1
          // let noise = perlin.get(nx, ny) + 1

          // animate the rotation
          // entity.setAttribute('animation', {
          //   property: 'rotation',
          //   to: `${noise * 40} ${noise * 20} 0`,
          //   dur: 1000,
          //   delay: 3000 * (noise),
          //   easing: 'easeInOutQuad',
          //   dir: 'alternate',
          //   loop: true
          // })
          // animate the position on the z-axis, maintaining the x and y position
          // entity.setAttribute('animation__z', {
          //   property: 'position',
          //   from: entity.getAttribute('position'),
          //   to: `${(x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2} ${(y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2} 5`,
          //   dur: 2000,
          //   delay: 3000 * (noise),
          //   dir: 'alternate',
          //   easing: 'easeInOutQuad',
          //   loop: true
          // })

          // Click to return to the original position
          // window.addEventListener('click', () => {
          //   entity.removeAttribute('animation')
          //   entity.setAttribute('animation', {
          //     property: 'rotation',
          //     to: '0 0 0',
          //     dur: 1000,
          //     easing: 'easeInOutQuad',
          //     loop: 1
          //   })
          //   entity.removeAttribute('animation__z')
          //   entity.setAttribute('animation__z', {
          //     property: 'position',
          //     to: `${(x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2} ${(y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2} 0`,
          //     dur: 2000,
          //     easing: 'easeInOutQuad',
          //     loop: 1
          //   })
          // }, { once: true })

          // this.el.appendChild(entity)
        }
      }
    })
  }
});

// Blender Geo nodes inspiration
// https://www.youtube.com/watch?v=DZA8bIO5JNo

// Instancing research
// https://threejs.org/docs/#api/en/objects/InstancedMesh
// https://codepen.io/prisoner849/pen/ZEWbvMP
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_instancing_dynamic.html