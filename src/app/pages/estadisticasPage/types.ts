import { Embed } from 'powerbi-client';

declare global {
  interface Window {
    report: Embed; // Cambia Report por Embed
  }
}
