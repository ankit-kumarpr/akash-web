import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particlesArray;

        // Set dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Mouse setup
        let mouse = {
            x: null,
            y: null,
            radius: (canvas.height / 80) * (canvas.width / 80)
        };

        const handleMouseMove = (event) => {
            mouse.x = event.x;
            mouse.y = event.y;
        };

        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = '#ffffff';
                ctx.fill();
            }

            update() {
                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Mouse Interaction: GENTLE REPULSION (Space clearing)
                // "Sikude nahi" -> So we push them AWAY slightly if too close, instead of pulling IN
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius + 50) {
                    if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                        this.x += 2; // Push RIGHT away from mouse (if mouse approaches from left)
                    }
                    if (mouse.x > this.x && this.x > this.size * 10) {
                        this.x -= 2; // Push LEFT
                    }
                    if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                        this.y += 2; // Push DOWN
                    }
                    if (mouse.y > this.y && this.y > this.size * 10) {
                        this.y -= 2; // Push UP
                    }
                }

                this.x += this.directionX;
                this.y += this.directionY;

                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            // Keep the nice density
            let numberOfParticles = (canvas.height * canvas.width) / 9000;

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1; // Small particles
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);

                // Smooth floaty movement
                let directionX = (Math.random() * 1) - 0.5;
                let directionY = (Math.random() * 1) - 0.5;
                let color = '#ffffff';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                // Connect particles to particles
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        if (opacityValue > 0) {
                            ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue + ')';
                            ctx.lineWidth = 0.5;
                            ctx.beginPath();
                            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                            ctx.stroke();
                        }
                    }
                }

                // Connect particles to MOUSE ("Move sath me")
                // This creates lines from the mouse to nearby particles
                let dx = mouse.x - particlesArray[a].x;
                let dy = mouse.y - particlesArray[a].y;
                let distanceMouse = (dx * dx) + (dy * dy);

                if (distanceMouse < (canvas.width / 7) * (canvas.height / 7)) { // Same connection distance logic
                    opacityValue = 1 - (distanceMouse / 20000);
                    if (opacityValue > 0) {
                        ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue + ')';
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(mouse.x, mouse.y); // Draw line to mouse position
                        ctx.stroke();
                    }
                }

            }
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.radius = (canvas.height / 80) * (canvas.width / 80);
            init();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mouseout', () => {
            mouse.x = undefined;
            mouse.y = undefined;
        });

        init();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#000000',
                zIndex: 0
            }}
        />
    );
};

export default ParticleBackground;
