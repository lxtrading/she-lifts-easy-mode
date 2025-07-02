
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.68b5259c4be24e5a82ec07709d0038e2',
  appName: 'she-lifts-easy-mode',
  webDir: 'dist',
  server: {
    url: 'https://68b5259c-4be2-4e5a-82ec-07709d0038e2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#f8fafc'
    }
  }
};

export default config;
