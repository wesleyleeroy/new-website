"use client"

import { useEffect, useRef, useId } from "react"

export function LiquidEffectAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const uniqueId = useId()
    const canvasId = `liquid-canvas-${uniqueId.replace(/:/g, '')}`

    useEffect(() => {
        if (!canvasRef.current) return

        // Cleanup previous instances if any to prevent memory leaks
        if (window.__liquidApp && window.__liquidApp.dispose) {
            window.__liquidApp.dispose()
        }

        // Load the script dynamically
        const script = document.createElement("script")
        script.type = "module"
        script.crossOrigin = "anonymous"
        script.textContent = `
            (async function() {
                try {
                    const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js');
                    const LiquidBackground = module.default;
                    
                    const canvas = document.getElementById('${canvasId}');
                    if (canvas) {
                        const app = LiquidBackground(canvas);
                        app.loadImage('https://images.unsplash.com/photo-1537240954157-b08dd087e595?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
                        app.liquidPlane.material.metalness = 0.75;
                        app.liquidPlane.material.roughness = 0.25;
                        app.liquidPlane.uniforms.displacementScale.value = 5;
                        app.setRain(false);
                        window.__liquidApp = app;
                        
                        // Force a resize to ensure it fits
                        if (app.resize) app.resize();
                    }
                } catch (e) {
                    console.error("LiquidEffect failed to load:", e);
                }
            })();
        `
        document.body.appendChild(script)

        return () => {
            if (window.__liquidApp && window.__liquidApp.dispose) {
                window.__liquidApp.dispose()
                window.__liquidApp = undefined
            }
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [canvasId])

    return (
        <div
            className="absolute inset-0 w-full h-full touch-none overflow-hidden -z-[1] rounded-[3rem]"
            style={{ fontFamily: '"Montserrat", serif' }}
        >
            <canvas ref={canvasRef} id={canvasId} className="absolute inset-0 w-full h-full rounded-[3rem]" />
        </div>
    )
}

declare global {
    interface Window {
        __liquidApp?: any
    }
}
