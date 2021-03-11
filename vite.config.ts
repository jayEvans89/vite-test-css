// include: ['vue/**/*.vue', 'vue/**/*.ts']

import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'
import { defineConfig } from 'vite'
import viteESLint from '@ehutch79/vite-eslint'
import fs from 'fs'

export default ({ command }) => {
  if (command === 'serve') {
    return defineConfig({
      plugins: [
        createVuePlugin(),
        {
          ...viteESLint({
            include: ['vue/**/*.vue', 'vue/**/*.ts']
          })
        },
        {
          name: 'reload',
          configureServer(server) {
            const { ws, watcher } = server
            watcher.on('change', file => {
              if (file.endsWith('.html')) {
                ws.send({
                  type: 'full-reload'
                })
              }
            })
          }
        }
      ],
      resolve: {
        alias: {
          '@': path.join(__dirname, 'vue'),
        }
      },
      build: {
        manifest: false,
        rollupOptions: {
          input: getFilesFromDir('./vue/exports', ['.ts']),
          output: {
            chunkFileNames: '[name].js'
          }
        }
      },
      server: {
        port: 3000
      }
    })
  } else {
    return defineConfig({
      plugins: [
        createVuePlugin()
      ],
      resolve: {
        alias: {
          '@': path.join(__dirname, 'vue')
        }
      },
      build: {
        manifest: true,
        rollupOptions: {
          input: ['./vue/exports/home/home.ts', './vue/exports/about/about.ts'],
          output: {
            chunkFileNames: '[name].js'
          }
        },
        outDir: 'assets/dist/js',
        polyfillDynamicImport: true
      },
      base: '/p/assets/dist/js/',
      server: {
        port: 3000
      }
    })
  }
}
// getFilesFromDir('./vue/exports', ['.ts'])
function getFilesFromDir(dir: string, fileTypes: Array<string>): Array<string> {
  const filesToReturn = []
  function walkDir(currentPath: string) {
    const files = fs.readdirSync(currentPath)
    for (const i in files) {
      const curFile = path.join(currentPath, files[i])
      if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) !== -1) {
        filesToReturn.push(curFile.replace(dir, ''))
      } else if (fs.statSync(curFile).isDirectory()) {
        walkDir(curFile)
      }
    }
  }

  walkDir(dir)
  return filesToReturn
}
