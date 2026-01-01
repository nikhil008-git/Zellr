
const MAX_LEN = 5;

export function generateRandomID() {
    let ans = "";
    const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
    for (let i = 0; i < MAX_LEN; i++) {
        ans += subset[Math.floor(Math.random() * subset.length)];
    }
    console.log(ans)
    return ans;
    console.log(ans)
}