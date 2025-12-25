const { execSync } = require('child_process');

function getClipboard() {
    return execSync('pbpaste', { encoding: 'utf-8' });
}

try {
    let clipboard = getClipboard();
    clipboard = clipboard.trim();
    
    execSync(`printf "%s" "${clipboard.replace(/"/g, '\\"')}" | pbcopy`, { shell: '/bin/bash' });
    
    console.log('✓ Clipboard cleaned');
} catch (e) {
    console.error('Error:', e.message);
}