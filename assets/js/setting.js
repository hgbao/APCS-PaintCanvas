var canvas, canvasGrid, canvasTmp, ctx, ctxGrid, ctxTmp;
var curX = 0, curY = 0, preX = -1, preY = -1;
var curColorBox, curColor = '#000000', curWidth = 2;

var flagShape = false, flagTool = false;

if (currentShape == 'polygon'){
  currentShapeObj.finish()
  currentShapeObj.draw(ctx);
}

var currentTool = 'pencil';
var currentShape = '';
var currentShapeObj = null;

function chooseTool(name){
  currentTool = name;
  currentShape = '';
  canvasTmp.style.display = 'none';
  var link = document.getElementById(name).src;
  $('canvas').css('cursor', 'url(' + link + '), auto');
}

function chooseShape(name){
  ctxTmp.clearRect(0, 0, w, h);
  ctxTmp.beginPath();

  if (currentShape == 'polygon'){
    currentShapeObj.finish()
    currentShapeObj.draw(ctx);
  }

  if (currentShape == 'curve' && currentShapeObj != null){
    currentShapeObj.draw(ctx);
  }

  currentTool = '';
  currentShape = name;
  canvasTmp.style.display = 'block';
  var link = document.getElementById(name).src;
  $('canvas').css('cursor', 'url(' + link + '), auto');
}

function chooseColor(id){
  $('#color-quick-1').removeClass('active');
  $('#color-quick-2').removeClass('active');
  $('#' + id).addClass('active');

  curColorBox = document.getElementById(id);
  curColor = curColorBox.style.background;
}

function pickColor(id){
  curColor = id;
  curColorBox.style.background = id;
}

function changeThickness(value){
  curWidth = Math.round(parseInt(value)/10);
  if (curWidth == 0)
    curWidth = 1;
  document.getElementById('rangeDemo').style.height = curWidth + 'px';
  document.getElementById('rangeValue').innerHTML = curWidth + 'px';
}

function drawGrid(){
  ctxGrid.beginPath();
  ctxGrid.strokeStyle = 'rgba(220,220,220,1)';

  for (var x = 0; x < w; x += 10){
    ctxGrid.moveTo(x, 0);
    ctxGrid.lineTo(x, h);
  }
  for (var y = 0; y < h; y += 10){
    ctxGrid.moveTo(0, y);
    ctxGrid.lineTo(w, y);
  }
  ctxGrid.stroke();
  ctxGrid.closePath();
}

function init() {
  canvas = document.getElementById('canvas');
  canvasGrid = document.getElementById('canvasGrid');
  canvasTmp = document.getElementById('canvasTmp');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - document.getElementsByTagName('header')[0].offsetHeight;
  canvasGrid.width = canvas.width;
  canvasGrid.height = canvas.height;
  canvasTmp.width = canvas.width;
  canvasTmp.height = canvas.height;

  ctx = canvas.getContext('2d');
  ctxGrid = canvasGrid.getContext('2d');
  ctxTmp = canvasTmp.getContext('2d');

  w = canvas.width;
  h = canvas.height;

  canvas.addEventListener('mousedown', function (e){ handleToolDown(e) }, false);
  canvas.addEventListener('mouseup', function (e){ handleToolUp(e) }, false);
  canvas.addEventListener('mousemove', function (e){ handleToolMove(e) }, true);

  canvasTmp.addEventListener('mousedown', function (e){ handleShapeDown(e) }, false);
  canvasTmp.addEventListener('mouseup', function (e){ handleShapeUp(e) }, false);
  canvasTmp.addEventListener('mousemove', function (e){ handleShapeMove(e) }, false);

  //Tmp layers
  canvasTmp.style.display = 'none';
  //Painting
  ctx.clearRect(0, 0, w, h);
  ctx.beginPath();
  //Grid
  ctxGrid.clearRect(0, 0, w, h);
  ctxGrid.beginPath();
  ctxGrid.rect(0, 0, w, h);
  ctxGrid.fillStyle = '#FFFFFF';
  ctxGrid.fill();
  drawGrid();
  //Cursor
  $('canvas').css( 'cursor', 'url(assets/img/tools/pencil.png), auto' );
  //Color box
  curColorBox = document.getElementById('color-quick-1');
}
