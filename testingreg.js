const doc = {
  name: "edgar",
  time: [3, 23]
}
var d = new Date();
var n = d.getHours();
var m = d.getMinutes();

console.log(m);

console.log(doc.time[0]);

if (doc.time[0] < n && n < doc.time[1]) {
  console.log('open');
} else {
  console.log('closed');
}