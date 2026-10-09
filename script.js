gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, TextPlugin);

const pop = (vars = {}) => ({ opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)', ...vars });
const fade = (vars = {}) => ({ opacity: 1, duration: 0.4, ease: 'power1.out', ...vars });
const fadeOut = (vars = {}) => ({ opacity: 0, duration: 0.3, ease: 'power1.in', ...vars });
const draw = (vars = {}) => ({ strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut', ...vars });
const type = (el) => ({ text: el.dataset.text, duration: el.dataset.text.length * 0.035, ease: 'none' });

function hidePop(targets) {
    gsap.set(targets, { opacity: 0, scale: 0, transformOrigin: '50% 50%' });
}

function hide(targets) {
    gsap.set(targets, { opacity: 0 });
}

function hideDraw(targets) {
    gsap.utils.toArray(targets).forEach((el) => {
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: `${length} ${length + 1}`, strokeDashoffset: length });
    });
}

function hideText(el) {
    el.dataset.text = el.textContent;
    gsap.set(el, { text: '' });
}

function travel(path) {
    return {
        motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
        duration: 1,
        ease: 'power1.inOut',
    };
}

const animations = {
    repository(q) {
        const [cmd] = q('.js-cmd');
        hideText(cmd);
        hidePop(q('.js-folder, .js-git-badge, .js-history-dot, .js-cloud, .js-cloud-folder'));
        hide(q('.js-folder-label, .js-history-label, .js-arrow-label, .js-cloud-label'));
        gsap.set(q('.js-file'), { opacity: 0, y: -16 });
        hideDraw(q('.js-history-line, .js-arrow'));

        return gsap.timeline({ paused: true })
            .to(cmd, type(cmd))
            .to(q('.js-folder'), pop())
            .to(q('.js-folder-label'), fade(), '<0.1')
            .to(q('.js-file'), { opacity: 1, y: 0, stagger: 0.15, duration: 0.4, ease: 'power2.out' })
            .to(q('.js-git-badge'), pop())
            .to(q('.js-history-line'), draw({ duration: 0.6 }))
            .to(q('.js-history-dot'), pop({ stagger: 0.12 }), '<0.1')
            .to(q('.js-history-label'), fade(), '<0.2')
            .to(q('.js-arrow'), draw(), '+=0.3')
            .to(q('.js-arrow-label'), fade(), '<')
            .to(q('.js-cloud'), pop())
            .to(q('.js-cloud-folder'), pop(), '-=0.15')
            .to(q('.js-cloud-label'), fade({ stagger: 0.1 }), '<');
    },

    clone(q) {
        const [cmd] = q('.js-cmd');
        const [output] = q('.js-output');
        hideText(cmd);
        hideText(output);
        hidePop(q('.js-cloud, .js-source, .js-laptop'));
        hide(q('.js-remote-label, .js-local-label, .js-folder-name'));
        hideDraw(q('.js-arc'));
        gsap.set(q('.js-copy'), { opacity: 0, x: -254, y: -62 });

        return gsap.timeline({ paused: true })
            .to(q('.js-cloud'), pop())
            .to(q('.js-remote-label'), fade(), '<0.1')
            .to(q('.js-source'), pop(), '<0.1')
            .to(q('.js-laptop'), pop())
            .to(q('.js-local-label'), fade(), '<0.1')
            .to(cmd, type(cmd))
            .to(q('.js-arc'), draw({ duration: 0.6 }))
            .to(q('.js-copy'), { opacity: 1, duration: 0.15 }, '<0.2')
            .to(q('.js-copy'), { x: 0, y: 0, duration: 1.1, ease: 'power2.inOut' }, '<')
            .to(output, type(output), '-=0.3')
            .to(q('.js-folder-name'), fade());
    },

    branch(q) {
        hideDraw(q('.js-main-line, .js-branch-line'));
        hidePop(q('.js-a, .js-b, .js-c, .js-d, .js-f1, .js-f2, .js-f3'));
        hide(q('.js-main-label, .js-branch-label'));
        gsap.set(q('.js-head'), { opacity: 0, x: -280, y: 100 });

        return gsap.timeline({ paused: true })
            .to(q('.js-main-line'), draw({ duration: 1 }))
            .to(q('.js-a'), pop(), '<0.1')
            .to(q('.js-b'), pop(), '<0.25')
            .to(q('.js-main-label'), fade(), '<')
            .to(q('.js-head'), fade())
            .to(q('.js-branch-line'), draw(), '+=0.2')
            .to(q('.js-branch-label'), fade(), '<0.3')
            .to(q('.js-f1'), pop())
            .to(q('.js-head'), { x: -180, y: 0, duration: 0.5, ease: 'power2.inOut' }, '<')
            .to(q('.js-c'), pop(), '+=0.2')
            .to(q('.js-f2'), pop(), '+=0.2')
            .to(q('.js-head'), { x: -90, duration: 0.4, ease: 'power2.inOut' }, '<')
            .to(q('.js-d'), pop(), '+=0.2')
            .to(q('.js-f3'), pop(), '+=0.2')
            .to(q('.js-head'), { x: 0, duration: 0.4, ease: 'power2.inOut' }, '<');
    },

    commit(q) {
        const [cmdAdd] = q('.js-cmd-add');
        const [cmdCommit] = q('.js-cmd-commit');
        hideText(cmdAdd);
        hideText(cmdCommit);
        hide(q('.js-label, .js-staging, .js-flash, .js-hash'));
        gsap.set(q('.js-file'), { opacity: 0, x: -20, transformOrigin: '50% 50%' });
        hideDraw(q('.js-timeline'));
        hidePop(q('.js-old'));
        gsap.set(q('.js-new'), { opacity: 0, scale: 0, x: 40, y: -142, transformOrigin: '50% 50%' });
        gsap.set(q('.js-bubble'), { opacity: 0, scale: 0.6, transformOrigin: '0% 50%' });

        return gsap.timeline({ paused: true })
            .to(q('.js-label'), fade())
            .to(q('.js-file'), { opacity: 1, x: 0, stagger: 0.12, duration: 0.4, ease: 'power2.out' }, '<')
            .to(q('.js-staging'), fade(), '<0.2')
            .to(q('.js-timeline'), draw({ duration: 0.6 }), '<')
            .to(q('.js-old'), pop({ stagger: 0.15 }), '<0.2')
            .to(cmdAdd, type(cmdAdd), '+=0.2')
            .to(q('.js-file-staged'), { x: 185, y: 16, stagger: 0.2, duration: 0.7, ease: 'power2.inOut' })
            .to(cmdAdd, fadeOut(), '+=0.4')
            .to(cmdCommit, type(cmdCommit))
            .to(q('.js-flash'), { opacity: 0.95, duration: 0.1 })
            .to(q('.js-file-staged'), { scale: 0.2, opacity: 0, duration: 0.01 })
            .to(q('.js-flash'), { opacity: 0, duration: 0.4 })
            .to(q('.js-new'), { opacity: 1, scale: 1.4, duration: 0.25, ease: 'back.out(2)' }, '<')
            .to(q('.js-new'), { x: 0, y: 0, scale: 1, duration: 0.9, ease: 'power2.inOut' })
            .to(q('.js-hash'), fade())
            .to(q('.js-bubble'), pop(), '<');
    },

    pushPull(q) {
        const [pushPath] = q('.js-push-path');
        const [pullPath] = q('.js-pull-path');
        hide(q('.js-laptop, .js-cloud, .js-label, .js-push-label, .js-pull-label, .js-push-dot, .js-pull-dot'));
        hideDraw(q('.js-local-line, .js-remote-line, .js-push-path, .js-pull-path'));
        hidePop(q('[class*="js-local-"], [class*="js-remote-"]').filter((el) => el.tagName === 'circle'));

        return gsap.timeline({ paused: true })
            .to(q('.js-laptop, .js-cloud'), fade({ stagger: 0.15 }))
            .to(q('.js-label'), fade(), '<0.1')
            .to(q('.js-local-line, .js-remote-line'), draw({ duration: 0.5 }))
            .to(q('.js-local-a, .js-remote-a'), pop(), '<0.1')
            .to(q('.js-local-b, .js-remote-b'), pop(), '<0.15')
            .to(q('.js-local-c'), pop(), '+=0.3')
            .to(pushPath, draw({ duration: 0.6 }), '+=0.2')
            .to(q('.js-push-label'), fade(), '<')
            .to(q('.js-push-dot'), { opacity: 1, duration: 0.1 })
            .to(q('.js-push-dot'), travel(pushPath), '<')
            .to(q('.js-push-dot'), fadeOut({ duration: 0.15 }))
            .to(q('.js-remote-c'), pop(), '<')
            .to(q('.js-remote-d'), pop(), '+=0.6')
            .to(pullPath, draw({ duration: 0.6 }), '+=0.2')
            .to(q('.js-pull-label'), fade(), '<')
            .to(q('.js-pull-dot'), { opacity: 1, duration: 0.1 })
            .to(q('.js-pull-dot'), travel(pullPath), '<')
            .to(q('.js-pull-dot'), fadeOut({ duration: 0.15 }))
            .to(q('.js-local-d'), pop(), '<');
    },

    diff(q) {
        const scanFrom = 44;
        const scanTo = 246;
        const scanDuration = 2;
        hide(q('.js-panel, .js-header, .js-hl, .js-scan'));
        gsap.set(q('.js-line'), { opacity: 0, x: -8 });
        hidePop(q('.js-summary'));

        const tl = gsap.timeline({ paused: true })
            .to(q('.js-header'), fade())
            .to(q('.js-panel'), fade(), '<')
            .to(q('.js-line'), { opacity: 1, x: 0, stagger: 0.03, duration: 0.3, ease: 'power2.out' })
            .to(q('.js-scan'), { opacity: 0.8, duration: 0.2 })
            .addLabel('scan')
            .to(q('.js-scan'), { y: scanTo - scanFrom, duration: scanDuration, ease: 'none' }, 'scan');

        q('.js-hl').forEach((highlight) => {
            const lineTop = Number(highlight.dataset.y) - 18;
            const at = (scanDuration * (lineTop - scanFrom)) / (scanTo - scanFrom);
            tl.to(highlight, fade({ duration: 0.25 }), `scan+=${at}`);
        });

        return tl
            .to(q('.js-scan'), fadeOut())
            .to(q('.js-summary'), pop());
    },

    merge(q) {
        const [cmd] = q('.js-cmd');
        hideText(cmd);
        hideDraw(q('.js-main-line, .js-branch-line, .js-merge-line'));
        hidePop(q('.js-a, .js-b, .js-c, .js-f1, .js-f2, .js-m'));
        hide(q('.js-main-label, .js-branch-label, .js-merge-label, .js-ring'));
        gsap.set(q('.js-ring'), { transformOrigin: '50% 50%' });

        return gsap.timeline({ paused: true })
            .to(q('.js-main-line'), draw({ duration: 1 }))
            .to(q('.js-a'), pop(), '<0.1')
            .to(q('.js-b'), pop(), '<0.25')
            .to(q('.js-main-label'), fade(), '<')
            .to(q('.js-branch-line'), draw({ duration: 0.6 }))
            .to(q('.js-branch-label'), fade(), '<0.3')
            .to(q('.js-f1'), pop())
            .to(q('.js-c'), pop(), '+=0.15')
            .to(q('.js-f2'), pop(), '+=0.15')
            .to(cmd, type(cmd), '+=0.3')
            .to(q('.js-merge-line'), draw({ duration: 0.7 }))
            .to(q('.js-m'), pop({ ease: 'back.out(3)' }))
            .to(q('.js-ring'), { opacity: 0.9, duration: 0.01 }, '<')
            .to(q('.js-ring'), { scale: 2.4, opacity: 0, duration: 0.8, ease: 'power2.out' }, '<')
            .to(q('.js-merge-label'), fade({ stagger: 0.1 }), '<');
    },

    rebase(q) {
        const [cmd] = q('.js-cmd');
        hideText(cmd);
        hideDraw(q('.js-main-line, .js-old-line, .js-new-line'));
        hidePop(q('.js-a, .js-b, .js-c, .js-d, .js-f-old'));
        hide(q('.js-main-label, .js-orphan-label'));
        gsap.set(q('.js-branch-label'), { opacity: 0, x: -175 });
        gsap.set(q('.js-f1-new'), { opacity: 0, x: -180 });
        gsap.set(q('.js-f2-new'), { opacity: 0, x: -170 });

        return gsap.timeline({ paused: true })
            .to(q('.js-main-line'), draw({ duration: 0.8 }))
            .to(q('.js-a'), pop(), '<0.1')
            .to(q('.js-b'), pop(), '<0.25')
            .to(q('.js-main-label'), fade(), '<')
            .to(q('.js-old-line'), draw({ duration: 0.6 }))
            .to(q('.js-f-old'), pop({ stagger: 0.2 }), '<0.3')
            .to(q('.js-branch-label'), fade(), '<')
            .to(q('.js-c'), pop(), '+=0.3')
            .to(q('.js-d'), pop(), '+=0.15')
            .to(cmd, type(cmd), '+=0.3')
            .to(q('.js-old'), { opacity: 0.22, duration: 0.5 })
            .to(q('.js-new-line'), draw({ duration: 0.7 }), '<')
            .to(q('.js-f1-new'), { opacity: 1, x: 0, duration: 0.9, ease: 'power2.inOut' }, '<0.1')
            .to(q('.js-f2-new'), { opacity: 1, x: 0, duration: 0.9, ease: 'power2.inOut' }, '<0.15')
            .to(q('.js-branch-label'), { x: 0, duration: 0.9, ease: 'power2.inOut' }, '<')
            .to(q('.js-orphan-label'), fade());
    },

    conflict(q) {
        hidePop(q('.js-card, .js-badge-conflict, .js-badge-resolved'));
        hideDraw(q('.js-arrow'));
        hide(q('.js-panel, .js-line'));
        gsap.set(q('.js-pointer'), { opacity: 0, x: 120, y: 40, transformOrigin: '0% 0%' });

        return gsap.timeline({ paused: true })
            .to(q('.js-card'), pop({ stagger: 0.2 }))
            .to(q('.js-arrow'), draw({ duration: 0.5 }))
            .to(q('.js-panel'), fade())
            .to(q('.js-line'), fade({ stagger: 0.12, duration: 0.25 }))
            .to(q('.js-badge-conflict'), pop())
            .to(q('.js-badge-conflict'), { x: 4, duration: 0.06, repeat: 5, yoyo: true, ease: 'none' })
            .to(q('.js-pointer'), { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power2.out' }, '+=0.3')
            .to(q('.js-pointer'), { scale: 0.8, duration: 0.1, repeat: 1, yoyo: true })
            .to(q('.js-drop'), fadeOut({ duration: 0.35 }), '+=0.1')
            .to(q('.js-keep'), { y: -72, duration: 0.6, ease: 'power2.inOut' })
            .to(q('.js-pointer'), fadeOut(), '<')
            .to(q('.js-badge-conflict'), fadeOut({ duration: 0.2 }))
            .to(q('.js-badge-resolved'), pop(), '<0.1');
    },

    pullRequest(q) {
        gsap.set(q('.js-card'), { opacity: 0, y: 20 });
        hidePop(q('.js-chip-open, .js-chip-merged, .js-check'));
        gsap.set(q('.js-comment'), { opacity: 0, scale: 0.6, transformOrigin: '0% 50%' });
        hide(q('.js-row, .js-checks-done, .js-review-done, .js-merged-btn'));
        gsap.set(q('.js-spinner, .js-avatar, .js-merge-btn'), { transformOrigin: '50% 50%' });

        return gsap.timeline({ paused: true })
            .to(q('.js-card'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to(q('.js-chip-open'), pop())
            .to(q('.js-row'), fade({ stagger: 0.15 }))
            .to(q('.js-spinner'), { rotation: 720, duration: 1.4, ease: 'none' }, '<')
            .to(q('.js-spinner, .js-checks-running'), fadeOut({ duration: 0.2 }))
            .to(q('.js-check'), pop(), '<')
            .to(q('.js-checks-done'), fade(), '<')
            .to(q('.js-avatar'), { scale: 1.25, duration: 0.15, repeat: 1, yoyo: true }, '+=0.3')
            .to(q('.js-review-pending'), fadeOut({ duration: 0.2 }), '<')
            .to(q('.js-review-done'), fade())
            .to(q('.js-comment'), pop(), '+=0.1')
            .to(q('.js-merge-btn'), { scale: 1.06, duration: 0.25, repeat: 1, yoyo: true, ease: 'sine.inOut' }, '+=0.3')
            .to(q('.js-merge-btn'), { scale: 0.94, duration: 0.1, repeat: 1, yoyo: true })
            .to(q('.js-merged-btn'), fade({ duration: 0.25 }))
            .to(q('.js-chip-open'), fadeOut({ duration: 0.2 }), '<')
            .to(q('.js-chip-merged'), pop(), '<0.1');
    },

    issue(q) {
        gsap.set(q('.js-card'), { opacity: 0, y: 20 });
        hidePop(q('.js-issue-open, .js-issue-closed, .js-tag, .js-assignee, .js-pr-open, .js-pr-merged'));
        hide(q('.js-title, .js-link'));
        gsap.set(q('.js-bar'), { scaleX: 0, transformOrigin: '0% 50%' });
        gsap.set(q('.js-pr'), { opacity: 0, x: 30 });

        return gsap.timeline({ paused: true })
            .to(q('.js-card'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
            .to(q('.js-issue-open'), pop())
            .to(q('.js-title'), fade({ stagger: 0.15 }), '<')
            .to(q('.js-tag'), pop({ stagger: 0.15 }))
            .to(q('.js-assignee'), pop())
            .to(q('.js-bar'), { scaleX: 1, stagger: 0.1, duration: 0.4, ease: 'power2.out' })
            .to(q('.js-link'), fade(), '+=0.3')
            .to(q('.js-pr'), { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }, '<')
            .to(q('.js-pr-open'), pop(), '-=0.1')
            .to(q('.js-pr-open'), fadeOut({ duration: 0.2 }), '+=0.6')
            .to(q('.js-pr-merged'), pop(), '<0.1')
            .to(q('.js-issue-open'), fadeOut({ duration: 0.2 }), '+=0.4')
            .to(q('.js-issue-closed'), pop(), '<0.1');
    },
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('[data-anim]').forEach((figure) => {
    const build = animations[figure.dataset.anim];
    const svg = figure.querySelector('svg');
    const replay = figure.querySelector('.replay');
    if (!build || !svg) return;

    const timeline = build(gsap.utils.selector(svg));
    replay.addEventListener('click', () => timeline.restart());

    if (prefersReducedMotion) {
        timeline.progress(1);
        return;
    }

    ScrollTrigger.create({
        trigger: figure,
        start: 'top 70%',
        once: true,
        onEnter: () => timeline.play(),
    });
});

document.fonts.ready.then(() => ScrollTrigger.refresh());
