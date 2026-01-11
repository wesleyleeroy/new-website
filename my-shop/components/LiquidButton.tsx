'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ColorKey =
    | 'color1'
    | 'color2'
    | 'color3'
    | 'color4'
    | 'color5'
    | 'color6'
    | 'color7'
    | 'color8'
    | 'color9'
    | 'color10'
    | 'color11'
    | 'color12'
    | 'color13'
    | 'color14'
    | 'color15'
    | 'color16'
    | 'color17';

export type Colors = Record<ColorKey, string>;

const svgOrder = [
    'svg1',
    'svg2',
    'svg3',
    'svg4',
    'svg3',
    'svg2',
    'svg1',
] as const;

type SvgKey = (typeof svgOrder)[number];

type Stop = {
    offset: number;
    stopColor: string;
};

type SvgState = {
    gradientTransform: string;
    stops: Stop[];
};

type SvgStates = Record<SvgKey, SvgState>;

const createStopsArray = (
    svgStates: SvgStates,
    svgOrder: readonly SvgKey[],
    maxStops: number
): Stop[][] => {
    let stopsArray: Stop[][] = [];
    for (let i = 0; i < maxStops; i++) {
        let stopConfigurations = svgOrder.map((svgKey) => {
            let svg = svgStates[svgKey];
            return svg.stops[i] || svg.stops[svg.stops.length - 1];
        });
        stopsArray.push(stopConfigurations);
    }
    return stopsArray;
};

type GradientSvgProps = {
    className: string;
    isHovered: boolean;
    colors: Colors;
};

const GradientSvg: React.FC<GradientSvgProps> = ({
    className,
    isHovered,
    colors,
}) => {
    const svgStates: SvgStates = {
        svg1: {
            gradientTransform:
                'translate(287.5 280) rotate(-29.0546) scale(689.807 1000)',
            stops: [
                { offset: 0, stopColor: colors.color1 },
                { offset: 0.188423, stopColor: colors.color2 },
                { offset: 0.260417, stopColor: colors.color3 },
                { offset: 0.328792, stopColor: colors.color4 },
                { offset: 0.328892, stopColor: colors.color5 },
                { offset: 0.328992, stopColor: colors.color1 },
                { offset: 0.442708, stopColor: colors.color6 },
                { offset: 0.537556, stopColor: colors.color7 },
                { offset: 0.631738, stopColor: colors.color1 },
                { offset: 0.725645, stopColor: colors.color8 },
                { offset: 0.817779, stopColor: colors.color9 },
                { offset: 0.84375, stopColor: colors.color10 },
                { offset: 0.90569, stopColor: colors.color1 },
                { offset: 1, stopColor: colors.color11 },
            ],
        },
        svg2: {
            gradientTransform:
                'translate(126.5 418.5) rotate(-64.756) scale(533.444 773.324)',
            stops: [
                { offset: 0, stopColor: colors.color1 },
                { offset: 0.104167, stopColor: colors.color12 },
                { offset: 0.182292, stopColor: colors.color13 },
                { offset: 0.28125, stopColor: colors.color1 },
                { offset: 0.328792, stopColor: colors.color4 },
                { offset: 0.328892, stopColor: colors.color5 },
                { offset: 0.453125, stopColor: colors.color6 },
                { offset: 0.515625, stopColor: colors.color7 },
                { offset: 0.631738, stopColor: colors.color1 },
                { offset: 0.692708, stopColor: colors.color8 },
                { offset: 0.75, stopColor: colors.color14 },
                { offset: 0.817708, stopColor: colors.color9 },
                { offset: 0.869792, stopColor: colors.color10 },
                { offset: 1, stopColor: colors.color1 },
            ],
        },
        svg3: {
            gradientTransform:
                'translate(264.5 339.5) rotate(-42.3022) scale(946.451 1372.05)',
            stops: [
                { offset: 0, stopColor: colors.color1 },
                { offset: 0.188423, stopColor: colors.color2 },
                { offset: 0.307292, stopColor: colors.color1 },
                { offset: 0.328792, stopColor: colors.color4 },
                { offset: 0.328892, stopColor: colors.color5 },
                { offset: 0.442708, stopColor: colors.color15 },
                { offset: 0.537556, stopColor: colors.color16 },
                { offset: 0.631738, stopColor: colors.color1 },
                { offset: 0.725645, stopColor: colors.color17 },
                { offset: 0.817779, stopColor: colors.color9 },
                { offset: 0.84375, stopColor: colors.color10 },
                { offset: 0.90569, stopColor: colors.color1 },
                { offset: 1, stopColor: colors.color11 },
            ],
        },
        svg4: {
            gradientTransform:
                'translate(860.5 420) rotate(-153.984) scale(957.528 1388.11)',
            stops: [
                { offset: 0.109375, stopColor: colors.color11 },
                { offset: 0.171875, stopColor: colors.color2 },
                { offset: 0.260417, stopColor: colors.color13 },
                { offset: 0.328792, stopColor: colors.color4 },
                { offset: 0.328892, stopColor: colors.color5 },
                { offset: 0.328992, stopColor: colors.color1 },
                { offset: 0.442708, stopColor: colors.color6 },
                { offset: 0.515625, stopColor: colors.color7 },
                { offset: 0.631738, stopColor: colors.color1 },
                { offset: 0.692708, stopColor: colors.color8 },
                { offset: 0.817708, stopColor: colors.color9 },
                { offset: 0.869792, stopColor: colors.color10 },
                { offset: 1, stopColor: colors.color11 },
            ],
        },
    };

    const maxStops = Math.max(
        ...Object.values(svgStates).map((svg) => svg.stops.length)
    );
    const stopsAnimationArray = createStopsArray(svgStates, svgOrder, maxStops);
    const gradientTransform = svgOrder.map(
        (svgKey) => svgStates[svgKey].gradientTransform
    );

    const variants = {
        hovered: {
            gradientTransform,
            transition: { duration: 50, repeat: Infinity, ease: [0, 0, 1, 1] },
        },
        notHovered: {
            gradientTransform,
            transition: { duration: 10, repeat: Infinity, ease: [0, 0, 1, 1] },
        },
    };


    return (
        <svg
            className={className}
            width='1030'
            height='280'
            viewBox='0 0 1030 280'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
        >
            <rect
                width='1030'
                height='280'
                rx='140'
                fill='url(#paint0_radial_905_231)'
            />
            <defs>
                <motion.radialGradient
                    id='paint0_radial_905_231'
                    cx='0'
                    cy='0'
                    r='1'
                    gradientUnits='userSpaceOnUse'
                    animate={(isHovered ? variants.hovered : variants.notHovered) as Record<string, any>

                    }

                >
                    {stopsAnimationArray.map((stopConfigs, index) => (
                        <AnimatePresence key={index}>
                            <motion.stop
                                initial={{
                                    offset: stopConfigs[0].offset,
                                    stopColor: stopConfigs[0].stopColor,
                                }}
                                animate={{
                                    offset: stopConfigs.map((config) => config.offset),
                                    stopColor: stopConfigs.map((config) => config.stopColor),
                                }}
                                transition={{
                                    duration: 0,
                                    ease: [0, 0, 1, 1],
                                    repeat: Infinity,
                                }}
                            />
                        </AnimatePresence>
                    ))}
                </motion.radialGradient>
            </defs>
        </svg>
    );
};

type LiquidProps = {
    isHovered: boolean;
    colors: Colors;
};

export const Liquid: React.FC<LiquidProps> = ({ isHovered, colors }) => {
    return (
        <>
            {Array.from({ length: 7 }).map((_, index) => (
                <div
                    key={index}
                    className={`absolute ${index < 3 ? 'w-[443px] h-[121px]' : 'w-[756px] h-[207px]'
                        } ${index === 0
                            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference'
                            : index === 1
                                ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[164.971deg] mix-blend-difference'
                                : index === 2
                                    ? 'top-1/2 left-1/2 -translate-x-[53%] -translate-y-[53%] rotate-[-11.61deg] mix-blend-difference'
                                    : index === 3
                                        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-[57%] rotate-[-179.012deg] mix-blend-difference'
                                        : index === 4
                                            ? 'top-1/2 left-1/2 -translate-x-[57%] -translate-y-1/2 rotate-[-29.722deg] mix-blend-difference'
                                            : index === 5
                                                ? 'top-1/2 left-1/2 -translate-x-[62%] -translate-y-[24%] rotate-[160.227deg] mix-blend-difference'
                                                : 'top-1/2 left-1/2 -translate-x-[67%] -translate-y-[29%] rotate-180 mix-blend-hard-light'
                        }`}
                >
                    <GradientSvg
                        className='w-full h-full'
                        isHovered={isHovered}
                        colors={colors}
                    />
                </div>
            ))}
        </>
    );
};

// Default colors for the liquid effect
const defaultColors: Colors = {
    color1: '#0B06FC',
    color2: '#7D7BF4',
    color3: '#1E10C5',
    color4: '#5E5AE6',
    color5: '#3D38D9',
    color6: '#8B89F7',
    color7: '#4A46E0',
    color8: '#6B68F0',
    color9: '#9997FA',
    color10: '#2B25CC',
    color11: '#1812B8',
    color12: '#A8A6FC',
    color13: '#5955E3',
    color14: '#7775F2',
    color15: '#8583F5',
    color16: '#3F3BDB',
    color17: '#5D59E8',
};

export default function LiquidButton() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="py-16 flex justify-center">
            <motion.a
                href="https://github.com/wesleyleeroy"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-[200px] h-[50px] rounded-2xl overflow-hidden cursor-pointer border-2 border-black"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{
                    boxShadow: "0 12px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 40px -10px rgba(11, 6, 252, 0.6), 0 8px 20px -5px rgba(125, 123, 244, 0.4)"
                }}
                animate={{
                    boxShadow: isHovered
                        ? "0 18px 50px -5px rgba(0, 0, 0, 0.6), 0 25px 60px -10px rgba(11, 6, 252, 0.8), 0 15px 40px -5px rgba(125, 123, 244, 0.6), 0 0 70px -10px rgba(93, 89, 232, 0.5)"
                        : "0 12px 35px -5px rgba(0, 0, 0, 0.5), 0 15px 40px -10px rgba(11, 6, 252, 0.6), 0 8px 20px -5px rgba(125, 123, 244, 0.4)",
                    y: isHovered ? -3 : 0,
                }}
                transition={{ duration: 0.3, ease: [0, 0, 0.58, 1] }}
            >
                {/* Background */}
                <div className="absolute inset-0 bg-black rounded-2xl" />

                {/* Liquid layers */}
                <Liquid isHovered={isHovered} colors={defaultColors} />

                {/* Content */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                    <svg
                        className="w-5 h-5 fill-white"
                        viewBox="0 0 438.549 438.549"
                    >
                        <path d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z" />
                    </svg>
                    <span className="text-white text-xl font-bold">Github</span>
                </div>
            </motion.a>
        </section>
    );
}
