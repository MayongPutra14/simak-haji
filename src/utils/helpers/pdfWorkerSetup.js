import * as pdfjsLib from 'pdfjs-dist';

// Gunakan suffix ?url agar Vite secara otomatis mengambil path aset statis dari worker
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export default pdfjsLib;
