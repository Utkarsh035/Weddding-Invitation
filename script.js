/* =====================================================
   PRAGATI & RAJAT — WEDDING INVITATION
   Interactive JavaScript
===================================================== */


/* =====================================================
   LOADING SCREEN
===================================================== */

const loader =
    document.getElementById("loader");


window.addEventListener("load", () => {

    setTimeout(() => {

        if (loader) {
            loader.classList.add("hide");
        }

    }, 2800);

});



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        revealObserver.observe(element);

    });



/* =====================================================
   CURSOR GLOW
===================================================== */

const glow =
    document.querySelector(".cursor-glow");


window.addEventListener(
    "pointermove",
    event => {

        if (!glow) {
            return;
        }

        glow.style.left =
            event.clientX + "px";

        glow.style.top =
            event.clientY + "px";

    }
);



/* =====================================================
   3D EVENT CARD
===================================================== */

const card =
    document.querySelector(".event-card");


window.addEventListener(
    "pointermove",
    event => {

        if (
            window.innerWidth < 900 ||
            !card
        ) {

            return;

        }


        const rect =
            card.getBoundingClientRect();


        if (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        ) {

            const x =
                (event.clientX - rect.left)
                / rect.width - 0.5;


            const y =
                (event.clientY - rect.top)
                / rect.height - 0.5;


            card.style.transform =
                `rotateY(${x * 4}deg)
                 rotateX(${-y * 3}deg)`;

        }

    }
);


if (card) {

    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

}



/* =====================================================
   PARTICLE BACKGROUND
===================================================== */

const canvas =
    document.getElementById("particles");


const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;


let particles = [];


function resizeCanvas() {

    if (!canvas) {
        return;
    }

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);



/* =====================================================
   CREATE PARTICLES
===================================================== */

for (let i = 0; i < 55; i++) {

    particles.push({

        x:
            Math.random() *
            window.innerWidth,

        y:
            Math.random() *
            window.innerHeight,

        r:
            Math.random() * 1.6 + 0.3,

        a:
            Math.random() * 0.45 + 0.08,

        vx:
            (Math.random() - 0.5) *
            0.12,

        vy:
            (Math.random() - 0.5) *
            0.12

    });

}



/* =====================================================
   ANIMATE PARTICLES
===================================================== */

function animateParticles() {

    if (!canvas || !ctx) {
        return;
    }


    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    particles.forEach(p => {

        p.x += p.vx;
        p.y += p.vy;


        if (p.x < 0) {

            p.x =
                canvas.width;

        }


        if (p.x > canvas.width) {

            p.x = 0;

        }


        if (p.y < 0) {

            p.y =
                canvas.height;

        }


        if (p.y > canvas.height) {

            p.y = 0;

        }


        ctx.beginPath();


        ctx.arc(
            p.x,
            p.y,
            p.r,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(169,134,82,${p.a})`;


        ctx.fill();

    });


    requestAnimationFrame(
        animateParticles
    );

}


animateParticles();



/* =====================================================
   PARALLAX PORTRAIT
===================================================== */

const parallax =
    document.querySelector(
        ".parallax-card"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!parallax) {
            return;
        }


        const rect =
            parallax.getBoundingClientRect();


        if (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        ) {

            const offset =
                (
                    window.innerHeight / 2 -
                    (
                        rect.top +
                        rect.height / 2
                    )
                ) * 0.08;


            parallax.style.transform =
                `translateY(${offset}px)`;

        }

    },

    {
        passive: true
    }

);



/* =====================================================
   WEB3FORMS
===================================================== */

const form =
    document.getElementById(
        "wishForm"
    );


const status =
    document.getElementById(
        "formStatus"
    );


form?.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        /*
           Check whether the user
           has inserted their API key.
        */

        const key =
            form.querySelector(
                '[name="access_key"]'
            ).value;


        if (
            key ===
            "YOUR_WEB3FORMS_ACCESS_KEY"
        ) {

            if (status) {

                status.textContent =
                    "Add your Web3Forms access key in index.html to activate this form.";

            }

            return;

        }


        const button =
            form.querySelector(
                "button"
            );


        if (button) {

            button.disabled = true;

            button.innerHTML =
                "SENDING…";

        }


        try {

            const response =
                await fetch(
                    form.action,
                    {

                        method: "POST",

                        body:
                            new FormData(form)

                    }
                );


            const data =
                await response.json();


            if (data.success) {

                if (status) {

                    status.textContent =
                        "Your blessings have been sent with love. Thank you!";


                    status.classList.add(
                        "form-success"
                    );

                }


                form.reset();

            }

            else {

                throw new Error();

            }

        }

        catch {

            if (status) {

                status.textContent =
                    "Something went wrong. Please try again.";

            }

        }

        finally {

            if (button) {

                button.disabled = false;


                button.innerHTML =
                    'SEND BLESSINGS <span>✦</span>';

            }

        }

    }

);



/* =====================================================
   WEDDING COUNTDOWN
===================================================== */

/*
   Wedding Date:
   15 February 2027
   India / Lucknow timezone
*/

const daysElement =
    document.getElementById(
        "days"
    );


const hoursElement =
    document.getElementById(
        "hours"
    );


const minutesElement =
    document.getElementById(
        "minutes"
    );


const secondsElement =
    document.getElementById(
        "seconds"
    );


const weddingDate =
    new Date(
        "2027-02-15T00:00:00+05:30"
    ).getTime();



function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        weddingDate - now;


    /*
       Wedding date has arrived
    */

    if (difference <= 0) {

        if (daysElement)
            daysElement.textContent = "00";

        if (hoursElement)
            hoursElement.textContent = "00";

        if (minutesElement)
            minutesElement.textContent = "00";

        if (secondsElement)
            secondsElement.textContent = "00";

        return;

    }


    /* Calculate days */

    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    /* Calculate hours */

    const hours =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    /* Calculate minutes */

    const minutes =
        Math.floor(
            (
                difference %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    /* Calculate seconds */

    const seconds =
        Math.floor(
            (
                difference %
                (1000 * 60)
            ) /
            1000
        );


    /* Display values */

    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(
                2,
                "0"
            );

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(
                2,
                "0"
            );

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(
                2,
                "0"
            );

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(
                2,
                "0"
            );

    }

}


/* Run immediately */

updateCountdown();


/* Update every second */

setInterval(
    updateCountdown,
    1000
);
/* WEDDING BACKGROUND MUSIC */
const audio = document.getElementById("weddingMusic");
const button = document.getElementById("musicToggle");
const label = document.getElementById("musicLabel");

if (audio && button && label) {
    audio.loop = true;
    audio.volume = 0.15;

    label.textContent = "TAP TO PLAY MUSIC";

    button.addEventListener("click", async () => {
        if (audio.paused) {
            try {
                await audio.play();
            } catch (error) {
                console.error("Audio error:", error);
                label.textContent = "MUSIC FAILED TO PLAY";
            }
        } else {
            audio.pause();
        }
    });

    audio.addEventListener("play", () => {
        label.textContent = "PAUSE MUSIC";
    });

    audio.addEventListener("pause", () => {
        label.textContent =
            audio.currentTime === 0
                ? "TAP TO PLAY MUSIC"
                : "RESUME MUSIC";
    });
}

/* Wedding music controls */
(() => {
    const audio = document.getElementById("weddingMusic");
    const button = document.getElementById("musicToggle");
    const label = document.getElementById("musicLabel");

    if (!audio || !button || !label) {
        console.error("Music audio/button/label missing.");
        return;
    }

    audio.loop = true;
    audio.volume = 0.15;

    function updateButton() {
        if (audio.paused) {
            label.textContent =
                audio.currentTime > 0 ? "RESUME MUSIC" : "TAP TO PLAY MUSIC";
            button.setAttribute("aria-label", "Play wedding music");
        } else {
            label.textContent = "PAUSE MUSIC";
            button.setAttribute("aria-label", "Pause wedding music");
        }
    }

    button.addEventListener("click", async (event) => {
        event.preventDefault();

        if (audio.paused) {
            label.textContent = "LOADING MUSIC...";

            try {
                await audio.play();
                updateButton();
            } catch (error) {
                console.error("Music playback failed:", error);
                label.textContent = "TAP TO PLAY MUSIC";
            }
        } else {
            audio.pause();
            updateButton();
        }
    });

    audio.addEventListener("play", updateButton);
    audio.addEventListener("pause", updateButton);
    audio.addEventListener("ended", updateButton);

    updateButton();
})();
