import { Config } from '@remotion/cli/config';
import fs from 'fs';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setCodec('h264');

// Use custom Windows executable only if running locally on this machine,
// otherwise let Remotion auto-download/detect Chrome on GitHub Actions (Linux)
const localWindowsChrome =
  'D:\\PRODUKSI_KONTEN\\node_modules\\.remotion\\chrome-headless-shell\\win64\\chrome-headless-shell-win64\\chrome-headless-shell.exe';

if (process.platform === 'win32' && fs.existsSync(localWindowsChrome)) {
  Config.setBrowserExecutable(localWindowsChrome);
} else {
  Config.setBrowserExecutable(null);
}
