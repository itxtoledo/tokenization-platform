/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WC_PROJECT_ID: string;
  readonly VITE_PRESALE_FACTORY: `0x${string}`;
}
