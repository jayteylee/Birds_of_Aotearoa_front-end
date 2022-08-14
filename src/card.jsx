function Card(props) {
  const bird = props.bird;
  // if(bird.status === "Not Threatened"){
  //   const colour = "#02a028"
  // }else if(bird.status ==="Naturally Uncommon"){
  //   const colour = "#649a31"
  // }else{
  //   const colour = "#649a31"
  // }


  const getStatusBgColour = (status) => {
    switch (status) {
      case "Not Threatened":
        return 'bg-not-threatened';
      case "Naturally Uncommon":
        return 'bg-naturally-uncommon';
      case "Relict":
        return 'bg-relict';
      case "Recovering":
        return 'bg-recovering';
      case "Declining":
        return 'bg-declining';
      case "Nationally Increasing":
        return 'bg-nationally-increasing';
      case "Nationally Vulnerable":
        return 'bg-nationally-vulnerable';
      case "Nationally Endangered":
        return 'bg-nationally-endangered';
      case "Nationally Critical":
        return 'bg-nationally-critical';
      case "Data Deficient":
        return 'bg-data-deficient';
      default:
        return '';
    } 
  }

  return (
    <div className='flex flex-col relative bg-boa-white w-[275px] h-[400px] m-8 shadow-xl rounded-lg overflow-hidden'>
      <div className='w-full h-[183px]'>
      <div className="relative w-full h-full">
        <img className="w-full h-full object-cover" src={bird.photo.source} alt="a native bird"/>

        <p className="absolute text-3xl py-4 px-4 bottom-0 left-0 text-white">{bird.primary_name}</p>
        <p className="absolute text-[7px] py-2 px-4 bottom-0 left-0 text-white">Photo by {bird.photo.credit}</p>
        <div className={`-bottom-4 right-4 absolute rounded-full border-2 ${getStatusBgColour(bird.status)} shadow-md w-10 h-10`}></div>
        </div>
      </div>
      <h2 className='text-lg text-left pr-2 pl-3 py-3 font-serif font-extrabold'>
      {bird.english_name}
      </h2>
      <div className='block'>
        <div className="flex flex-row">
          <div>
          <p className="font-bold text-xs px-2 pb-1 ml-2">Scientific Name:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Family:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Order:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Status:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Length:</p> 
          <p className="font-bold text-xs px-2 pb-1 ml-2">Weight:</p> 
          </div>
          <div>
          <p className="text-xs pb-1 italic font-medium">{bird.scientific_name} </p>
          <p className="text-xs pb-1 italic font-medium">{bird.family} </p>
          <p className="text-xs pb-1 italic font-medium">{bird.order} </p>
          <p className="text-xs pb-1">{bird.status} </p>
          <p className="text-xs pb-1">{bird.size.length.value} {bird.size.length.units}</p>
          <p className="text-xs pb-1">{bird.size.weight.value} {bird.size.weight.units} </p>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Card;
