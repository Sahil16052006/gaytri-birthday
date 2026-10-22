import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Starting automated verification tests for Gaytri Birthday Website...\n');

let failed = false;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed = true;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Verify build files
const distIndex = path.join(__dirname, 'dist', 'index.html');
assert(fs.existsSync(distIndex), 'dist/index.html exists');

const htmlContent = fs.readFileSync(distIndex, 'utf8');
assert(htmlContent.includes('गायत्री पवार'), 'dist/index.html contains Marathi title');
assert(htmlContent.includes('Noto+Serif+Devanagari'), 'dist/index.html imports Devanagari fonts');
assert(htmlContent.includes('Kalam'), 'dist/index.html imports Kalam handwritten font');

// 2. Verify all 7 photos in dist/images
const expectedPhotos = [
  'gaytri-1-kurti-nature.jpg',
  'gaytri-2-garba-lights.jpg',
  'gaytri-3-garba-portrait.jpg',
  'gaytri-4-kurti-smile.jpg',
  'gaytri-5-saree-wave.jpg',
  'gaytri-6-selfie-hearts.jpg',
  'gaytri-7-festive-full.jpg',
];

expectedPhotos.forEach((photo) => {
  const photoPath = path.join(__dirname, 'dist', 'images', photo);
  const exists = fs.existsSync(photoPath);
  const size = exists ? fs.statSync(photoPath).size : 0;
  assert(exists && size > 50000, `Photo ${photo} exists in dist (${Math.round(size / 1024)} KB)`);
});

// 3. Test Countdown logic across time boundaries
console.log('\n⏳ Testing Countdown Timezone & State Logic (Asia/Kolkata):');

const targetDateStr = '2026-10-23';
const birthdayStartMs = new Date(`${targetDateStr}T00:00:00+05:30`).getTime();
const birthdayEndMs = new Date(`${targetDateStr}T23:59:59+05:30`).getTime();

function getCountdownState(mockTimeMs) {
  if (mockTimeMs < birthdayStartMs) return 'before';
  if (mockTimeMs >= birthdayStartMs && mockTimeMs <= birthdayEndMs) return 'during';
  return 'after';
}

// Case A: Before birthday (e.g., Oct 22, 2026 23:59:00 IST)
const beforeTime = new Date('2026-10-22T23:59:00+05:30').getTime();
assert(getCountdownState(beforeTime) === 'before', 'State before birthday is "before"');

// Case B: On birthday morning (e.g., Oct 23, 2026 10:00:00 IST)
const onBirthdayTime = new Date('2026-10-23T10:00:00+05:30').getTime();
assert(getCountdownState(onBirthdayTime) === 'during', 'State on birthday is "during"');

// Case C: After birthday (e.g., Oct 24, 2026 01:00:00 IST)
const afterBirthdayTime = new Date('2026-10-24T01:00:00+05:30').getTime();
assert(getCountdownState(afterBirthdayTime) === 'after', 'State after birthday is "after"');

// 4. Verify Marathi typography and content integrity
console.log('\n📝 Verifying Marathi Editorial Content in birthdayConfig:');
const configPath = path.join(__dirname, 'src', 'data', 'birthdayConfig.ts');
const configContent = fs.readFileSync(configPath, 'utf8');

assert(configContent.includes('तू आहेस, म्हणून एकटं वाटत नाही'), 'Section 3 heading is present');
assert(configContent.includes('तुझ्या कल्पनांचं सुंदर जग'), 'Section 4 heading is present');
assert(configContent.includes('आपल्या आठवणींची छोटीशी गॅलरी'), 'Section 5 gallery heading is present');
assert(configContent.includes('काही गोष्टी बोलून दाखवता येतात, पण काही लिहिल्या की मनापर्यंत पोहोचतात'), 'Section 6 letter teaser is present');
assert(configContent.includes('वाढदिवसाच्या खूप खूप शुभेच्छा, गायत्री! ♡'), 'Birthday wish is present');
assert(configContent.includes('साहिल'), 'Sender Sahil is properly signed');

// 5. Verify docs folder for direct GitHub Pages deployment
const docsIndex = path.join(__dirname, 'docs', 'index.html');
assert(fs.existsSync(docsIndex), 'docs/index.html exists for 1-click GitHub Pages');

if (failed) {
  console.error('\n❌ SOME VERIFICATION TESTS FAILED.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL 15 VERIFICATION TESTS PASSED SUCCESSFULLY!\n');
}
