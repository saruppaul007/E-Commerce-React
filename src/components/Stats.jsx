import React, { useState, useEffect, useRef } from 'react'

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={elementRef} className="inline-block">
      {prefix}{count}{suffix}
    </span>
  );
};

const Stats = () => {
  return (
    <div className='-mt-24'>
      <section className="relative z-10 overflow-hidden bg-primary py-8 sm:py-12 md:py-16 lg:py-20 bg-[--green] mx-[-20px] sm:mx-[-40px] md:mx-[-60px] lg:mx-[-80px] xl:mx-[-125px]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Mobile View - Vertical Stack */}
          <div className="flex flex-col space-y-8 sm:hidden">
            {/* Stat 1 */}
            <div className="max-w-sm mx-auto">
              <div className="text-center">
                <h3 className="mb-2 text-3xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                  <AnimatedCounter end={1} duration={700} suffix="M+" />
                </h3>
                <p className="text-sm text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] px-2">
                  Customers visit Fashion Store every month to get their service done.
                </p>
              </div>
            </div>
            
            {/* Stat 2 */}
            <div className="max-w-sm mx-auto">
              <div className="text-center">
                <h3 className="mb-2 text-3xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                  <AnimatedCounter end={92} duration={2000} suffix="%" />
                </h3>
                <p className="text-sm text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards] px-2">
                  Satisfaction rate comes from our awesome customers.
                </p>
              </div>
            </div>
            
            {/* Stat 3 */}
            <div className="max-w-sm mx-auto">
              <div className="text-center">
                <h3 className="mb-2 text-3xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                  <AnimatedCounter end={30} duration={1800} suffix="+" />
                </h3>
                <p className="text-sm text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards] px-2">
                  Average Award we have got all over internet.
                </p>
              </div>
            </div>
          </div>

          {/* Tablet and Small PC View - Mixed Layout */}
          <div className="hidden sm:block lg:hidden">
            {/* First row - 2 stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 mb-8">
              {/* Stat 1 */}
              <div className="flex-1 max-w-sm mx-auto">
                <div className="text-center">
                  <h3 className="mb-3 text-4xl md:text-5xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                    <AnimatedCounter end={1} duration={700} suffix="M+" />
                  </h3>
                  <p className="text-base md:text-lg text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] px-4">
                    Customers visit Fashion Store every month to get their service done.
                  </p>
                </div>
              </div>
              
              {/* Stat 2 */}
              <div className="flex-1 max-w-sm mx-auto">
                <div className="text-center">
                  <h3 className="mb-3 text-4xl md:text-5xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                    <AnimatedCounter end={92} duration={2000} suffix="%" />
                  </h3>
                  <p className="text-base md:text-lg text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards] px-4">
                    Satisfaction rate comes from our awesome customers.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Second row - 1 stat centered */}
            <div className="flex justify-center">
              <div className="flex-1 max-w-sm mx-auto">
                <div className="text-center">
                  <h3 className="mb-3 text-4xl md:text-5xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                    <AnimatedCounter end={30} duration={1800} suffix="+" />
                  </h3>
                  <p className="text-base md:text-lg text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards] px-4">
                    Average Award we have got all over internet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View - Horizontal Layout */}
          <div className="hidden lg:flex lg:justify-center lg:space-x-8 xl:space-x-12">
            {/* Stat 1 */}
            <div className="flex-1 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <h3 className="mb-4 text-4xl xl:text-5xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                  <AnimatedCounter end={1} duration={700} suffix="M+" />
                </h3>
                <p className="text-lg text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.5s_forwards] px-2">
                  Customers visit Fashion Store every month to get their service done.
                </p>
              </div>
            </div>
            
            {/* Stat 2 */}
            <div className="flex-1 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <h3 className="mb-4 text-4xl xl:text-5xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                  <AnimatedCounter end={92} duration={2000} suffix="%" />
                </h3>
                <p className="text-lg text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.7s_forwards] px-2">
                  Satisfaction rate comes from our awesome customers.
                </p>
              </div>
            </div>
            
            {/* Stat 3 */}
            <div className="flex-1 max-w-sm mx-auto lg:mx-0">
              <div className="text-center">
                <h3 className="mb-4 text-4xl xl:text-5xl leading-[1.2] text-black itim-regular transform transition-all duration-1000 hover:scale-105 instrument-sans-regular">
                  <AnimatedCounter end={30} duration={1800} suffix="+" />
                </h3>
                <p className="text-lg text-black instrument-sans-regular opacity-0 animate-[fadeInUp_1s_ease-out_0.9s_forwards] px-2">
                  Average Award we have got all over internet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Stats