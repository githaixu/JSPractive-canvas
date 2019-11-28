//基本のセットアップ
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let c = canvas.getContext('2d');

//変数宣言
let mouse = {
  x: undefined,
  y: undefined
}
let maxRadius = 40;
let colorArray = [
  '#247ba0',
  '#70c1b3',
  '#b2dbbf',
  '#F3FFBD',
  '#FF1654'
]

//マウスの座標の取得
window.addEventListener('mousemove',
  function(e){
    mouse.x = e.x;
    mouse.y = e.y;
    //console.log(mouse);
});
//ウィンドウの大きさを変えた場合、キャンバスの大きさを合わせる
window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

//円オブジェクト作成
function Circle(x, y, dx, dy, radius){
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  //円を書く
  this.draw = function(){
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    //c.stroke();
    c.fill();
  }
  //円のアップデート
  this.update = function(){
    this.draw();
    //円の外側がスクリーンのエッジにタッチした場合、dxとdyをマイナスにする
    if(this.x + radius > innerWidth || this.x - radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + radius > innerHeight || this.y - radius < 0){
      this.dy = -this.dy;
    }
    //円の座標をアップデートする
    this.y += this.dy;
    this.x += this.dx;
    //マウスと連動する
    //連動の範囲を決める
    if(mouse.x - this.x < 50 && mouse.x - this.x > - 50 && mouse.y - this.y < 50 & mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += 2.5;
      }
    }else if(this.radius > radius){
      this.radius -= 2.5;
    }
  }
}



//円オブジェクトから円を作り、配列に入れる
let number = 600;
let circleArray = [];
function init(){
  circleArray = [];
  for(let i = 0; i < number; i++){
    let radius = Math.floor(Math.random() * 5) + 1;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let dx = (Math.random() - 0.5) * 2;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for(let i = 0; i < circleArray.length; i++){
    circleArray[i].update();
  }
}

init();
animate();
