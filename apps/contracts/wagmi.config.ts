import { defineConfig } from '@wagmi/cli'
import { react , hardhat} from '@wagmi/cli/plugins'

export default defineConfig({
  out: 'wagmi/index.ts',
  plugins: [
    hardhat({
      project: '.',
    }),
    react(),
  ],
})
