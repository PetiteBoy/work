const randomWord = function (num) {
  num = num || 32;
  let t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let a = t.length;
  let n = '';
  for (let i = 0; i < num; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
};

export { randomWord };
