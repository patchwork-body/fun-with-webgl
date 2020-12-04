const renderLoop = (cb: (timestamp: number) => void): void => {
  const loop = (timestamp: number) => {
    cb(timestamp);
    window.requestAnimationFrame(loop);
  };
  window.requestAnimationFrame(loop);
};

export { renderLoop };
