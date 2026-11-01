import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';

test('WhatsApp link strips punctuation and URL encodes a Persian message',()=>{
  const output=execFileSync(process.execPath,['--experimental-strip-types','--input-type=module','-e',
    `import {whatsappLink} from './src/lib/whatsapp.ts'; console.log(whatsappLink('سلام 👋 & test'));`
  ],{encoding:'utf8',env:{...process.env,NEXT_PUBLIC_WHATSAPP_NUMBER:'+98 (912) 345-6789'}}).trim();
  assert.equal(output,'https://wa.me/989123456789?text=%D8%B3%D9%84%D8%A7%D9%85%20%F0%9F%91%8B%20%26%20test');
});
