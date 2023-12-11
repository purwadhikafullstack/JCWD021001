import { defineConfig } from 'cypress';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: '**/*.{spec,test}.{js,ts,jsx,tsx}',
  },
});
