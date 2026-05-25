(() => {
  const SETUP_COST = 1500;
  const MAX_AGENTS = 1250;
  const DEFAULT_API_URL = 'https://language-retrieve-again-wagon.trycloudflare.com/generate';
  const API_STORAGE_KEY = 'ezmax_api_url';
  const LANG_STORAGE_KEY = 'ezmax_lang';

  const TIERS = [
    { label: '1 - 10', min: 1, max: 10, included: 0, ezmax: [204.40, 0.00], edm: [112.10, 0.00], ezsign: [116.90, 0.00], admins: 1 },
    { label: '11 - 20', min: 11, max: 20, included: 10, ezmax: [204.40, 9.32], edm: [112.10, 10.60], ezsign: [116.90, 11.15], admins: 2 },
    { label: '21 - 50', min: 21, max: 50, included: 20, ezmax: [297.60, 9.02], edm: [218.10, 10.11], ezsign: [228.40, 10.55], admins: 3 },
    { label: '51 - 100', min: 51, max: 100, included: 50, ezmax: [568.20, 4.21], edm: [521.40, 8.96], ezsign: [544.00, 9.99], admins: 4 },
    { label: '101 - 250', min: 101, max: 250, included: 100, ezmax: [778.70, 2.77], edm: [969.40, 7.81], ezsign: [1044.40, 9.46], admins: 5 },
    { label: '251 - 500', min: 251, max: 500, included: 250, ezmax: [1194.20, 1.92], edm: [2140.90, 6.72], ezsign: [2463.40, 8.90], admins: 6 },
    { label: '501 - 1,250', min: 501, max: 1250, included: 500, ezmax: [1624.20, 1.75], edm: [3820.90, 5.57], ezsign: [2688.40, 7.76], admins: 7 },
  ];

  const UI = {
    en: {
      pageTitle: 'eZmax Proposal Generator',
      subtitle: 'Calculator and offer builder',
      langButton: 'FR',
      inputsTitle: 'Proposal Inputs',
      companyName: 'Company name',
      companyPlaceholder: 'Real Estate Advisors',
      agents: 'Real estate agents',
      apiUrl: 'Server URL',
      ezmaxDesc: 'Core brokerage system',
      edmName: 'EDM',
      edmDesc: 'Optional document module',
      ezsignDesc: 'Optional signature module',
      generate: 'Generate Word + PDF',
      generating: 'Generating...',
      reset: 'Reset',
      summaryTitle: 'Monthly Summary',
      setupCost: 'Setup cost',
      monthlyTotal: 'Monthly total',
      averageCost: 'Per agent',
      previewTitle: 'Calculation Preview',
      pricingTitle: 'Contract Pricing Table',
      agentsHeader: 'Agents',
      includedHeader: 'Included',
      edmHeader: 'EDM',
      adminsHeader: 'eZsign admins',
      rparea: 'RPAREA',
      selectedServices: 'Selected monthly services:',
      noComponent: 'Select at least one component.',
      noComponentPreview: '- No component selected',
      generationNeedName: 'Enter the company name before generating the proposal.',
      generationWorking: 'Generating proposal ZIP...',
      generationDone: 'Proposal generated. The ZIP contains the Word document and PDF.',
      generationFailed: 'Generation failed',
      tierSuffix: 'agents',
      pricingIntro: count => `Pricing calculations are based on ${count} real estate agent${count === 1 ? '' : 's'}.`,
      serviceLine: (label, count, total) => `- Monthly ${label} fee (${count} agents): ${total}`,
      totalLine: total => `Total monthly recurring fee: ${total}`,
      averageLine: average => `Average monthly recurring cost per agent: ${average}`,
      monthlyFeeTitle: label => `Monthly ${label} Fee`,
      subscriptionLine: (count, tier) => `Your subscription includes ${count} real estate agent${count === 1 ? '' : 's'}. You are in the ${tier} agents bracket.`,
      noRateLine: base => `The base cost for this bracket is ${base}. No additional-agent rate applies in this bracket.`,
      rateLine: (base, included, rate) => `The base cost of ${base} includes ${included} agents. Additional agents are billed at ${rate} each.`,
      edmInfo: 'EDM is an optional maximum monthly fee. Each block of 900 files costs $115.00/month, and usage moves to the next block when the agreed monthly file count is exceeded.',
      fileNote: '(1 list = 1 file | 1 transaction = 1 file)',
      ezsignInfo: count => `This bracket includes ${count} eZsign admin account${count === 1 ? '' : 's'}.`,
      detailedCalc: 'Detailed monthly fee calculation:',
      avgPerAgent: value => `Average monthly cost per agent: ${value}.`,
      components: { ezmax: 'eZmax', edm: 'EDM', ezsign: 'eZsign' },
    },
    fr: {
      pageTitle: 'Générateur de proposition eZmax',
      subtitle: "Calculateur et générateur d'offre",
      langButton: 'EN',
      inputsTitle: 'Paramètres de la proposition',
      companyName: 'Nom de la compagnie',
      companyPlaceholder: "Ex. Agence immobilière",
      agents: 'Agents immobiliers',
      apiUrl: 'URL du serveur',
      ezmaxDesc: 'Système principal de courtage',
      edmName: 'GED',
      edmDesc: 'Module documentaire optionnel',
      ezsignDesc: 'Module de signature optionnel',
      generate: 'Générer Word + PDF',
      generating: 'Génération...',
      reset: 'Réinitialiser',
      summaryTitle: 'Résumé mensuel',
      setupCost: "Frais d'installation",
      monthlyTotal: 'Total mensuel',
      averageCost: 'Par agent',
      previewTitle: 'Aperçu du calcul',
      pricingTitle: 'Tableau de tarification du contrat',
      agentsHeader: 'Agents',
      includedHeader: 'Inclus',
      edmHeader: 'GED',
      adminsHeader: 'Admins eZsign',
      rparea: 'TPASI',
      selectedServices: 'Services mensuels sélectionnés:',
      noComponent: 'Sélectionnez au moins une composante.',
      noComponentPreview: '- Aucune composante sélectionnée',
      generationNeedName: 'Entrez le nom de la compagnie avant de générer la proposition.',
      generationWorking: 'Génération du ZIP...',
      generationDone: 'Proposition générée. Le ZIP contient le document Word et le PDF.',
      generationFailed: 'Échec de la génération',
      tierSuffix: 'agents',
      pricingIntro: count => `Les calculs de tarification sont basés sur ${count} agent${count === 1 ? '' : 's'} immobilier${count === 1 ? '' : 's'}.`,
      serviceLine: (label, count, total) => `- Frais mensuels ${label} (${count} agents): ${total}`,
      totalLine: total => `Total mensuel récurrent: ${total}`,
      averageLine: average => `Coût mensuel récurrent moyen par agent: ${average}`,
      monthlyFeeTitle: label => `Frais mensuels ${label}`,
      subscriptionLine: (count, tier) => `Votre abonnement comprend ${count} agent${count === 1 ? '' : 's'} immobilier${count === 1 ? '' : 's'}. Vous êtes dans la tranche de ${tier} agents.`,
      noRateLine: base => `Le coût de base pour cette tranche est de ${base}. Aucun tarif par agent supplémentaire ne s'applique dans cette tranche.`,
      rateLine: (base, included, rate) => `Le coût de base de ${base} comprend ${included} agents. Les agents supplémentaires sont facturés ${rate} chacun.`,
      edmInfo: "La GED est un frais mensuel maximal optionnel. Chaque bloc de 900 dossiers coûte 115,00 $/mois, et l'utilisation passe au bloc suivant lorsque le nombre mensuel convenu est dépassé.",
      fileNote: '(1 liste = 1 dossier | 1 transaction = 1 dossier)',
      ezsignInfo: count => `Cette tranche comprend ${count} compte${count === 1 ? '' : 's'} administrateur eZsign.`,
      detailedCalc: 'Calcul détaillé des frais mensuels:',
      avgPerAgent: value => `Coût mensuel moyen par agent: ${value}.`,
      components: { ezmax: 'eZmax', edm: 'GED', ezsign: 'eZsign' },
    },
  };

  let LANG = localStorage.getItem(LANG_STORAGE_KEY) === 'fr' ? 'fr' : 'en';
  let moneyFmt = makeMoneyFormatter();
  let isGenerating = false;
  const els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function makeMoneyFormatter() {
    return new Intl.NumberFormat(LANG === 'fr' ? 'fr-CA' : 'en-CA', {
      style: 'currency',
      currency: 'CAD',
    });
  }

  function money(value) {
    return moneyFmt.format(Number(value) || 0);
  }

  function roundMoney(value) {
    return Math.round((Number(value) || 0) * 100) / 100;
  }

  function tierLabel(tier) {
    return LANG === 'fr' ? tier.label.replace(' - ', ' à ') : tier.label;
  }

  function findTier(agents) {
    return TIERS.find(tier => agents >= tier.min && agents <= tier.max) || TIERS[TIERS.length - 1];
  }

  function selectedComponents() {
    return [
      ['ezmax', els.includeEzmax.checked],
      ['edm', els.includeEdm.checked],
      ['ezsign', els.includeEzsign.checked],
    ].filter(([, selected]) => selected).map(([key]) => key);
  }

  function componentBreakdown(key, agents) {
    const tier = findTier(agents);
    const [base, rate] = tier[key];
    const extraAgents = Math.max(0, agents - tier.included);
    const extraCost = roundMoney(extraAgents * rate);
    const total = roundMoney(base + extraCost);

    return {
      key,
      label: UI[LANG].components[key],
      tier,
      base,
      rate,
      extraAgents,
      extraCost,
      total,
      average: roundMoney(total / agents),
    };
  }

  function formulaLine(item, agents) {
    if (item.rate === 0) {
      return `${money(item.base)} = ${money(item.total)}`;
    }
    return `${money(item.base)} + ((${agents} - ${item.tier.included}) x ${money(item.rate)}) = ${money(item.total)}`;
  }

  function detailBlock(item, agents) {
    const t = UI[LANG];
    const lines = [];
    lines.push(t.monthlyFeeTitle(item.label));
    lines.push(t.subscriptionLine(agents, tierLabel(item.tier)));

    if (item.rate === 0) {
      lines.push(t.noRateLine(money(item.base)));
    } else {
      lines.push(t.rateLine(money(item.base), item.tier.included, money(item.rate)));
    }

    if (item.key === 'edm') {
      lines.push(t.edmInfo);
      lines.push(t.fileNote);
    }

    if (item.key === 'ezsign') {
      lines.push(t.ezsignInfo(item.tier.admins));
    }

    lines.push(t.detailedCalc);
    lines.push(formulaLine(item, agents));
    lines.push(t.avgPerAgent(money(item.average)));
    return lines.join('\n');
  }

  function normalizeApiUrl(value) {
    const raw = (value || '').trim() || DEFAULT_API_URL;
    if (/^https?:\/\/(127\.0\.0\.1|localhost):8000\/generate\/?$/i.test(raw)) {
      return DEFAULT_API_URL;
    }
    if (raw.endsWith('/generate')) return raw;
    return raw.replace(/\/+$/, '') + '/generate';
  }

  function addMonthsSafe(date, months) {
    const d = new Date(date);
    const day = d.getDate();
    d.setMonth(d.getMonth() + months);
    if (d.getDate() < day) d.setDate(0);
    return d;
  }

  function formatDate(date) {
    return date.toLocaleDateString(LANG === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function setStatus(message, type) {
    els.status.textContent = message || '';
    els.status.className = 'status' + (type ? ` ${type}` : '');
  }

  function applyLanguage() {
    const t = UI[LANG];
    document.documentElement.lang = LANG;
    document.title = t.pageTitle;
    els.appTitle.textContent = t.pageTitle;
    els.appSubtitle.textContent = t.subtitle;
    els.langBtn.textContent = t.langButton;
    els.inputsTitle.textContent = t.inputsTitle;
    els.companyNameLabel.textContent = t.companyName;
    els.companyName.placeholder = t.companyPlaceholder;
    els.agentsLabel.textContent = t.agents;
    els.apiUrlLabel.textContent = t.apiUrl;
    els.ezmaxDesc.textContent = t.ezmaxDesc;
    els.edmName.textContent = t.edmName;
    els.edmDesc.textContent = t.edmDesc;
    els.ezsignDesc.textContent = t.ezsignDesc;
    els.generateBtn.textContent = isGenerating ? t.generating : t.generate;
    els.resetBtn.textContent = t.reset;
    els.summaryTitle.textContent = t.summaryTitle;
    els.setupCostLabel.textContent = t.setupCost;
    els.monthlyTotalLabel.textContent = t.monthlyTotal;
    els.averageCostLabel.textContent = t.averageCost;
    els.previewTitle.textContent = t.previewTitle;
    els.pricingTitle.textContent = t.pricingTitle;
    els.thAgents.textContent = t.agentsHeader;
    els.thIncluded.textContent = t.includedHeader;
    els.thEzmaxRate.textContent = `eZmax ${t.rparea}`;
    els.thEdm.textContent = t.edmHeader;
    els.thEdmRate.textContent = `${t.edmHeader} ${t.rparea}`;
    els.thEzsignRate.textContent = `eZsign ${t.rparea}`;
    els.thAdmins.textContent = t.adminsHeader;
    moneyFmt = makeMoneyFormatter();
    calculate();
  }

  function renderPricingTable(activeTier) {
    const tbody = els.pricingTable.querySelector('tbody');
    tbody.innerHTML = TIERS.map(tier => `
      <tr class="${tier.label === activeTier.label ? 'active' : ''}">
        <td>${tierLabel(tier)}</td>
        <td>${tier.included}</td>
        <td>${money(tier.ezmax[0])}</td>
        <td>${money(tier.ezmax[1])}</td>
        <td>${money(tier.edm[0])}</td>
        <td>${money(tier.edm[1])}</td>
        <td>${money(tier.ezsign[0])}</td>
        <td>${money(tier.ezsign[1])}</td>
        <td>${tier.admins}</td>
      </tr>
    `).join('');
  }

  function calculate() {
    if (!els.agents) return;
    const t = UI[LANG];
    const agents = Math.max(1, Math.floor(Number(els.agents.value) || 1));
    const boundedAgents = Math.min(agents, MAX_AGENTS);
    if (String(els.agents.value) !== String(boundedAgents)) {
      els.agents.value = boundedAgents;
    }

    const selected = selectedComponents();
    const tier = findTier(boundedAgents);
    const items = selected.map(key => componentBreakdown(key, boundedAgents));
    const monthlyTotal = roundMoney(items.reduce((sum, item) => sum + item.total, 0));
    const average = selected.length ? roundMoney(monthlyTotal / boundedAgents) : 0;

    els.setupCost.textContent = money(SETUP_COST);
    els.monthlyTotal.textContent = money(monthlyTotal);
    els.averageCost.textContent = money(average);
    els.tierBadge.textContent = `${tierLabel(tier)} ${t.tierSuffix}`;

    els.lineItems.innerHTML = items.length
      ? items.map(item => `
          <div class="lineItem">
            <div>
              <strong>${item.label}</strong>
              <span>${formulaLine(item, boundedAgents)}</span>
            </div>
            <strong>${money(item.total)}</strong>
          </div>
        `).join('')
      : `<div class="lineItem"><span>${t.noComponent}</span><strong>-</strong></div>`;

    const preview = [];
    preview.push(t.pricingIntro(boundedAgents));
    preview.push('');
    preview.push(t.selectedServices);
    if (items.length) {
      items.forEach(item => preview.push(t.serviceLine(item.label, boundedAgents, money(item.total))));
      preview.push(t.totalLine(money(monthlyTotal)));
      preview.push(t.averageLine(money(average)));
    } else {
      preview.push(t.noComponentPreview);
    }
    preview.push('');
    preview.push(items.map(item => detailBlock(item, boundedAgents)).join('\n\n'));
    els.calculationPreview.textContent = preview.join('\n');

    renderPricingTable(tier);
    els.generateBtn.disabled = items.length === 0 || isGenerating;
  }

  function filenameFromDisposition(disposition) {
    if (!disposition) return 'eZmax Proposal Word PDF.zip';
    const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/i);
    if (utfMatch) return decodeURIComponent(utfMatch[1]);
    const match = disposition.match(/filename="?([^"]+)"?/i);
    return match ? match[1].trim() : 'eZmax Proposal Word PDF.zip';
  }

  async function generateProposal() {
    const t = UI[LANG];
    const companyName = els.companyName.value.trim();
    if (!companyName) {
      setStatus(t.generationNeedName, 'error');
      els.companyName.focus();
      return;
    }

    const selected = selectedComponents();
    if (!selected.length) {
      setStatus(t.noComponent, 'error');
      return;
    }

    const agents = Math.max(1, Math.min(MAX_AGENTS, Math.floor(Number(els.agents.value) || 1)));
    const today = new Date();
    const validUntil = addMonthsSafe(today, 3);
    const apiUrl = normalizeApiUrl(els.apiUrl.value);
    localStorage.setItem(API_STORAGE_KEY, apiUrl);

    const payload = {
      companyName,
      agents,
      includeEzmax: els.includeEzmax.checked,
      includeEdm: els.includeEdm.checked,
      includeEzsign: els.includeEzsign.checked,
      date: formatDate(today),
      validUntil: formatDate(validUntil),
      lang: LANG,
    };

    isGenerating = true;
    els.generateBtn.disabled = true;
    els.generateBtn.textContent = t.generating;
    setStatus(t.generationWorking, '');

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Server returned ${res.status}`);
      }

      const blob = await res.blob();
      const filename = filenameFromDisposition(res.headers.get('content-disposition'));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setStatus(t.generationDone, 'ok');
    } catch (error) {
      setStatus(`${t.generationFailed}: ${error.message}`, 'error');
    } finally {
      isGenerating = false;
      els.generateBtn.textContent = UI[LANG].generate;
      calculate();
    }
  }

  function resetForm() {
    els.companyName.value = '';
    els.agents.value = 18;
    els.includeEzmax.checked = true;
    els.includeEdm.checked = true;
    els.includeEzsign.checked = false;
    setStatus('', '');
    calculate();
  }

  function toggleLanguage() {
    LANG = LANG === 'fr' ? 'en' : 'fr';
    localStorage.setItem(LANG_STORAGE_KEY, LANG);
    applyLanguage();
  }

  function init() {
    [
      'appTitle',
      'appSubtitle',
      'langBtn',
      'inputsTitle',
      'companyNameLabel',
      'agentsLabel',
      'apiUrlLabel',
      'ezmaxDesc',
      'edmName',
      'edmDesc',
      'ezsignDesc',
      'companyName',
      'agents',
      'apiUrl',
      'includeEzmax',
      'includeEdm',
      'includeEzsign',
      'generateBtn',
      'resetBtn',
      'status',
      'summaryTitle',
      'setupCostLabel',
      'monthlyTotalLabel',
      'averageCostLabel',
      'setupCost',
      'monthlyTotal',
      'averageCost',
      'tierBadge',
      'lineItems',
      'previewTitle',
      'pricingTitle',
      'calculationPreview',
      'pricingTable',
      'thAgents',
      'thIncluded',
      'thEzmaxRate',
      'thEdm',
      'thEdmRate',
      'thEzsignRate',
      'thAdmins',
    ].forEach(id => {
      els[id] = $(id);
    });

    const storedApiUrl = localStorage.getItem(API_STORAGE_KEY);
    els.apiUrl.value = !storedApiUrl || storedApiUrl.includes(':5060/') || storedApiUrl.includes(':8000/generate')
      ? DEFAULT_API_URL
      : storedApiUrl;

    ['agents', 'includeEzmax', 'includeEdm', 'includeEzsign'].forEach(id => {
      els[id].addEventListener('input', calculate);
      els[id].addEventListener('change', calculate);
    });
    els.apiUrl.addEventListener('change', () => {
      els.apiUrl.value = normalizeApiUrl(els.apiUrl.value);
      localStorage.setItem(API_STORAGE_KEY, els.apiUrl.value);
    });
    els.generateBtn.addEventListener('click', generateProposal);
    els.resetBtn.addEventListener('click', resetForm);
    els.langBtn.addEventListener('click', toggleLanguage);

    applyLanguage();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
