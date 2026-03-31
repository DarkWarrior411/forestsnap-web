'use client';
import React, { useEffect, useRef } from 'react';

export default function Map3DCanvas({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = 20; const rows = 20;
      const spacing = canvas.width / cols;
      const perspective = 300;
      
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2 - 50);
      
      for (let y = 0; y < rows; y++) {
        ctx.beginPath();
        for (let x = 0; x < cols; x++) {
          const rx = (x - cols / 2) * spacing;
          const ry = (y - rows / 2) * spacing;
          
          const dist = Math.sqrt(rx*rx + ry*ry);
          const zOffset = Math.sin(dist * 0.05 - time) * 40 + Math.cos((rx+ry)*0.02)*20;
          
          const z = ry + 200;
          if (z <= 0) continue;
          
          const scale = perspective / (perspective + z);
          const px = rx * scale;
          const py = (ry + zOffset) * scale + 100;
          
          if (x === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
          
          if (y > 0) {
             const py_prev = (ry - spacing + Math.sin(Math.sqrt(rx*rx + (ry-spacing)*(ry-spacing)) * 0.05 - time) * 40) * (perspective / (perspective + z - spacing)) + 100;
             ctx.moveTo(px, py);
             ctx.lineTo(rx * (perspective / (perspective + z - spacing)), py_prev);
          }
        }
        
        const gradient = ctx.createLinearGradient(0, -100, 0, 100);
        gradient.addColorStop(0, '#FF4500'); 
        gradient.addColorStop(0.5, '#F59E0B'); 
        gradient.addColorStop(1, '#10B981'); 
        
        ctx.strokeStyle = gradient;
        ctx.globalAlpha = theme === 'dark' ? 1 : 0.7;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
      time += 0.03;
      animationId = requestAnimationFrame(drawGrid);
    };

    drawGrid();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationId); };
  }, [theme]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-2xl" />;
}