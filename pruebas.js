

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
    for (let i = 0; i < 10; i++) {
        console.log(i);
        await sleep(1000);
    }
}

main();
    