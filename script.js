document.addEventListener('DOMContentLoaded', () => {
    // 0. Controle do Menu Mobile
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const btnContatoMobile = document.getElementById('btnContatoMobile');

    function toggleMobileMenu() {
        mobileMenu.classList.toggle('active');
        // Animar ícones do hamburger
        hamburger.classList.toggle('active');
    }

    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Fechar menu ao clicar em um link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            closeMobileMenu();
        });
    });

    // Fechar menu ao clicar no botão contato mobile
    if (btnContatoMobile) {
        btnContatoMobile.addEventListener('click', () => {
            closeMobileMenu();
            // Abre o modal (será tratado pela seção 1)
            const modal = document.getElementById('contactModal');
            if (modal) {
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                }, 10);
            }
        });
    }

    // 1. Controle do Modal de Contato
    const modal = document.getElementById('contactModal');
    const btnContatoNav = document.getElementById('btnContato');
    const btnContatoFooter = document.getElementById('linkContatoFooter');
    const closeBtn = document.querySelector('.close-btn');

    function openModal(event) {
        if (event) event.preventDefault();
        if (modal) {
            modal.style.display = 'flex';
            // Pequeno delay para animação de opacidade funcionar suavemente
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    }

    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Tempo correspondente à transição do CSS
        }
    }

    if (btnContatoNav) {
        btnContatoNav.addEventListener('click', openModal);
    }

    if (btnContatoFooter) {
        btnContatoFooter.addEventListener('click', openModal);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Fechar ao clicar fora do conteúdo do modal
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 2. Copiar E-mail para a Área de Transferência
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const emailTextElement = document.getElementById('emailText');

    if (copyEmailBtn && emailTextElement) {
        copyEmailBtn.addEventListener('click', () => {
            const email = emailTextElement.innerText || emailTextElement.textContent;
            
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visual de sucesso
                copyEmailBtn.innerHTML = '<i class="ri-checkbox-circle-line"></i> Copiado!';
                copyEmailBtn.classList.add('success');
                
                // Resetar botão após 2 segundos
                setTimeout(() => {
                    copyEmailBtn.innerHTML = '<i class="ri-file-copy-line"></i> Copiar';
                    copyEmailBtn.classList.remove('success');
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar e-mail: ', err);
            });
        });
    }

    // 2.5 Copiar E-mail do Link Social
    const emailSocialLink = document.getElementById('emailSocialLink');
    if (emailSocialLink) {
        emailSocialLink.addEventListener('click', (event) => {
            event.preventDefault();
            const email = 'wesleycoliveira2003@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visual de sucesso
                const originalHTML = emailSocialLink.innerHTML;
                emailSocialLink.innerHTML = '<i class="ri-checkbox-circle-line"></i>';
                emailSocialLink.style.color = '#2ecc71';
                
                // Mostrar mensagem
                const message = document.createElement('div');
                message.textContent = 'Email copiado!';
                message.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #2ecc71;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 1rem;
                    z-index: 9999;
                    animation: fadeInOut 2s ease-in-out;
                `;
                document.body.appendChild(message);
                
                // Resetar link após 2 segundos
                setTimeout(() => {
                    emailSocialLink.innerHTML = originalHTML;
                    emailSocialLink.style.color = '';
                    message.remove();
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar e-mail: ', err);
            });
        });
    }

    // 3. Scroll Suave para Links Internos (Nav & Footer & Mobile)
    const smoothLinks = document.querySelectorAll('nav a, .footer-links a, .mobile-nav-link');

    smoothLinks.forEach(link => {
        // Ignora links que abrem o modal ou não são âncoras locais
        if (link.getAttribute('href') === '#' || link.id === 'linkContatoFooter' || link.id === 'btnContato') {
            return;
        }

        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita comportamento padrão de pulo de página

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 4. Verificação Segura do Botão Começar (evita erros se estiver comentado no HTML)
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', () => {
            const projectsSection = document.getElementById('MyProjects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 5. Scroll Reveal com IntersectionObserver
    const revealMap = [
        { selector: 'header .content',  cls: 'reveal-left'  },
        { selector: 'header .image',    cls: 'reveal-right' },
        { selector: 'section .header', cls: 'reveal'        },
        { selector: '.sub-header',      cls: 'reveal'        },
        { selector: '.features .card',  cls: 'reveal', stagger: true },
        { selector: '.project-card',    cls: 'reveal', stagger: true },
        { selector: '.tech-item',       cls: 'reveal', stagger: true },
        { selector: '.footer-content',  cls: 'reveal'        },
    ];

    revealMap.forEach(({ selector, cls, stagger }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add(cls);
            if (stagger) {
                el.style.transitionDelay = `${i * 0.07}s`;
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });
});

