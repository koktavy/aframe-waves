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
    // get the normalized x and y values to be between -1 and 1
    let nx = 0;
    let ny = 0;
    this.verticesX = this.data.verticesX;
    this.verticesY = this.data.verticesY;
    // create a new a-box element for each vertex
    for (let x = 0; x < this.verticesX; x++) {
      array.push([])
      for (let y = 0; y < this.verticesY; y++) {
        let entity = document.createElement('a-entity');
        array[x].push(entity)
        entity.setAttribute('mixin' , 'cube');
        entity.setAttribute('position', {
          x: (x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2,
          y: (y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2,
          z: 0
        });
        // entity.setAttribute('rotation', `${x * 5} ${y * 10} 0`);
        // set the color based on the x and y position
        entity.setAttribute('material', {
          // color: `hsl(${(x / this.verticesX) * 360}, 100%, ${(y / this.verticesY) * 100}%)`,
          src: '#our-lady',
          repeat: { x: 1 / this.verticesX, y: 1 / this.verticesY },
          // TODO: Solve the new texture/material creation when using offset, too much memory is used
          offset: { x: x * (1 / this.verticesX), y: y * (1 / this.verticesY) }
        });

        // animate the rotation
        // get the normalized x and y values to be between -1 and 1
        nx = (x / this.verticesX) * 2 - 1;
        ny = (y / this.verticesY) * 2 - 1;
        const noise = perlin.get(nx, ny) + 1
        entity.setAttribute('animation', {
          property: 'rotation',
          to: `${noise * 15} 0 0`,
          dur: 4000,
          delay: 5000 * (noise),
          easing: 'easeInOutQuad',
          dir: 'alternate',
          loop: true
        });
        this.el.appendChild(entity);
        // animate the position on the z-axis, maintaining the x and y position
        entity.setAttribute('animation__z', {
          property: 'position',
          from: entity.getAttribute('position'),
          to: `${(x / this.verticesX) * this.data.sizeX - this.data.sizeX / 2} ${(y / this.verticesY) * this.data.sizeY - this.data.sizeY / 2} 4`,
          dur: 4000,
          delay: 5000 * (noise),
          dir: 'alternate',
          easing: 'easeInOutQuad',
          loop: true
        });
      }
    }
  }
});

// https://www.youtube.com/watch?v=DZA8bIO5JNo