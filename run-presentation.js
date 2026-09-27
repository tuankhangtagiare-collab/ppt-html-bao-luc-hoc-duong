import { createServer } from 'vite';
import open, { apps } from 'open';
import { exec } from 'child_process';

async function start() {
  try {
    const server = await createServer({
      configFile: './vite.config.js',
      root: process.cwd(),
      server: {
        port: 5173
      }
    });

    await server.listen();

    const info = server.httpServer.address();
    const port = info ? info.port : 5173;
    const url = `http://localhost:${port}`;

    console.log('\n=============================================================');
    console.log('   BẠO LỰC HỌC ĐƯỜNG — PRESENTATION ENGINE (CINEMATIC 3D)');
    console.log('   Hiểu đúng – Ngăn chặn – Cùng xây dựng trường học an toàn');
    console.log('=============================================================\n');
    console.log(`Local presentation server started:`);
    console.log(`  -> URL: ${url}`);
    console.log(`\nOpening Google Chrome...`);

    let opened = false;

    // Method 1: Try open package with Chrome app
    try {
      await open(url, { app: { name: apps.chrome } });
      opened = true;
      console.log('  -> Launched via Google Chrome.');
    } catch {
      // Method 2: On Windows, use start chrome directly
      exec(`start chrome "${url}"`, (err) => {
        if (!err) {
          console.log('  -> Launched via Windows Chrome command.');
          opened = true;
        } else {
          // Method 3: Fallback to system default browser
          console.log('  -> Chrome command unavailable, launching default system browser...');
          open(url).catch((fallbackErr) => {
            console.error('Failed to open browser automatically:', fallbackErr.message);
            console.log(`Please open your browser manually at: ${url}`);
          });
        }
      });
    }

    console.log('\n[Presentation Ready] Press Ctrl+C to stop the presentation server.\n');
  } catch (error) {
    console.error('Failed to start presentation server:', error);
    process.exit(1);
  }
}

start();
