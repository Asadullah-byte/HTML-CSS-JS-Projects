var path;

function valueSetters() {
    gsap.set('#nav a', { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    path = document.getElementById("UGrad");
    if (path) {
        var length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;
    } else {
        console.error('Path element not found.');
    }
}

function revealToSpan() {   

document.querySelectorAll(".reveal")
.forEach(elem => {
    let parent = document.createElement("span");
    let child = document.createElement("span");

    parent.classList.add("parent");
    child.classList.add("child");

    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
});
}

function loaderScreen() {
    var t1 = gsap.timeline();


    t1
        .from("#loader .child span", {
            x: 100,
            delay: 0.3,
            stagger: .2,
            duration: 0.7,
            opacity: 0,
            ease: Power3
        })

        .to("#loader .parent .child span", {
            y: "-110%",
            duration: 1,
            opacity: 0,
            stagger: 0.1,
            ease: Power3,
            delay: 0.2
        })
        .to("#loader .parent .child ", {
            y: "-110%",
            duration: 0.4,
            ease: Expo.easeInOut,
            delay: 0.2
        })

        .to(".loader-border", {
            visibility: "hidden",
            duration: 0
        });

    t1.to("#loader", {
        height: 0,
        duration: 1,
        ease: Circ.easeInOut
    })

    .to("#elem", {
        height: "100%",
        duration: 1,
        delay: -1,
        top: 0,
        ease: Circ.easeInOut
    })

    .to("#elem", {
        height: "0%",
        duration: 1.3,
        delay: -.5,
        ease: Power3,
        onComplete: function () {
            animateHomePage();
        }
    });
}

function animateSvg(){


    gsap.to(path, {
    strokeDashoffset: 10,
    duration: 5,
    ease: "power2.inOut"

});
}

function animateHomePage() {
    var t1 = gsap.timeline();

    t1.to(" #nav a ", {
        y: 0,
        opacity: 1,
        stagger: .05,
        ease: Expo.easeInOut
    })
    
    t1.to("#home .parent .child ", {
        y: 0,
        duration: 1,
        stagger: .05,
        ease: Expo.easeInOut,
        onComplete: function () {
            animateSvg();   
        }
    })
}

revealToSpan();
valueSetters();
loaderScreen();


