import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';

type ArcGalleryHeroProps = {
    images: string[];
    startAngle?: number;
    endAngle?: number;
    radiusLg?: number;
    radiusMd?: number;
    radiusSm?: number;
    cardSizeLg?: number;
    cardSizeMd?: number;
    cardSizeSm?: number;
    className?: string;
};

const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
    images,
    startAngle = -110,
    endAngle = 110,
    radiusLg = 340,
    radiusMd = 280,
    radiusSm = 200,
    cardSizeLg = 120,
    cardSizeMd = 100,
    cardSizeSm = 80,
    className = '',
}) => {
    const [dimensions, setDimensions] = useState({
        radius: radiusLg,
        cardSize: cardSizeLg,
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
            } else if (width < 1024) {
                setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
            } else {
                setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);
    const count = Math.max(images.length, 2);
    const step = (endAngle - startAngle) / (count - 1);

    return (
        <>
            <Navbar />
            <section className={`relative overflow-hidden bg-background min-h-screen flex flex-col ${className}`}>
                <video
                    src="/852122-hd_1280_720_30fps.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div
                    className="relative mx-auto"
                    style={{
                        width: '100%',
                        height: dimensions.radius * 1.2,
                    }}
                >
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                        {images.map((src, i) => {
                            const angle = startAngle + step * i;
                            const angleRad = (angle * Math.PI) / 180;

                            const x = Math.cos(angleRad) * dimensions.radius;
                            const y = Math.sin(angleRad) * dimensions.radius;

                            return (
                                <div
                                    key={i}
                                    className="absolute opacity-0 animate-fade-in-up"
                                    style={{
                                        width: dimensions.cardSize,
                                        height: dimensions.cardSize,
                                        left: `calc(50% + ${x}px)`,
                                        bottom: `${y}px`,
                                        transform: `translate(-50%, 50%)`,
                                        animationDelay: `${i * 100}ms`,
                                        animationFillMode: 'forwards',
                                        zIndex: count - i,
                                    }}
                                >
                                    <div
                                        className="rounded-2xl shadow-xl overflow-hidden ring-1 ring-border bg-card transition-transform hover:scale-105 w-full h-full"
                                        style={{ transform: `rotate(${angle / 4}deg)` }}
                                    >
                                        <img
                                            src={src}
                                            alt=""
                                            className="block w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className="relative z-10 flex-1 flex items-center justify-center px-6 -mt-40 md:-mt-52 lg:-mt-64">
                    <div className="text-center max-w-2xl px-6 opacity-0 animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-200" style={{ WebkitTextStroke: '1px black', color: 'white' }}>
                            Make QLunch your new obsession
                        </h1>
                        <p className="mt-4 text-lg">
                            Order Delicious Food in Seconds.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Order Now
                            </button>
                            <button className="w-full sm:w-auto px-6 py-3 rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                                Learn more
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ArcGalleryHero;