document.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const newNoteBtn = topBar.querySelector('i');
    const header = topBar.querySelector('a');

    if (window.scrollY > 100) {
        topBar.style.fontSize = '12px';
        topBar.style.backgroundColor = 'var(--button-color)';
        header.style.color = 'white';
        newNoteBtn.style.color = 'white';
        newNoteBtn.style.fontSize = '28px';
        return;
    }

    topBar.style.backgroundColor = `rgb(${2.55 * (100 - window.scrollY)}, ${
        255 - window.scrollY
    }, 255)`;
    header.style.color = `rgb(${2.55 * window.scrollY}, ${
        2.55 * window.scrollY
    }, ${2.55 * window.scrollY})`;
    newNoteBtn.style.color = `rgb(${window.scrollY * 2.55}, ${
        window.scrollY * (2.55 - 1.55) + 155
    }, 255)`;
    topBar.style.fontSize = `${(100 - window.scrollY) * 0.18 + 12}px`;
    newNoteBtn.style.fontSize = `${(100 - window.scrollY) * 0.12 + 28}px`;
});
