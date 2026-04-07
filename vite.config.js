import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    disabled: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        london: resolve(__dirname, 'scaffolding-london.html'),
        surrey: resolve(__dirname, 'scaffolding-surrey.html'),
        croydon: resolve(__dirname, 'scaffolding-croydon.html'),
        sutton: resolve(__dirname, 'scaffolding-sutton.html'),
        carshalton: resolve(__dirname, 'scaffolding-carshalton.html'),
        mitcham: resolve(__dirname, 'scaffolding-mitcham.html'),
        domestic: resolve(__dirname, 'domestic-scaffolding.html'),
        commercial: resolve(__dirname, 'commercial-scaffolding.html'),
        industrial: resolve(__dirname, 'industrial-scaffolding.html'),
        temp_roof: resolve(__dirname, 'temporary-roof-scaffolding.html'),
        chimney: resolve(__dirname, 'chimney-scaffolding.html'),
        loft: resolve(__dirname, 'loft-scaffolding.html'),
        extension: resolve(__dirname, 'extension-scaffolding.html'),
        cost: resolve(__dirname, 'scaffolding-cost-london.html'),
        permit: resolve(__dirname, 'do-i-need-scaffolding-permit.html'),
        safety: resolve(__dirname, 'scaffolding-safety-guide-uk.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        case_studies: resolve(__dirname, 'case-studies.html'),
        contact: resolve(__dirname, 'contact.html'),
        quote: resolve(__dirname, 'get-quote.html'),
      },
    },
  },
});
