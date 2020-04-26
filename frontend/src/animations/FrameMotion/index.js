export function containerMotion(delayTime) {
  return {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: delayTime,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  }
};

export const itemMotion = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
