document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER)
       Faz os elementos aparecerem suavemente quando entram na tela.
       ========================================================================== */
    const observerOptions = {
        threshold: 0.1 // 10% do elemento visível dispara a animação
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    /* ==========================================================================
       2. EFEITOS VISUAIS GLOBAIS
       Piscada do cursor "_"
       ========================================================================== */
    const blinker = document.querySelector('.blink');
    if (blinker) {
        setInterval(() => {
            // Alterna a opacidade
            blinker.style.opacity = (blinker.style.opacity === '0' ? '1' : '0');
        }, 500);
    }


    /* ==========================================================================
       3. MENU MOBILE
       Lógica para abrir/fechar o menu em telas pequenas.
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            // Se estiver aberto (flex), fecha. Se não, abre e configura estilos.
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.right = '0';
                navLinks.style.background = '#0a0a0a';
                navLinks.style.width = '100%';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid #333';
                navLinks.style.zIndex = '1000';
            }
        });
    }


    /* ==========================================================================
       4. SISTEMA DE IDENTIDADE (WELCOME TAG + MODAL)
       Detecta OS ou usa LocalStorage para personalizar a experiência.
       ========================================================================== */
    const welcomeTag = document.querySelector('.mono-tag');
    const modal = document.getElementById('custom-modal');
    const inputField = document.getElementById('user-input');
    const btnConfirm = document.getElementById('modal-confirm');
    const btnCancel = document.getElementById('modal-cancel');

    // Só executa se os elementos existirem na página
    if (welcomeTag && modal && inputField && btnConfirm && btnCancel) {

        // A. LÓGICA DE INICIALIZAÇÃO (Checa memória ou detecta OS)
        const userName = localStorage.getItem('portfolioUser');

        if (userName) {
            welcomeTag.innerText = `:: WELCOME BACK, ${userName} ::`;
        } else {
            const userAgent = window.navigator.userAgent;
            let osName = "UNKNOWN USER";

            if (userAgent.indexOf("Win") !== -1) osName = "WINDOWS USER";
            if (userAgent.indexOf("Mac") !== -1) osName = "MACINTOSH USER";
            if (userAgent.indexOf("Linux") !== -1) osName = "LINUX USER";
            if (userAgent.indexOf("Android") !== -1) osName = "ANDROID USER";
            if (userAgent.indexOf("iPhone") !== -1) osName = "IOS USER";

            welcomeTag.innerText = `:: WELCOME ${osName} ::`;
        }

        // B. CONFIGURAÇÃO DE INTERAÇÃO (Abrir Modal)
        welcomeTag.style.cursor = "pointer";
        welcomeTag.title = "Clique para alterar identificação";

        welcomeTag.addEventListener('click', () => {
            modal.style.display = 'flex';
            inputField.value = '';
            inputField.focus();
        });

        // C. FUNÇÕES DO MODAL (Salvar e Fechar)
        const saveName = () => {
            const name = inputField.value.trim().toUpperCase();
            if (name) {
                localStorage.setItem('portfolioUser', name);
                welcomeTag.innerText = `:: WELCOME ${name} ::`;
                modal.style.display = 'none';
            }
        };

        const closeModal = () => {
            modal.style.display = 'none';
        };

        // D. EVENT LISTENERS DO MODAL
        btnConfirm.addEventListener('click', saveName);
        btnCancel.addEventListener('click', closeModal);

        // Salvar com Enter
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveName();
        });

        // Fechar clicando fora (no fundo escuro)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }


    /* ==========================================================================
       5. TYPEWRITER EFFECT (LOGO LOOP)
       Efeito de digitação infinita no cabeçalho.
       ========================================================================== */
    const typeWriterElement = document.getElementById('typewriter');

    if (typeWriterElement) {
        const phrases = [
            "NATAN_RODRIGUES",
            "FULL_STACK_DEV",
            "CURRENTLY_LEARNING",
            "TECH_ENTHUSIAST",
            "WELCOME_TO_MY_PORTFOLIO"
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function loopTyper() {
            const currentPhrase = phrases[phraseIndex];

            // Define o texto atual baseado no índice
            if (isDeleting) {
                typeWriterElement.innerText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.innerText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            // CONTROLE DE VELOCIDADE
            let typeSpeed = 100; // Velocidade normal de digitação

            if (isDeleting) {
                typeSpeed = 50; // Apaga mais rápido
            }

            // LÓGICA DE TRANSIÇÃO
            if (!isDeleting && charIndex === currentPhrase.length) {
                // Terminou de escrever: Espera 5 segundos
                typeSpeed = 5000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Terminou de apagar: Passa para a próxima frase
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Pequena pausa antes de começar a nova
            }

            setTimeout(loopTyper, typeSpeed);
        }

        // Inicia o loop
        loopTyper();
    }
});