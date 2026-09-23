/* 우리의 순간 v2.0 — ko / pt-BR, shared editing, foreground polling — private Storage + server-enforced two-account RLS */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);

  const STR = {"brand":["우리의 순간","Nossos momentos"],"tagline":["둘만의 사진과 이야기를 담는 곳.","Um cantinho só nosso, cheio de fotos e histórias."],"eyebrow":["둘만의 작은 공간","UM CANTINHO SÓ NOSSO"],"connecting":["연결 중이에요…","Conectando…"],"loginTitle":["우리 앨범에 들어가기","Entrar no nosso álbum"],"loginHint":["등록된 두 사람의 계정으로 로그인해주세요. GitHub 계정은 필요 없어요.","Entre com uma das duas contas cadastradas no álbum. Não precisa de conta no GitHub."],"email":["이메일","E-mail"],"password":["비밀번호","Senha"],"remember":["이 휴대폰에서 로그인 유지","Manter a sessão neste celular"],"openAlbum":["앨범 열기","Entrar no álbum"],"forgot":["비밀번호를 잊었다면 앨범 관리자에게 재설정을 요청하세요.","Esqueceu a senha? Peça ajuda à pessoa que administra o álbum."],"deniedTitle":["앨범 권한이 없어요","Sem acesso ao álbum"],"deniedHint":["로그인은 되었지만 이 앨범에 등록된 계정이 아니에요.","Você entrou, mas esta conta não tem acesso a este álbum."],"otherAccount":["다른 계정으로 로그인","Entrar com outra conta"],"logout":["로그아웃","Sair"],"empty":["첫 번째 추억을 올려보세요.","Adicione nossa primeira lembrança."],"previous":["← 이전","← Anterior"],"next":["다음 →","Próximo →"],"cover":["첫 화면으로 지정","Usar como capa"],"editCaption":["설명 수정","Editar legenda"],"delete":["삭제","Excluir"],"uploadTitle":["추억 추가","Adicionar lembranças"],"files":["사진·영상 선택 (여러 개 가능)","Escolha fotos ou vídeos (pode selecionar vários)"],"captionLabel":["함께 남길 말","Uma mensagem para acompanhar"],"captionPlaceholder":["이날 정말 행복했어","Esse dia foi tão especial"],"fileHint":["파일당 최대 40MB · JPG, PNG, WebP, GIF, MP4, WebM. 영상은 재생 버튼을 눌러 보세요.","Até 40 MB por arquivo · JPG, PNG, WebP, GIF, MP4, WebM. Toque em reproduzir para assistir aos vídeos."],"uploadButton":["앨범에 저장","Salvar no álbum"],"records":["우리의 기록","Nossas lembranças"],"refresh":["새로고침","Atualizar"],"filter":["종류","Tipo"],"all":["전체","Tudo"],"images":["사진","Fotos"],"videos":["영상","Vídeos"],"more":["이전 기록 더 보기","Carregar mais lembranças"],"settings":["앨범 꾸미기 · 연결 주소","Personalizar álbum · Link de acesso"],"albumName":["앨범 이름 (비우면 기본 제목)","Nome do álbum (vazio = título padrão)"],"letter":["편지","Uma mensagem para nós"],"date":["함께하기 시작한 날","Data em que ficamos juntos"],"settingsSave":["설정 저장","Salvar alterações"],"linkHint":["NFC 카드가 생기면 아래 주소를 카드에 기록하세요.","Quando tiver um cartão NFC, grave este link nele."],"link":["앨범 주소","Link do álbum"],"copy":["주소 복사","Copiar link"],"newPassword":["내 비밀번호 변경","Alterar minha senha"],"passwordHint":["12자 이상으로 입력하세요.","Use pelo menos 12 caracteres."],"passwordButton":["비밀번호 변경","Alterar senha"],"footer":["하나의 공동 앨범 · 둘 다 추가·수정·삭제할 수 있어요.","Um álbum compartilhado · Nós dois podemos adicionar, editar e excluir."],"loginError":["이메일 또는 비밀번호가 맞지 않아요.","E-mail ou senha incorretos."],"networkError":["연결하지 못했어요. 인터넷 연결과 config.js 설정을 확인해주세요.","Não foi possível conectar. Verifique a internet e a configuração do álbum."],"permissionError":["권한이 없거나 설정이 누락됐어요. 두 계정 등록 SQL을 확인해주세요.","Sem permissão ou configuração incompleta. Peça ao administrador para verificar as duas contas."],"genericError":["작업을 완료하지 못했어요. 새로고침 후 다시 시도해주세요.","Não foi possível concluir. Atualize a página e tente novamente."],"deniedStatus":["이 계정은 앨범에 등록되지 않았어요.","Esta conta não está autorizada a acessar o álbum."],"daysTogether":["함께한 지 {n}일 ♡","{n} dias juntos ♡"],"daysUntil":["우리의 날까지 {n}일","Faltam {n} dias para a nossa data"],"emptyList":["아직 표시할 추억이 없어요.","Ainda não há lembranças para mostrar."],"coverBadge":[" · 첫 화면"," · Capa"],"mine":["내가 추가","Adicionado por mim"],"partner":["연인이 추가","Adicionado pelo meu amor"],"loading":["추억을 불러오고 있어요…","Carregando nossa lembrança…"],"imageAlt":["우리의 사진","Nossa foto"],"formatError":["이 형식은 재생되지 않을 수 있어요. JPG 사진이나 H.264 MP4 영상으로 다시 저장해보세요.","Este formato pode não ser compatível. Tente uma foto JPG ou um vídeo MP4 com codec H.264."],"signedIn":["로그인됨","Conectado"],"loadError":["앨범을 불러오지 못했어요.","Não foi possível carregar o álbum."],"signedOut":["로그아웃했어요.","Você saiu do álbum."],"signingIn":["로그인 중이에요…","Entrando…"],"refreshed":["최신 기록을 불러왔어요.","Álbum atualizado."],"selectFile":["사진 또는 영상을 선택해주세요.","Escolha uma foto ou um vídeo."],"invalidType":["{name}: JPG/PNG/WebP/GIF/MP4/WebM만 지원해요.","{name}: use JPG, PNG, WebP, GIF, MP4 ou WebM."],"invalidSize":["{name}: 0바이트보다 크고 40MB 이하인 파일을 선택해주세요.","{name}: o arquivo deve ter conteúdo e no máximo 40 MB."],"uploading":["{n} / {total} 저장 중… 끝날 때까지 이 화면을 유지해주세요.","Salvando {n} de {total}… Mantenha esta página aberta até terminar."],"cleanupError":["파일 정리에 실패했어요. 관리자에게 Storage 잔여 파일 확인을 요청하세요.","Não foi possível limpar um arquivo incompleto. Peça ao administrador para verificar o Storage."],"partialUpload":["{n}개 저장 완료. 나머지는 저장되지 않았어요. 실패한 파일만 다시 선택해주세요.","{n} arquivo(s) salvo(s). Os demais não foram salvos. Selecione apenas os arquivos que faltam e tente novamente."],"uploaded":["{n}개의 추억을 저장했어요. 상대방의 열린 앨범에도 곧 반영돼요.","{n} lembrança(s) salva(s). As mudanças aparecerão em breve no álbum da outra pessoa."],"coverSaved":["다음 접속 때 이 추억이 먼저 보여요. 두 사람에게 적용돼요.","Esta lembrança será a capa ao abrir o álbum. Vale para nós dois."],"captionPrompt":["사진·영상에 남길 말 (300자 이하)","Legenda da foto ou vídeo (até 300 caracteres)"],"captionTooLong":["300자 이하로 입력해주세요.","Use no máximo 300 caracteres."],"missing":["이미 삭제되었거나 접근할 수 없는 항목이에요.","Este item já foi excluído ou não está disponível."],"captionSaved":["설명을 수정했어요. 두 사람에게 적용돼요.","Legenda alterada para nós dois."],"deleteConfirm":["이 사진·영상을 공동 앨범에서 삭제할까요? 상대방의 앨범에서도 사라지며 복구할 수 없어요.","Excluir esta foto ou vídeo do álbum compartilhado? O item também desaparecerá para a outra pessoa. Não é possível desfazer."],"deletePartial":["파일 삭제 후 목록 정리에 실패했어요. 새로고침 후 다시 삭제해주세요.","O arquivo foi removido, mas a lista não foi atualizada. Atualize a página e tente excluir novamente."],"deleted":["공동 앨범에서 삭제했어요.","Item excluído do álbum compartilhado."],"settingsSaved":["두 사람의 앨범 설정을 저장했어요.","Configurações do nosso álbum salvas."],"passwordSaved":["비밀번호를 변경했어요.","Senha alterada."],"copied":["주소를 복사했어요. NFC 카드에는 이 주소만 저장하세요.","Link copiado. Grave apenas este link no cartão NFC."],"copyFallback":["주소를 길게 눌러 복사해주세요.","Toque e segure o link para copiar."],"configError":["설정이 필요해요. config.js에 Project URL과 Publishable key를 넣어주세요.","O álbum precisa ser configurado. Preencha Project URL e Publishable key em config.js."],"secretError":["Secret key는 사용할 수 없어요. Publishable key를 넣어주세요. 노출된 Secret key는 교체하세요.","Não use uma Secret key. Use a Publishable key e substitua qualquer chave secreta exposta."],"anonError":["브라우저에는 anon 또는 Publishable key만 사용할 수 있어요.","Use apenas uma anon key ou Publishable key no navegador."],"libraryError":["로그인 라이브러리를 불러오지 못했어요. 인터넷 연결 후 새로고침해주세요.","Não foi possível carregar o login. Verifique a internet e atualize a página."],"autoSync":["앱을 보는 동안 약 15초마다 공동 앨범을 확인해요.","Enquanto o app estiver visível, o álbum é atualizado a cada 15 segundos aproximadamente."],"syncedAt":["마지막 확인 {time}","Última atualização: {time}"],"syncError":["자동 확인 실패 · 인터넷 연결 후 새로고침해주세요.","Falha na atualização · Verifique a internet e toque em Atualizar."],"remoteDeleted":["보고 있던 항목이 공동 앨범에서 삭제됐어요.","O item que você estava vendo foi excluído do álbum compartilhado."],"editedByBoth":["편지·설명은 입력한 원문 그대로 공유됩니다.","Mensagens e legendas são compartilhadas no idioma em que foram escritas."],"language":["언어 / Idioma","Idioma / 언어"]};
  const savedLanguage = localStorage.getItem('couple-language');
  const preferredLanguage = (navigator.languages || [navigator.language || 'ko']).find(x=>/^(ko|pt)(-|$)/i.test(x)) || 'ko';
  let lang = ['ko','pt-BR'].includes(savedLanguage) ? savedLanguage : (/^pt/i.test(preferredLanguage) ? 'pt-BR' : 'ko');
  function t(key, args={}) { return (STR[key]?.[lang==='pt-BR'?1:0] || key).replace(/\{(\w+)\}/g,(_,k)=>String(args[k] ?? '')); }
  function applyLanguage() {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
    document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
    $('language').value = lang;
    if(user) { renderSettings(false); renderList(); renderSync(); const img=$('viewer').querySelector('img'); if(img) img.alt=items.find(x=>x.id===currentId)?.caption || t('imageAlt'); }
    else { $('title').textContent=t('brand'); $('note').textContent=t('tagline'); document.title=t('brand'); }
    if(!items.length) $('viewer').textContent=t('empty');
  }

  const MAX_BYTES = 40 * 1024 * 1024;
  const MIME = {'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/gif':'gif','video/mp4':'mp4','video/webm':'webm'};
  let client, user = null, items = [], settings = {}, currentId = null;
  let blobUrl = null, ticket = 0, generation = 0, busy = false, loaded = 0, hasMore = false;
  let activeUid = null, settingsDirty = false;
  let lastSync = null, startupError = null;
  function appError(key) { const error = new Error(t(key)); error.i18nKey = key; return error; }
  const message = (text, error = false) => { $('status').textContent = text; $('status').classList.toggle('error', error); };
  const check = result => { if (result.error) throw result.error; return result.data; };
  const errorText = error => {
    if(error?.i18nKey) return t(error.i18nKey);
    const text = error?.message || String(error);
    if (/Invalid login credentials/i.test(text)) return t('loginError');
    if (/Failed to fetch|NetworkError/i.test(text)) return t('networkError');
    if (/row-level security|permission denied/i.test(text)) return t('permissionError');
    return text;
  };
  function filtered() { return items.filter(x => $('filter').value === 'all' || x.mime.startsWith($('filter').value + '/')); }
  function actions() {
    const item = items.find(x => x.id === currentId), rows = filtered();
    ['prev','next'].forEach(id => $(id).disabled = busy || rows.length < 2);
    $('cover').disabled = busy || !item;
    ['delete','editCaption'].forEach(id => $(id).disabled = busy || !item || !user);
    $('more').hidden = !hasMore;
  }
  async function run(fn) {
    if (busy) return;
    busy = true; $('language').disabled = true;
    document.querySelectorAll('button').forEach(el => el.disabled = true);
    try { await fn(); } catch (error) { message(errorText(error), true); }
    finally { busy = false; $('language').disabled = false; document.querySelectorAll('button').forEach(el => el.disabled = false); actions(); }
  }
  function release() {
    ticket++;
    const video = $('viewer').querySelector('video'); if (video) video.pause();
    $('viewer').replaceChildren();
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    blobUrl = null;
  }
  function clearPrivate() {
    generation++; settingsDirty = false; lastSync = null; $('syncStatus').textContent = ''; release(); items = []; currentId = null; settings = {}; user = null;
    $('album').hidden = true; $('list').replaceChildren(); $('caption').textContent = '';
    $('title').textContent = t('brand'); $('note').textContent = t('tagline');
    $('days').textContent = ''; $('who').textContent = '';
    ['titleInput','noteInput','dateInput','uploadCaption','newPassword','files'].forEach(id => $(id).value = '');
  }
  async function allowed() { return check(await client.rpc('is_couple_member')) === true; }
  async function deny() { clearPrivate(); $('loginPanel').hidden = true; $('denied').hidden = false; message(t('deniedStatus'), true); }
  function renderSettings(fillInputs = true) {
    $('title').textContent = settings.title || t('brand'); $('note').textContent = settings.note || '';
    document.title = settings.title || t('brand');
    if(fillInputs && !settingsDirty) { $('titleInput').value = settings.title || ''; $('noteInput').value = settings.note || ''; $('dateInput').value = settings.anniversary || ''; }
    $('days').textContent = '';
    if (settings.anniversary) {
      const [y,m,d] = settings.anniversary.split('-').map(Number), now = new Date();
      const n = Math.floor((Date.UTC(now.getFullYear(),now.getMonth(),now.getDate()) - Date.UTC(y,m-1,d))/86400000);
      $('days').textContent = n >= 0 ? t('daysTogether',{n:n+1}) : t('daysUntil',{n:-n});
    }
  }
  function renderList() {
    $('list').replaceChildren();
    const rows = filtered();
    if (!rows.length) { const p = document.createElement('p'); p.textContent = t('emptyList'); $('list').append(p); }
    for (const item of rows) {
      const button = document.createElement('button'); button.className = 'item' + (currentId === item.id ? ' active' : '');
      const title = document.createElement('strong'); title.textContent = `${item.mime.startsWith('video/') ? '▶' : '♡'} ${item.caption || item.filename}`;
      const detail = document.createElement('small'); detail.textContent = `${new Date(item.created_at).toLocaleDateString(lang)} · ${(item.bytes/1048576).toFixed(1)}MB${settings.cover_id === item.id ? t('coverBadge') : ''} · ${t(item.owner_id === user?.id ? 'mine' : 'partner')}`;
      button.append(title,detail); button.onclick = () => run(() => show(item.id)); $('list').append(button);
    }
    actions();
  }
  async function show(id) {
    release(); currentId = id;
    const item = items.find(x => x.id === id), rows = filtered();
    $('caption').textContent = item?.caption || '';
    $('counter').textContent = item ? `${Math.max(0, rows.findIndex(x => x.id === id)) + 1} / ${rows.length}` : '0 / 0';
    renderList();
    if (!item) { $('viewer').textContent = t('empty'); return; }
    $('viewer').textContent = t('loading'); const mine = ticket;
    // 인증 헤더를 사용한 다운로드. 공유 가능한 공개/서명 URL을 만들지 않습니다.
    const blob = check(await client.storage.from('couple-private').download(item.path));
    if (mine !== ticket || !user) return;
    blobUrl = URL.createObjectURL(blob);
    const media = document.createElement(item.mime.startsWith('video/') ? 'video' : 'img');
    if (media.tagName === 'VIDEO') { media.controls = true; media.playsInline = true; media.preload = 'metadata'; }
    else media.alt = item.caption || t('imageAlt');
    media.onerror = () => message(t('formatError'), true);
    media.src = blobUrl; $('viewer').replaceChildren(media);
  }
  async function reload(preferId, { quiet = false } = {}) {
    const mine = generation, before = items.find(x => x.id === currentId);
    if (!await allowed()) { if(mine === generation) await deny(); return; }
    const nextSettings = check(await client.from('couple_settings').select('*').eq('id',1).single());
    const target = quiet ? Math.max(100, loaded) : 100;
    let nextItems = [];
    for(let offset = 0; offset < target; offset += 100) {
      const page = check(await client.from('couple_media').select('*').order('created_at',{ascending:false}).order('id',{ascending:false}).range(offset,offset+99));
      nextItems.push(...page); if(page.length < 100) break;
    }
    if(mine !== generation) return;
    const desired = preferId || nextSettings.cover_id;
    const fetchedCount = nextItems.length;
    // 현재 보고 있는 오래된 항목도 서버에 여전히 있는지 확인합니다.
    for(const id of new Set([desired, nextSettings.cover_id].filter(Boolean))) {
      if(!nextItems.some(x=>x.id===id)) {
        const extra = check(await client.from('couple_media').select('*').eq('id',id).maybeSingle());
        if(extra) nextItems.push(extra);
      }
    }
    if(mine !== generation) return;
    settings = nextSettings; items = nextItems; loaded = fetchedCount;
    hasMore = fetchedCount >= target;
    renderSettings();
    const rows = filtered();
    const chosen = rows.find(x=>x.id===desired) || rows.find(x=>x.id===settings.cover_id) || rows[0];
    // 자동 확인 중 동일한 동영상은 다시 내려받거나 재생을 중단하지 않습니다.
    if(quiet && before && chosen?.id === before.id && blobUrl) {
      $('caption').textContent = chosen.caption || '';
      $('counter').textContent = `${rows.findIndex(x=>x.id===chosen.id)+1} / ${rows.length}`;
      renderList();
    } else {
      if(quiet && before && !items.some(x=>x.id===before.id)) message(t('remoteDeleted'));
      await show(chosen?.id || null);
    }
    lastSync = new Date(); renderSync();
  }
  function renderSync() {
    $('syncStatus').textContent = lastSync ? t('syncedAt',{time:lastSync.toLocaleTimeString(lang)}) : t('autoSync');
  }
  async function syncAlbum() {
    if(!user || busy || document.hidden) return;
    await run(async () => {
      try { await reload(currentId,{quiet:true}); }
      catch(error) { $('syncStatus').textContent = t('syncError'); }
    });
  }
  async function boot(session) {
    const uid = session?.user?.id || null;
    if (uid && activeUid === uid) return;
    activeUid = uid; clearPrivate(); $('denied').hidden = true; $('loginPanel').hidden = !!uid;
    if (!uid) { message(''); return; }
    user = session.user;
    try {
      await reload();
      if (user?.id === uid) { $('album').hidden = false; $('who').textContent = session.user.email || t('signedIn'); message(''); }
    } catch(error) { message(t('loadError') + ' ' + errorText(error),true); $('denied').hidden = false; }
  }
  const prefKey = 'couple-remember';
  const authStorage = {
    getItem(key) { return localStorage.getItem(prefKey) === 'yes' ? localStorage.getItem(key) : sessionStorage.getItem(key); },
    setItem(key,value) { (localStorage.getItem(prefKey) === 'yes' ? localStorage : sessionStorage).setItem(key,value); },
    removeItem(key) { localStorage.removeItem(key); sessionStorage.removeItem(key); }
  };
  async function logout() {
    activeUid = null; clearPrivate(); $('denied').hidden = true; $('loginPanel').hidden = false;
    check(await client.auth.signOut({scope:'local'})); message(t('signedOut'));
  }
  $('loginForm').onsubmit = e => { e.preventDefault(); run(async () => {
    localStorage.setItem(prefKey,$('remember').checked ? 'yes' : 'no');
    message(t('signingIn'));
    const result = check(await client.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value}));
    $('password').value = ''; await boot(result.session);
  }); };
  $('logout').onclick = $('deniedLogout').onclick = () => run(logout);
  $('prev').onclick = () => run(() => move(-1)); $('next').onclick = () => run(() => move(1));
  function move(delta) { const rows = filtered(); if(!rows.length) return; const i = rows.findIndex(x => x.id === currentId); return show(rows[(i+delta+rows.length)%rows.length].id); }
  $('filter').onchange = () => run(() => show(filtered()[0]?.id || null));
  $('refresh').onclick = () => run(async () => { await reload(currentId); if(user) message(t('refreshed')); });
  $('more').onclick = () => run(async () => {
    const rows = check(await client.from('couple_media').select('*').order('created_at',{ascending:false}).order('id',{ascending:false}).range(loaded,loaded+99));
    loaded += rows.length; hasMore = rows.length === 100;
    const known = new Set(items.map(x=>x.id)); items.push(...rows.filter(x=>!known.has(x.id))); renderList();
  });
  $('uploadForm').onsubmit = e => { e.preventDefault(); run(async () => {
    if (!await allowed()) return deny();
    const files = [...$('files').files], caption = $('uploadCaption').value.trim();
    if(!files.length) throw Error(t('selectFile'));
    for(const file of files) {
      if(!MIME[file.type]) throw Error(t('invalidType',{name:file.name}));
      if(!file.size || file.size > MAX_BYTES) throw Error(t('invalidSize',{name:file.name}));
    }
    let completed = 0, lastId = null, failure = null;
    for(const file of files) {
      message(t('uploading',{n:completed+1,total:files.length}));
      const path = `${user.id}/${crypto.randomUUID()}.${MIME[file.type]}`;
      try {
        check(await client.storage.from('couple-private').upload(path,file,{contentType:file.type,upsert:false,cacheControl:'0'}));
        const result = await client.from('couple_media').insert({owner_id:user.id,path,filename:file.name.slice(0,255),mime:file.type,bytes:file.size,caption}).select().single();
        if(result.error) {
          const cleanup = await client.storage.from('couple-private').remove([path]);
          if(cleanup.error) throw Error(t('cleanupError') + ' ' + path);
          throw result.error;
        }
        lastId = result.data.id; completed++;
      } catch(error) { failure = error; break; }
    }
    $('files').value = ''; if(!failure) $('uploadCaption').value = '';
    $('filter').value = 'all'; await reload(lastId);
    if(failure) throw Error(t('partialUpload',{n:completed}) + ' ' + errorText(failure));
    message(t('uploaded',{n:completed}));
  }); };
  $('cover').onclick = () => run(async () => {
    const rows = check(await client.from('couple_settings').update({cover_id:currentId}).eq('id',1).select());
    if(!rows.length) throw Error(t('permissionError')); settings.cover_id = currentId; renderList(); message(t('coverSaved'));
  });
  $('editCaption').onclick = () => run(async () => {
    const item = items.find(x=>x.id===currentId); const caption = prompt(t('captionPrompt'),item.caption);
    if(caption === null) return; if(caption.length>300) throw Error(t('captionTooLong'));
    const rows = check(await client.from('couple_media').update({caption}).eq('id',item.id).select());
    if(!rows.length) throw Error(t('missing')); item.caption=caption; $('caption').textContent=caption; renderList(); message(t('captionSaved'));
  });
  $('delete').onclick = () => run(async () => {
    const item = items.find(x=>x.id===currentId);
    if(!item || !user) throw Error(t('missing'));
    if(!confirm(t('deleteConfirm'))) return;
    check(await client.storage.from('couple-private').remove([item.path]));
    const rows = check(await client.from('couple_media').delete().eq('id',item.id).select());
    // 동시 삭제라면 이미 목록에서도 삭제됐을 수 있습니다. 새 목록을 읽습니다.
    await reload(); message(t('deleted'));
  });
  $('settingsForm').oninput = () => { settingsDirty = true; };
  $('settingsForm').onsubmit = e => { e.preventDefault(); run(async () => {
    const title = $('titleInput').value.trim();
    const rows = check(await client.from('couple_settings').update({title,note:$('noteInput').value,anniversary:$('dateInput').value||null}).eq('id',1).select());
    if(!rows.length) throw Error(t('permissionError')); settingsDirty = false; settings=rows[0]; renderSettings(); message(t('settingsSaved'));
  }); };
  $('passwordForm').onsubmit = e => { e.preventDefault(); run(async () => {
    check(await client.auth.updateUser({password:$('newPassword').value})); $('newPassword').value=''; message(t('passwordSaved'));
  }); };
  $('albumUrl').value = location.origin + location.pathname;
  $('copy').onclick = () => run(async () => {
    try { await navigator.clipboard.writeText($('albumUrl').value); message(t('copied')); }
    catch { $('albumUrl').focus(); $('albumUrl').select(); message(t('copyFallback')); }
  });
  $('language').onchange = () => { lang=$('language').value; localStorage.setItem('couple-language',lang); applyLanguage(); message(startupError ? errorText(startupError) : '',!!startupError); };
  applyLanguage();
  try {
    const c = window.ALBUM_CONFIG || {};
    if(!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(c.supabaseUrl||'') || !c.publishableKey || c.publishableKey.startsWith('PASTE_')) throw appError('configError');
    if(c.publishableKey.startsWith('sb_secret_')) throw appError('secretError');
    if(c.publishableKey.startsWith('eyJ')) {
      const part=c.publishableKey.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
      if(JSON.parse(atob(part)).role !== 'anon') throw appError('anonError');
    }
    if(!window.supabase) throw appError('libraryError');
    client = window.supabase.createClient(c.supabaseUrl,c.publishableKey,{auth:{storage:authStorage,persistSession:true,autoRefreshToken:true,detectSessionInUrl:false}});
    client.auth.onAuthStateChange((event,session) => {
      if(['INITIAL_SESSION','SIGNED_IN','SIGNED_OUT'].includes(event)) setTimeout(() => boot(session),0);
    });
    setInterval(syncAlbum,15000);
    document.addEventListener('visibilitychange', () => { if(!document.hidden) syncAlbum(); });
    window.addEventListener('focus',syncAlbum);
    window.addEventListener('online',syncAlbum);
  } catch(error) { startupError = error; message(errorText(error),true); }
})();
