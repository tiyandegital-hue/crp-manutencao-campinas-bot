/* CRP Manutenção — demo site logic.
   BUSINESS_NAME is the ONE swappable constant for the business name. */
const BUSINESS_NAME = "CRP Manutenção";
const OWNER_NAME = "Carlos Profeta";
const WHATSAPP_NUMBER = "5519995781386";
const WHATSAPP_DISPLAY = "(19) 99578-1386";
const SITE_URL = "https://crpmanutencao.com.br";
const WA_BASE = "https://wa.me/" + WHATSAPP_NUMBER;

document.addEventListener("DOMContentLoaded", () => {
  /* Fill business-name placeholders from the single constant */
  document.querySelectorAll("[data-business]").forEach((el) => { el.textContent = BUSINESS_NAME; });
  document.querySelectorAll("[data-owner]").forEach((el) => { el.textContent = OWNER_NAME; });
  document.querySelectorAll("[data-phone]").forEach((el) => { el.textContent = WHATSAPP_DISPLAY; });
  document.querySelectorAll("[data-site]").forEach((el) => { el.textContent = "crpmanutencao.com.br"; el.href = SITE_URL; });
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const text = el.getAttribute("data-wa-text") || "Olá! Quero ver o bot da CRP Manutenção no WhatsApp.";
    el.href = WA_BASE + "?text=" + encodeURIComponent(text);
  });
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = "2026"; });

  /* Mobile nav toggle */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  /* ---------------- Chat mock (index) ---------------- */
  const chatBody = document.getElementById("chat-body");
  const chatTicket = document.getElementById("chat-ticket");
  const replayBtn = document.getElementById("replay-btn");
  const tabBtns = document.querySelectorAll(".scenario-tabs button");
  if (chatBody && tabBtns.length) {
    const SCENARIOS = {
      vazamento: {
        label: "1. Vazamento",
        evidence: { img: "assets/img/evidencia-vazamento.jpg", alt: "Ilustração de um cano estourado embaixo da pia da cozinha, com água jorrando", file: "cano_cozinha.jpg", caption: "Foto ilustrativa — exemplo gerado por IA" },
        messages: [
          { from: "out", text: "Carlos, boa noite! Estou com um vazamento forte embaixo da pia da cozinha, começou a alagar aqui agora!", time: "19:41" },
          { from: "in", text: "Olá! Aqui é o assistente automático da CRP Manutenção. Já recebi sua foto e registrei o chamado. [PRIORIDADE: VAZAMENTO ATIVO — EMERGÊNCIA] Por favor, feche o registro geral da água, se possível, para conter os danos! Qual é o seu bairro em Campinas e o melhor horário para o Carlos ir até aí?", time: "19:42" },
          { from: "out", text: "Taquaral. Depois das 20h fica melhor pra mim.", time: "19:43" },
          { from: "in", text: "Perfeito! Temos janela para o Taquaral hoje: 1) 20h30  2) 21h15. Qual delas encaixa melhor para você?", time: "19:43" },
          { from: "out", text: "20h30 tá ótimo!", time: "19:44" }
        ],
        ticket: { id: "CRP-8821", status: "Agendado ✓", pill: "pill-red", pillText: "EMERGÊNCIA", servico: "Hidráulica / Contenção", bairro: "Taquaral, Campinas", horario: "Hoje às 20h30" }
      },
      entupimento: {
        label: "2. Pia entupida",
        evidence: { img: "assets/img/evidencia-entupimento.jpg", alt: "Ilustração de uma pia de banheiro entupida, com água parada", file: "ralo_bloqueado.jpg", caption: "Foto ilustrativa — exemplo gerado por IA" },
        messages: [
          { from: "out", text: "Olá, Carlos! Minha pia do banheiro social está completamente entupida, a água não desce de jeito nenhum há 2 dias.", time: "19:41" },
          { from: "in", text: "Olá! Aqui é o assistente automático da CRP Manutenção. Já recebi sua foto e registrei o chamado. [PRIORIDADE: ENTUPIMENTO — PADRÃO PROGRAMADO] Evite jogar soda cáustica ou produtos corrosivos para não danificar o encanamento. Qual é o seu bairro e qual período fica melhor para a visita técnica?", time: "19:42" },
          { from: "out", text: "Estou no Cambuí. Fica melhor amanhã na parte da tarde.", time: "19:43" },
          { from: "in", text: "Excelente! Para amanhã à tarde no Cambuí tenho: 1) 14h00  2) 16h30. Qual encaixa melhor na sua rotina?", time: "19:43" },
          { from: "out", text: "Pode confirmar 14h00 amanhã!", time: "19:44" }
        ],
        ticket: { id: "CRP-8822", status: "Agendado ✓", pill: "pill-yellow", pillText: "URGENTE", servico: "Desentupimento mecânico", bairro: "Cambuí, Campinas", horario: "Amanhã às 14h00" }
      },
      disjuntor: {
        label: "3. Quadro elétrico",
        evidence: { img: "assets/img/evidencia-disjuntor.jpg", alt: "Ilustração de um quadro de disjuntores com um disjuntor chamuscado", file: "disjuntor_chamuscado.jpg", caption: "Foto ilustrativa — exemplo gerado por IA" },
        messages: [
          { from: "out", text: "Carlos, socorro! O disjuntor geral do quadro tá desarmando e com cheiro forte de queimado perto dos chuveiros!", time: "19:42" },
          { from: "in", text: "Olá! Aqui é o assistente automático da CRP Manutenção. Já recebi sua foto e registrei o chamado. [PRIORIDADE CRÍTICA: RISCO ELÉTRICO — EMERGÊNCIA] Mantenha o disjuntor desarmado e não toque na fiação! Qual é o endereço e o bairro para o despacho da equipe técnica?", time: "19:42" },
          { from: "out", text: "Bairro Mansões Santo Antônio. Estou sem luz em metade da casa!", time: "19:43" },
          { from: "in", text: "Alerta de segurança gerado. O Carlos está na região com rota aberta: 1) Imediato — próxima janela livre  2) Próxima janela da manhã. Confirmamos o imediato?", time: "19:43" },
          { from: "out", text: "Imediato, por favor! Estamos no escuro.", time: "19:44" }
        ],
        ticket: { id: "CRP-8823", status: "Agendado ✓", pill: "pill-red", pillText: "EMERGÊNCIA", servico: "Elétrica / Troca de disjuntor", bairro: "Mansões Santo Antônio, Campinas", horario: "Imediato — próxima janela livre" }
      }
    };

    let current = "vazamento";
    let timers = [];
    const clearTimers = () => { timers.forEach((t) => clearTimeout(t)); timers = []; };
    const scrollChat = () => { chatBody.scrollTop = chatBody.scrollHeight; };

    function renderTicket(sc) {
      chatTicket.innerHTML =
        '<div class="t-head"><span>#ORDEM: ' + sc.ticket.id + '</span><span class="pill ' + sc.ticket.pill + '">' + sc.ticket.pillText + '</span><span>' + sc.ticket.status + '</span></div>' +
        '<dl><dt>Serviço</dt><dd>' + sc.ticket.servico + '</dd>' +
        '<dt>Bairro</dt><dd>' + sc.ticket.bairro + '</dd>' +
        '<dt>Horário</dt><dd>' + sc.ticket.horario + '</dd>' +
        '<dt>Técnico resp.</dt><dd>' + OWNER_NAME + '</dd></dl>' +
        '<p class="t-note">O Carlos já foi notificado e chegará no horário combinado. Em caso de dúvidas, basta responder aqui.</p>';
      chatTicket.style.display = "block";
    }

    function addMessage(m) {
      const div = document.createElement("div");
      div.className = "msg " + m.from;
      div.innerHTML = m.text + '<span class="m-time">' + m.time + (m.from === "out" ? ' <span class="m-ticks">✓✓</span>' : "") + "</span>";
      chatBody.appendChild(div);
      scrollChat();
    }

    function showTyping() {
      const t = document.createElement("div");
      t.className = "typing";
      t.id = "typing-ind";
      t.innerHTML = "<i></i><i></i><i></i>";
      chatBody.appendChild(t);
      scrollChat();
    }
    function hideTyping() { const t = document.getElementById("typing-ind"); if (t) t.remove(); }

    function playScenario(key) {
      current = key;
      clearTimers();
      const sc = SCENARIOS[key];
      chatBody.innerHTML = '<div class="chat-date">Hoje • Chamado prioritário</div>';
      chatTicket.style.display = "none";
      tabBtns.forEach((b) => b.classList.toggle("active", b.dataset.scenario === key));
      const ev = document.createElement("figure");
      ev.className = "msg out evidence";
      ev.innerHTML = '<img src="' + sc.evidence.img + '" alt="' + sc.evidence.alt + '" loading="lazy">' +
        '<figcaption>EVIDÊNCIA: ' + sc.evidence.file + ' — ' + sc.evidence.caption + '</figcaption>';
      chatBody.appendChild(ev);
      let delay = 500;
      sc.messages.forEach((m) => {
        if (m.from === "in") {
          timers.push(setTimeout(showTyping, delay));
          delay += 900;
          timers.push(setTimeout(() => { hideTyping(); addMessage(m); }, delay));
        } else {
          timers.push(setTimeout(() => addMessage(m), delay));
        }
        delay += 1100;
      });
      timers.push(setTimeout(() => renderTicket(sc), delay + 400));
    }

    tabBtns.forEach((b) => b.addEventListener("click", () => playScenario(b.dataset.scenario)));
    if (replayBtn) replayBtn.addEventListener("click", () => playScenario(current));
    playScenario("vazamento");
  }

  /* ---------------- Triage simulator (como-funciona) ---------------- */
  const simPanel = document.getElementById("sim-panel");
  const simBtns = document.querySelectorAll(".sim-btns button");
  if (simPanel && simBtns.length) {
    const SIM = {
      cano: {
        pill: "pill-red", pillText: "EMERGÊNCIA", ticket: "#EMG-8921",
        customer: "“Carlos, socorro! Estourou um cano na parede da lavanderia e tá jorrando água pra dentro da cozinha! Não sei o que fazer!”",
        time: "HOJE 22:41",
        title: "Orientação imediata de contenção",
        body: "<ol><li>Feche agora mesmo o registro geral do cavalete ou do hidrômetro para estancar a pressão.</li><li>Mantenha aparelhos elétricos do chão fora da tomada.</li></ol><p>[Ação técnica]: o Carlos foi avisado com prioridade máxima. Envie seu bairro e rua para verificar a rota de deslocamento imediato.</p>"
      },
      disjuntor: {
        pill: "pill-yellow", pillText: "URGENTE", ticket: "#URG-4412",
        customer: "“Boa noite! Toda vez que ligo o chuveiro junto com a fritadeira elétrica o disjuntor cai e sinto um leve cheiro quente no quadro.”",
        time: "HOJE 19:15",
        title: "Precaução de sobrecarga",
        body: "<p>Por segurança, não force o religamento do disjuntor enquanto esses aparelhos estiverem conectados. Pode haver fiação subdimensionada.</p><p>[Triagem]: qual o seu bairro em Campinas? Você consegue enviar uma foto da parte frontal do quadro de disjuntores para o Carlos avaliar o barramento?</p>"
      },
      torneira: {
        pill: "pill-grey", pillText: "ORÇAMENTO", ticket: "#ORC-1093",
        customer: "“Olá! Comprei uma torneira gourmet monocomando nova para a bancada da cozinha e quero trocar a antiga. Quando o Carlos pode vir?”",
        time: "HOJE 14:02",
        title: "Intake de escopo técnico",
        body: "<p>Ótima escolha! Para o Carlos formatar o orçamento exato, sem custos surpresa:</p><ol><li>A pia já tem o furo compatível ou será necessário alargar a cuba?</li><li>É ponto com água quente (aquecedor) ou saída única?</li></ol><p>Assim que responder, o Carlos passa o valor e as janelas disponíveis para esta semana.</p>"
      },
      telha: {
        pill: "pill-yellow", pillText: "URGENTE", ticket: "#URG-7731",
        customer: "“Boa tarde, com a ventania de ontem quebrou duas telhas na lateral da garagem e agora tá começando a garoar, vai molhar minhas coisas!”",
        time: "HOJE 16:30",
        title: "Contenção de avaria",
        body: "<p>Afaste bens sensíveis e não suba no telhado molhado, devido ao alto risco de queda.</p><p>[Ação da CRP]: você tem telhas sobressalentes do mesmo modelo no local? O Carlos pode verificar a viabilidade de um reparo temporário.</p>"
      }
    };
    function renderSim(key) {
      const s = SIM[key];
      simBtns.forEach((b) => b.classList.toggle("active", b.dataset.sim === key));
      simPanel.innerHTML =
        '<p class="kicker">Mensagem do cliente via WhatsApp • ' + s.time + '</p>' +
        '<div class="sim-customer"><blockquote>' + s.customer + '</blockquote><p class="mono" style="font-size:.68rem;color:var(--grey)">CANAL: WHATSAPP • RECEBIDO</p></div>' +
        '<div class="sim-bot"><p class="kicker">Resposta do assistente da CRP • Fila prioritária</p>' +
        '<p style="margin:.5rem 0"><span class="pill ' + s.pill + '">' + s.pillText + '</span></p>' +
        '<h3>' + s.title + '</h3>' + s.body + '</div>' +
        '<div class="sim-meta"><span>Ticket gerado: ' + s.ticket + '</span><span>Resposta do bot: em segundos</span></div>';
    }
    simBtns.forEach((b) => b.addEventListener("click", () => renderSim(b.dataset.sim)));
    renderSim("cano");
  }

  /* ---------------- FAQ accordions (single-open) ---------------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach((o) => {
        o.classList.remove("open");
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        q.setAttribute("aria-expanded", "true");
        a.style.maxHeight = a.scrollHeight + "px";
      } else {
        a.style.maxHeight = "0px";
      }
    });
  });

  /* ---------------- Demo form (contato) ---------------- */
  const form = document.getElementById("demo-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      const name = form.querySelector("#f-nome");
      const phone = form.querySelector("#f-whats");
      const obs = form.querySelector("#f-obs");
      [name, phone].forEach((input) => {
        const field = input.closest(".field");
        const empty = !input.value.trim();
        const phoneBad = input === phone && input.value.trim() !== "" && input.value.replace(/\D/g, "").length < 10;
        if (empty || phoneBad) {
          field.classList.add("invalid");
          field.querySelector(".err").textContent = empty ? "Preencha este campo." : "Informe um WhatsApp válido, com DDD.";
          valid = false;
        } else {
          field.classList.remove("invalid");
        }
      });
      const horario = form.querySelector('input[name="horario"]:checked');
      const horarioField = form.querySelector("#horario-field");
      if (!horario) { horarioField.classList.add("invalid"); valid = false; }
      else { horarioField.classList.remove("invalid"); }
      if (!valid) return;
      form.style.display = "none";
      const success = document.getElementById("form-success");
      if (success) {
        success.classList.add("show");
        success.querySelector("p").textContent =
          "Obrigado, " + name.value.trim().split(" ")[0] + "! Sua solicitação de demonstração foi registrada. O Carlos retorna no WhatsApp " +
          phone.value.trim() + " no melhor horário (" + horario.value + ").";
      }
    });
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => input.closest(".field").classList.remove("invalid"));
    });
  }
});
