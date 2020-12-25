const renderLoop = (cb: (timestamp: number) => boolean): number => {
  const loop = (timestamp: number) => {
    const shouldProceed = cb(timestamp);

    if (shouldProceed) {
      window.requestAnimationFrame(loop);
    }
  };

  return window.requestAnimationFrame(loop);
};

export { renderLoop };
