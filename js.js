const leftPanelBtn = document.querySelector('.panelHead i');
const leftPanel = document.querySelector('.leftPanel');
const ul = document.querySelector('#ul');
const one = document.querySelector('.one');

// site initial effect 

function gsapEffect() {
    gsap.from(leftPanel, {
        delay: 0.5,
        x: -110,
        duration: 0.5,

    });

    gsap.from(".rightPanel", {
        delay: 0.5,
        x: 100,
        duration: 0.5,

    });

    gsap.from(".Explore , .Technical, .card", {
        delay: 0.2,
        scale: .9,
        duration: 0.5,
        opacity: 0,
        zIndex: 5,
    });

    gsap.from(".navItems li", {
        delay: 0.2,
        y: -50,
        duration: .8,
        opacity: 0,
        stagger: 0.12,
        ease: "elastic.out(.4,0.5)"
    });
}
gsapEffect();


// Journey Board Open & Close Logic 
const tl = gsap.timeline({ paused: true });
leftPanelBtn.addEventListener('click', () => {

    if (leftPanelBtn.className == "ri-arrow-right-circle-fill") {
        ul.style.opacity = 1;
        one.style.opacity = 0;
        leftPanelBtn.classList.replace("ri-arrow-right-circle-fill", "ri-arrow-left-circle-fill");

        // GSAP code for smooth transition 
        tl.to(leftPanel, {
            left: 0,
            duration: 0.3
        });

        tl.from("#ulbody li", {
            x: -100,
            duration: 0.2,
            stagger: 0.12,
            opacity: 0
        });


    }
    else {

        one.style.opacity = 1;
        leftPanelBtn.classList.replace("ri-arrow-left-circle-fill", "ri-arrow-right-circle-fill");

        // GSAP code for smooth transition 
        tl.to(ul, {
            x: -6,
            opacity: 0,
            duration: 0.3,
        });

        tl.to(leftPanel, {
            left: -285,
            duration: 0.3,
        });
    }
});

leftPanelBtn.addEventListener("click", () => {
    tl.play();
});


// JSON Data update logic 
const url = 'ddugky_project.json';
function fetchJSONData() {
    cardId = [18882, 18883, 18884, 18885, 18886];

    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            // let this.data = JSON.parse(data);
            const task = data.tasks[0];
            task.assets.forEach(element => {
                console.log("copyright: https://www.linkedin.com/in/piyush4444/");
                cardId.forEach(e => {
                    const titleElement = document.getElementById(`${e}`);

                    if (titleElement.id == task.task_id) {
                        // Update the title of task
                        titleElement.children[0].innerHTML = `<h3>${task.task_title}</h3>`;
                        // Update the title of Journey Board
                        document.querySelector('#panelBodyTitle').innerHTML = `${task.task_title}`;
                        // Update the description of task
                        titleElement.children[1].innerHTML = `<p>${task.task_description.replaceAll(/\r\n/g, '')}</p>`;
                    }

                    if (titleElement.id == element.asset_id) {
                        // Update the title of cards
                        titleElement.children[0].innerHTML = `<h2>${element.asset_title}</h2> <i class="ri-information-2-fill"></i>`;
                        // Update the sub title of Journey Board
                        document.getElementById(`J${e}`).innerHTML = `${element.asset_title}`;
                        // Update the description of cards
                        titleElement.children[1].innerHTML = `<p> <span class="bold">Description : </span>${element.asset_description.replaceAll(/\r\n/g, '')}</p>`;
                    }
                });
            });
        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}
fetchJSONData();

