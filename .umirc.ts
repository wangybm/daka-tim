import { defineConfig } from 'umi';

export default defineConfig({
  proxy: {
    '/dev': {
      target: 'http://172.27.104.54:8086',
    },
  },
});
