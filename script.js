document.addEventListener('DOMContentLoaded', () => {
    // Primeiro bloco de código para scroll suave
    const link1 = document.getElementById("link1");
    const link2 = document.getElementById("link2");
    const link3 = document.getElementById("link3");

    if (link1) {
        link1.addEventListener('click', () => {
            scrollToElement('#Home');
        });
    }

    if (link2) {
        link2.addEventListener('click', () => {
            scrollToElement('#Skills');
        });
    }

    if (link3) {
        // Corrigido ID sem espaços
        link3.addEventListener('click', () => {
            scrollToElement('#MyProjects');
        });
    }

    // Função de scroll suave
    function scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Segundo bloco de código para scroll suave de todos os links no nav
    const links = document.querySelectorAll('nav a');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Previne o comportamento padrão de navegação

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Código para redirecionar ao clicar no botão "Contato"
    const btnContato = document.getElementById('btnContato');
    if (btnContato) {
        btnContato.addEventListener('click', () => {
            alert('Site ainda em desenvolvimento!');
        });
    }
});

document.getElementById('startButton').addEventListener('click', function() {
    alert('SITE AINDA EM DESENVOLVIMENTO!');
});

