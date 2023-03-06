
import './App.css';
import "../src/style/app.css"
import {useEffect, useRef, useState} from "react"
import axios from 'axios';
function App() {

  const searchData = useRef(null);
  const [FindText, setSearchText] = useState("mountains");
  const [imageData, setImageData] = useState([])


  useEffect(()=> {
    const params = {
      method: "flickr.photos.search",
      api_key: "ce0dcd91841d5929b585b53d173b7952",
      text: FindText,
      sort: "",
      per_page: 40,
      license: '4',
      extras: "owner_name, license",
      format: "json",
      nojsoncallback: 1
    }

    const parameters = new URLSearchParams(params);
    const url = `https://api.flickr.com/services/rest/?${parameters}`
    axios.get(url).then((resp)=> {
      console.log(resp.data)
      const arr = resp.data.photos.photo.map((imgData)=> {
        return fetchFlickrImageUrl(imgData, 'q');
      });
      setImageData(arr);
    }).catch(()=> {

    }).finally(()=> {

    })
  }, [FindText])
  const fetchFlickrImageUrl = (photo, size)=> {
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`
    if(size) {
     url += `_${size}`
    }
    url += '.jpg'
    return url
  }
  return (
 <>
    <div className='snap1'>
      <p className='sp'> <i>SnapShot</i> </p>
    </div>
   <div className='snap2'>
   <input className='inp' onChange={(e)=> {searchData.current = e.target.value} }/>
    <button className='btn' onClick={()=> {setSearchText(searchData.current)}}>Search</button>
    </div>
   
    <div className='snap3'>
    <section>
      <button className='btn' onClick={()=> {setSearchText("Mountains")}}>Mountains</button>
      <button className='btn' onClick={()=> {setSearchText("Beaches")}}>Beaches</button>
      <button className='btn' onClick={()=> {setSearchText("Birds")}}>Birds</button>
      <button className='btn' onClick={()=> {setSearchText("Food")}}>Food</button>
    </section>
    </div>

    <div className='snap4'>
       <h2 className='sps'>{FindText}</h2>
   </div>

    <section className='container1'>
      {imageData.map((imageurl, key)=> {
        return (
          <article className='flickr-image'>
            <img className='zoom' src={imageurl} key={key}/>
          </article>
        )
        
      })} 
  </section>
 </>
  );
}

export default App;
