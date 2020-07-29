const obj = {
    1: true,
    2: false
}
const keys = Object.keys(obj);
const filtered = keys.filter(k => obj[k] == true);
console.log(filtered);