// Refined Polymorphism Reborn：CurseForge 创建项目页自动填表脚本（由 build_fill_js.py 生成）
// 用法：作者后台界面切换为英文，打开「Create A Project」页面，按 F12 打开控制台，粘贴本脚本回车
// 脚本逐步填写并自动点 Next、确认头像裁剪框；有字段未填上时停在当前步骤；不会点击最终的创建按钮
(async () => {
  const DATA = {"name": "Refined Polymorphism Reborn", "summary": "Unofficial NeoForge port of Refined Polymorphism by 90. Use Polymorph to pick conflicting recipes in Refined Storage crafting grids and pattern grids.", "license": "Lesser General Public License version 3", "dropdowns": [["Class", "Mods"], ["Main category", "Technology"], ["Additional categories", "Addons"], ["Additional categories", "API and Library"]], "distribution": "Allow distribution to 3rd party", "allowComments": true, "description": "**Refined Polymorphism Reborn** is an unofficial port of Refined Polymorphism by 90.\nOriginal project: https://github.com/62832/RefinedPolymorphism\nOriginal page: https://www.curseforge.com/minecraft/mc-mods/refined-polymorphism\nThis port is not made, endorsed, or supported by the original author.\n\n## What it does\n\nWhen several crafting recipes use the same ingredients, Polymorph can choose which one Refined Storage uses.\n\n- Crafting Grid\n- Pattern Grid, only while the pattern type is crafting\n- Wireless crafting grids from Refined Storage - Quartz Arsenal. Universal Grid's crafting mode opens that same grid.\n\nThe chosen crafting recipe is stored on the pattern as the `refinedpolymorph:polymorph_recipe` data component. If that recipe is missing, pattern resolution falls back to Refined Storage's own match.\n\n## Requirements\n\n- Refined Storage\n- Polymorph\n- Optional: Refined Storage - Quartz Arsenal\n\n## Credits\n\nThank you to 90 for Refined Polymorphism. This port keeps the original behavior and the original LGPL-3.0-only license. Please support the original project: https://github.com/62832/RefinedPolymorphism\n\n## License and source\n\nLicensed under LGPL-3.0-only.\nSource code: https://github.com/hp3081925122/Refined-Polymorphism-Reborn\n\n---\n\n**Refined Polymorphism Reborn** 是 90 的 Refined Polymorphism 的非官方移植。\n原项目：https://github.com/62832/RefinedPolymorphism\n原页面：https://www.curseforge.com/minecraft/mc-mods/refined-polymorphism\n这个移植不是原作者制作、认可或支持的版本。\n\n## 功能\n\n多种合成配方用同一组材料时，可以用 Polymorph 选择精妙存储采用哪一个。\n\n- 合成网格\n- 样板网格，仅在样板类型为合成时\n- Refined Storage - Quartz Arsenal 的无线合成网格。Universal Grid 的合成模式打开的就是这个网格。\n\n选中的合成配方写在样板的数据组件 `refinedpolymorph:polymorph_recipe` 上。组件缺失或配方不存在时，样板解析仍回退到精妙存储自己的匹配。\n\n## 前置\n\n- 精妙存储（Refined Storage）\n- Polymorph\n- 可选：Refined Storage - Quartz Arsenal\n\n## 鸣谢\n\n感谢 90 制作 Refined Polymorphism。本移植沿用原有行为，协议仍是原作的 LGPL-3.0-only。请支持原项目：https://github.com/62832/RefinedPolymorphism\n\n## 许可与源码\n\n以 LGPL-3.0-only 授权。\n源码：https://github.com/hp3081925122/Refined-Polymorphism-Reborn\n", "iconBase64": "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y/6kpaWVlktKSjLM9/DwsNkme8v4+/tblyxZ4vAzEhMTrW3btq3SfSz7Ex4ebo2JiXFYNjU11fr4448bpq9du/ayHm9J1mnTphmW3bFjh6EOZsyYYc3IyHB6vE6ePGkdNWqUw20zO4ZPPfWUYd7Bgwftric0NNSanp7usL4cnQfz5893uO27du2yNmzY0BoSEmLdsGGDw+WOHj3q8Fhf7rpq3bq1NS4uzmZaVFSUaZnAwEDrmjVrHG5HZmam9dlnn3V5G4KDg60bN250uL49e/ZYw8LCKnTsL/4MGzbMevr0aad1d//997v0vb/cx7u6fmr9Hcj111+v5cuXy8/Pz2Z6dHS0vvnmG8Py3t7eWrNmjcaMGSOLxWK67sjISK1fv15NmjSpkX2bPn26hgwZ4nB+48aNNWfOnMuyj40bN9Z///tf07sMPz8/vfXWW9VeL6GhoXrggQcM07dv3176b19fX61bt05PPPGE3N3dna4zKChIH3/8sV588cUKb8/nn3+u7Oxsm2ktWrSw21fgrrvuMly92msEUtbs2bM1cuRIh/M7dOigN998UwsWLDB9DxQWFqbZs2cbpldHXb3xxhsVviL+6KOPdPPNNzt+POLmprfeekv33nuvS+ubP3+++vfv73B+RESE3n777Qof/wEDBmjBggVq0KBBlZzfl/t4V6daN1bD3Xffre7du0uSmjdvrpCQEMMyp06d0pgxY+y+k5g2bZr69etnMy0mJkZffPGFsrKy1K9fP40aNaq0I2LTpk01depUjR07VidOnNCSJUskSb169VJ4eLjNerZt21b6aKWgoOCS93X06NGSpGPHjsnT09PuM/6BAweqTZs2No0ILmUfL3r//ffVuHFjw+dlZmbq6NGjatWqlQIDA6vtPZObm5uaNWumnj17atKkSbrqqqsM758WLVpk8yXs3bu3YT25ubmKj4+Xr6+v2rZtawjY1157Tbt27dLWrVtd3raMjAwtWbJEjz76qOFcjYmJsZl2zz332Pw/PT1da9asMV3/73//e1mtViUkJCg4ONju49qL54okJSYmysPDQy1btjQsN2jQILVs2VLHjx+v1rqqTIvIixdPKSkpOnv2rMLDw+Xr62tY7t1339WXX36p4uJi0/Xddtttpd8nDw8Pu4E2fPhwvfDCCxUa3eCVV14xBO+mTZu0YcMGZWdnq2HD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"};
  const report = [];

  // 判断元素是否可见
  const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';

  // 收集字段的描述文本（label、aria、placeholder、name、所在容器标题）
  const describe = (el) => {
    const parts = [el.name, el.id, el.placeholder, el.getAttribute('aria-label')];
    if (el.id) {
      const label = document.querySelector(`label[for="${CSS.escape(el.id)}"]`);
      if (label) parts.push(label.textContent);
    }
    const wrapLabel = el.closest('label');
    if (wrapLabel) parts.push(wrapLabel.textContent);
    let node = el.parentElement;
    for (let i = 0; i < 4 && node; i++, node = node.parentElement) {
      const title = node.querySelector('label, h1, h2, h3, h4, legend, .label, [class*="label"], [class*="title"]');
      if (title && !title.contains(el)) {
        parts.push(title.textContent);
        break;
      }
    }
    return parts.filter(Boolean).join(' ').toLowerCase();
  };

  // 按关键词查找字段
  const findField = (keys, excludes, selector) => {
    const list = [...document.querySelectorAll(selector)].filter(visible);
    return list.find((el) => {
      const text = describe(el);
      return keys.some((k) => text.includes(k)) && !excludes.some((k) => text.includes(k));
    });
  };

  // 以 React/Vue 可识别的方式写入输入框
  const setValue = (el, value) => {
    const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : el.tagName === 'SELECT' ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const mark = (field, ok, detail) => report.push({ 字段: field, 结果: ok ? '已填写' : '未找到，需手动', 说明: detail || '' });

  // 简易 Markdown 转 HTML（用于富文本编辑器）
  const mdToHtml = (md) => {
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const inline = (s) => esc(s)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    const lines = md.split(/\r?\n/);
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (/^\s*$/.test(line)) { i++; continue; }
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) { out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); i++; continue; }
      if (/^---+\s*$/.test(line)) { out.push('<hr>'); i++; continue; }
      if (/^>/.test(line)) {
        const quote = [];
        while (i < lines.length && /^>/.test(lines[i])) { quote.push(lines[i].replace(/^>\s?/, '')); i++; }
        out.push('<blockquote>' + quote.filter((q) => q.trim()).map((q) => `<p>${inline(q)}</p>`).join('') + '</blockquote>');
        continue;
      }
      if (/^\|/.test(line)) {
        const rows = [];
        while (i < lines.length && /^\|/.test(lines[i])) { rows.push(lines[i]); i++; }
        const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => inline(c.trim()));
        const head = cells(rows[0]);
        const body = rows.slice(2).map(cells);
        out.push('<table><thead><tr>' + head.map((c) => `<th>${c}</th>`).join('') + '</tr></thead><tbody>' +
          body.map((r) => '<tr>' + r.map((c) => `<td>${c}</td>`).join('') + '</tr>').join('') + '</tbody></table>');
        continue;
      }
      if (/^\s*[*-]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[*-]\s+/.test(lines[i])) { items.push(lines[i].replace(/^\s*[*-]\s+/, '')); i++; }
        out.push('<ul>' + items.map((t) => `<li>${inline(t)}</li>`).join('') + '</ul>');
        continue;
      }
      const para = [];
      while (i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|\||\s*[*-]\s|---|>)/.test(lines[i])) { para.push(lines[i]); i++; }
      out.push(`<p>${inline(para.join(' '))}</p>`);
    }
    return out.join('\n');
  };

  // 6. 下拉框：按标签找到下方最近的下拉触发器，点开后选择选项
  const fireClick = (el) => {
    for (const type of ['pointerdown', 'mousedown', 'pointerup', 'mouseup', 'click']) {
      el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window }));
    }
  };
  const findLabel = (text) => [...document.querySelectorAll('label, span, div, p, h3, h4, legend')].filter(visible)
    .find((el) => norm(el.textContent) === norm(text) || norm(el.textContent) === norm(text) + ' ?');
  const findTrigger = (label) => {
    const lr = label.getBoundingClientRect();
    const candidates = [...document.querySelectorAll('select, [role="combobox"], [aria-haspopup], button, div, input')].filter(visible)
      .filter((el) => !el.contains(label) && !label.contains(el))
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.top >= lr.bottom - 2 && r.top - lr.bottom < 90 && r.height >= 28 && r.height <= 70 && r.width >= 120 && r.left < lr.left + 60 && r.right > lr.left)
      .sort((a, b) => (a.r.top - b.r.top) || (a.r.width * a.r.height - b.r.width * b.r.height));
    return candidates.length ? candidates[0].el : null;
  };
  const findOption = (text, exclude) => [...document.querySelectorAll('[role="option"], li, label, span, div, button')].filter(visible)
    .filter((el) => !exclude.contains(el) && el.children.length <= 3 && norm(el.textContent) === norm(text))
    .sort((a, b) => a.getBoundingClientRect().height - b.getBoundingClientRect().height)[0];
  // 统一大小写、空白和弯引号，便于匹配 Tinker's 这类选项
  const norm = (t) => (t || '').replace(/[‘’ʼ]/g, "'").replace(/[*\s]+/g, ' ').trim().toLowerCase();
  // 优先找标签下方最近的 [role="combobox"]（2026-10-26 Waystone Horizons 实测可用）
  // 先沿祖先向上找只含一个下拉框的字段容器（License 步骤标签与下拉框之间隔着一段说明文字）
  const findCombo = (label) => {
    let scope = label.parentElement;
    for (let depth = 0; scope && depth < 6; depth++, scope = scope.parentElement) {
      const combos = [...scope.querySelectorAll('[role="combobox"]')].filter(visible);
      if (combos.length === 1) return combos[0];
      if (combos.length > 1) break;
    }
    const lr = label.getBoundingClientRect();
    return [...document.querySelectorAll('[role="combobox"]')].filter(visible)
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.top >= lr.top && r.top - lr.bottom < 260 && r.right > lr.left - 10 && r.left < lr.left + 60)
      .sort((a, b) => a.r.top - b.r.top)[0]?.el || null;
  };
  const comboText = (el) => norm(el.value || el.innerText || el.textContent);
  const waitOption = async (text, timeout = 3000, loose = false) => {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      const option = [...document.querySelectorAll('[role="option"]')].filter(visible).find((el) => norm(el.innerText || el.textContent) === norm(text) || (loose && norm(el.innerText || el.textContent).includes(norm(text))));
      if (option) return option;
      await sleep(150);
    }
    return null;
  };
  const pickCombo = async (labelText, optionText, combo, loose = false) => {
    const container = combo.closest('[class*="select"], [class*="Select"], [class*="dropdown"], [class*="Dropdown"]') || combo.parentElement;
    if (comboText(combo) === norm(optionText) || (container?.innerText || '').split('\n').some((t) => norm(t) === norm(optionText))) {
      mark(labelText, true, `${optionText}（已选）`);
      return true;
    }
    // MUI Select 只在 mousedown（button=0）时展开，click() 不会触发；Autocomplete 输入框也响应 mousedown
    const press = (el, type, extra = {}) => el.dispatchEvent(new MouseEvent(type, { bubbles: true, cancelable: true, view: window, button: 0, ...extra }));
    const key = (el, k) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, code: k, bubbles: true, cancelable: true }));
    combo.focus();
    press(combo, 'mousedown');
    await sleep(400);
    // Autocomplete 只输入撇号前的前缀过滤，避免直引号与弯引号不一致导致过滤为空
    const query = optionText.split(/['’]/)[0].trim();
    if (combo.tagName === 'INPUT' && !combo.readOnly) {
      setValue(combo, query);
      await sleep(500);
    }
    let option = await waitOption(optionText, 3000, loose);
    if (!option) {
      combo.focus();
      key(combo, 'ArrowDown');
      option = await waitOption(optionText, 1500, loose);
    }
    if (!option && combo.tagName === 'INPUT') {
      setValue(combo, '');
      press(combo, 'mousedown');
      key(combo, 'ArrowDown');
      option = await waitOption(optionText, 1500, loose);
    }
    if (!option) {
      const seen = [...document.querySelectorAll('[role="option"]')].filter(visible).map((el) => (el.innerText || el.textContent).trim()).slice(0, 12);
      mark(labelText, false, `没找到选项 ${optionText}；可见选项：${seen.join(' / ') || '无'}；控件：${combo.tagName}.${String(combo.className).split(' ').slice(0, 3).join('.')}`);
      key(document.activeElement || document.body, 'Escape');
      return true;
    }
    option.scrollIntoView({ block: 'nearest' });
    option.click();
    await sleep(600);
    // 多选菜单点完不会自动收起，用 Esc 关闭，避免挡住后面的下拉框
    const list = option.closest('[role="listbox"]');
    if (list && visible(list)) {
      key(combo, 'Escape');
      key(list, 'Escape');
      await sleep(300);
    }
    mark(labelText, true, optionText);
    return true;
  };
  const pickDropdown = async (labelText, optionText, loose = false) => {
    const label = findLabel(labelText);
    if (!label) { mark(labelText, false, '当前步骤没有该字段'); return; }
    const combo = findCombo(label);
    if (combo && await pickCombo(labelText, optionText, combo, loose)) return;
    const trigger = findTrigger(label);
    if (!trigger) { mark(labelText, false, '未找到下拉框'); return; }
    if (trigger.tagName === 'SELECT') {
      const option = [...trigger.options].find((o) => norm(o.text) === norm(optionText));
      if (option) { setValue(trigger, option.value); mark(labelText, true, optionText); } else mark(labelText, false, `没有选项 ${optionText}`);
      return;
    }
    if (norm(trigger.textContent) === norm(optionText)) { mark(labelText, true, `${optionText}（已选）`); return; }
    fireClick(trigger);
    trigger.focus && trigger.focus();
    await sleep(600);
    const option = findOption(optionText, label);
    if (option) {
      fireClick(option);
      mark(labelText, true, optionText);
      await sleep(800);
      document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await sleep(200);
    } else {
      mark(labelText, false, `下拉框已点开但没找到选项 ${optionText}`);
      fireClick(trigger);
    }
  };

  // 按向导步骤决定要填的字段；未知步骤全部尝试
  const STEP_FIELDS = {
    general: ['name', 'summary', 'dropdowns', 'comments', 'icon'],
    description: ['description'],
    license: ['license'],
  };
  const stepOf = () => (location.hash.match(/create\/([a-z-]+)/i) || [])[1] || 'unknown';
  const buttonByText = (re) => [...document.querySelectorAll('button')].filter(visible).find((b) => re.test(norm(b.innerText || b.textContent)) && !b.disabled);

  // 头像裁剪框：等待对话框出现后点确认按钮（图标已是正方形，默认裁剪即整张图）
  const confirmCrop = async () => {
    let dialog = null;
    for (let i = 0; i < 40 && !dialog; i++) {
      dialog = [...document.querySelectorAll('[role="dialog"], .MuiDialog-root, .MuiModal-root')].filter(visible)
        .find((el) => el.querySelector('img, canvas') && !el.closest('.MuiDrawer-root'));
      if (!dialog) await sleep(150);
    }
    if (!dialog) return '没有弹出裁剪框';
    await sleep(500);
    const buttons = [...dialog.querySelectorAll('button')].filter(visible).filter((b) => !b.disabled);
    const ok = buttons.find((b) => /^(save|apply|crop|confirm|done|ok|upload|set|use|submit)\b/.test(norm(b.innerText || b.textContent)));
    if (!ok) return `裁剪框里没找到确认按钮（按钮：${buttons.map((b) => (b.innerText || '').trim()).join(' / ') || '无'}）`;
    ok.click();
    for (let i = 0; i < 40 && dialog.isConnected && visible(dialog); i++) await sleep(150);
    return dialog.isConnected && visible(dialog) ? `已点击 ${ok.innerText.trim()}，但裁剪框没有关闭` : '';
  };

  for (let round = 0; round < 5; round++) {
    report.length = 0;
    const step = stepOf();
    const want = (field) => !STEP_FIELDS[step] || STEP_FIELDS[step].includes(field);
    let nameField = null;
    let alreadyFilled = false;
    let summaryField = null;
    let blocked = '';

    // 1. 项目名称
    if (want('name')) {
      nameField = findField(['project name', 'name'], ['slug', 'summary', 'search', 'user'], 'input[type="text"], input:not([type])');
      alreadyFilled = !!nameField && nameField.value === DATA.name;
      if (nameField) { setValue(nameField, DATA.name); mark('项目名称', true, DATA.name); } else mark('项目名称', false);
    }

    // 2. 简介
    if (want('summary')) {
      summaryField = findField(['summary', 'short description'], ['search'], 'textarea, input[type="text"], input:not([type])');
      if (summaryField) { setValue(summaryField, DATA.summary); mark('简介 Summary', true); } else mark('简介 Summary', false);
    }

    // 3. 下拉框
    if (want('dropdowns')) {
      for (const [labelText, optionText] of DATA.dropdowns) {
        await pickDropdown(labelText, optionText);
      }
    }

    // 4. 允许评论复选框
    if (want('comments') && DATA.allowComments !== false) {
      const box = [...document.querySelectorAll('input[type="checkbox"], [role="checkbox"]')]
        .find((el) => /allow comments/i.test(el.closest('label')?.innerText || el.parentElement?.innerText || el.parentElement?.parentElement?.innerText || el.getAttribute('aria-label') || ''));
      const textNode = [...document.querySelectorAll('label, span, p, div')].filter(visible).find((el) => norm(el.textContent) === 'allow comments');
      const checked = (el) => el && (el.checked === true || el.getAttribute('aria-checked') === 'true');
      if (box || textNode) {
        if (!checked(box)) {
          (box && visible(box) ? box : (box?.closest('label') || textNode)).click();
          await sleep(300);
        }
        mark('Allow Comments', !box || checked(box), box ? (checked(box) ? '已勾选' : '点击后仍未勾选，请手动勾选') : '已点击文字，请确认是否勾上');
      } else mark('Allow Comments', false, '当前步骤没有该选项');
    }

    // 5. 项目图标：写入文件输入框后自动确认裁剪框（名称已是本项目时视为已上传过）
    if (want('icon')) {
      const fileInput = [...document.querySelectorAll('input[type="file"]')].find((f) => !f.accept || /image|png/i.test(f.accept));
      if (fileInput && alreadyFilled) {
        mark('项目图标', true, '已上传过，跳过');
      } else if (fileInput) {
        const bytes = Uint8Array.from(atob(DATA.iconBase64), (c) => c.charCodeAt(0));
        const file = new File([bytes], 'cf-project-icon.png', { type: 'image/png' });
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInput.files = dt.files;
        fileInput.dispatchEvent(new Event('input', { bubbles: true }));
        fileInput.dispatchEvent(new Event('change', { bubbles: true }));
        const cropError = await confirmCrop();
        if (cropError && cropError !== '没有弹出裁剪框') {
          mark('项目图标', false, cropError);
          blocked = '请手动处理头像裁剪框后再运行脚本';
        } else mark('项目图标', true, cropError || '已上传并确认裁剪');
      } else mark('项目图标', false, '请手动上传 curseforge/icon.png');
    }

    // 6. 描述：先切到 Markdown（若页面提供），优先 Markdown 文本框，否则写入富文本编辑器
    if (want('description')) {
      await sleep(800);
      let markdownMode = false;
      const formatSelect = [...document.querySelectorAll('select')].filter(visible).find((s) => [...s.options].some((o) => /markdown/i.test(o.text)));
      if (formatSelect) {
        const option = [...formatSelect.options].find((o) => /markdown/i.test(o.text));
        setValue(formatSelect, option.value);
        markdownMode = true;
        await sleep(500);
      } else {
        const toggle = [...document.querySelectorAll('button, label, [role="tab"], [role="radio"], input[type="radio"]')].filter(visible)
          .find((el) => /^\s*markdown\s*$/i.test(el.textContent || el.value || ''));
        if (toggle) { toggle.click(); markdownMode = true; await sleep(500); }
      }
      const descField = findField(['description'], ['summary', 'search'], 'textarea');
      const plainTextareas = [...document.querySelectorAll('textarea')].filter(visible).filter((t) => t !== summaryField);
      const targetTextarea = descField || (markdownMode || step === 'description' ? plainTextareas[0] : null);
      if (targetTextarea) {
        setValue(targetTextarea, DATA.description);
        mark('描述', true, 'Markdown 文本框');
      } else {
        let editor = [...document.querySelectorAll('[contenteditable="true"], .ProseMirror, .ql-editor')].filter(visible)[0];
        if (!editor) {
          const frame = [...document.querySelectorAll('iframe')].find((f) => { try { return f.contentDocument && f.contentDocument.body && f.contentDocument.body.isContentEditable; } catch (e) { return false; } });
          if (frame) editor = frame.contentDocument.body;
        }
        if (editor) {
          editor.focus();
          const doc = editor.ownerDocument;
          const sel = doc.getSelection();
          const range = doc.createRange();
          range.selectNodeContents(editor);
          sel.removeAllRanges();
          sel.addRange(range);
          const html = mdToHtml(DATA.description);
          if (!doc.execCommand('insertHTML', false, html)) editor.innerHTML = html;
          editor.dispatchEvent(new Event('input', { bubbles: true }));
          mark('描述', true, '富文本编辑器（请检查表格排版）');
        } else mark('描述', false, '没找到描述编辑器，请手动粘贴 description.md');
      }
    }

    // 7. 许可证：原生下拉框或 MUI 下拉框，选项文本包含目标即可（如 MIT License）
    if (want('license') && DATA.license) {
      const licenseText = DATA.license.toLowerCase();
      const licenseSelect = [...document.querySelectorAll('select')].filter(visible).find((s) => [...s.options].some((o) => o.text.toLowerCase().includes(licenseText)));
      if (licenseSelect) {
        const option = [...licenseSelect.options].find((o) => o.text.toLowerCase().includes(licenseText));
        setValue(licenseSelect, option.value);
        mark('许可证', true, option.text);
      } else {
        await pickDropdown(findLabel('Project License') ? 'Project License' : 'License', DATA.license, true);
      }
    }

    // 8. 第三方分发：默认允许
    if (want('license') && DATA.distribution) {
      await pickDropdown('Project distribution', DATA.distribution);
    }

    console.log(`%c步骤 ${step}`, 'font-weight:bold');
    console.table(report);
    const failed = report.filter((r) => r.结果 !== '已填写');
    if (blocked || failed.length) {
      console.log(`%c${blocked || '有字段未填上，已停在当前步骤；处理后可再次运行脚本'}`, 'color:#c92a2a;font-weight:bold');
      break;
    }
    // 9. 只点 Next，不点创建按钮；进入下一步后继续填写
    const next = buttonByText(/^next$/);
    if (!next) {
      console.log('%c已到最后一步：请核对全部内容，确认无误后手动点击创建按钮。', 'color:#2b8a3e;font-weight:bold');
      break;
    }
    const before = location.hash;
    await sleep(400);
    next.click();
    let moved = false;
    for (let i = 0; i < 60 && !moved; i++) { await sleep(150); moved = location.hash !== before; }
    if (!moved) {
      console.log('%c点击 Next 后页面没有前进，可能有必填项未通过校验，请查看页面提示。', 'color:#c92a2a;font-weight:bold');
      break;
    }
    await sleep(1200);
  }
})();
