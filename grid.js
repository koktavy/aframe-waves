// This A-Frame component creates a grid of objects in a scene.
AFRAME.registerComponent('grid', {
  schema: {
    sizeX: {type: 'number', default: 10},
    sizeY: {type: 'number', default: 10},
    verticesX: {type: 'number', default: 10},
    verticesY: {type: 'number', default: 10}
  },
  init: function () {
    // create a new a-box element for each vertex
    for (let x = 0; x < this.data.verticesX; x++) {
      for (let y = 0; y < this.data.verticesY; y++) {
        let entity = document.createElement('a-entity');
        entity.setAttribute('mixin' , 'cube');
        entity.setAttribute('position', {
          x: (x / this.data.verticesX) * this.data.sizeX - this.data.sizeX / 2,
          y: (y / this.data.verticesY) * this.data.sizeY - this.data.sizeY / 2,
          z: 0
        });
        // entity.setAttribute('rotation', `${x * 5} ${y * 10} 0`);
        // set the color based on the x and y position
        entity.setAttribute('material', {
          color: `hsl(${(x / this.data.verticesX) * 360}, 100%, ${(y / this.data.verticesY) * 100}%)`
        });
        // animate the rotation
        entity.setAttribute('animation', {
          property: 'rotation',
          to: `${x * y + 1} ${x / y + 12} 0`,
          dur: 6000,
          delay: 100 * (x + y),
          easing: 'linear',
          loop: 5
        });
        this.el.appendChild(entity);
      }
    }
  }
});

// https://www.youtube.com/watch?v=DZA8bIO5JNo