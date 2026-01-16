'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

interface Image {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 7 images */
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    // 7 Phases: Center -> Top -> Right -> BotRight -> BotMid -> BotLeft -> Left
    // 15 Points: 0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.50, 0.57, 0.64, 0.71, 0.78, 0.85, 0.92, 1
    const TIME_POINTS = [0, 0.07, 0.14, 0.21, 0.28, 0.35, 0.42, 0.50, 0.57, 0.64, 0.71, 0.78, 0.85, 0.92, 1];

    // Zoom Center Image (Index 0) - Pulse 7 times
    const scale4 = useTransform(scrollYProgress, TIME_POINTS,
        [1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1]);

    // Index 1 (Top) & Index 3 (Right) share scale5
    // P2 (0.21): Top Focus (2.15)
    // P3 (0.35): Right Focus (3.0)
    const scale5 = useTransform(scrollYProgress, TIME_POINTS,
        [1, 3.8, 1, 2.15, 1, 3, 1, 2.15, 1, 2.15, 1, 2.15, 1, 2.15, 1]);

    // Index 6 (Bottom Right) uses scale9
    // P4 (0.50): Focus (3.0)
    const scale9 = useTransform(scrollYProgress, TIME_POINTS,
        [1, 5, 1, 4, 1, 4, 1, 3, 1, 2.15, 1, 2.15, 1, 2.15, 1]);

    // Index 4 (Bottom Middle) & Index 2 (Left) share scale6
    // P5 (0.64): BotMid Focus (3.0)
    // P7 (0.92): Left Focus (2.15)
    const scale6 = useTransform(scrollYProgress, TIME_POINTS,
        [1, 4.5, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2.15, 1]);

    // Index 5 (Bottom Left) uses scale8
    // P6 (0.78): Focus (3.0)
    const scale8 = useTransform(scrollYProgress, TIME_POINTS,
        [1, 6, 1, 4, 1, 4, 1, 4, 1, 4, 1, 3, 1, 4, 1]);

    const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

    // Camera Movement
    // P1 (0.07): 0,0
    // P2 (0.21): Top (-11vw, 64vh)
    // P3 (0.35): Right (-82.5vw, 0vh)
    // P4 (0.50): BotRight (-60vw, -90vh) - centered on image at left-[20vw] top-[30vh]
    // P5 (0.64): BotMid (-6vw, -90vh) - centered on image at left-[2vw] top-[30vh]
    // P6 (0.78): BotLeft (57vw, -90vh) - centered on image at -left-[19vw] top-[30vh]
    // P7 (0.92): Left (53.75vw, 21.5vh)
    const containerX = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "-11vw", "0vw", "-82.5vw", "0vw", "-60vw", "0vw", "-6vw", "0vw", "57vw", "0vw", "53.75vw", "0vw"]);

    const containerY = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "64vh", "0vh", "0vh", "0vh", "-90vh", "0vh", "-90vh", "0vh", "-90vh", "0vh", "21.5vh", "0vh"]);

    // Phase 5 Custom (0.64 Peak): Index 6 Right, Index 3 Right
    const dx6 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "55vw", "0vw", "0vw", "0vw", "0vw", "0vw"]);
    const dy6 = useTransform(scrollYProgress, TIME_POINTS, ["0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh"]);
    const dx3 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "20vw", "0vw", "0vw", "0vw", "0vw", "0vw", "20vw", "0vw", "0vw", "0vw", "50vw", "0vw"]);
    const dy3 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "30vh", "0vh", "0vh", "0vh", "-20vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh"]); // Phase 4 Up

    // Phase 6 Custom (0.78 Peak): Index 2 Up, Index 4 Right
    const dy2 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "-30vh", "0vh", "0vh", "0vh"]);
    const dx4 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "0vw", "0vw", "-20vw", "0vw", "-45vw", "0vw", "0vw", "0vw", "30vw", "0vw", "0vw", "0vw"]);
    const dy4 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "0vh", "0vh", "30vh", "0vh", "20vh", "0vh", "0vh", "0vh", "0vh", "0vh", "30vh", "0vh"]); // Phase 7 Down

    // Phase 7 Custom (0.92 Peak): Index 0 Right, Index 1 Right+Up
    const dx0 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "0vw", "0vw", "-30vw", "0vw", "-20vw", "0vw", "0vw", "0vw", "30vw", "0vw", "50vw", "0vw"]);
    const dy0 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "30vh", "0vh", "0vh", "0vh", "-20vh", "0vh", "-30vh", "0vh", "-30vh", "0vh", "0vh", "0vh"]); // Phase 2 Down

    const dx1 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "30vw", "0vw"]);
    const dy1 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "0vh", "0vh", "-30vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "-20vh", "0vh"]);

    const dx5 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "0vw", "-30vw", "0vw", "0vw", "0vw", "0vw", "0vw"]);
    const dy5 = useTransform(scrollYProgress, TIME_POINTS,
        ["0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh", "0vh"]);

    return (
        <div ref={container} className="relative h-[1750vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-transparent">
                <motion.div style={{ x: containerX, y: containerY }} className="relative w-full h-full">
                    {images.map(({ src, alt }, index) => {
                        const scale = scales[index % scales.length];
                        const isIndex6 = index === 6;
                        const isIndex3 = index === 3;
                        const isIndex2 = index === 2;
                        const isIndex4 = index === 4;
                        const isIndex0 = index === 0;
                        const isIndex1 = index === 1;
                        const isIndex5 = index === 5;

                        // Conditional Transforms
                        let xTransform: any = 0;
                        let yTransform: any = 0;

                        if (isIndex6) { xTransform = dx6; yTransform = dy6; }
                        else if (isIndex3) { xTransform = dx3; yTransform = dy3; }
                        else if (isIndex2) { yTransform = dy2; }
                        else if (isIndex4) { xTransform = dx4; yTransform = dy4; }
                        else if (isIndex0) { xTransform = dx0; yTransform = dy0; }
                        else if (isIndex1) { xTransform = dx1; yTransform = dy1; }
                        else if (isIndex5) { xTransform = dx5; yTransform = dy5; }

                        return (
                            <motion.div
                                key={index}
                                style={{
                                    scale,
                                    x: xTransform,
                                    y: yTransform
                                }}
                                className={`absolute top-0 flex h-full w-full items-center justify-center ${index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : ''} ${index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : ''} ${index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : ''} ${index === 4 ? '[&>div]:!top-[30vh] [&>div]:!left-[2vw] [&>div]:!h-[28vh] [&>div]:!w-[16vw]' : ''} ${index === 5 ? '[&>div]:!top-[30vh] [&>div]:!-left-[19vw] [&>div]:!h-[24vh] [&>div]:!w-[20vw]' : ''} ${index === 6 ? '[&>div]:!top-[30vh] [&>div]:!left-[20vw] [&>div]:!h-[24vh] [&>div]:!w-[16vw]' : ''} `}
                            >
                                <motion.div
                                    className="relative h-[25vh] w-[25vw]"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 1.2,
                                        delay: 0.1 + index * 0.1,
                                        ease: "easeOut"
                                    }}
                                >
                                    <img
                                        src={src || '/placeholder.svg'}
                                        alt={alt || `Parallax image ${index + 1}`}
                                        className="h-full w-full object-cover rounded-lg shadow-lg"
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
