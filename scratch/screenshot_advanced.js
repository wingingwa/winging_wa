const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9225;

const edgeProcess = spawn(edgePath, [
  `--remote-debugging-port=${debuggingPort}`,
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=C:\\Users\\Muhammad_Talha\\AppData\\Local\\Temp\\edge_dev_temp3'
]);

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  await wait(2500);
  try {
    const list = await getJson(`http://localhost:${debuggingPort}/json/list`);
    const page = list.find(p => p.type === 'page');
    if (!page) throw new Error('No page found');

    const ws = new WebSocket(page.webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const msgId = id++;
        const onMessage = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === msgId) {
            ws.removeEventListener('message', onMessage);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.addEventListener('message', onMessage);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    });

    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    await send('Page.navigate', { url: 'http://localhost:3000/afs-foils/fuselage-advanced' });
    await wait(3500);

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1000)' });
    await wait(800);
    const shot1 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_choose.jpg', Buffer.from(shot1.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 1600)' });
    await wait(800);
    const shot2 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_nothing_lost.jpg', Buffer.from(shot2.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 2400)' });
    await wait(800);
    const shot3 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_showcase1.jpg', Buffer.from(shot3.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 3100)' });
    await wait(800);
    const shot4 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_showcase2.jpg', Buffer.from(shot4.data, 'base64'));

    console.log('ALL ADVANCED SCREENSHOTS CAPTURED');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    edgeProcess.kill();
  }
}

run();
