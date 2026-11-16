const packages = ['ws', 'puppeteer', 'playwright', 'canvas', 'sharp'];
packages.forEach(p => {
  try {
    require(p);
    console.log(p, 'is available');
  } catch (e) {
    console.log(p, 'is not available');
  }
});
