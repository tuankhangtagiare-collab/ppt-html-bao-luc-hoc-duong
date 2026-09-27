import { createServer } from 'vite';
import open, { apps } from 'open';
import { exec } from 'child_process';

// Catch any background spawn/ENOENT errors so server never crashes in headless environments
process.on('uncaughtException', (err) => {
  if (err && (err.code === 'ENOENT' || (err.syscall && err.syscall.includes('spawn')))) {
    // Gracefully handle missing browser binary on Linux/cloud
    return;
  }
  console.error('Server process error:', err);
});

const isCloud = Boolean(
  process.env.RENDER ||
  process.env.PORT ||
  process.env.CI ||
  process.env.NODE_ENV === 'production'
);

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;

async function start() {
  try {
    const server = await createServer({
      configFile: './vite.config.js',
      root: process.cwd(),
      server: {
        port,
        host: '0.0.0.0'
      }
    });

    await server.listen();

    const info = server.httpServer.address();
    const actualPort = info && typeof info === 'object' ? info.port : port;
    const url = `http://localhost:${actualPort}`;

    console.log('\n=============================================================');
    console.log('   BẠO LỰC HỌC ĐƯỜNG — PRESENTATION ENGINE (CINEMATIC 3D)');
    console.log('   Hiểu đúng – Ngăn chặn – Cùng xây dựng trường học an toàn');
    console.log('=============================================================\n');
    console.log(`Server started successfully:`);
    console.log(`  -> Listening on: http://0.0.0.0:${actualPort}`);
    console.log(`  -> Local URL:    ${url}`);

    if (!isCloud) {
      console.log(`\nOpening browser...`);
      try {
        const cp = await open(url, { app: { name: apps.chrome } }).catch(() => null);
        if (cp && typeof cp.on === 'function') {
          cp.on('error', () => {});
        }
      } catch {
        try {
          const child = exec(`start chrome "${url}"`, (err) => {
            if (err) {
              open(url).catch(() => {});
            }
          });
          if (child && typeof child.on === 'function') {
            child.on('error', () => {});
          }
        } catch {
          // ignore browser open failure
        }
      }
    } else {
      console.log('\n[Cloud / Render Environment Detected]');
      console.log('Headless server active. Browser launch skipped.');
    }

    console.log('\n[Presentation Ready] Web server is serving incoming requests.\n');
  } catch (error) {
    console.error('Failed to start presentation server:', error);
    process.exit(1);
  }
}

start();
