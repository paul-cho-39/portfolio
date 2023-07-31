const smoothstep = (low, high, f) => {
   f = (f - low) / (high - low);
   f = Math.max(0, Math.min(1, f));
   return f * f * (3 - 2 * f);
};

class App {
   constructor() {
      this.toUpdate = [];
      this.camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1000.0);
      this.camera.position.set(10, -35, 30);
      this.initRenderer();

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target = new THREE.Vector3(0, 0, 0);
      this.toUpdate.push(this.controls);
      this.controls.autoRotate = true;
      this.scene = new THREE.Scene();

      this.fireworks = [];

      for (var i = 0; i < 2000; i++) {
         var fI = this.makeFirework();
         this.fireworks.push(fI);
         // fireworks: [toUpdate[]]
         this.scene.add(fI);
      }

      setInterval(() => {
         this.shuffleTexture();
         this.restart();
      }, 4000);
      this.shuffleTexture();
      this.restart();
   }

   gradient() {
      if (this.builtGradient) {
         return this.builtGradient;
      }
      const c = document.createElement('canvas');
      c.width = c.height = 512;
      const g = c.getContext('2d');

      const grad = g.createRadialGradient(256, 256, 0, 256, 256, 256);
      grad.addColorStop(0, 'white');
      grad.addColorStop(0.1, 'gray');
      grad.addColorStop(0.2, '#303030');
      grad.addColorStop(1, 'black');

      g.fillStyle = grad;
      g.fillRect(0, 0, 512, 512);
      g.globalCompositeOperation = 'lighter';
      g.beginPath();

      this.restart();
      for (var i = 0; i < 8; i++) {
         var r = (i % 2) * (128 + Math.random() * 64) + 64;
         // var r = 256*Math.pow(Math.random(),3);
         var theta = (i / 8) * 2 * Math.PI;
         g.lineTo(256 + r * Math.sin(theta), 256 + r * Math.cos(theta));
      }
      g.fill();
      const t = new THREE.CanvasTexture(c);
      // return t;
      this.builtGradient = t;
      return this.builtGradient;
   }
   shuffleTexture() {
      if (this.overrideAuto) return;
      var emojiCanvas = document.createElement('canvas');
      emojiCanvas.width = emojiCanvas.height = 256;
      var g = emojiCanvas.getContext('2d');
      g.font = '200px Arial';
      var emojis = '😎 💀 🌸 💩 🤣 😍 🎉 🍑 🍆'.split(' ');

      g.fillText(emojis[Math.floor(Math.random() * emojis.length)], 30, 200);
      debugger;

      var emojiTex = new THREE.CanvasTexture(emojiCanvas);
      this.fireworks.forEach((f) => {
         f.userData.setTexture(emojiTex);
      });
   }

   makeFirework() {
      var fireworkPivot = new THREE.Object3D();
      var baseColor = new THREE.Color(0xffffff);
      baseColor.r += 0.05 * Math.random();
      baseColor.b += 0.05 * Math.random();
      // baseColor.r+=0.05*Math.random();
      var fPlane = new THREE.Mesh(
         new THREE.PlaneGeometry(0.6, 0.6),
         new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader: `
            varying vec2 vUV;
            void main(){
                vUV = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }
            `,
            fragmentShader: `
            varying vec2 vUV;
            uniform vec3 color;
            uniform vec2 resolution;
            uniform vec2 velocity;
            uniform sampler2D map;
            uniform sampler2D pattern;
            void main(){
                gl_FragColor = texture2D(map, vUV);
                vec2 screenSpace = gl_FragCoord.xy/resolution.xy;
                gl_FragColor.rgb *= color;
                gl_FragColor.rgb*=texture2D(pattern, velocity).rgb-0.5;
                float overage = max(0., length(color)-1.)/4.;
                gl_FragColor.rgb+=overage*texture2D(map, vUV).rgb;
            }
            `,

            uniforms: {
               resolution: {
                  value: new THREE.Vector2(
                     innerWidth * devicePixelRatio,
                     innerHeight * devicePixelRatio
                  ),
               },
               color: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
               velocity: { value: new THREE.Vector2(0, 0) },
               map: { value: this.gradient() },
               pattern: { value: null },
            },
            blending: THREE.AdditiveBlending,
         })
      );
      var drag = 0.96 + 0.02 * Math.random();
      fireworkPivot.userData = {
         velocity: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.1, Math.random() - 0.5),
         ttl: 200,
         update: () => {
            fireworkPivot.lookAt(this.camera.position);
            fireworkPivot.position.add(fireworkPivot.userData.velocity);
            fireworkPivot.userData.velocity.multiplyScalar(drag);
            fireworkPivot.userData.velocity.y -= 0.003;
            fireworkPivot.userData.velocity.x += (Math.random() - 0.5) * 0.01;
            fireworkPivot.userData.velocity.z += (Math.random() - 0.5) * 0.01;
            fireworkPivot.userData.ttl--;
            var scalar =
               Math.pow(Math.random(), 4) * 14 * smoothstep(-20, 50, fireworkPivot.userData.ttl);
            fPlane.material.uniforms.color.value.set(
               scalar * baseColor.r,
               scalar * baseColor.g,
               scalar * baseColor.b
            );

            fPlane.scale.setScalar(1 + 10 * smoothstep(120, 190, fireworkPivot.userData.ttl));
            fPlane.rotation.z = Math.random() * 6;
         },
         setTexture: (t) => {
            fPlane.material.uniforms.pattern.value = t;
         },
         reset: () => {
            fireworkPivot.userData.ttl = 120 + Math.random() * 80;
            fireworkPivot.position.multiplyScalar(0);
            fireworkPivot.userData.velocity.set(
               Math.random() - 0.5,
               Math.random() - 0.5,
               (Math.random() - 0.5) * 0.2
            );
            fireworkPivot.userData.velocity
               .normalize()
               .multiplyScalar(Math.pow(Math.random(), 0.5));
            var v = fireworkPivot.userData.velocity;
            fPlane.material.uniforms.velocity.value.set(v.x / 2 + 0.5, v.y / 2 + 0.5);
         },
      };

      fireworkPivot.userData.velocity.normalize().multiplyScalar(0.3 + Math.pow(Math.random(), 2));
      this.toUpdate.push(fireworkPivot.userData);

      fireworkPivot.add(fPlane);
      return fireworkPivot;
   }

   initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, autoClear: false });
      this.renderer.setSize(innerWidth, innerHeight);
      //   this.renderer.setClearColor(0);
      this.renderer.setAnimationLoop((e) => this.update(e));
      this.renderer.setPixelRatio(devicePixelRatio);

      this.renderer.xr.enabled = true;
      document.body.appendChild(this.renderer.domElement);
   }

   update(e) {
      this.controls.autoRotateSpeed = Math.sin(Date.now() / 1000) * 2;
      this.toUpdate.forEach((e) => e.update());

      if (this.keysDown[39]) {
         this.restart();
      }
      this.renderer.render(this.scene, this.camera);
   }
   restart() {
      this.fireworks.forEach((f) => f.userData.reset());
   }
}
