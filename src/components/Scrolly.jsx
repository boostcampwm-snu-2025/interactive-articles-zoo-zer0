import { useEffect, useRef } from 'react';

const Scrolly = ({ 
  offset = 0.5, 
  onStepEnter, 
  onStepExit,
  onStepProgress,
  debug = false,
  children 
}) => {
  const stepRefs = useRef([]);
  const lastActiveIndex = useRef(null);

  useEffect(() => {
    if (stepRefs.current.length === 0) return;

    // Convert offset to rootMargin (e.g., 0.5 -> "-50% 0px -50% 0px")
    const topMargin = -(offset * 100);
    const bottomMargin = topMargin;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.target.dataset.stepIndex) return;
          
          const stepIndex = parseInt(entry.target.dataset.stepIndex);
          const stepData = entry.target.dataset.stepData;
          
          if (isNaN(stepIndex)) return;

          // Determine scroll direction
          const direction = entry.boundingClientRect.top < 0 ? 'down' : 'up';

          if (entry.isIntersecting) {
            // Step entered
            if (onStepEnter && lastActiveIndex.current !== stepIndex) {
              onStepEnter({
                data: stepData || stepIndex,
                index: stepIndex,
                element: entry.target,
                direction
              });
              lastActiveIndex.current = stepIndex;
            }

            // Progress tracking (if enabled)
            if (onStepProgress) {
              const rect = entry.target.getBoundingClientRect();
              const viewportHeight = window.innerHeight;
              const progress = Math.max(0, Math.min(1, 
                1 - (rect.top / (viewportHeight - rect.height))
              ));
              
              onStepProgress({
                data: stepData || stepIndex,
                index: stepIndex,
                progress
              });
            }
          } else {
            // Step exited
            if (onStepExit && lastActiveIndex.current === stepIndex) {
              onStepExit({
                data: stepData || stepIndex,
                index: stepIndex,
                element: entry.target,
                direction
              });
              lastActiveIndex.current = null;
            }
          }
        });
      },
      { 
        threshold: 0,
        rootMargin: `${topMargin}% 0px ${bottomMargin}% 0px`
      }
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => {
      if (observer) observer.disconnect();
    };
  }, [offset, onStepEnter, onStepExit, onStepProgress]);

  return (
    <>
      {debug && (
        <div style={{
          position: 'fixed',
          top: `${offset * 100}%`,
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'red',
          zIndex: 9999,
          pointerEvents: 'none'
        }} />
      )}
      {children && children.map((child, index) => {
        if (!child) return null;
        return (
          <div
            key={child.key || index}
            ref={(el) => (stepRefs.current[index] = el)}
            data-step-index={index}
            data-step-data={child.props?.data}
          >
            {child}
          </div>
        );
      })}
    </>
  );
};

const ScrollyStep = ({ data, children }) => {
  return <>{children}</>;
};

export { Scrolly, ScrollyStep };
export default Scrolly;