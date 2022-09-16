import fs from "fs";

export const renderMain = (
  ts: boolean,
  router: boolean,
  pinia: boolean,
  root: string
) => {
  const template = `
        import { createApp } from 'vue'
        ${pinia ? "import { setupStore } from '/@/store'" : ""}  
        import App from './App.vue'
        ${router ? "import router from './router'" : ""}  
        const app = createApp(App)
        
        
        function bootStrop() {
            ${router ? "app.use(createPinia())" : ""}  
            ${pinia ? "setupStore(app);" : ""}  
            app.mount("#app");
          }
        bootStrop();
    `;
  const name = ts ? "main.ts" : "main.js";
  const path = `${root}/src/${name}`;
  fs.writeFileSync(path, JSON.stringify(template, null, 2) + "\n");
};
