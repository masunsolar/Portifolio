document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. ANIMAÇÃO DE SCROLL (INTERSECTION OBSERVER)
       ========================================================================== */
    const observerOptions = { threshold: 0.1 };

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
       ========================================================================== */
    const blinker = document.querySelector('.blink');
    if (blinker) {
        setInterval(() => {
            blinker.style.opacity = (blinker.style.opacity === '0' ? '1' : '0');
        }, 500);
    }


    /* ==========================================================================
       3. MENU MOBILE
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
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
       4. TYPEWRITER EFFECT
       ========================================================================== */
    const typeWriterElement = document.getElementById('typewriter');

    if (typeWriterElement) {
        const phrases = [
            "NATAN_RODRIGUES",
            "FULL_STACK_DEV",
            "CURRENTLY_LEARNING",
            "TECH_ENTHUSIAST",
            "COMPUTER_SCIENCE",
            "WELCOME_TO_MY_PORTFOLIO"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function loopTyper() {
            const currentPhrase = phrases[phraseIndex];
            if (isDeleting) {
                typeWriterElement.innerText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeWriterElement.innerText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = 100;
            if (isDeleting) typeSpeed = 50;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 5000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }
            setTimeout(loopTyper, typeSpeed);
        }
        loopTyper();
    }


    /* ==========================================================================
       5. GITHUB API INTEGRATION (COM CACHE)
       ========================================================================== */
    const projectCards = document.querySelectorAll('.project-card[data-repo]');

    projectCards.forEach(async (card) => {
        const repoPath = card.getAttribute('data-repo');
        const techList = card.querySelector('.tech-list');

        if (!repoPath || !techList) return;

        const cacheKey = `gh_cache_${repoPath}`;
        const cachedData = localStorage.getItem(cacheKey);

        const renderTags = (languages) => {
            techList.innerHTML = '';
            const languageNames = Object.keys(languages);
            const topLanguages = languageNames.slice(0, 4);

            topLanguages.forEach(lang => {
                const span = document.createElement('span');
                span.innerText = lang;
                span.style.animation = "popIn 0.5s ease forwards"; 
                techList.appendChild(span);
            });
        };

        if (cachedData) {
            const parsedCache = JSON.parse(cachedData);
            const now = new Date().getTime();
            const oneDay = 24 * 60 * 60 * 1000;

            if (now - parsedCache.timestamp < oneDay) {
                console.log(`[Cache] Usando dados salvos para: ${repoPath}`);
                renderTags(parsedCache.languages);
                return;
            }
        }

        try {
            console.log(`[API] Buscando: https://api.github.com/repos/${repoPath}/languages`);
            const response = await fetch(`https://api.github.com/repos/${repoPath}/languages`);
            
            if (response.ok) {
                const languages = await response.json();
                if (Object.keys(languages).length > 0) {
                    localStorage.setItem(cacheKey, JSON.stringify({
                        timestamp: new Date().getTime(),
                        languages: languages
                    }));
                    renderTags(languages);
                } else {
                    techList.innerHTML = '<span>Sem código</span>';
                }
            } else {
                console.warn(`Erro API GitHub: ${response.status}`);
                if (cachedData) {
                    renderTags(JSON.parse(cachedData).languages);
                } else {
                    techList.innerHTML = '<span style="color:#ff5555">Github Error</span>';
                }
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
            techList.innerHTML = '<span>Offline</span>';
        }
    });


    /* ==========================================================================
       6. SISTEMA MESTRE: TRADUÇÃO + IDENTIDADE (INTEGRADOS)
       Aqui resolvemos o conflito do Welcome Tag
       ========================================================================== */
    
    // Configuração dos Textos
    const translations = {
        pt: {
            nav_about: "Sobre",
            nav_projects: "Projetos",
            nav_contact: "Contato",
            // Removemos 'welcome_tag' estática daqui para tratar dinamicamente
            welcome_prefix_os: ":: BEM-VINDO ",
            welcome_prefix_user: ":: BEM-VINDO DE VOLTA, ",
            hero_desc: "Estudante de Ciência da Computação (UniFil) e explorador do caos digital. Crio soluções em Python, Java e Web com estética única.",
            btn_projects: "Ver_Projetos",
            btn_cv: "Baixar_CV",
            title_about: "> Sobre_Mim",
            profile_desc: "20 anos • Londrina/PR",
            stack_title: "> Stack_Principal",
            education_title: "> Educação",
            quote: "\"Codando e ouvindo música.\"",
            title_projects: "> Projetos_Selecionados",
            contact_title: ">> INICIAR_COMUNICACAO",
            contact_desc: "Envie uma mensagem criptografada para o sistema.",
            btn_send: "ENVIAR_DADOS",
            cv_file: "./assets/curriculo_pt.pdf",
            cv_name: "Natan_Rodrigues_CV_PT.pdf"
        },
        en: {
            nav_about: "About",
            nav_projects: "Projects",
            nav_contact: "Contact",
            // Prefixos dinâmicos
            welcome_prefix_os: ":: WELCOME ",
            welcome_prefix_user: ":: WELCOME BACK, ",
            hero_desc: "Computer Science student (UniFil) and explorer of digital chaos. Building solutions in Python, Java, and Web with unique aesthetics.",
            btn_projects: "View_Projects",
            btn_cv: "Download_Resume",
            title_about: "> About_Me",
            profile_desc: "20 y/o • Londrina, Brazil",
            stack_title: "> Main_Stack",
            education_title: "> Education",
            quote: "\"Coding and listening to music.\"",
            title_projects: "> Selected_Projects",
            contact_title: ">> START_COMMUNICATION",
            contact_desc: "Send an encrypted message to the system.",
            btn_send: "SEND_DATA",
            cv_file: "./assets/curriculo_en.pdf",
            cv_name: "Natan_Rodrigues_Resume_EN.pdf"
        }
    };

    const btnPt = document.getElementById('btn-pt');
    const btnEn = document.getElementById('btn-en');
    const cvButton = document.getElementById('cv-btn');
    
    // --- LÓGICA DO MODAL (IDENTIDADE) ---
    const welcomeTag = document.querySelector('.mono-tag');
    const modal = document.getElementById('custom-modal');
    const inputField = document.getElementById('user-input');
    const btnConfirm = document.getElementById('modal-confirm');
    const btnCancel = document.getElementById('modal-cancel');

    // Configura o Modal
    if (welcomeTag && modal) {
        welcomeTag.style.cursor = "pointer";
        welcomeTag.title = "Clique para alterar identificação";

        welcomeTag.addEventListener('click', () => {
            modal.style.display = 'flex';
            inputField.value = '';
            inputField.focus();
        });

        const closeModal = () => modal.style.display = 'none';
        
        const saveName = () => {
            const name = inputField.value.trim().toUpperCase();
            if (name) {
                localStorage.setItem('portfolioUser', name);
                closeModal();
                // Atualiza a tela imediatamente chamando a tradução
                const currentLang = localStorage.getItem('siteLang') || 'pt';
                setLanguage(currentLang);
            }
        };

        btnConfirm.addEventListener('click', saveName);
        btnCancel.addEventListener('click', closeModal);
        inputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') saveName(); });
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    }

    // --- FUNÇÃO MESTRE DE TRADUÇÃO ---
    function setLanguage(lang) {
        // 1. Atualiza textos comuns
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');

            // TRATAMENTO ESPECIAL PARA A TAG DE BEM-VINDO
            if (key === 'welcome_tag') {
                const userName = localStorage.getItem('portfolioUser');
                
                if (userName) {
                    // SE TEM NOME SALVO
                    const prefix = translations[lang].welcome_prefix_user;
                    el.innerText = `${prefix}${userName} ::`;
                } else {
                    // SE NÃO TEM NOME (Detecta OS)
                    const userAgent = window.navigator.userAgent;
                    let osName = "USER";
                    if (userAgent.indexOf("Win") !== -1) osName = "WINDOWS USER";
                    if (userAgent.indexOf("Mac") !== -1) osName = "MACINTOSH USER";
                    if (userAgent.indexOf("Linux") !== -1) osName = "LINUX USER";
                    if (userAgent.indexOf("Android") !== -1) osName = "ANDROID USER";
                    if (userAgent.indexOf("iPhone") !== -1) osName = "IOS USER";
                    
                    const prefix = translations[lang].welcome_prefix_os;
                    el.innerText = `${prefix}${osName} ::`;
                }
                return; // Pula o processamento padrão para essa tag
            }

            // Tratamento padrão para o resto
            if (translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // 2. Atualiza o CV
        if (cvButton) {
            cvButton.href = translations[lang].cv_file;
            cvButton.setAttribute('download', translations[lang].cv_name);
        }

        // 3. Atualiza Botões PT/EN
        if (lang === 'pt') {
            btnPt.classList.add('active');
            btnEn.classList.remove('active');
        } else {
            btnEn.classList.add('active');
            btnPt.classList.remove('active');
        }

        // 4. Salva preferência
        localStorage.setItem('siteLang', lang);
    }

    // Inicialização
    if (btnPt && btnEn) {
        btnPt.addEventListener('click', () => setLanguage('pt'));
        btnEn.addEventListener('click', () => setLanguage('en'));
    }

    // Carrega idioma salvo ou padrão
    const savedLang = localStorage.getItem('siteLang') || 'pt';
    setLanguage(savedLang);

    /* ==========================================================================
       8. FORMULÁRIO SEM REDIRECIONAMENTO (AJAX)
       Envia os dados via fetch e mostra popup de sucesso.
       ========================================================================== */
    const contactForm = document.querySelector('.contact-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');

    if (contactForm && successModal && closeSuccessBtn) {
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // 1. Impede o redirecionamento padrão

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            // 2. Feedback visual de "Carregando"
            submitBtn.innerText = "ENVIANDO...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            // 3. Prepara os dados
            const formData = new FormData(contactForm);

            try {
                // 4. Envia para o Web3Forms via Fetch (AJAX)
                const response = await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    body: formData
                });

                if (response.ok) {
                    // 5. Se deu certo: Limpa o form e abre o modal
                    contactForm.reset();
                    successModal.style.display = 'flex';
                } else {
                    alert("Erro ao enviar. Tente novamente.");
                }

            } catch (error) {
                console.error("Erro no envio:", error);
                alert("Erro de conexão. Verifique sua internet.");
            } finally {
                // 6. Restaura o botão
                submitBtn.innerText = originalText;
                submitBtn.style.opacity = "1";
                submitBtn.disabled = false;
            }
        });

        // Lógica para fechar o Modal de Sucesso
        closeSuccessBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
        });

        // Fecha se clicar fora
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.style.display = 'none';
            }
        });
    }
});