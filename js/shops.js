import { setupDynamicSection } from './utils.js';

export function setupShopsSection(vnumRangeCheckFunction) {
    setupDynamicSection('add-shop-btn', 'shops-container', 'shop-template', '.shop-card', vnumRangeCheckFunction, '.shop-vnum');
}

export function generateShopsSection() {
    const cards = document.querySelectorAll('#shops-container .shop-card');
    if (cards.length === 0) return '#SHOPS\n0\n\n';
    let section = '#SHOPS\n';
    cards.forEach(card => {
        const vnum = card.querySelector('.shop-vnum').value || 0;
        const buyTypes = Array.from(card.querySelectorAll('.shop-buy-type')).map(i => i.value || 0).filter(v => v != 0);
        while(buyTypes.length < 5) buyTypes.push(0);
        const buyProfit = card.querySelector('.shop-buy-profit').value || 0;
        const sellProfit = card.querySelector('.shop-sell-profit').value || 0;
        const open = card.querySelector('.shop-open-hour').value || 0;
        const close = card.querySelector('.shop-close-hour').value || 0;
        section += `${vnum} ${buyTypes.join(' ')} ${buyProfit} ${sellProfit} ${open} ${close}\n`;
    });
    return section + '0\n\n';
}