
let classdata=document.querySelector('#mywordData');
document.getElementById('clickdata').addEventListener("click",function(){
document.getElementById('mywordData').innerHTML=``;
document.getElementById('spinnerData').style.display='block';
    let userValue;
    let inputdata=document.getElementById('wordData').value;
let apiUrl=`https://api.dictionaryapi.dev/api/v2/entries/en/${inputdata}`;

   
    fetch(apiUrl)
  .then(response => {
    console.log(response);
    if (!response.ok) {
        if(response.status===404)
        {
      throw new Error('Network response was not ok');
        }
    
    }
    return response.json();
  })
  .then(userData => {
    // Process the retrieved user data
    console.log('User Data:', userData);
  console.log(userData[0].meanings[0].definitions);
  let myarray=userData[0].meanings[0].definitions;
  let audioLink=userData[0];
  myarray=myarray.slice(0,2);
  let mypart=document.querySelector('#mywordData');
  let myaudioPart=document.createElement('div');
  let myaudioData=userData[0].phonetics;
  
  myaudioPart.innerHTML=`<div class='d-flex justify-content-center px-2 pb-2 myaudiodiv'>
  <audio id='myplayingaudio'></audio>
  <i class="fa-solid fa-volume-high myvolume" id='audioPlayer'></i>
  </div>
  `
  mypart.appendChild(myaudioPart);

  document.getElementById('audioPlayer').addEventListener("click",function(){
    let myvalue;
    for(let i=0;i<myaudioData.length;i++)
    {
      if(myaudioData[i].audio)
      {
        myvalue=myaudioData[i].audio;
        break;
      }
    }
    console.log(myvalue);
    if(myvalue)
    {
    document.getElementById('myplayingaudio').src=myvalue;
    document.getElementById('myplayingaudio').play();
    }
    else
    {
      alert("No Sounds Found");
    }


  })
  mypart.appendChild(myaudioPart);
 let myvaluepart=document.createElement('ul');
 myvaluepart.classList.add('mymeaningList');
for(let i=0;i<myarray.length;i++)
{
  let mypartlist=document.createElement('li');
   mypartlist.innerHTML=`<p class='border border-rounded border-black myclasslist border-left px-2 py-2 me-3'>${myarray[i].
    definition}</p>
   `
   myvaluepart.appendChild(mypartlist);
}
mypart.appendChild(myvaluepart);

  
  





  })
  .catch(error => {
    console.error('Error:', error);
      document.getElementById('mywordData').innerHTML=`<h5>${error}</h5>`
  }).finally(()=>{
    document.getElementById('spinnerData').style.display='none';
  });

  
 



})