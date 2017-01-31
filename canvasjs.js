//  Variables para time;
var cronometro = null;
var segundos=0, minutos=0, horas=0;
//
var columna,fila, score=1,bloqueo=true,perder=false, ematriz=false,activo=true,nocaer=false,muerte=false,ereiniciar=false,timecaer=null, velocidad=100,repeticiones=0;
var probabilidadchuzo=0.4,probabilidadvida=0.1,ratonact2="raton";
//--------------------------------------------------------------------------------------------------------------------------------------
// Imagenes de los ratoncitos
var raton = new Image(); raton.src = 'raton.png';
var ratond = new Image(); ratond.src = 'ratond.png';
var adoquin = new Image(); adoquin.src = 'adoquin.png';
var vida = new Image(); vida.src = 'vida.png';
var chuzo = new Image(); chuzo.src = 'chuzo.png';
var ratonact= raton;
//--------------------------------------------------------------------------------------------------------------------------------------
// Imagen de fondo
var fondo = new Image(); fondo.src = 'ladrillo.png';
//--------------------------------------------------------------------------------------------------------------------------------------
var arreglo= new Array(17);
for(i=0;arreglo.length>i;i++){
arreglo[i]=["C","C","C","C","C","C","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","C","C","C","C","C","C"];
}
//--------------------------------------------------------------------------------------------------------------------------------------
//Evento de presion de teclas
function mover(e){
var evento = e || window.event;
if(ereiniciar==false)
    {
    if (activo)
        {
        if(evento.keyCode==37 && fila!=0)
        {
        if(arreglo[columna-1][fila]=="L" && arreglo[columna-1][fila+1]=="L")
            {
            if(ratonact2=="raton")
                {
                arreglo[columna-1][fila]="R";
                arreglo[columna-1][fila+1]="R";
                arreglo[columna+1][fila]="L";
                arreglo[columna+1][fila+1]="L";
                columna-=1;
                }
            ratonact=raton;
            ratonact2="raton";
            actualizar();
            }
        else if(arreglo[columna-1][fila]=="V" && arreglo[columna-1][fila+1]=="V")
            {
            if(ratonact2=="raton")
                {
                arreglo[columna-2][fila]="L";
                arreglo[columna-2][fila+1]="L";
                arreglo[columna-1][fila]="R";
                arreglo[columna-1][fila+1]="R";
                arreglo[columna+1][fila]="L";
                arreglo[columna+1][fila+1]="L";
                columna-=1;
                if(document.getElementById("vidas").getElementsByTagName("img").length<6)
                    document.getElementById("vidas").innerHTML+="<img height='28' src='raton.png'>";
                }
            ratonact=raton;
            ratonact2="raton";
            actualizar();
            }
        else
            return;
        }
        else if(evento.keyCode==39 && fila!=0)
        {
        if((columna)+2<17)
            {
            if(arreglo[columna+2][fila]=="L" && arreglo[columna+2][fila+1]=="L")
                {
                if(ratonact2=="ratond")
                    {
                    arreglo[columna+2][fila]="R";
                    arreglo[columna+2][fila+1]="R";
                    arreglo[columna][fila]="L";
                    arreglo[columna][fila+1]="L";
                    columna+=1;
                    }
                ratonact=ratond;
                ratonact2="ratond";
                actualizar();
                }
            else if(arreglo[columna+2][fila]=="V" && arreglo[columna+2][fila+1]=="V")
            {
            if(ratonact2=="ratond")
                {
                arreglo[columna+3][fila]="L";
                arreglo[columna+3][fila+1]="L";
                arreglo[columna+2][fila]="R";
                arreglo[columna+2][fila+1]="R";
                arreglo[columna][fila]="L";
                arreglo[columna][fila+1]="L";
                columna+=1;
                if(document.getElementById("vidas").getElementsByTagName("img").length<6)
                    document.getElementById("vidas").innerHTML+="<img height='28' src='raton.png'>";
                }
            ratonact=ratond;
            ratonact2="ratond";
            actualizar();
            }
            else
                return;
            }
        else 
            return;
        }    
    else if(evento.keyCode==80)
        pausar();
    else
        return;
        }
    else
        {
        if(evento.keyCode==67)
            {
            iniciar();  
            caer();
            }
        }
    }
else
    {
    if(evento.keyCode==82)
        reiniciar();
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------
//
function caer(){
    var canvas=document.getElementById("pantalla1").getContext("2d");
    document.getElementById("score").innerHTML= "Score: "+score;
     if(score%500==0)
        {
        probabilidadvida-=0.01;
        probabilidadchuzo+=0.05;
        velocidad-=10;
        }
    for(j=6;45>=j;j++)
        {
        for(i=0;17>i;i++)
            {
            if(arreglo[i][j]=="A" || arreglo[i][j]=="V" || arreglo[i][j]=="C")
                {
                if(j>6)
                    arreglo[i][j-1]=arreglo[i][j];
                arreglo[i][j]="L";
                }

            //--------------------------------------------------      
            //          
            else if(i+1<17)
                {
                if(arreglo[i][j]=="R" && arreglo[i][j+1]=="R" && arreglo[i+1][j]=="R" && arreglo[i+1][j+1]=="R" && (arreglo[i][j+2]=="A" || arreglo[i+1][j+2]=="A" ))
                    {
                    if((j-1)>5)
                        {
                        arreglo[i][j-1]="R";
                        arreglo[i+1][j-1]="R";
                        arreglo[i][j+1]="L";
                        arreglo[i+1][j+1]="L";
                        fila-=1;
                        }
                    else
                        {
                        fila-=2;
                        arreglo[i][j]="L";
                        arreglo[i+1][j]="L";
                        if(document.getElementById("vidas").getElementsByTagName("img").length>0)
                            {
                            fila=0;
                            x=document.getElementById("vidas").getElementsByTagName("img");
                            x[x.length-1].parentNode.removeChild(x[x.length-1]);
                            muerte=true;
                            }
                        else
                            perder=true;
                        }
                     }
                else if (arreglo[i][j]=="R" && arreglo[i][j+1]=="R" && arreglo[i+1][j]=="R" && arreglo[i+1][j+1]=="R" && (arreglo[i][j+2]=="C"  || arreglo[i+1][j+2]=="C"))
                    {
                    fila-=2;
                    arreglo[i][j]="L";
                    arreglo[i][j+1]="L";
                    arreglo[i+1][j]="L";
                    arreglo[i+1][j+1]="L";
                if(document.getElementById("vidas").getElementsByTagName("img").length>0)
                        {
                        fila=0;
                        x=document.getElementById("vidas").getElementsByTagName("img");
                        x[x.length-1].parentNode.removeChild(x[x.length-1]);
                        muerte=true;
                        }
                    else
                        perder=true;
                    }
                else if  (arreglo[i][j]=="R" && arreglo[i][j+1]=="R" && arreglo[i+1][j]=="R" && arreglo[i+1][j+1]=="R" && arreglo[i][j+2]=="L" && arreglo[i+1][j+2]=="L" && nocaer==false)
                    {
                    score+=1;
                    arreglo[i][j]="L"; 
                    arreglo[i+1][j]="L"; 
                    arreglo[i][j+1]="R"; 
                    arreglo[i][j+2]="R"; 
                    arreglo[i+1][j+1]="R"; 
                    arreglo[i+1][j+2]="R"; 
                    fila+=1;
                    nocaer=true;
                    }
                else if (arreglo[i][j]=="R" && arreglo[i][j+1]=="R" && arreglo[i+1][j]=="R" && arreglo[i+1][j+1]=="R" && (arreglo[i][j+2]=="V" || arreglo[i+1][j+2]=="V"))
                    {
                    score+=1;
                    arreglo[i][j]="L"; 
                    arreglo[i+1][j]="L";
                    arreglo[i][j+1]="R"; 
                    arreglo[i+1][j+1]="R"; 
                    arreglo[i][j+2]="R"; 
                    arreglo[i+1][j+2]="R"; 
                    arreglo[i+2][j+2]="L";  
                    arreglo[i][j+3]="L"; 
                    arreglo[i+1][j+3]="L";  
                    arreglo[i+2][j+3]="L";  
                    if(i-1>=0)
                        {
                        arreglo[i-1][j+2]="L";  
                        arreglo[i-1][j+3]="L";  
                        }
                    fila+=1;
                    if(document.getElementById("vidas").getElementsByTagName("img").length<6)
                        document.getElementById("vidas").innerHTML+="<img height='28' src='raton.png'>";
                    }
                else
                    continue;
                }
            else
                continue;
            //--------------------------------------------------
        }
    }

aleatorio();
   if(bloqueo)
        actualizar();
   if(perder)
        gameover();
   else
        timecaer=setTimeout("caer();",velocidad); 
}
//--------------------------------------------------------------------------------------------------------------------------------------
//
function dibujar(){
muerte=true;
aleatorio();
actualizar();
iniciar();
timecaer=setTimeout("caer();",velocidad); 
}

//--------------------------------------------------------------------------------------------------------------------------------------
//
function actualizar(){
    var canvas=document.getElementById("pantalla1").getContext("2d");
    canvas.drawImage(fondo, 0, 0);
    nocaer=false;

    if(ematriz==true)
        x="<font color='red'><b>CCCCCCCCCCCCCCCCC<br>CCCCCCCCCCCCCCCCC<br>CCCCCCCCCCCCCCCCC<br>CCCCCCCCCCCCCCCCC</b></font><br>";
    for(j=6;45>j;j++)  
        {
        for(i=0;17>i;i++)
            {
            
            if(ematriz==true)
                {
                if(arreglo[i][j]=="C")
                    x+="<font color='red'><b>C</b></font>";
                else if(arreglo[i][j]=="A")
                    x+="<font color='darkgreen'><b>A</b></font>";
                else if(arreglo[i][j]=="V")
                    x+="<font color='darkviolet'><b>V</b></font>";
                else if(arreglo[i][j]=="R")
                    x+="<font color='blue'><b>R</b></font>";
                else
                    x+="<font color='gray'><b>L</b></font>";
                }   
            
                if(arreglo[i][j]=="A" && arreglo[i][j+1]=="A")
                    canvas.drawImage(adoquin, i*20, j*10);    
                else if(arreglo[i][j]=="C" && arreglo[i][j+1]=="C" && j!=45)
                    canvas.drawImage(chuzo, i*20, (j*10)-10);
                else if(i+1<17)
                    {
                     if(arreglo[i][j]=="V" && arreglo[i][j+1]=="V" && arreglo[i+1][j]=="V" && arreglo[i+1][j+1]=="V")
                        canvas.drawImage(vida, i*20,( j*10)-3);  
                    else if(arreglo[i][j]=="R" && arreglo[i][j+1]=="R" && arreglo[i+1][j]=="R" && arreglo[i+1][j+1]=="R")
                        canvas.drawImage(ratonact, i*20,( j*10)-3);                 
                    else
                        continue;
                    }
                else
                    continue;
            }
        if(ematriz==true)
            x+="\n";
        }
    if(ematriz==true)
        {
        x+="<font color='red'><b>CCCCCCCCCCCCCCCCC<br>CCCCCCCCCCCCCCCCC<br>CCCCCCCCCCCCCCCCC<br>CCCCCCCCCCCCCCCCC</b></font><br>";
        document.getElementById("matriz").innerHTML=x;
        }
    }
//--------------------------------------------------------------------------------------------------------------------------------------
//
function iniciar (){  
    activo=true;
    document.getElementById("botones2").innerHTML="<button onClick='matriz();'>Ver Matriz </button>";
    document.getElementById("botones").innerHTML="<button onClick='pausar();'>Pausar </button><br><h3>(Presione P para Pausar) </h3>";
    iniciar1();
}

function iniciar1 () {
  	segundos++;
	if ( segundos > 59 ) {
		segundos = 0;
		minutos++;
		if ( minutos > 59 ) {
			minutos = 0
			horas++;
			}
	}
	var ValorCrono = "Time: ";
	ValorCrono += (horas < 10) ? "0" + horas : horas;
	ValorCrono += (minutos < 10) ? ":0" + minutos : ":" + minutos;
	ValorCrono += (segundos < 10) ? ":0" + segundos : ":" + segundos;
 	document.getElementById("time").innerHTML= ValorCrono;
    cronometro = setTimeout("iniciar1()", 1000);
}
//--------------------------------------------------------------------------------------------------------------------------------------
//
function pausar (){  
    clearTimeout(cronometro);
    clearTimeout(timecaer);
    document.getElementById("botones").innerHTML="<button onClick='iniciar();caer();'>Continuar</button><br><h3>PAUSE<br> (Presione C para Continuar) </h3>";
    activo=false;
}
//--------------------------------------------------------------------------------------------------------------------------------------
// 
function aleatorio()
{
if(repeticiones==0)
    {
    i=parseInt(Math.random()*14);
    if(Math.random()>probabilidadchuzo)
        {
        arreglo[i][45]="A"; 
        arreglo[i+1][45]="A"; 
        arreglo[i+2][45]="A"; 
        arreglo[i+3][45]="A"; 
        arreglo[i][44]="A"; 
        arreglo[i+1][44]="A"; 
        arreglo[i+2][44]="A"; 
        arreglo[i+3][44]="A"; 
        if(muerte)
            {
            arreglo[i+3][43]="R"; 
            arreglo[i+3][42]="R"; 
            arreglo[i+2][43]="R"; 
            arreglo[i+2][42]="R"; 
            fila=42;
            columna=i+2;
            muerte=false;
            }
        if(Math.random()<probabilidadvida && document.getElementById("vidas").getElementsByTagName("img").length<6 )
            {
            arreglo[i][43]="V"; 
            arreglo[i][42]="V"; 
            arreglo[i+1][43]="V"; 
            arreglo[i+1][42]="V"; 
            }
        }
    else
        {
        arreglo[i][45]="C"; 
        arreglo[i+1][45]="C"; 
        arreglo[i+2][45]="C"; 
        arreglo[i+3][45]="C"; 
        arreglo[i][44]="C"; 
        arreglo[i+1][44]="C"; 
        arreglo[i+2][44]="C"; 
        arreglo[i+3][44]="C"; 
        }
    repeticiones=1;
    }
else if (repeticiones!=3)
    repeticiones+=1;
else
    repeticiones=0;
}

//--------------------------------------------------------------------------------------------------------------------------------------
// 
function gameover(){
    var canvas=document.getElementById("pantalla1").getContext("2d");
    actualizar();
    canvas.fillStyle = 'red';
    canvas.strokeStyle = 'black';
    canvas.font = '30pt sans';
    canvas.fillText('GAME OVER', 50, 250);
    canvas.strokeText('GAME OVER', 50, 250);
    canvas.fill();
    canvas.stroke();
    document.getElementById("score").innerHTML= "Score: "+score;
    document.getElementById("botones").innerHTML="<button onClick='reiniciar()'>Reiniciar</button><br><h3>(Presione R para Reiniciar) </h3>";
    ereiniciar=true;
    clearTimeout(cronometro);
    clearTimeout(timecaer);
    canvas.drawImage(ratonact,columna*20, (fila+1)*10);
    bloqueo=false;
}
//--------------------------------------------------------------------------------------------------------------------------------------
// 
function matriz()
{
ematriz=true;
td=document.createElement("td"); td.setAttribute("class","uno");td.setAttribute("width","10%");td.setAttribute("id","matriz");
document.getElementById("tabla").appendChild(td);
document.getElementById("botones2").innerHTML="<button onClick='ocultarmatriz()'>Ocultar Matriz</button>";
}
//--------------------------------------------------------------------------------------------------------------------------------------
// 
function ocultarmatriz()
{
ematriz=false;
td=document.getElementById("tabla").getElementsByTagName("td");
td[td.length-1].parentNode.removeChild(td[td.length-1]);
document.getElementById("botones2").innerHTML="<button onClick='matriz()'>Ver Matriz</button>";
}

//--------------------------------------------------------------------------------------------------------------------------------------
// 
function reiniciar()
{
cronometro = null;
segundos=0, minutos=0, horas=0;
columna,fila, score=1,bloqueo=true,perder=false, ematriz=false,activo=true,nocaer=false,muerte=false,timecaer=null, velocidad=100,repeticiones=0,ereiniciar=false;
probabilidadchuzo=0.4,probabilidadvida=0.1;
for(i=0;arreglo.length>i;i++){
arreglo[i]=["C","C","C","C","C","C","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","C","C","C","C","C","C"];
}
document.getElementById("vidas").innerHTML="<img height='28' src='raton.png'><img height='28' src='raton.png'>";
dibujar();
}
