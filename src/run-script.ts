// this code looks absolutely disgusting by the way, i hadn't written anything for like 4 months

const DISCRIMINATOR_SELECTOR = "._ap3a._aaco._aacw._aacx._aad7._aade";
const NAME_SELECTOR = ".x1lliihq.x193iq5w.x6ikm8r.x10wlt62.xlyipyv.xuxw1ft";
const LIST_SELECTOR = ".x6nl9eh > div:nth-child(1) > div:nth-child(1)";
const IMAGE_SELECTOR = "img";

type Person = {
    name: string;
    discriminator: string;
    picture: HTMLImageElement;
};

let isFirstTime = true;
// bigger list should be following
const firstList: Array<HTMLDivElement> = [];
const simpleFirstList: Person[] = [];
const secondList: Array<HTMLDivElement> = [];
const simpleSecondList: Person[] = [];

browser.runtime.onMessage.addListener((_req, _sen, _res) => {
    try {
        switch (_req.action) {
            case "readPage": {
                const list = document.querySelector(LIST_SELECTOR);
                if (list == null) {
                    console.error("Error: Instagram list not found.");
                    return;
                }

                if (isFirstTime && firstList.length === 0) {
                    const personList = createPersonList(list);
                    simpleFirstList.push(...personList[0]);
                    firstList.push(...personList[1]);
                } else if (!isFirstTime && secondList.length === 0) {
                    const personList = createPersonList(list);
                    simpleSecondList.push(...personList[0]);
                    secondList.push(...personList[1]);
                }

                break;
            }
            case "compareFollowers": {
                const listOfShame: Array<string> = [];
                const followingList: Array<Person> = [];
                const firstListDiscriminators = simpleFirstList.map(
                    (item) => item.discriminator,
                );
                const secondListDiscriminators = simpleSecondList.map(
                    (item) => item.discriminator,
                );

                const isFirstListFollowers =
                    firstList.length < secondList.length;

                if (isFirstListFollowers) {
                    secondListDiscriminators.forEach((discriminator) => {
                        if (!firstListDiscriminators.includes(discriminator)) {
                            listOfShame.push(discriminator);
                        }
                    });
                    followingList.push(...simpleSecondList);
                } else {
                    firstListDiscriminators.forEach((discriminator) => {
                        if (!secondListDiscriminators.includes(discriminator)) {
                            listOfShame.push(discriminator);
                        }
                    });
                    followingList.push(...simpleFirstList);
                }

                const decoratedListOfShame: Array<Person> = [];
                followingList.forEach((person) => {
                    if (listOfShame.includes(person.discriminator)) {
                        decoratedListOfShame.push(person);
                    }
                });

                const uList = createElementList(decoratedListOfShame);
                document.body.innerHTML = "LIST OF SHAME";
                document.body.appendChild(uList);

                break;
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        console.log("End of execution.");
        isFirstTime = false;
    }
});
function createElementList(list: Array<Person>): HTMLUListElement {
    const elementList: Array<HTMLLIElement> = [];
    list.forEach((person) => {
        const nameElement = document.createElement("span");
        nameElement.className = "name";
        const discriminatorElement = document.createElement("span");
        discriminatorElement.className = "discriminator";
        const imgElement = person.picture;

        nameElement.appendChild(document.createTextNode(person.name));
        discriminatorElement.appendChild(
            document.createTextNode(person.discriminator),
        );

        const personElement = document.createElement("li");
        personElement.classList = "user";
        personElement.appendChild(nameElement);
        personElement.appendChild(discriminatorElement);
        personElement.appendChild(imgElement);

        elementList.push(personElement);
    });

    const uList = document.createElement("ul");
    elementList.forEach((element) => {
        uList.appendChild(element);
    });

    return uList;
}

// this function is ass
function createPersonList(
    list: Element,
): [Array<Person>, Array<HTMLDivElement>] {
    const personList = [];
    const personObjectList: Array<Person> = [];
    for (const child of list.children) {
        const person = {
            name: child.querySelector(NAME_SELECTOR)?.innerHTML ?? "Not Found",
            discriminator:
                child.querySelector(DISCRIMINATOR_SELECTOR)?.innerHTML ??
                "Not Found",
            picture:
                (child.querySelector(IMAGE_SELECTOR) as HTMLImageElement) ??
                "Not Found",
        };
        const nameElement = document.createElement("span");
        const discriminatorElement = document.createElement("span");
        const imgElement = person.picture;

        nameElement.appendChild(document.createTextNode(person.name));
        discriminatorElement.appendChild(
            document.createTextNode(person.discriminator),
        );

        const personElement = document.createElement("div");
        personElement.classList = "user";
        personElement.appendChild(nameElement);
        personElement.appendChild(discriminatorElement);
        personElement.appendChild(imgElement);

        personList.push(personElement);
        personObjectList.push(person);
    }
    return [personObjectList, personList];
}
