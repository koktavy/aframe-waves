// This A-Frame component creates a grid of objects in a scene.
AFRAME.registerComponent('grid', {
  schema: {
    sizeX: {type: 'number', default: 10},
    sizeY: {type: 'number', default: 10},
    verticesX: {type: 'number', default: 10},
    verticesY: {type: 'number', default: 10}
  },

  init: function () {
    const array = []
    let nx = 0;
    let ny = 0;
    this.verticesX = this.data.verticesX;
    this.verticesY = this.data.verticesY;

    // Load the texture, then create the grid
    // TODO: abstract
    const loader = new THREE.TextureLoader()
    loader.load('lady_les.jpg', (texture) => {
      // create a new a-box element for each vertex
      for (let x = 0; x < this.verticesX; x++) {
        array.push([]) // x-axis array
        for (let y = 0; y < this.verticesY; y++) {
          let entity = document.createElement('a-entity')
          array[x].push(entity) // y-axis array
          entity.setAttribute('mixin', 'cube')
          entity.setAttribute('position', {
            x: (x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2,
            y: (y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2,
            z: 0
          })

          entity.addEventListener('object3dset', () => {
            if (entity.getObject3D('mesh')) {
              // Clone the texture to ensure a new offset, while only using one texture in memory
              const newTexture = texture.clone()
              // Set the specific region of the texture to be displayed for each box
              const material = new THREE.MeshStandardMaterial({ map: newTexture })
              material.map.offset.set(x * (1 / this.verticesX), y * (1 / this.verticesY))
              material.map.repeat.set(1 / this.verticesX, 1 / this.verticesY)
              entity.getObject3D('mesh').material = material.clone()
            }
          })

          // Previously:
          //       // set the color based on the x and y position
          //       entity.setAttribute('material', {
          //         // color: `hsl(${(x / this.verticesX) * 360}, 100%, ${(y / this.verticesY) * 100}%)`,
          //       })

          // Create Perlin noise using the normalized x and y values to be between -1 and 1
          nx = (x / this.verticesX) * 2 - 1
          ny = (y / this.verticesY) * 2 - 1
          const noise = perlin.get(nx, ny) + 1

          // animate the rotation
          entity.setAttribute('animation', {
            property: 'rotation',
            to: `${noise * 40} ${noise * 20} 0`,
            dur: 1000,
            delay: 3000 * (noise),
            easing: 'easeInOutQuad',
            dir: 'alternate',
            loop: true
          })
          // animate the position on the z-axis, maintaining the x and y position
          entity.setAttribute('animation__z', {
            property: 'position',
            from: entity.getAttribute('position'),
            to: `${(x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2} ${(y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2} 5`,
            dur: 2000,
            delay: 3000 * (noise),
            dir: 'alternate',
            easing: 'easeInOutQuad',
            loop: true
          })

          this.el.appendChild(entity)
        }
      }
    })
  }
});

// https://www.youtube.com/watch?v=DZA8bIO5JNo