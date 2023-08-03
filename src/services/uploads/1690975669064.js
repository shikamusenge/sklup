const Userinput = document.querySelector("#text-input");
const answerDiv = document.querySelector("#answer");
const btns = document.querySelectorAll(".btn")
let number1="",number2="",temp="",answer="null",opp;

// functions
const clear=()=>{
    answerDiv.innerHTML=""
    Userinput.value="0"
}
const write = (text)=>{
    if(text==".")
    {
        let currentText = Userinput.value.split(" ");
        let lastText = currentText[currentText.length-1];
        
        if(isNaN(Number(lastText)) && !lastText.split("").hasOwnProperty(".")){
            Userinput.value += '0.'
           console.log(lastText)
        }else if(!lastText.split("").hasOwnProperty(".")){
            Userinput.value += '.' 
        }

    }else
Userinput.value= Userinput.value == '0'? `${text}`:Userinput.value +`${text}`;
}
const calculate=()=>{
    let userData = Userinput.value.trim()
    let dataArray = userData.split(" "); 
    if(isNaN(Number(dataArray[dataArray.length- 1])))
    {
        dataArray.splice(dataArray.length-1,1)
    }
   dataArray=divede(dataArray);
   dataArray = multply(dataArray);
   dataArray=add(dataArray);
   dataArray=substract(dataArray);
   answerDiv.innerHTML=` ${dataArray[0].toFixed(3)}`	
   answer = Math.round(dataArray[0]);
}
const substract = (data)=>{
    let res=[];
    data.forEach((elt, i)=>{
          if(data[i+1]=="-" && data[i-1]!="-"){
              loop=true;
              
              let sub=Number(elt) - Number(data[i+2]),j=i+3;
             while(loop){
             if(data[j]=="-")
             {
              sub -= Number(data[j+1]);
              j+=2;
             }
             else{
              loop=false
             }
             }
             res.push(sub)
          }
          else if(elt !=="-" && data[i-1]!=="-")
          {
           res.push(elt)
          }
      })
      return res;
}
const add = (data)=>{
    let res=[];
    data.forEach((elt, i)=>{
          if(data[i+1]=="+" && data[i-1]!="+"){
              loop=true;
              
              let sum=Number(elt) + Number(data[i+2]),j=i+3;
             while(loop){
             if(data[j]=="+")
             {
              sum += Number(data[j+1]);
              j+=2;
             }
             else{
              loop=false
             }
             }
             res.push(sum)
          }
          else if(elt !=="+" && data[i-1]!=="+")
          {
           res.push(elt)
          }
      })
      return res;
 }
 const divede = (data)=>{
    let res=[];
    data.forEach((elt, i)=>{
          if(data[i+1]=="/" && data[i-1]!="/"){
              loop=true;
              
              let div=Number(elt) / data[i+2],j=i+3;
             while(loop){
             if(data[j]=="/")
             {
              div /=data[j+1];
              j+=2;
             }
             else{
              loop=false
             }
             }
             res.push(div)
          }
          else if(elt !=="/" && data[i-1]!=="/")
          {
           res.push(elt)
          }
      })
      return res;
 }
 const multply = (data)=>{
  let res=[];
  data.forEach((elt, i)=>{
        if(data[i+1]=="*" && data[i-1]!="*"){
            loop=true;
            
            let product=Number(elt) * Number(data[i+2]),j=i+3;
           while(loop){
           if(data[j]=="*")
           {
            product *=Number(data[j+1]);
            j+=2;
           }
           else{
            loop=false
           }
           }
           res.push(product)
        }
        else if(elt !=="*" && data[i-1]!=="*")
        {
         res.push(elt)
        }
    })
    return res;
 }
 // loop btns event listeners
btns.forEach(btn=>{
    btn.onclick=()=>{
if(btn.classList.contains("btn-inp")){
    write(btn.value);
    calculate()
}
if(btn.classList.contains("btn-opp")){
    opp = `${btn.value.trim()}`
    write(btn.value);
    calculate();
}
if(btn.id=="equal"){
    calculate()
Userinput.value = answer;
answerDiv.innerHTML= "";
}
if(btn.value=="c"||btn.value=="ac") clear()
if(btn.classList.contains("del")){
let inp=Userinput.value.trim();
if(inp!=="0"){
    inp = inp.split("");
    inp.splice(inp.length-1,1);
    let newInp="";
    inp.forEach(inp=>{
        newInp+=inp
    });
    Userinput.value=newInp;
    calculate()
}
}
    }
})
document.addEventListener("keypress",(k)=>{
    console.log(k.key);
    if(!isNaN(k.key)){
     Userinput.value+=k.key;
    }
    else if(['+','-','*','/'].hasOwnProperty(k.key))
    {
        Userinput.value+=` ${k.key} ` ;
        calculate()  
    }
    else{
        Userinput.value= Userinput.value;
    }

})
