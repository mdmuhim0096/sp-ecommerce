import { useState, useEffect } from 'react';

const Loader = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState(1);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setFadeOut(true);
                    setTimeout(() => {
                        if (onComplete) onComplete();
                    }, 1000);
                    return 100;
                }
                return prev + 1;
            });
        }, 40);

        return () => clearInterval(interval);
    }, [onComplete]);

    useEffect(() => {
        if (progress > 33) setPhase(2);
        if (progress > 66) setPhase(3);
    }, [progress]);

    const particles = Array.from({ length: 30 }, (_, i) => i);
    const orbitDots = Array.from({ length: 12 }, (_, i) => i);
    const dnaStrands = Array.from({ length: 20 }, (_, i) => i);
    const gridDots = Array.from({ length: 25 }, (_, i) => i);

    return (
        <div className={`preloader ${fadeOut ? 'preloader--fade-out' : ''}`}>
            {/* Animated Background Grid */}
            <div className="preloader__grid">
                {gridDots.map((i) => (
                    <div
                        key={`grid-${i}`}
                        className="preloader__grid-dot"
                        style={{
                            left: `${(i % 5) * 25}%`,
                            top: `${Math.floor(i / 5) * 25}%`,
                            animationDelay: `${i * 0.1}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating Particles */}
            <div className="preloader__particles">
                {particles.map((i) => (
                    <div
                        key={`particle-${i}`}
                        className="preloader__particle"
                        style={{
                            '--x': `${Math.random() * 100}vw`,
                            '--y': `${Math.random() * 100}vh`,
                            '--duration': `${3 + Math.random() * 7}s`,
                            '--delay': `${Math.random() * 5}s`,
                            '--size': `${2 + Math.random() * 4}px`,
                            '--opacity': `${0.2 + Math.random() * 0.5}`,
                        }}
                    />
                ))}
            </div>

            {/* Scanning Lines */}
            <div className="preloader__scan-line preloader__scan-line--h" />
            <div className="preloader__scan-line preloader__scan-line--v" />

            {/* Main Container */}
            <div className="preloader__center">
                {/* Outer Morphing Ring */}
                <div className="preloader__morph-ring">
                    <svg viewBox="0 0 200 200" className="preloader__morph-svg">
                        <defs>
                            <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#00f5ff" />
                                <stop offset="50%" stopColor="#7c3aed" />
                                <stop offset="100%" stopColor="#f43f5e" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <path
                            className="preloader__morph-path"
                            d=""
                            fill="none"
                            stroke="url(#morphGrad)"
                            strokeWidth="1.5"
                            filter="url(#glow)"
                        />
                    </svg>
                </div>

                {/* DNA Helix */}
                <div className="preloader__dna">
                    {dnaStrands.map((i) => (
                        <div
                            key={`dna-${i}`}
                            className="preloader__dna-pair"
                            style={{ animationDelay: `${i * 0.15}s` }}
                        >
                            <div className="preloader__dna-dot preloader__dna-dot--left" />
                            <div className="preloader__dna-line" />
                            <div className="preloader__dna-dot preloader__dna-dot--right" />
                        </div>
                    ))}
                </div>

                {/* Rotating Rings */}
                <div className="preloader__rings">
                    <div className="preloader__ring preloader__ring--1">
                        <div className="preloader__ring-trail" />
                    </div>
                    <div className="preloader__ring preloader__ring--2">
                        <div className="preloader__ring-trail" />
                    </div>
                    <div className="preloader__ring preloader__ring--3">
                        <div className="preloader__ring-trail" />
                    </div>
                    <div className="preloader__ring preloader__ring--4">
                        <div className="preloader__ring-trail" />
                    </div>
                </div>

                {/* Orbit System */}
                <div className="preloader__orbit-system">
                    <div className="preloader__orbit preloader__orbit--1">
                        {orbitDots.slice(0, 4).map((i) => (
                            <div
                                key={`orbit1-${i}`}
                                className="preloader__orbit-dot"
                                style={{
                                    '--angle': `${i * 90}deg`,
                                    animationDelay: `${i * 0.3}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="preloader__orbit preloader__orbit--2">
                        {orbitDots.slice(0, 6).map((i) => (
                            <div
                                key={`orbit2-${i}`}
                                className="preloader__orbit-dot"
                                style={{
                                    '--angle': `${i * 60}deg`,
                                    animationDelay: `${i * 0.25}s`,
                                }}
                            />
                        ))}
                    </div>
                    <div className="preloader__orbit preloader__orbit--3">
                        {orbitDots.slice(0, 8).map((i) => (
                            <div
                                key={`orbit3-${i}`}
                                className="preloader__orbit-dot"
                                style={{
                                    '--angle': `${i * 45}deg`,
                                    animationDelay: `${i * 0.2}s`,
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Hexagon Core */}
                <div className="preloader__hexagon-container">
                    <div className="preloader__hexagon preloader__hexagon--outer">
                        <svg viewBox="0 0 100 100">
                            <polygon
                                points="50,2 93,25 93,75 50,98 7,75 7,25"
                                fill="none"
                                stroke="url(#morphGrad)"
                                strokeWidth="0.5"
                                className="preloader__hex-path"
                            />
                        </svg>
                    </div>
                    <div className="preloader__hexagon preloader__hexagon--mid">
                        <svg viewBox="0 0 100 100">
                            <polygon
                                points="50,10 85,30 85,70 50,90 15,70 15,30"
                                fill="none"
                                stroke="url(#morphGrad)"
                                strokeWidth="0.5"
                                className="preloader__hex-path"
                            />
                        </svg>
                    </div>
                    <div className="preloader__hexagon preloader__hexagon--inner">
                        <svg viewBox="0 0 100 100">
                            <polygon
                                points="50,20 77,35 77,65 50,80 23,65 23,35"
                                fill="none"
                                stroke="url(#morphGrad)"
                                strokeWidth="0.5"
                                className="preloader__hex-path"
                            />
                        </svg>
                    </div>
                </div>

                {/* Pulsing Core */}
                <div className="preloader__core">
                    <div className="preloader__core-pulse preloader__core-pulse--1" />
                    <div className="preloader__core-pulse preloader__core-pulse--2" />
                    <div className="preloader__core-pulse preloader__core-pulse--3" />
                    <div className="preloader__core-inner">
                        <div className="preloader__core-glow" />
                    </div>
                </div>

                {/* Progress Circle */}
                <svg className="preloader__progress-ring" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#00f5ff" />
                            <stop offset="33%" stopColor="#7c3aed" />
                            <stop offset="66%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#00f5ff" />
                        </linearGradient>
                    </defs>
                    <circle
                        className="preloader__progress-bg"
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2"
                    />
                    <circle
                        className="preloader__progress-bar"
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="url(#progressGrad)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 90}`}
                        strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                    />
                </svg>

                {/* Corner Brackets */}
                <div className="preloader__brackets">
                    <div className="preloader__bracket preloader__bracket--tl" />
                    <div className="preloader__bracket preloader__bracket--tr" />
                    <div className="preloader__bracket preloader__bracket--bl" />
                    <div className="preloader__bracket preloader__bracket--br" />
                </div>
            </div>

            {/* Bottom Info */}
            <div className="preloader__info">
                <div className="preloader__percentage">
                    <span className="preloader__percent-number">
                        {String(progress).padStart(3, '0')}
                    </span>
                    <span className="preloader__percent-symbol">%</span>
                </div>

                <div className="preloader__progress-bar-container">
                    <div className="preloader__progress-track">
                        <div
                            className="preloader__progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="preloader__progress-glow"
                            style={{ left: `${progress}%` }}
                        />
                    </div>
                    <div className="preloader__progress-markers">
                        {[0, 25, 50, 75, 100].map((mark) => (
                            <div
                                key={mark}
                                className={`preloader__progress-marker ${progress >= mark ? 'preloader__progress-marker--active' : ''
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="preloader__status">
                    <div className="preloader__status-indicator" />
                    <span className="preloader__status-text">
                        {phase === 1
                            ? 'INITIALIZING MODULES'
                            : phase === 2
                                ? 'LOADING RESOURCES'
                                : 'FINALIZING SETUP'}
                    </span>
                </div>

                <div className="preloader__data-stream">
                    {Array.from({ length: 40 }, (_, i) => (
                        <span
                            key={i}
                            className="preloader__data-char"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            {String.fromCharCode(33 + Math.floor(Math.random() * 93))}
                        </span>
                    ))}
                </div>
            </div>

            {/* Corner Decorations */}
            <div className="preloader__corner preloader__corner--tl">
                <span>SYS.INIT</span>
            </div>
            <div className="preloader__corner preloader__corner--tr">
                <span>v2.4.1</span>
            </div>
            <div className="preloader__corner preloader__corner--bl">
                <span>QUANTUM.LOADER</span>
            </div>
            <div className="preloader__corner preloader__corner--br">
                <span>SECURE</span>
            </div>
        </div>
    );
};

export default Loader;