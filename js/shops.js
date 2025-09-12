import { setupDynamicSection } from './utils.js';
import { gameData } from './config.js';

export function poblarSelectsTienda(card) {
    const typeSelects = card.querySelectorAll('.shop-buy-type');
    typeSelects.forEach(select => {
        select.innerHTML = '';
        const noneOpt = document.createElement('option');
        noneOpt.value = '0';
        noneOpt.textContent = '0 - Ninguno';
        select.appendChild(noneOpt);
        gameData.shopObjectTypes.forEach(t => {
            const option = document.createElement('option');
            option.value = t.value;
            option.textContent = `${t.value} - ${t.label}`;
            select.appendChild(option);
        });
        select.value = '0';
    });

    [card.querySelector('.shop-buy-profit'), card.querySelector('.shop-sell-profit')].forEach(select => {
        select.innerHTML = '';
        gameData.shopProfitOptions.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            select.appendChild(option);
        });
        select.value = '0';
    });

    [card.querySelector('.shop-open-hour'), card.querySelector('.shop-close-hour')].forEach((select, idx) => {
        select.innerHTML = '';
        gameData.shopHours.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            select.appendChild(option);
        });
        select.value = idx === 1 ? '23' : '0';
    });
}

export function inicializarTarjetaShop(cardElement) {
    const header = cardElement.querySelector('.collapsible-header');
    const content = cardElement.querySelector('.collapsible-content');
    if (header && content && !header.dataset.colapsado) {
        header.addEventListener('click', () => {
            content.classList.toggle('collapsed');
        });
        header.dataset.colapsado = 'true';
    }

    const vnumInput = cardElement.querySelector('.shop-vnum');
    const vnumDisplay = cardElement.querySelector('.shop-vnum-display');
    if (vnumInput && vnumDisplay && !vnumInput.dataset.vnumEscucha) {
        vnumInput.addEventListener('input', () => {
            vnumDisplay.textContent = vnumInput.value;
        });
        vnumInput.dataset.vnumEscucha = 'true';
    }

    const commentInput = cardElement.querySelector('.shop-comment');
    const commentDisplay = cardElement.querySelector('.shop-comment-display');
    if (commentInput && commentDisplay && !commentInput.dataset.nombreEscucha) {
        commentInput.addEventListener('input', () => {
            commentDisplay.textContent = commentInput.value;
        });
        commentInput.dataset.nombreEscucha = 'true';
        commentInput.dispatchEvent(new Event('input'));
    }
}

export function setupShopsSection(vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector) {
    setupDynamicSection('add-shop-btn', 'shops-container', 'shop-template', '.shop-card', vnumRangeCheckFunction, vnumSelector, vnumDisplaySelector, nameInputSelector, nameDisplaySelector, (card) => {
        poblarSelectsTienda(card);
        inicializarTarjetaShop(card);
    });

    const container = document.getElementById('shops-container');
    container.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) e.target.closest('.shop-card').remove();
    });
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
        const comment = card.querySelector('.shop-comment').value.trim();
        section += `${vnum} ${buyTypes.join(' ')} ${buyProfit} ${sellProfit} ${open} ${close}${comment ? ` * ${comment}` : ''}\n`;
    });
    return section + '0\n\n';
}