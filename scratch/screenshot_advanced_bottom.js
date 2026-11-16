const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9226;

const edgeProcess = spawn(edgePath, [
  `--remote-debugging-port=${debuggingPort}`,
  '--headless=new',
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--user-data-dir=C:\\Users\\Muhammad_Talha\\AppData\\Local\\Temp\\edge_dev_temp4'
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

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 3900)' });
    await wait(800);
    const shot5 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_showcase3.jpg', Buffer.from(shot5.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 4800)' });
    await wait(800);
    const shot6 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_showcase4.jpg', Buffer.from(shot6.data, 'base64'));

    await send('Runtime.evaluate', { expression: 'window.scrollTo(0, 5600)' });
    await wait(800);
    const shot7 = await send('Page.captureScreenshot', { format: 'jpeg', quality: 80 });
    fs.writeFileSync('scratch/advanced_showcase5.jpg', Buffer.from(shot7.data, 'base64'));

    console.log('ALL REMAINING ADVANCED SCREENSHOTS CAPTURED');
    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    edgeProcess.kill();
  }
}

run();
